import { describe, expect, it } from "vitest";
import { contrastRatio, parseColor } from "./contrast";

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
