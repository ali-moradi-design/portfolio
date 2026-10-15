"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, person } from "@/data/content";
import { PALETTES, PALETTE_LABELS, TOKENS, type Mode, type Palette } from "../_lib/tokens";
import { Pixels } from "./Pixels";

// Menu after heronaiapp.com: equal cells divided by rules, mono-style uppercase labels, a pixel
// dissolve on hover, a rolling label and the accent square that follows the cursor inside the cell.
const ITEMS = nav.filter((n) => n.href !== "#contact");

type ThemeProps = { palette: Palette; mode: Mode; onPalette: (p: Palette) => void; onMode: (m: Mode) => void };
/** Palette picker looks to compare: dots, split circles, pixel tiles, stripes. */
export type SwatchStyle = "s1" | "s2" | "s3" | "s4";

export function HeroNav({ swatchStyle, ...theme }: ThemeProps & { swatchStyle: SwatchStyle }) {
  const [open, setOpen] = useState(false);

  const track = (e: React.PointerEvent<HTMLElement>) => {
    const cell = (e.target as Element).closest<HTMLElement>(".hnav-cell");
    if (!cell) return;
    const r = cell.getBoundingClientRect();
    cell.style.setProperty("--mx", `${e.clientX - r.left}px`);
    cell.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <header className="hnav" onPointerMove={track}>
      <div className="hnav-left">
        <Link href="/" className="hnav-brand">
          <span className="hnav-mark" aria-hidden="true">
            {person.initials}
          </span>
          <span>{person.name}</span>
        </Link>
      </div>

      <nav aria-label="Primary" className={`hnav-menu${open ? " is-open" : ""}`}>
        <ul>
          {ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={`/${item.href}`} className="hnav-cell px" onClick={() => setOpen(false)}>
                <Pixels />
                <Label text={item.label} />
                <span className="hnav-corner" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button type="button" className="hnav-cell hnav-burger px" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <Pixels />
        <Label text={open ? "Close" : "Menu"} />
      </button>

      <Link href="/#contact" className="hnav-cell hnav-cta px">
        <Pixels />
        <Label text="Contact" />
        <span className="hnav-arrow" aria-hidden="true">
          →
        </span>
      </Link>
      <ThemeTools {...theme} swatchStyle={swatchStyle} />
    </header>
  );
}

function Label({ text }: { text: string }) {
  return (
    <span className="roll">
      <span>{text}</span>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}

function ThemeTools({ palette, mode, onPalette, onMode, swatchStyle }: ThemeProps & { swatchStyle: SwatchStyle }) {
  return (
    <div className="hnav-tools">
      <div className={`hnav-swatches ${swatchStyle}`} role="radiogroup" aria-label="Color theme">
        {PALETTES.map((p) => {
          const t = TOKENS[p][mode];
          return (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={p === palette}
              aria-label={`${PALETTE_LABELS[p]} theme`}
              className="sw"
              style={{ "--sw-bg": t.bg, "--sw-accent": t.accent, "--sw-second": t["chart-2"], "--sw-text": t.text } as React.CSSProperties}
              onClick={() => onPalette(p)}
            >
              <span className="sw-a" />
              <span className="sw-b" />
              <span className="sw-c" />
              <span className="sw-d" />
            </button>
          );
        })}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={mode === "dark"}
        aria-label="Dark mode"
        className="dn"
        onClick={() => onMode(mode === "dark" ? "light" : "dark")}
      >
        <span className="dn-stars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="dn-cloud" aria-hidden="true" />
        <span className="dn-knob" aria-hidden="true" />
      </button>
    </div>
  );
}
