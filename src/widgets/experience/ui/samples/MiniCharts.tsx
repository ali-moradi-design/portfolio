import { linePath } from "../../lib/series";

/** Bars in the first chart color; height follows the box. */
export function MiniBars({ values }: { values: readonly number[] }) {
  const max = Math.max(...values);
  return (
    <div className="flex h-full items-end gap-[3px]" aria-hidden="true">
      {values.map((v, i) => (
        <span
          key={i}
          className="flex-1 rounded-t-[2px] bg-chart-1"
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

/** A line with a soft area under it. */
export function MiniLine({ values }: { values: readonly number[] }) {
  const d = linePath(values, 200, 60);
  return (
    <svg
      viewBox="0 0 200 60"
      preserveAspectRatio="none"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <path d={`${d} L200 60 L0 60 Z`} className="fill-chart-2/20" />
      <path
        d={d}
        className="fill-none stroke-chart-1"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
