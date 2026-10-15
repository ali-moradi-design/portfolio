import { describe, expect, it } from "vitest";
import { experience, nav, workSamples } from "./content";

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

describe("workSamples", () => {
  it("has one entry per sample, each on a known role", () => {
    const samples = workSamples.map((w) => w.sample);
    expect(new Set(samples).size).toBe(samples.length);
    const roles = new Set(experience.map((r) => r.id));
    for (const w of workSamples) expect(roles.has(w.roleId)).toBe(true);
  });
});
