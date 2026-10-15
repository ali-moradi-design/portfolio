"use client";

import type { FilterState } from "../../model/useProjectFilters";
import { chip, ResultCount, Results, SortSelect, typeLabel } from "../parts";

/**
 * 4. Sticky strip: a segmented control for the type and a scrolling row of
 * tech chips in one bar that stays under the header while you scroll.
 */
export function StripBar({ s }: { s: FilterState }) {
  const seg =
    "cursor-pointer px-3 py-1.5 text-body-sm text-muted whitespace-nowrap hover:text-text aria-pressed:rounded-sm aria-pressed:bg-surface aria-pressed:text-text aria-pressed:shadow-[0_1px_2px_color-mix(in_srgb,var(--text)_20%,transparent)]";
  return (
    <div className="grid gap-8">
      <div className="sticky top-header z-10 -mx-[clamp(16px,2.5vw,48px)] grid gap-3 border-y border-border bg-bg/92 px-[clamp(16px,2.5vw,48px)] py-3 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div
            role="group"
            aria-label="Type"
            className="flex overflow-x-auto rounded-md bg-raised p-1"
          >
            <button
              type="button"
              aria-pressed={s.filters.type === null}
              className={seg}
              onClick={() => s.set({ type: null })}
            >
              All
            </button>
            {s.types.map(([t]) => (
              <button
                key={t}
                type="button"
                aria-pressed={s.filters.type === t}
                className={seg}
                onClick={() => s.set({ type: t })}
              >
                {typeLabel(t)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <ResultCount s={s} />
            <SortSelect s={s} />
          </div>
        </div>
        <div className="relative">
          <div
            role="group"
            aria-label="Tech"
            className="flex [scrollbar-width:thin] gap-1.5 overflow-x-auto mask-[linear-gradient(90deg,#000_92%,transparent)] pb-1"
          >
            {s.tech.map(([t, n]) => (
              <button
                key={t}
                type="button"
                aria-pressed={s.filters.tech.includes(t)}
                className={`${chip} shrink-0 whitespace-nowrap`}
                onClick={() => s.toggleTech(t)}
              >
                {t} <span className="opacity-60">{n}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Results s={s} />
    </div>
  );
}
