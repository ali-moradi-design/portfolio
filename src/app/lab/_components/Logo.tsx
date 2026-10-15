// Logo candidates for Ali Moradi, to compare in the lab (?logo=1..3). All use currentColor for the
// letters and the accent color for one detail, so they follow every palette and mode.

export type LogoStyle = "1" | "2" | "3";

/** 1: "AM" set on a 5-row pixel grid, the apex of the A in the accent color. */
const PIXEL_AM = [".#..#...#", "#.#.##.##", "###.#.#.#", "#.#.#...#", "#.#.#...#"];

function PixelLogo() {
  return (
    <svg viewBox="0 0 9 5" className="logo logo-pixel" aria-hidden="true" shapeRendering="crispEdges">
      {PIXEL_AM.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "#" ? <rect key={`${x}-${y}`} x={x + 0.08} y={y + 0.08} width="0.84" height="0.84" className={x === 1 && y === 0 ? "logo-accent" : undefined} /> : null,
        ),
      )}
    </svg>
  );
}

/** 2: lowercase "am" inside a selection frame with four handles, like a selected layer. */
function SelectionLogo() {
  return (
    <span className="logo logo-select" aria-hidden="true">
      <span className="logo-select-text">am</span>
      <i className="tl" />
      <i className="tr" />
      <i className="bl" />
      <i className="br" />
    </span>
  );
}

/** 3: "AM" drawn as one line chart with data points; the peak of the A is the accent point. */
const CHART_POINTS: [number, number][] = [[2, 21], [8.5, 4], [15, 21], [19, 21], [19, 4], [24.5, 14], [30, 4], [30, 21]];

function ChartLogo() {
  const [a, b, c, ...m] = CHART_POINTS;
  const line = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  return (
    <svg viewBox="0 0 32 24" className="logo logo-chart" aria-hidden="true">
      <path d={`${line([a, b, c])} ${line(m)}`} />
      {CHART_POINTS.filter((p) => p !== b).map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" />
      ))}
      <circle cx={b[0]} cy={b[1]} r="2.4" className="logo-accent" />
    </svg>
  );
}

export function Logo({ style }: { style: LogoStyle }) {
  if (style === "2") return <SelectionLogo />;
  if (style === "3") return <ChartLogo />;
  return <PixelLogo />;
}
