import { projects } from "./projects";
import type { Project } from "./types";

/**
 * Projects to show. Placeholders appear in development, and in builds made
 * with SHOW_SAMPLE_PROJECTS=1 (the CI build that the E2E tests run against).
 */
export function visibleProjects(
  list: readonly Project[] = projects,
  env: Record<string, string | undefined> = process.env,
): Project[] {
  const samples =
    env.NODE_ENV === "development" || env.SHOW_SAMPLE_PROJECTS === "1";
  return list
    .filter((p) => samples || !p.placeholder)
    .toSorted((a, b) => b.year - a.year);
}

/** How many projects the home page shows. */
export const FEATURED_MAX = 6;

export const featuredProjects = (list = visibleProjects()) =>
  list.filter((p) => p.featured).slice(0, FEATURED_MAX);
