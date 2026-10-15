// Pixel dissolve fill for buttons and menu cells (after heronaiapp.com): a grid
// of squares that switch on one by one, left to right with some noise, when the
// host is hovered or focused; then the label switches to the ink color. The host
// gets `pixelHost` and sets --px-fill and --px-ink. Delays are deterministic so
// server and client markup match.

/** Classes for the element that holds <Pixels />. */
export const pixelHost =
  "group/px relative isolate overflow-hidden [--px-fill:var(--text)] [--px-ink:var(--bg)]";
/** Classes for the host's label: it changes color once the squares are in. */
export const pixelLabel =
  "transition-colors delay-190 duration-0 group-hover/px:text-(--px-ink) group-focus-visible/px:text-(--px-ink)";

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
  return (
    <span
      className="pointer-events-none absolute inset-0 -z-10 grid auto-rows-fr"
      aria-hidden="true"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {delays(cols, rows).map((d, i) => (
        <i
          key={i}
          className="bg-(--px-fill) opacity-0 group-hover/px:opacity-100 group-focus-visible/px:opacity-100 group-aria-expanded/px:opacity-100"
          style={{ transitionDelay: `${d}ms` }}
        />
      ))}
    </span>
  );
}

/** A label that rolls up on hover, a copy coming in from below (menu cells). */
export function RollLabel({ text }: { text: string }) {
  const part =
    "transition-transform duration-320 ease-out-soft group-hover/px:-translate-y-full group-focus-visible/px:-translate-y-full";
  return (
    <span
      className={`relative inline-grid h-[1.25em] overflow-hidden leading-[1.25] ${pixelLabel}`}
    >
      <span className={part}>{text}</span>
      <span aria-hidden="true" className={`absolute top-full left-0 ${part}`}>
        {text}
      </span>
    </span>
  );
}
