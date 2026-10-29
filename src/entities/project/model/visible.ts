import { projects } from "./projects";
import type { Project } from "./types";

/** Projects newest first; within a year, in the order of the list. */
export function visibleProjects(
  list: readonly Project[] = projects,
): Project[] {
  return list.toSorted((a, b) => b.year - a.year);
}

/** How many projects the home page shows. */
export const FEATURED_MAX = 4;

/** False while the list is empty. */
export const hasProjects = () => visibleProjects().length > 0;

export const featuredProjects = (list = visibleProjects()) =>
  list.filter((p) => p.featured).slice(0, FEATURED_MAX);
