"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { contrastRatio, parseColor } from "@/shared/lib/contrast";
import { Button } from "@/shared/ui/button";
import {
  AA_GRAPHICS,
  AA_TEXT,
  isGraphicRole,
  isToken,
  parseTokens,
  spacingPx,
} from "../lib/inspectTokens";
import { cn } from "@/shared/lib/cn";

type Box = { x: number; y: number; w: number; h: number };
type TokenItem = {
  label: string;
  /** Resolved CSS value, shown when short (e.g. "24px"). */
  value: string | null;
  /** Set when the value is a color. */
  swatch: string | null;
  /** Graphics contrast against the element background (series colors only). */
  contrast: number | null;
};
type Finding = {
  id: number;
  name: string;
  tokens: { role: string; items: TokenItem[] }[];
  box: Box;
  /** Text contrast of the first text inside the element. */
  contrast: number | null;
  /** Size in design pixels: the dashboard may be scaled to fit the hero. */
  size: { w: number; h: number };
};

const MAX_FINDINGS = 12;

// Ruler ticks: a short one every 10 px and a long one every 100 px.
const tick = (dir: string, size: string) =>
  `repeating-linear-gradient(${dir}, var(--border-strong) 0 1px, transparent 1px ${size})`;
const RULER_X = {
  background: `${tick("90deg", "10px")} bottom / 100% 5px no-repeat, ${tick("90deg", "100px")} bottom / 100% 10px no-repeat`,
};
const RULER_Y = {
  background: `${tick("180deg", "10px")} right / 5px 100% no-repeat, ${tick("180deg", "100px")} right / 10px 100% no-repeat`,
};

function effectiveBackground(el: Element | null): string | null {
  for (let node = el; node; node = node.parentElement) {
    const bg = getComputedStyle(node).backgroundColor;
    if (parseColor(bg)) return bg;
  }
  return null;
}

function hasOwnText(el: Element): boolean {
  return Array.from(el.childNodes).some(
    (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim(),
  );
}

function textElement(el: Element): Element | null {
  if (hasOwnText(el)) return el;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (hasOwnText(n as Element)) return n as Element;
  }
  return null;
}

function resolveItem(
  el: Element,
  label: string,
  graphic: boolean,
  bg: string | null,
): TokenItem {
  if (!isToken(label)) {
    // Tailwind spacing classes resolve against the theme's --spacing step.
    const rootStyle = getComputedStyle(document.documentElement);
    const step =
      parseFloat(rootStyle.getPropertyValue("--spacing")) *
      parseFloat(rootStyle.fontSize);
    const px = spacingPx(label, step || 4);
    return {
      label,
      value: px === null ? null : `${px}px`,
      swatch: null,
      contrast: null,
    };
  }
  const raw = getComputedStyle(el).getPropertyValue(label).trim();
  const color = raw ? parseColor(raw) : null;
  const bgColor = bg ? parseColor(bg) : null;
  return {
    label,
    value: !color && raw && raw.length <= 10 ? raw : null,
    swatch: color ? raw : null,
    contrast:
      graphic && color && bgColor ? contrastRatio(color, bgColor) : null,
  };
}

function describe(el: Element, id: number, origin: DOMRect): Finding {
  const r = el.getBoundingClientRect();
  const scale =
    parseFloat(el.closest("[data-scale]")?.getAttribute("data-scale") ?? "1") ||
    1;
  const textEl = textElement(el);
  let contrast: number | null = null;
  if (textEl) {
    const style = getComputedStyle(textEl);
    // SVG text is painted with `fill`, HTML text with `color`.
    const fg = parseColor(
      textEl instanceof SVGElement ? style.fill : style.color,
    );
    const bgValue = effectiveBackground(textEl);
    const bg = bgValue ? parseColor(bgValue) : null;
    if (fg && bg) contrast = contrastRatio(fg, bg);
  }
  const elBg = effectiveBackground(el);
  return {
    id,
    name: el.getAttribute("data-inspect") ?? el.tagName.toLowerCase(),
    tokens: parseTokens(el.getAttribute("data-tokens")).map((g) => ({
      role: g.role,
      items: g.items.map((item) =>
        resolveItem(el, item, isGraphicRole(g.role), elBg),
      ),
    })),
    box: {
      x: r.left - origin.left,
      y: r.top - origin.top,
      w: r.width,
      h: r.height,
    },
    size: { w: Math.round(r.width / scale), h: Math.round(r.height / scale) },
    contrast,
  };
}

function ratio(n: number) {
  return `${n.toFixed(2)}:1`;
}

function FindingRow({ f }: { f: Finding }) {
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 border-b border-border py-2.5 last:border-b-0">
      <span>{f.name}</span>
      <span className="text-muted tabular-nums">
        {f.size.w} × {f.size.h}
      </span>
      {f.tokens.length > 0 ? (
        <dl className="col-span-full m-0 grid gap-1">
          {f.tokens.map((g) => (
            <div
              key={g.role}
              className="grid grid-cols-[64px_minmax(0,1fr)] items-baseline gap-2"
            >
              <dt className="text-muted">{g.role}</dt>
              <dd className="m-0 flex flex-wrap gap-1">
                {g.items.map((item) => (
                  <span
                    key={item.label}
                    className={cn(
                      "inline-flex items-center gap-1.25 rounded-sm bg-raised px-1.5 py-0.75 text-xs leading-[1.2]",
                      item.contrast !== null &&
                        item.contrast < AA_GRAPHICS &&
                        "shadow-[inset_0_0_0_1px_var(--bad)]",
                    )}
                    title={
                      item.contrast !== null
                        ? `Contrast with the background; WCAG AA asks for at least ${AA_GRAPHICS}:1 for graphics`
                        : undefined
                    }
                  >
                    {item.swatch && (
                      <i
                        className="size-2.5 rounded-[2px] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--text)_25%,transparent)]"
                        style={{ background: item.swatch }}
                      />
                    )}
                    <code className="font-[inherit]">{item.label}</code>
                    {item.value && (
                      <span className="text-muted tabular-nums">
                        {item.value}
                      </span>
                    )}
                    {item.contrast !== null && (
                      <span className="text-muted tabular-nums">
                        {ratio(item.contrast)}
                      </span>
                    )}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <span className="col-span-full text-muted">No tokens</span>
      )}
      {f.contrast !== null && (
        <span
          className={cn(
            "col-span-full justify-self-start rounded-sm px-1.75 py-1.25 text-xs leading-none whitespace-nowrap tabular-nums",
            f.contrast >= AA_TEXT ? "bg-good/18" : "bg-bad/20",
          )}
          title={`WCAG AA asks for at least ${AA_TEXT}:1 for body text`}
        >
          Text contrast {ratio(f.contrast)} · WCAG AA{" "}
          {f.contrast >= AA_TEXT ? "pass" : "fail"}
        </span>
      )}
    </li>
  );
}

function intersects(a: Box, b: Box) {
  return (
    a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h
  );
}

export function Inspector({
  children,
  hint,
}: {
  children: ReactNode;
  hint?: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const crossX = useRef<HTMLDivElement>(null);
  const crossY = useRef<HTMLDivElement>(null);
  const coords = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; id: number } | null>(null);
  const hovered = useRef<Element | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState<Finding | null>(null);
  const [selection, setSelection] = useState<Box | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({
        w: Math.round(entry.contentRect.width),
        h: Math.round(entry.contentRect.height),
      });
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  const local = (e: { clientX: number; clientY: number }) => {
    const r = stageRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top, origin: r };
  };

  const moveCrosshair = (x: number, y: number, visible: boolean) => {
    if (crossX.current) {
      crossX.current.style.transform = `translateX(${x}px)`;
      crossX.current.style.opacity = visible ? "1" : "0";
    }
    if (crossY.current) {
      crossY.current.style.transform = `translateY(${y}px)`;
      crossY.current.style.opacity = visible ? "1" : "0";
    }
    if (coords.current) {
      const stageW = stageRef.current?.clientWidth ?? 0;
      const flip = x + 12 + coords.current.offsetWidth > stageW;
      const cx = flip ? x - 12 - coords.current.offsetWidth : x + 12;
      coords.current.style.transform = `translate(${cx}px, ${y + 12}px)`;
      coords.current.style.opacity = visible ? "1" : "0";
      coords.current.textContent = `X:${Math.round(x)}PX  Y:${Math.round(y)}PX`;
    }
  };

  const inspectAt = useCallback((clientX: number, clientY: number) => {
    const stage = stageRef.current;
    if (!stage) return null;
    const hit = document
      .elementFromPoint(clientX, clientY)
      ?.closest("[data-inspect]");
    if (!hit || !stage.contains(hit)) return null;
    return describe(hit, 0, stage.getBoundingClientRect());
  }, []);

  const onPointerMove = (e: React.PointerEvent) => {
    const { x, y } = local(e);
    moveCrosshair(x, y, true);
    if (drag.current) {
      const d = drag.current;
      setSelection({
        x: Math.min(d.x, x),
        y: Math.min(d.y, y),
        w: Math.abs(x - d.x),
        h: Math.abs(y - d.y),
      });
      return;
    }
    if (e.pointerType === "mouse") {
      // Measuring reads styles and layout, so only when the element changes.
      const hit = (e.target as Element).closest("[data-inspect]");
      if (hit === hovered.current) return;
      hovered.current = hit;
      setHover(
        hit && stageRef.current?.contains(hit)
          ? describe(hit, 0, stageRef.current.getBoundingClientRect())
          : null,
      );
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as Element).closest("button, a, input")) return;
    const { x, y } = local(e);
    drag.current = { x, y, id: e.pointerId };
    stageRef.current?.setPointerCapture(e.pointerId);
    setSelection({ x, y, w: 0, h: 0 });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    stageRef.current?.releasePointerCapture(d.id);
    const stage = stageRef.current!;
    const { x, y, origin } = local(e);
    const sel = {
      x: Math.min(d.x, x),
      y: Math.min(d.y, y),
      w: Math.abs(x - d.x),
      h: Math.abs(y - d.y),
    };
    setSelection(null);
    if (sel.w < 4 && sel.h < 4) {
      const f = inspectAt(e.clientX, e.clientY);
      setFindings(f ? [f] : []);
      return;
    }
    // Pick the innermost inspectable elements the selection touches, like a design tool does.
    const els = Array.from(stage.querySelectorAll("[data-inspect]"));
    const hits = els.filter((el) => {
      const r = el.getBoundingClientRect();
      return intersects(sel, {
        x: r.left - origin.left,
        y: r.top - origin.top,
        w: r.width,
        h: r.height,
      });
    });
    const leaves = hits.filter(
      (el) => !hits.some((other) => other !== el && el.contains(other)),
    );
    setFindings(
      leaves.slice(0, MAX_FINDINGS).map((el, i) => describe(el, i, origin)),
    );
  };

  const inspectAll = () => {
    const stage = stageRef.current;
    if (!stage) return;
    const origin = stage.getBoundingClientRect();
    setFindings(
      Array.from(stage.querySelectorAll("[data-inspect]"))
        .map((el, i) => describe(el, i, origin))
        .slice(0, MAX_FINDINGS),
    );
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFindings([]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ticksX = Array.from(
    { length: Math.floor(size.w / 100) + 1 },
    (_, i) => i * 100,
  );
  const ticksY = Array.from(
    { length: Math.floor(size.h / 100) + 1 },
    (_, i) => i * 100,
  );

  return (
    <div className="grid min-h-0 min-w-0 grid-rows-[minmax(0,1fr)_auto] gap-3">
      <div className="relative grid min-h-0 grid-cols-[24px_minmax(0,1fr)] grid-rows-[24px_minmax(0,1fr)] overflow-hidden rounded-lg border border-border bg-bg bg-[radial-gradient(circle,color-mix(in_srgb,var(--muted)_28%,transparent)_1px,transparent_1.2px)] bg-size-[16px_16px] max-[900px]:grid-cols-[16px_minmax(0,1fr)] max-[900px]:grid-rows-[16px_minmax(0,1fr)]">
        <div
          className="grid place-items-center border-r border-b border-border text-xs text-muted"
          aria-hidden="true"
        >
          +
        </div>
        <div
          className="relative overflow-hidden border-b border-border text-[10px] leading-none text-muted tabular-nums"
          style={RULER_X}
          aria-hidden="true"
        >
          {ticksX.map((t) => (
            <span
              key={t}
              className="absolute top-0.75 pl-0.75 max-[900px]:hidden"
              style={{ left: t }}
            >
              {t}
            </span>
          ))}
        </div>
        <div
          className="relative overflow-hidden border-r border-border text-[10px] leading-none text-muted tabular-nums"
          style={RULER_Y}
          aria-hidden="true"
        >
          {ticksY.map((t) => (
            <span
              key={t}
              className="absolute left-0.5 [transform:rotate(180deg)_translateY(-100%)] pt-0.75 [writing-mode:vertical-rl] max-[900px]:hidden"
              style={{ top: t }}
            >
              {t}
            </span>
          ))}
        </div>
        <div
          ref={stageRef}
          className="relative min-h-0 cursor-crosshair touch-none select-none [&_button]:cursor-pointer"
          onPointerMove={onPointerMove}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            drag.current = null;
            setSelection(null);
          }}
          onPointerLeave={() => {
            moveCrosshair(0, 0, false);
            hovered.current = null;
            setHover(null);
          }}
        >
          {children}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            {hover && findings.length === 0 && <Guides box={hover.box} />}
            {hover && findings.length === 0 && <Outline f={hover} />}
            {findings.map((f) => (
              <Outline key={f.id} f={f} />
            ))}
            {selection && (
              <div
                className="absolute border border-dashed border-accent bg-accent/12"
                style={{
                  left: selection.x,
                  top: selection.y,
                  width: selection.w,
                  height: selection.h,
                }}
              />
            )}
            <div
              ref={crossX}
              className="absolute top-0 bottom-0 left-0 w-px bg-accent/55 opacity-0"
            />
            <div
              ref={crossY}
              className="absolute top-0 right-0 left-0 h-px bg-accent/55 opacity-0"
            />
            <div
              ref={coords}
              className="absolute top-0 left-0 rounded-sm bg-accent px-1.5 py-0.75 text-[10px] leading-[1.3] whitespace-pre text-on-accent tabular-nums opacity-0"
            />
          </div>
        </div>
        {findings.length > 0 && (
          <ul
            className="absolute right-3 bottom-3 z-2 m-0 grid max-h-[45%] w-[min(460px,calc(100%-48px))] list-none overflow-auto rounded-md border border-border-strong bg-surface px-4 py-1 text-[13px] leading-[1.4] shadow-[0_12px_32px_-16px_color-mix(in_srgb,var(--text)_40%,transparent)]"
            aria-live="polite"
          >
            {findings.map((f) => (
              <FindingRow key={f.id} f={f} />
            ))}
          </ul>
        )}
      </div>

      <div className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-body-sm text-muted max-[900px]:hidden">
            {hint ??
              "Drag across the dashboard to inspect it, or click one element."}
          </p>
          <div className="flex gap-2">
            <Button size="small" onClick={inspectAll}>
              Inspect all
            </Button>
            {findings.length > 0 && (
              <Button size="small" onClick={() => setFindings([])}>
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Outline({ f }: { f: Finding }) {
  const { x, y, w, h } = f.box;
  const { w: dw, h: dh } = f.size;
  return (
    <div
      className="absolute border border-accent bg-accent/8"
      style={{ left: x, top: y, width: w, height: h }}
    >
      <span className="absolute bottom-full -left-px rounded-t-[3px] bg-accent px-1.25 py-0.75 text-[10px] leading-none whitespace-nowrap text-on-accent tabular-nums">
        {f.name} {dw}×{dh}
      </span>
    </div>
  );
}

function Guides({ box }: { box: Box }) {
  return (
    <>
      <div
        className="absolute top-0 bottom-0 border-0 border-l border-dashed border-accent opacity-70"
        style={{ left: box.x }}
      />
      <div
        className="absolute top-0 bottom-0 border-0 border-l border-dashed border-accent opacity-70"
        style={{ left: box.x + box.w }}
      />
      <div
        className="absolute right-0 left-0 border-0 border-t border-dashed border-accent opacity-70"
        style={{ top: box.y }}
      />
      <div
        className="absolute right-0 left-0 border-0 border-t border-dashed border-accent opacity-70"
        style={{ top: box.y + box.h }}
      />
    </>
  );
}
