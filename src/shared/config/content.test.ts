import { describe, expect, it } from "vitest";
import { nav, projects } from "./content";

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

describe("projects", () => {
  it("features exactly four projects, each with its own sample", () => {
    const samples = projects.flatMap((p) => (p.sample ? [p.sample] : []));
    expect(samples).toHaveLength(4);
    expect(new Set(samples).size).toBe(4);
  });

  it("has unique ids", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
