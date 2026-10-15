"use client";

import { useId } from "react";
import {
  PROJECT_TYPES,
  ProjectCard,
  projectGrid,
  SORTS,
  type Sort,
} from "@/entities/project";
import { cn } from "@/shared/lib/cn";
import type { FilterState } from "../model/useProjectFilters";

const label = "text-xs tracking-[0.06em] text-muted uppercase";
export const chip =
  "inline-flex cursor-pointer items-center gap-1.5 rounded-sm border border-border-strong px-2.5 py-1.5 text-xs leading-none text-text hover:border-text aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-on-accent";

export const typeLabel = (t: keyof typeof PROJECT_TYPES) => PROJECT_TYPES[t];

/** "8 projects" or "3 of 8 projects", announced when it changes. */
export function ResultCount({
  s,
  className,
}: {
  s: FilterState;
  className?: string;
}) {
  return (
    <p role="status" className={cn("text-body-sm text-muted", className)}>
      {s.shown.length === s.total
        ? `${s.total} projects`
        : `${s.shown.length} of ${s.total} projects`}
    </p>
  );
}

export function Results({
  s,
  columns = 2,
}: {
  s: FilterState;
  columns?: 2 | 3;
}) {
  if (s.shown.length === 0) {
    return (
      <div className="grid justify-items-center gap-3 border-y border-border py-20 text-center">
        <p className="text-body-lg">No project matches these filters.</p>
        <button
          type="button"
          onClick={s.clear}
          className="cursor-pointer text-xs tracking-[0.06em] text-text uppercase underline underline-offset-4"
        >
          Clear filters
        </button>
      </div>
    );
  }
  return (
    <div className={projectGrid[columns]}>
      {s.shown.map((p) => (
        <ProjectCard key={p.slug} project={p} detailed />
      ))}
    </div>
  );
}

export function SearchField({
  s,
  className,
  placeholder = "Search projects",
}: {
  s: FilterState;
  className?: string;
  placeholder?: string;
}) {
  return (
    <label className={cn("relative block", className)}>
      <span className="sr-only">Search projects</span>
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 fill-none stroke-muted stroke-[1.5]"
      >
        <circle cx="7" cy="7" r="4.5" />
        <path d="M10.5 10.5 14 14" />
      </svg>
      <input
        type="search"
        value={s.filters.q}
        onChange={(e) => s.set({ q: e.target.value })}
        placeholder={placeholder}
        className="w-full rounded-md border border-border-strong bg-surface py-2 pr-3 pl-8.5 text-body-sm text-text placeholder:text-muted"
      />
    </label>
  );
}

export function SortSelect({
  s,
  className,
}: {
  s: FilterState;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <label htmlFor={id} className={label}>
        Sort
      </label>
      <select
        id={id}
        value={s.filters.sort}
        onChange={(e) => s.set({ sort: e.target.value as Sort })}
        className="cursor-pointer rounded-md border border-border-strong bg-surface px-2 py-1.5 text-body-sm text-text"
      >
        {(Object.keys(SORTS) as Sort[]).map((k) => (
          <option key={k} value={k}>
            {SORTS[k]}
          </option>
        ))}
      </select>
    </div>
  );
}

/** The active filters as removable chips. */
export function ActiveChips({ s }: { s: FilterState }) {
  if (!s.active) return null;
  const remove =
    "inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-raised px-2.5 py-1 text-xs text-text hover:bg-border";
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {s.filters.type && (
        <button
          type="button"
          className={remove}
          onClick={() => s.set({ type: null })}
        >
          {typeLabel(s.filters.type)} <span aria-hidden="true">×</span>
          <span className="sr-only">(remove)</span>
        </button>
      )}
      {s.filters.tech.map((t) => (
        <button
          key={t}
          type="button"
          className={remove}
          onClick={() => s.toggleTech(t)}
        >
          {t} <span aria-hidden="true">×</span>
          <span className="sr-only">(remove)</span>
        </button>
      ))}
      {s.filters.q.trim() && (
        <button
          type="button"
          className={remove}
          onClick={() => s.set({ q: "" })}
        >
          “{s.filters.q.trim()}” <span aria-hidden="true">×</span>
          <span className="sr-only">(remove)</span>
        </button>
      )}
      <button
        type="button"
        onClick={s.clear}
        className="ml-1 cursor-pointer text-xs tracking-[0.06em] text-muted uppercase underline underline-offset-4 hover:text-text"
      >
        Clear all
      </button>
    </div>
  );
}
