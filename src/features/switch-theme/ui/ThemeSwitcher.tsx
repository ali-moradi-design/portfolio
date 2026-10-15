"use client";

import type { CSSProperties } from "react";
import { PALETTES, PALETTE_LABELS, TOKENS } from "@/shared/config";
import { useTheme } from "@/shared/lib/theme";

const morph = "duration-320 ease-emph";

/** Palette picker (one square per palette in its accent) and a sun that turns into a moon. */
export function ThemeSwitcher() {
  const { palette, mode, setPalette, setMode } = useTheme();
  const dark = mode === "dark";
  return (
    <div className="flex items-center gap-3 max-[560px]:gap-2">
      <div
        className="flex items-center gap-2.25"
        role="radiogroup"
        aria-label="Color theme"
      >
        {PALETTES.map((p) => (
          <button
            key={p}
            type="button"
            role="radio"
            aria-checked={p === palette}
            aria-label={`${PALETTE_LABELS[p]} theme`}
            className="relative size-3.5 cursor-pointer bg-(--sw) p-0 before:absolute before:-inset-1 before:border before:border-transparent before:content-[''] hover:before:border-border-strong focus-visible:outline-offset-5 aria-checked:before:border-text"
            style={{ "--sw": TOKENS[p][mode].accent } as CSSProperties}
            onClick={() => setPalette(p)}
          />
        ))}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={dark}
        aria-label="Dark mode"
        className="group/mode ml-1 size-7.5 cursor-pointer p-0.75 text-text"
        onClick={() => setMode(dark ? "light" : "dark")}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`size-full overflow-visible transition-transform group-aria-checked/mode:-rotate-30 ${morph}`}
        >
          <mask id="mode-moon-mask">
            <rect width="24" height="24" fill="#fff" />
            <circle
              className={`transition-[cx,cy] group-aria-checked/mode:[cx:16.5px] group-aria-checked/mode:[cy:8.5px] ${morph}`}
              cx="24"
              cy="4"
              r="7"
              fill="#000"
            />
          </mask>
          <circle
            className={`fill-current transition-[r] group-aria-checked/mode:[r:8px] ${morph}`}
            cx="12"
            cy="12"
            r="5"
            mask="url(#mode-moon-mask)"
          />
          <g>
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i * Math.PI) / 4;
              return (
                <line
                  key={i}
                  className={`origin-[12px_12px] stroke-current stroke-[1.6] transition-[scale,opacity] group-aria-checked/mode:scale-40 group-aria-checked/mode:opacity-0 ${morph}`}
                  strokeLinecap="round"
                  x1={12 + Math.cos(a) * 8}
                  y1={12 + Math.sin(a) * 8}
                  x2={12 + Math.cos(a) * 10}
                  y2={12 + Math.sin(a) * 10}
                />
              );
            })}
          </g>
        </svg>
      </button>
    </div>
  );
}
