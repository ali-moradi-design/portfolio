import { describe, expect, it } from "vitest";
import { applyFilters, facets, filtersToQuery, parseFilters } from "./filters";
import type { Project } from "./types";
import { visibleProjects } from "./visible";

const p = (slug: string, extra: Partial<Project>): Project => ({
  slug,
  title: slug,
  summary: "",
  description: "",
  type: "dashboard",
  tech: [],
  year: 2025,
  ...extra,
});

const list = [
  p("a", { type: "dashboard", tech: ["React", "Zod"] }),
  p("b", { type: "website", tech: ["React"], year: 2026 }),
  p("c", { type: "dashboard", tech: ["Vue"], placeholder: true }),
];

describe("project filters", () => {
  it("parses known values only", () => {
    const params = new URLSearchParams(
      "type=dashboard&tech=React&tech=React&tech=Nope",
    );
    expect(parseFilters(params, list)).toEqual({
      type: "dashboard",
      tech: ["React"],
    });
    expect(parseFilters(new URLSearchParams("type=x"), list).type).toBeNull();
  });

  it("round-trips through the query string", () => {
    const filters = { type: "website" as const, tech: ["React", "Zod"] };
    const query = filtersToQuery(filters);
    expect(query).toBe("?type=website&tech=React&tech=Zod");
    expect(parseFilters(new URLSearchParams(query), list)).toEqual(filters);
    expect(filtersToQuery({ type: null, tech: [] })).toBe("");
  });

  it("matches the type and every picked tech", () => {
    const slugs = (f: Parameters<typeof applyFilters>[1]) =>
      applyFilters(list, f).map((x) => x.slug);
    expect(slugs({ type: null, tech: ["React"] })).toEqual(["a", "b"]);
    expect(slugs({ type: "dashboard", tech: ["React", "Zod"] })).toEqual(["a"]);
    expect(slugs({ type: "tool", tech: [] })).toEqual([]);
  });

  it("counts the options", () => {
    expect(facets(list).tech[0]).toEqual(["React", 2]);
  });
});

describe("visibleProjects", () => {
  it("hides placeholders in production and sorts newest first", () => {
    const prod = visibleProjects(list, { NODE_ENV: "production" });
    expect(prod.map((x) => x.slug)).toEqual(["b", "a"]);
    const ci = visibleProjects(list, {
      NODE_ENV: "production",
      SHOW_SAMPLE_PROJECTS: "1",
    });
    expect(ci).toHaveLength(3);
  });
});
