"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, person } from "@/data/content";
import { PALETTES, PALETTE_LABELS, TOKENS, type Mode, type Palette } from "../_lib/tokens";
import { Logo } from "./Logo";
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
          <Logo />
          <span>{person.name}</span>
        </Link>
      </div>

      <nav aria-label="Primary" className={`hnav-menu${open ? " is-open" : ""}`}>
        <ul>
          {ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={`/${item.href}`} className="hnav-cell px" onClick={() => setOpen(false)}>
                <Pixels cols={13} rows={6} />
                <Label text={item.label} />
                <span className="hnav-corner" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button type="button" className="hnav-cell hnav-burger px" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <Pixels cols={13} rows={6} />
        <Label text={open ? "Close" : "Menu"} />
      </button>

      <Link href="/#contact" className="hnav-cell hnav-cta px">
        <Pixels cols={13} rows={6} />
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

function ThemeTools({ palette, mode, onPalette, onMode }: ThemeProps) {
  const dark = mode === "dark";
  const toggle = () => onMode(dark ? "light" : "dark");
  return (
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
          />
        ))}
      </div>
      <button type="button" role="switch" aria-checked={dark} aria-label="Dark mode" className="mode-icon" onClick={toggle}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <mask id="mode-moon-mask">
            <rect width="24" height="24" fill="#fff" />
            <circle className="mode-icon-bite" cx="24" cy="4" r="7" fill="#000" />
          </mask>
          <circle className="mode-icon-body" cx="12" cy="12" r="5" mask="url(#mode-moon-mask)" />
          <g className="mode-icon-rays">
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
