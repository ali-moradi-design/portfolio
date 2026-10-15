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
export function HeroNav(theme: ThemeProps) {
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
                <Pixels cols={20} rows={9} />
                <Label text={item.label} />
                <span className="hnav-corner" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button type="button" className="hnav-cell hnav-burger px" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <Pixels cols={20} rows={9} />
        <Label text={open ? "Close" : "Menu"} />
      </button>

      <Link href="/#contact" className="hnav-cell hnav-cta px">
        <Pixels cols={20} rows={9} />
        <Label text="Contact" />
        <span className="hnav-arrow" aria-hidden="true">
          →
        </span>
      </Link>
      <ThemeTools {...theme} />
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

// 9 x 9 pixel-art icons for the mode cell, in the same pixel language as the hover dissolve.
const SUN = ["....#....", ".#.....#.", "...###...", "..#####..", "#.#####.#", "..#####..", "...###...", ".#.....#.", "....#...."];
const MOON = ["...###...", "..##.....", ".##......", ".##......", ".##......", ".###...#.", "..######.", "...####..", "........."];

function PixelIcon({ rows }: { rows: string[] }) {
  return (
    <svg className="pxicon" viewBox="0 0 9 9" aria-hidden="true" shapeRendering="crispEdges">
      {rows.flatMap((row, y) => [...row].map((c, x) => (c === "#" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null)))}
    </svg>
  );
}

function ThemeTools({ palette, mode, onPalette, onMode }: ThemeProps) {
  return (
    <>
      <div className="hnav-tools">
        <div className="hnav-swatches" role="radiogroup" aria-label="Color theme">
          {PALETTES.map((p) => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={p === palette}
              aria-label={`${PALETTE_LABELS[p]} theme`}
              className="sw"
              style={{ "--sw": TOKENS[p][mode].accent } as React.CSSProperties}
              onClick={() => onPalette(p)}
            >
              {Array.from({ length: 9 }, (_, i) => (
                <i key={i} />
              ))}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={mode === "dark"}
        aria-label="Dark mode"
        className="hnav-cell hnav-mode px"
        onClick={() => onMode(mode === "dark" ? "light" : "dark")}
      >
        <Pixels cols={20} rows={9} />
        <Label text={mode === "dark" ? "Dark" : "Light"} />
        <PixelIcon rows={mode === "dark" ? MOON : SUN} />
      </button>
    </>
  );
}
