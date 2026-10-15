"use client";

import type { CSSProperties } from "react";
import { PALETTES, PALETTE_LABELS, TOKENS } from "@/shared/config";
import { useTheme } from "@/shared/lib/theme";
import styles from "./ThemeSwitcher.module.css";

/** Palette picker (one square per palette in its accent color) and a sun that turns into a moon. */
export function ThemeSwitcher() {
  const { palette, mode, setPalette, setMode } = useTheme();
  const dark = mode === "dark";
  return (
    <div className={styles.root}>
      <div className={styles.swatches} role="radiogroup" aria-label="Color theme">
        {PALETTES.map((p) => (
          <button
            key={p}
            type="button"
            role="radio"
            aria-checked={p === palette}
            aria-label={`${PALETTE_LABELS[p]} theme`}
            className={styles.swatch}
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
        className={styles.mode}
        onClick={() => setMode(dark ? "light" : "dark")}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <mask id="mode-moon-mask">
            <rect width="24" height="24" fill="#fff" />
            <circle className={styles.bite} cx="24" cy="4" r="7" fill="#000" />
          </mask>
          <circle className={styles.body} cx="12" cy="12" r="5" mask="url(#mode-moon-mask)" />
          <g className={styles.rays}>
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i * Math.PI) / 4;
              return <line key={i} x1={12 + Math.cos(a) * 8} y1={12 + Math.sin(a) * 8} x2={12 + Math.cos(a) * 10} y2={12 + Math.sin(a) * 10} />;
            })}
          </g>
        </svg>
      </button>
    </div>
  );
}
