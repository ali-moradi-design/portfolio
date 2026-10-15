// Runs the standalone build (.next/standalone/server.js) after `pnpm build`.
// server.js does not include public/ and .next/static/ (a CDN should serve
// them), so copy them next to it first. Node APIs keep it cross-platform.
import { spawn } from "node:child_process";
import { cpSync, existsSync } from "node:fs";

const standalone = ".next/standalone";

if (!existsSync(`${standalone}/server.js`)) {
  console.error('No standalone build found. Run "pnpm build" first.');
  process.exit(1);
}

cpSync("public", `${standalone}/public`, { recursive: true });
cpSync(".next/static", `${standalone}/.next/static`, { recursive: true });

// PORT, HOSTNAME and your own variables are passed through process.env.
spawn(process.execPath, [`${standalone}/server.js`], { stdio: "inherit" });
