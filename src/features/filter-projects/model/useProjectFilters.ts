"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  applyFilters,
  facets,
  filtersToQuery,
  isFiltered,
  NO_FILTERS,
  parseFilters,
  type Project,
  type ProjectFilters,
} from "@/entities/project";

/**
 * Filter state kept in the URL query, so a filtered view can be shared and
 * survives a reload. Every filter design reads and writes it the same way.
 */
export function useProjectFilters(projects: readonly Project[]) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const filters = parseFilters(
    new URLSearchParams(params.toString()),
    projects,
  );

  const set = (patch: Partial<ProjectFilters>) =>
    router.replace(`${pathname}${filtersToQuery({ ...filters, ...patch })}`, {
      scroll: false,
    });

  const toggleTech = (t: string) =>
    set({
      tech: filters.tech.includes(t)
        ? filters.tech.filter((x) => x !== t)
        : [...filters.tech, t],
    });

  return {
    filters,
    shown: applyFilters(projects, filters),
    total: projects.length,
    ...facets(projects),
    active: isFiltered(filters),
    set,
    toggleTech,
    clear: () => set({ ...NO_FILTERS, sort: filters.sort }),
  };
}

export type FilterState = ReturnType<typeof useProjectFilters>;
