import { describe, expect, it } from "vitest";
import { linePath, series } from "./series";

describe("series", () => {
  it("is deterministic and positive", () => {
    expect(series(8, 1)).toEqual(series(8, 1));
    expect(Math.min(...series(30, 2, 10, 30))).toBeGreaterThanOrEqual(2);
  });
});

describe("linePath", () => {
  it("starts at the left edge and ends at the right edge", () => {
    const d = linePath([1, 2, 4], 100, 50);
    expect(d.startsWith("M0.0 ")).toBe(true);
    expect(d).toContain("L100.0 1.0");
  });
});
