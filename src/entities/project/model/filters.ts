import { PROJECT_TYPES, type Project, type ProjectType } from "./types";

export type ProjectFilters = { type: ProjectType | null; tech: string[] };

const isType = (v: string | null): v is ProjectType =>
  v !== null && v in PROJECT_TYPES;

/** Reads ?type=dashboard&tech=React&tech=Zod. Unknown values are dropped. */
export function parseFilters(
  params: URLSearchParams,
  projects: readonly Project[],
): ProjectFilters {
  const known = new Set(projects.flatMap((p) => p.tech));
  const type = params.get("type");
  return {
    type: isType(type) ? type : null,
    tech: [...new Set(params.getAll("tech"))].filter((t) => known.has(t)),
  };
}

export function filtersToQuery({ type, tech }: ProjectFilters): string {
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  for (const t of tech) params.append("tech", t);
  const query = params.toString();
  return query ? `?${query}` : "";
}

/** A project matches its type and every picked tech. */
export function applyFilters(
  projects: readonly Project[],
  { type, tech }: ProjectFilters,
): Project[] {
  return projects.filter(
    (p) => (!type || p.type === type) && tech.every((t) => p.tech.includes(t)),
  );
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
