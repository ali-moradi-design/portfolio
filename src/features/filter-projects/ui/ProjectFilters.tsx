"use client";

import type { FilterState } from "../model/useProjectFilters";
import {
  ActiveChips,
  chip,
  ResultCount,
  Results,
  SearchField,
  SortSelect,
  typeLabel,
} from "./parts";

const segment =
  "cursor-pointer whitespace-nowrap px-3 py-1.5 text-body-sm text-muted hover:text-text aria-pressed:rounded-sm aria-pressed:bg-surface aria-pressed:text-text aria-pressed:shadow-[0_1px_2px_color-mix(in_srgb,var(--text)_20%,transparent)]";

/**
 * Type as a segmented control, a search field, sort, and the tech as chips
 * that wrap; the active filters sit above the results.
 */
export function ProjectFilters({ s }: { s: FilterState }) {
  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-8">
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 border-y border-border py-5">
        <div className="flex flex-wrap items-center gap-3">
          <div
            role="group"
            aria-label="Type"
            className="flex max-w-full min-w-0 overflow-x-auto rounded-md bg-raised p-1"
          >
            <button
              type="button"
              aria-pressed={s.filters.type === null}
              className={segment}
              onClick={() => s.set({ type: null })}
            >
              All
            </button>
            {s.types.map(([t]) => (
              <button
                key={t}
                type="button"
                aria-pressed={s.filters.type === t}
                className={segment}
                onClick={() => s.set({ type: t })}
              >
                {typeLabel(t)}
              </button>
            ))}
          </div>
          <SearchField s={s} className="min-w-56 flex-1" />
          <SortSelect s={s} />
        </div>
        <div role="group" aria-label="Tech" className="flex flex-wrap gap-1.5">
          {s.tech.map(([t, n]) => (
            <button
              key={t}
              type="button"
              aria-pressed={s.filters.tech.includes(t)}
              className={chip}
              onClick={() => s.toggleTech(t)}
            >
              {t} <span className="opacity-60">{n}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ResultCount s={s} />
          <ActiveChips s={s} />
        </div>
      </div>
      <Results s={s} />
    </div>
  );
}
