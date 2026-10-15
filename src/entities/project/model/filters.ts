import { PROJECT_TYPES, type Project, type ProjectType } from "./types";

export const SORTS = {
  newest: "Newest first",
  oldest: "Oldest first",
  title: "Title A–Z",
} as const;
export type Sort = keyof typeof SORTS;

export type ProjectFilters = {
  type: ProjectType | null;
  tech: string[];
  /** Free text, matched against title, summary, tech and tags. */
  q: string;
  sort: Sort;
};

export const NO_FILTERS: ProjectFilters = {
  type: null,
  tech: [],
  q: "",
  sort: "newest",
};

const isType = (v: string | null): v is ProjectType =>
  v !== null && v in PROJECT_TYPES;
const isSort = (v: string | null): v is Sort => v !== null && v in SORTS;

/** Reads ?type=…&tech=…&tech=…&q=…&sort=…; unknown values are dropped. */
export function parseFilters(
  params: URLSearchParams,
  projects: readonly Project[],
): ProjectFilters {
  const known = new Set(projects.flatMap((p) => p.tech));
  const type = params.get("type");
  const sort = params.get("sort");
  return {
    type: isType(type) ? type : null,
    tech: [...new Set(params.getAll("tech"))].filter((t) => known.has(t)),
    q: (params.get("q") ?? "").slice(0, 80),
    sort: isSort(sort) ? sort : "newest",
  };
}

export function filtersToQuery({
  type,
  tech,
  q,
  sort,
}: ProjectFilters): string {
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  for (const t of tech) params.append("tech", t);
  if (q.trim()) params.set("q", q);
  if (sort !== "newest") params.set("sort", sort);
  const query = params.toString();
  return query ? `?${query}` : "";
}

export const isFiltered = (f: ProjectFilters) =>
  f.type !== null || f.tech.length > 0 || f.q.trim() !== "";

const haystack = (p: Project) =>
  [p.title, p.summary, PROJECT_TYPES[p.type], ...p.tech, ...(p.tags ?? [])]
    .join(" ")
    .toLowerCase();

/** A project matches its type, every picked tech and every search word. */
export function applyFilters(
  projects: readonly Project[],
  { type, tech, q, sort }: ProjectFilters,
): Project[] {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const matched = projects.filter(
    (p) =>
      (!type || p.type === type) &&
      tech.every((t) => p.tech.includes(t)) &&
      words.every((w) => haystack(p).includes(w)),
  );
  const order: Record<Sort, (a: Project, b: Project) => number> = {
    newest: (a, b) => b.year - a.year,
    oldest: (a, b) => a.year - b.year,
    title: (a, b) => a.title.localeCompare(b.title),
  };
  return matched.toSorted(order[sort]);
}

/** Filter options with how many projects each would show. */
export function facets(projects: readonly Project[]) {
  const count = (values: string[]) => {
    const map = new Map<string, number>();
    for (const v of values) map.set(v, (map.get(v) ?? 0) + 1);
    return [...map].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  };
  return {
    types: count(projects.map((p) => p.type)) as [ProjectType, number][],
    tech: count(projects.flatMap((p) => [...p.tech])),
  };
}
