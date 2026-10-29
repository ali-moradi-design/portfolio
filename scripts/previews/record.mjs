// Records the looping project previews in public/projects/ from the live
// demos: <slug>.mp4 (H.264), <slug>.webm (VP9) and the poster <slug>.jpg.
//
//   pnpm previews                 # every project in scenes.mjs
//   pnpm previews aml-dashboard   # only some
//
// Needs ffmpeg on the PATH. Set CHROMIUM_PATH to use an installed Chromium.
// Frames come from the Chrome DevTools screencast (sharper than Playwright's
// own video), keep their real timing and are encoded with ffmpeg.

import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { chromium } from "@playwright/test";
import { scenes } from "./scenes.mjs";

const OUT = path.resolve(import.meta.dirname, "../../public/projects");
// 16:10 like the card frame; encoded at 75% of the viewport.
const VIEWPORT = { width: 1280, height: 800 };
const OUTPUT_WIDTH = 960;

const only = process.argv.slice(2);
const list = only.length ? scenes.filter((s) => only.includes(s.slug)) : scenes;

// A dot that follows the mouse, since headless screenshots show no cursor.
const cursorScript = () => {
  const add = () => {
    const dot = document.createElement("div");
    dot.style.cssText =
      "position:fixed;left:-40px;top:-40px;z-index:2147483647;width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:50%;background:rgba(20,20,20,.55);border:2px solid #fff;pointer-events:none;transition:transform .12s";
    document.documentElement.append(dot);
    addEventListener(
      "pointermove",
      (e) => {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
      },
      true,
    );
    addEventListener("pointerdown", () => (dot.style.transform = "scale(.7)"));
    addEventListener("pointerup", () => (dot.style.transform = ""));
  };
  if (document.readyState === "loading")
    addEventListener("DOMContentLoaded", add);
  else add();
};

/** Small helpers the scenes use. */
const helpers = (page) => ({
  wait: (ms) => page.waitForTimeout(ms),
  /** Scrolls by `y` pixels in small wheel steps over `ms`. */
  async scroll(y, ms = 1500) {
    // Wheel events take a while each, so steps follow the clock, not a count.
    const start = Date.now();
    let done = 0;
    while (done !== y) {
      const t = Math.min(1, (Date.now() - start) / ms);
      const target = Math.round(
        y * (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2),
      );
      if (target !== done) await page.mouse.wheel(0, target - done);
      done = target;
      await page.waitForTimeout(16);
    }
  },
  /** Moves the mouse to the center of a locator, slowly. */
  async hover(locator, steps = 25) {
    const box = await locator.boundingBox();
    if (!box) return;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, {
      steps,
    });
  },
  /** Moves to a link, clicks it and waits off the recording for `ready`. */
  async go(locator, ready) {
    await this.hover(locator);
    await page.waitForTimeout(150);
    await this.offscreen(async () => {
      await locator.click();
      await ready();
    });
  },
  async click(locator) {
    await this.hover(locator);
    await page.waitForTimeout(150);
    await locator.click();
  },
});

async function record(browser, scene) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    colorScheme: scene.colorScheme ?? "light",
    locale: "en-US",
  });
  await context.addInitScript(cursorScript);
  const page = await context.newPage();
  // `h.offscreen(fn)` runs fn without recording it, e.g. while a page loads.
  const h = {
    ...helpers(page),
    async offscreen(fn) {
      paused = Date.now() / 1000;
      await fn();
      skipped += Date.now() / 1000 - paused;
      paused = 0;
      // The screencast only sends frames on change, so add the new state now.
      const shot = await page.screenshot({ type: "jpeg", quality: 92 });
      frames.push({ data: shot.toString("base64"), t: clock() });
    },
  };
  const frames = [];
  let paused = 0;
  let skipped = 0;
  const clock = () => Date.now() / 1000 - skipped;
  await page.goto(scene.url, { waitUntil: "networkidle", timeout: 60_000 });
  await page.mouse.move(VIEWPORT.width / 2, VIEWPORT.height / 2);
  if (scene.setup) await scene.setup(page, h);
  await page.waitForTimeout(scene.settle ?? 1500);

  const cdp = await context.newCDPSession(page);
  cdp.on("Page.screencastFrame", ({ data, metadata, sessionId }) => {
    if (!paused) frames.push({ data, t: metadata.timestamp - skipped });
    cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
  });
  await cdp.send("Page.startScreencast", {
    format: "jpeg",
    quality: 92,
    maxWidth: VIEWPORT.width,
    maxHeight: VIEWPORT.height,
    everyNthFrame: 1,
  });
  await scene.play(page, h);
  // Hold the last state so the loop does not jump straight away.
  await page.waitForTimeout(600);
  const end = clock();
  await cdp.send("Page.stopScreencast");
  await context.close();
  // `speed` > 1 plays a slow scene (software WebGL) faster.
  const speed = scene.speed ?? 1;
  const t0 = frames[0]?.t ?? end;
  return {
    frames: frames.map((f) => ({ ...f, t: (f.t - t0) / speed })),
    total: (end - t0) / speed,
  };
}

async function encode(slug, { frames, total }) {
  if (frames.length < 2) throw new Error(`${slug}: no frames`);
  const dir = await mkdtemp(path.join(tmpdir(), `preview-${slug}-`));
  const lines = [];
  for (const [i, f] of frames.entries()) {
    const file = path.join(dir, `${String(i).padStart(5, "0")}.jpg`);
    await writeFile(file, Buffer.from(f.data, "base64"));
    const next = frames[i + 1]?.t ?? total;
    lines.push(`file '${file}'`, `duration ${Math.max(0.001, next - f.t)}`);
  }
  // The concat demuxer needs the last file twice for its duration to count.
  lines.push(
    `file '${path.join(dir, `${String(frames.length - 1).padStart(5, "0")}.jpg`)}'`,
  );
  const list = path.join(dir, "frames.txt");
  await writeFile(list, lines.join("\n"));

  const input = [
    "-y",
    "-loglevel",
    "error",
    "-f",
    "concat",
    "-safe",
    "0",
    "-i",
    list,
  ];
  const vf = `fps=30,scale=${OUTPUT_WIDTH}:-2:flags=lanczos,format=yuv420p`;
  const out = (ext) => path.join(OUT, `${slug}.${ext}`);
  const ff = (args) => execFileSync("ffmpeg", args, { stdio: "inherit" });
  ff([
    ...input,
    "-vf",
    vf,
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "27",
    "-profile:v",
    "high",
    "-movflags",
    "+faststart",
    out("mp4"),
  ]);
  ff([
    ...input,
    "-vf",
    vf,
    "-an",
    "-c:v",
    "libvpx-vp9",
    "-crf",
    "40",
    "-b:v",
    "0",
    "-row-mt",
    "1",
    "-deadline",
    "good",
    "-cpu-used",
    "4",
    out("webm"),
  ]);
  // The poster is the first frame, which is what shows before playback.
  ff([
    "-y",
    "-loglevel",
    "error",
    "-i",
    path.join(dir, "00000.jpg"),
    "-vf",
    `scale=${OUTPUT_WIDTH}:-2:flags=lanczos`,
    "-q:v",
    "4",
    out("jpg"),
  ]);
  await rm(dir, { recursive: true, force: true });
}

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  // Software WebGL, so the 3D demos render without a GPU.
  args: [
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--ignore-gpu-blocklist",
  ],
});
let failed = 0;
for (const scene of list) {
  try {
    const result = await record(browser, scene);
    await encode(scene.slug, result);
    console.log(
      `${scene.slug}: ${result.frames.length} frames, ${result.total.toFixed(1)} s`,
    );
  } catch (error) {
    failed++;
    console.error(`${scene.slug}: ${error.message}`);
  }
}
await browser.close();
process.exitCode = failed ? 1 : 0;
