"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, person } from "@/data/content";
import { PALETTES, PALETTE_LABELS, TOKENS, type Mode, type Palette } from "../_lib/tokens";
import { Pixels } from "./Pixels";

// Menu after heronaiapp.com: equal cells divided by rules, mono-style uppercase labels, a pixel
// dissolve on hover, a rolling label and the accent square that follows the cursor inside the cell.
const ITEMS = nav.filter((n) => n.href !== "#contact");

export function HeroNav({
  palette,
  mode,
  onPalette,
  onMode,
}: {
  palette: Palette;
  mode: Mode;
  onPalette: (p: Palette) => void;
  onMode: (m: Mode) => void;
}) {
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
      <Link href="/" className="hnav-brand">
        <span className="hnav-mark" aria-hidden="true">
          {person.initials}
        </span>
        <span>{person.name}</span>
      </Link>

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

      <div className="hnav-tools">
        <div className="hnav-swatches" role="radiogroup" aria-label="Color theme">
          {PALETTES.map((p) => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={p === palette}
              aria-label={`${PALETTE_LABELS[p]} theme`}
              className="hnav-swatch"
              style={{ background: TOKENS[p][mode].accent }}
              onClick={() => onPalette(p)}
            />
          ))}
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={mode === "dark"}
          aria-label="Dark mode"
          className="hnav-toggle"
          onClick={() => onMode(mode === "dark" ? "light" : "dark")}
        >
          <span className="hnav-knob" />
        </button>
      </div>

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
