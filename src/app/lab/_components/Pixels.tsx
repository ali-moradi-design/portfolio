// Pixel dissolve fill for buttons and menu cells (after heronaiapp.com): a grid of squares that
// switch on one by one, left to right with some noise, when the parent is hovered or focused.
// The parent needs the `px` class. Delays are deterministic so server and client markup match.

function noise(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const cache = new Map<string, number[]>();
function delays(cols: number, rows: number) {
  const key = `${cols}x${rows}`;
  if (!cache.has(key)) {
    const step = 168 / cols;
    cache.set(key, Array.from({ length: cols * rows }, (_, i) => Math.round((i % cols) * step + noise(i) * 110)));
  }
  return cache.get(key)!;
}

/** Squares of about 6 px: buttons use 24 x 6, menu cells 20 x 9. */
export function Pixels({ cols = 12, rows = 4 }: { cols?: number; rows?: number }) {
  return (
    <span className="px-grid" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {delays(cols, rows).map((d, i) => (
        <i key={i} style={{ transitionDelay: `${d}ms` }} />
      ))}
    </span>
  );
}
