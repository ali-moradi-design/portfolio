import { describe, expect, it } from "vitest";
import { contrastRatio, parseColor } from "@/shared/lib/contrast";
import { PALETTES, TOKENS } from "./tokens";

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
