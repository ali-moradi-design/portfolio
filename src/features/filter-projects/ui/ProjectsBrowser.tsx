"use client";

import type { Project } from "@/entities/project";
import { useProjectFilters } from "../model/useProjectFilters";
import { ProjectFilters } from "./ProjectFilters";

/** Filters and the project grid; the filters live in the URL query. */
export function ProjectsBrowser({
  projects,
}: {
  projects: readonly Project[];
}) {
  return <ProjectFilters s={useProjectFilters(projects)} />;
}
