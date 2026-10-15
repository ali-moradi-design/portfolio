"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  applyFilters,
  facets,
  filtersToQuery,
  parseFilters,
  PROJECT_TYPES,
  ProjectRow,
  type Project,
  type ProjectFilters,
} from "@/entities/project";
import { cn } from "@/shared/lib/cn";

const chip =
  "cursor-pointer rounded-sm border border-border-strong px-2.5 py-1.5 text-xs leading-none text-text aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-on-accent";

/**
 * The project list with type and tech filters. The filters live in the URL
 * (?type=…&tech=…), so a filtered view can be shared and survives a reload.
 */
export function ProjectsBrowser({
  projects,
}: {
  projects: readonly Project[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const filters = parseFilters(
    new URLSearchParams(params.toString()),
    projects,
  );
  const shown = applyFilters(projects, filters);
  const { types, tech } = facets(projects);
  const active = filters.type !== null || filters.tech.length > 0;

  const set = (next: ProjectFilters) =>
    router.replace(`${pathname}${filtersToQuery(next)}`, { scroll: false });

  return (
    <div className="grid gap-8">
      <div className="grid gap-4 border-y border-border py-5">
        <FilterRow label="Type">
          <button
            type="button"
            aria-pressed={filters.type === null}
            className={chip}
            onClick={() => set({ ...filters, type: null })}
          >
            All types
          </button>
          {types.map(([type, n]) => (
            <button
              key={type}
              type="button"
              aria-pressed={filters.type === type}
              className={chip}
              onClick={() =>
                set({ ...filters, type: filters.type === type ? null : type })
              }
            >
              {PROJECT_TYPES[type]} <span className="opacity-70">{n}</span>
            </button>
          ))}
        </FilterRow>
        <FilterRow label="Tech">
          {tech.map(([t, n]) => {
            const on = filters.tech.includes(t);
            return (
              <button
                key={t}
                type="button"
                aria-pressed={on}
                className={chip}
                onClick={() =>
                  set({
                    ...filters,
                    tech: on
                      ? filters.tech.filter((x) => x !== t)
                      : [...filters.tech, t],
                  })
                }
              >
                {t} <span className="opacity-70">{n}</span>
              </button>
            );
          })}
        </FilterRow>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p role="status" className="text-body-sm text-muted">
            {shown.length === projects.length
              ? `${projects.length} projects`
              : `${shown.length} of ${projects.length} projects`}
          </p>
          <button
            type="button"
            onClick={() => set({ type: null, tech: [] })}
            className={cn(
              "cursor-pointer text-xs tracking-[0.06em] text-text uppercase underline underline-offset-4",
              !active && "invisible",
            )}
          >
            Clear filters
          </button>
        </div>
      </div>

      {shown.length > 0 ? (
        <div className="border-b border-border [&>article:first-child]:border-t-0">
          {shown.map((p) => (
            <ProjectRow key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-muted">
          No project matches these filters.{" "}
          <button
            type="button"
            className="cursor-pointer text-text underline underline-offset-4"
            onClick={() => set({ type: null, tech: [] })}
          >
            Clear filters
          </button>
        </p>
      )}
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="grid gap-2 md:grid-cols-[80px_minmax(0,1fr)] md:items-baseline"
    >
      <p className="text-xs tracking-[0.06em] text-muted uppercase">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
