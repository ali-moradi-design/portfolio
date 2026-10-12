import { describe, expect, it } from "vitest";
import { nav } from "./content";

describe("nav", () => {
  it("links only to in-page sections", () => {
    for (const item of nav) {
      expect(item.href).toMatch(/^#[a-z]+$/);
    }
  });

  it("has no duplicate links", () => {
    const hrefs = nav.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});
