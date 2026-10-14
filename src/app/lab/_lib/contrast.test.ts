import { describe, expect, it } from "vitest";
import { contrastRatio, parseColor } from "./contrast";
import { PALETTES, TOKENS } from "./tokens";

describe("contrast", () => {
  it("parses hex and rgb colors", () => {
    expect(parseColor("#FF0000")).toEqual({ r: 255, g: 0, b: 0 });
    expect(parseColor("rgb(1, 2, 3)")).toEqual({ r: 1, g: 2, b: 3 });
    expect(parseColor("rgba(0, 0, 0, 0)")).toBeNull();
  });

  it("gives 21:1 for black on white", () => {
    expect(contrastRatio({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 })).toBeCloseTo(21, 5);
  });
});

describe("palette tokens", () => {
  const ratio = (a: string, b: string) => contrastRatio(parseColor(a)!, parseColor(b)!);

  for (const palette of PALETTES) {
    for (const mode of ["light", "dark"] as const) {
      const t = TOKENS[palette][mode];
      it(`${palette} ${mode} passes WCAG AA`, () => {
        for (const name of ["text", "muted", "accent", "second"] as const) {
          expect(ratio(t[name], t.bg)).toBeGreaterThanOrEqual(4.5);
        }
        expect(ratio(t.muted, t.raised)).toBeGreaterThanOrEqual(4.5);
        expect(ratio(t["on-accent"], t.accent)).toBeGreaterThanOrEqual(4.5);
        for (const name of ["border-strong", "chart-1", "chart-2", "chart-3"] as const) {
          expect(ratio(t[name], t.bg)).toBeGreaterThanOrEqual(3);
        }
      });
    }
  }
});
