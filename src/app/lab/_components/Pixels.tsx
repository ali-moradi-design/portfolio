// Pixel dissolve fill for buttons and menu cells (after heronaiapp.com): a grid of squares that
// switch on one by one, left to right with some noise, when the parent is hovered or focused.
// The parent needs the `px` class. Delays are deterministic so server and client markup match.

const COLS = 12;
const ROWS = 4;

function noise(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS;
  return Math.round(col * 14 + noise(i) * 110);
});

export function Pixels() {
  return (
    <span className="px-grid" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
      {CELLS.map((d, i) => (
        <i key={i} style={{ transitionDelay: `${d}ms` }} />
      ))}
    </span>
  );
}
