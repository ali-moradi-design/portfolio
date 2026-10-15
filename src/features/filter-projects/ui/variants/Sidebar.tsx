"use client";

import { useId, useState } from "react";
import type { FilterState } from "../../model/useProjectFilters";
import {
  label,
  ResultCount,
  Results,
  SearchField,
  SortSelect,
  TechOption,
  TypeOption,
  typeLabel,
} from "../parts";

const SHOWN = 8;

/** 2. Sidebar: a sticky facet column with counts, results beside it. */
export function Sidebar({ s }: { s: FilterState }) {
  const [more, setMore] = useState(false);
  const name = useId();
  const tech = more ? s.tech : s.tech.slice(0, SHOWN);
  const panel = (
    <div className="grid gap-6">
      <SearchField s={s} />
      <fieldset className="grid gap-1">
        <legend className={`${label} mb-2`}>Type</legend>
        <TypeOption
          s={s}
          name={name}
          value={null}
          text="All types"
          count={s.total}
        />
        {s.types.map(([t, n]) => (
          <TypeOption
            key={t}
            s={s}
            name={name}
            value={t}
            text={typeLabel(t)}
            count={n}
          />
        ))}
      </fieldset>
      <fieldset className="grid gap-1">
        <legend className={`${label} mb-2`}>Tech</legend>
        {tech.map(([t, n]) => (
          <TechOption key={t} s={s} tech={t} count={n} />
        ))}
        {s.tech.length > SHOWN && (
          <button
            type="button"
            onClick={() => setMore((m) => !m)}
            className="cursor-pointer justify-self-start px-2 pt-1 text-xs text-muted underline underline-offset-4 hover:text-text"
          >
            {more ? "Show less" : `Show ${s.tech.length - SHOWN} more`}
          </button>
        )}
      </fieldset>
      {s.active && (
        <button
          type="button"
          onClick={s.clear}
          className="cursor-pointer justify-self-start text-xs tracking-[0.06em] text-text uppercase underline underline-offset-4"
        >
          Clear filters
        </button>
      )}
    </div>
  );
  return (
    <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
      <aside
        aria-label="Filters"
        className="lg:sticky lg:top-[calc(var(--spacing-header)+24px)] lg:self-start"
      >
        <details className="group rounded-md border border-border p-4 lg:hidden">
          <summary className="cursor-pointer list-none text-body-sm [&::-webkit-details-marker]:hidden">
            Filters {s.active && <span className="text-accent">· on</span>}
          </summary>
          <div className="mt-4">{panel}</div>
        </details>
        <div className="hidden lg:block">{panel}</div>
      </aside>
      <div className="grid content-start gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <ResultCount s={s} />
          <SortSelect s={s} />
        </div>
        <Results s={s} />
      </div>
    </div>
  );
}
