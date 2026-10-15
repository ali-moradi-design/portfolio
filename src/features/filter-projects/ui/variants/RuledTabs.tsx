"use client";

import { cn } from "@/shared/lib/cn";
import { Pixels, pixelHost, pixelLabel } from "@/shared/ui/pixels";
import type { FilterState } from "../../model/useProjectFilters";
import {
  ActiveChips,
  Dropdown,
  ResultCount,
  Results,
  SearchField,
  SortSelect,
  TechOption,
  typeLabel,
} from "../parts";

/** 1. Ruled tabs: the types as equal menu cells (like the header), tools below. */
export function RuledTabs({ s }: { s: FilterState }) {
  const cells = [
    { value: null, text: "All", count: s.total },
    ...s.types.map(([t, n]) => ({ value: t, text: typeLabel(t), count: n })),
  ];
  return (
    <div className="grid gap-8">
      <div className="grid gap-4">
        <div
          role="group"
          aria-label="Type"
          className="grid grid-cols-2 border-t border-l border-border sm:grid-cols-3 lg:auto-cols-fr lg:grid-flow-col"
        >
          {cells.map((c) => (
            <button
              key={c.text}
              type="button"
              aria-pressed={s.filters.type === c.value}
              onClick={() => s.set({ type: c.value })}
              className={cn(
                pixelHost,
                "flex cursor-pointer items-start justify-between gap-2 border-r border-b border-border px-3 pt-3 pb-6 text-left text-xs tracking-[0.06em] text-muted uppercase aria-pressed:bg-text aria-pressed:text-bg",
              )}
            >
              <Pixels cols={13} rows={6} />
              <span className={pixelLabel}>{c.text}</span>
              <sup className={cn(pixelLabel, "tabular-nums")}>{c.count}</sup>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SearchField s={s} className="min-w-56 flex-1" />
          <Dropdown
            button={`Tech${s.filters.tech.length ? ` (${s.filters.tech.length})` : ""}`}
          >
            {s.tech.map(([t, n]) => (
              <TechOption key={t} s={s} tech={t} count={n} />
            ))}
          </Dropdown>
          <SortSelect s={s} />
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
