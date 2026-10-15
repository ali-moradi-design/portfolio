import { describe, expect, it } from "vitest";
import { LOGO_BRACKETS, LOGO_LETTERS, logoSvg } from "./logo";

describe("logoSvg", () => {
  it("draws the letters and the brackets in the given colors", () => {
    const svg = logoSvg({ text: "#111111", accent: "#222222", scale: 2 });
    expect(svg).toContain(`d="${LOGO_LETTERS}"`);
    expect(svg).toContain(`d="${LOGO_BRACKETS}"`);
    expect(svg).toContain('stroke="#111111"');
    expect(svg).toContain('stroke="#222222"');
    expect(svg).toContain('width="108" height="80"');
  });
});
