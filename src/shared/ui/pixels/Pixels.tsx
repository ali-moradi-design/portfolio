"use client";

import { useEffect, useRef, useState } from "react";

// Pixel dissolve fill for buttons and menu cells (after heronaiapp.com): a grid
// of squares that switch on one by one, left to right with some noise, when the
// host is hovered or focused; then the label switches to the ink color. The host
// gets `pixelHost` and sets --px-fill and --px-ink. Delays are deterministic so
// server and client markup match.
//
// The squares are added on the host's first hover or focus, not with the page:
// every button and menu cell has 64 to 78 of them, about half of all the nodes
// on the home page. @starting-style (`starting:`) lets the first dissolve run
// from transparent, as later ones do.

function noise(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const cache = new Map<string, number[]>();
function delays(cols: number, rows: number) {
  const key = `${cols}x${rows}`;
  if (!cache.has(key)) {
    // About 0.4 s from the first to the last square.
    const step = 240 / cols;
    cache.set(
      key,
      Array.from({ length: cols * rows }, (_, i) =>
        Math.round((i % cols) * step + noise(i) * 160),
      ),
    );
  }
  return cache.get(key)!;
}

/** Squares of about 9 px: buttons use 16 x 4, menu cells 13 x 6. */
export function Pixels({
  cols = 12,
  rows = 4,
}: {
  cols?: number;
  rows?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (on || !host) return;
    const wake = () => setOn(true);
    host.addEventListener("pointerenter", wake);
    host.addEventListener("focusin", wake);
    return () => {
      host.removeEventListener("pointerenter", wake);
      host.removeEventListener("focusin", wake);
    };
  }, [on]);

  return (
    <span
      ref={ref}
      className="pointer-events-none absolute inset-0 -z-10 grid auto-rows-fr"
      aria-hidden="true"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {on &&
        delays(cols, rows).map((d, i) => (
          <i
            key={i}
            className="bg-(--px-fill) opacity-0 group-hover/px:opacity-100 group-focus-visible/px:opacity-100 group-aria-expanded/px:opacity-100 starting:opacity-0!"
            style={{ transitionDelay: `${d}ms` }}
          />
        ))}
    </span>
  );
}
