"use client";

import { useId, useRef } from "react";
import { SORTS, type Sort } from "@/entities/project";
import type { FilterState } from "../../model/useProjectFilters";
import {
  ActiveChips,
  chip,
  label,
  ResultCount,
  Results,
  SearchField,
  typeLabel,
} from "../parts";

/**
 * 5. Drawer: a slim toolbar (search, "Filters" with a count) and a side
 * panel with every option. Results update live behind the panel.
 */
export function DrawerPanel({ s }: { s: FilterState }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const count = (s.filters.type ? 1 : 0) + s.filters.tech.length;

  return (
    <div className="grid gap-8">
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <SearchField s={s} className="min-w-56 flex-1" />
          <button
            type="button"
            onClick={() => dialog.current?.showModal()}
            className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-text px-4 py-2 text-body-sm text-bg"
          >
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="size-3.5 fill-none stroke-current stroke-[1.5]"
            >
              <path d="M2 4h12M4.5 8h7M7 12h2" />
            </svg>
            Filters
            {count > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-accent text-xs text-on-accent">
                {count}
              </span>
            )}
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ResultCount s={s} />
          <ActiveChips s={s} />
        </div>
      </div>
      <Results s={s} />

      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-0 ml-auto h-dvh max-h-none w-[min(420px,100vw)] max-w-none bg-bg p-0 text-text backdrop:bg-text/40"
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 id={titleId} className="text-body-lg">
              Filters
            </h2>
            <button
              type="button"
              aria-label="Close filters"
              onClick={() => dialog.current?.close()}
              className="grid size-8 cursor-pointer place-items-center rounded-sm text-heading-sm hover:bg-raised"
            >
              ×
            </button>
          </header>
          <div className="grid flex-1 content-start gap-8 overflow-auto px-6 py-6">
            <section className="grid gap-3">
              <h3 className={label}>Sort</h3>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(SORTS) as Sort[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={s.filters.sort === k}
                    className={chip}
                    onClick={() => s.set({ sort: k })}
                  >
                    {SORTS[k]}
                  </button>
                ))}
              </div>
            </section>
            <section className="grid gap-3">
              <h3 className={label}>Type</h3>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  aria-pressed={s.filters.type === null}
                  className={chip}
                  onClick={() => s.set({ type: null })}
                >
                  All types
                </button>
                {s.types.map(([t, n]) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={s.filters.type === t}
                    className={chip}
                    onClick={() => s.set({ type: t })}
                  >
                    {typeLabel(t)} <span className="opacity-60">{n}</span>
                  </button>
                ))}
              </div>
            </section>
            <section className="grid gap-3">
              <h3 className={label}>Tech</h3>
              <div className="flex flex-wrap gap-1.5">
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
            </section>
          </div>
          <footer className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
            <button
              type="button"
              onClick={s.clear}
              disabled={!s.active}
              className="cursor-pointer text-xs tracking-[0.06em] uppercase underline underline-offset-4 disabled:cursor-default disabled:opacity-40"
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="cursor-pointer rounded-md bg-accent px-4 py-2.5 text-body-sm text-on-accent"
            >
              Show {s.shown.length} projects
            </button>
          </footer>
        </div>
      </dialog>
    </div>
  );
}
