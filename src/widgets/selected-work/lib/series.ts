// Deterministic sample numbers, so server and client render the same markup.

export function series(length: number, seed: number, base = 50, amp = 30) {
  return Array.from({ length }, (_, i) =>
    Math.max(
      2,
      Math.round(
        base +
          amp * Math.sin(i / 1.9 + seed) +
          amp * 0.4 * Math.sin(i * 1.3 + seed * 2.7),
      ),
    ),
  );
}

/** SVG path through the points, scaled to a width x height box. */
export function linePath(
  values: readonly number[],
  width: number,
  height: number,
) {
  const max = Math.max(...values);
  const step = width / Math.max(1, values.length - 1);
  return values
    .map((v, i) => {
      const x = i * step;
      const y = height - (v / max) * (height - 2) - 1;
      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}
