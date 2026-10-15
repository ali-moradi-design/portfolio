"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  PROJECT_TYPES,
  ProjectCard,
  projectGrid,
  SORTS,
  type Sort,
} from "@/entities/project";
import { cn } from "@/shared/lib/cn";
import type { FilterState } from "../model/useProjectFilters";

export const label = "text-xs tracking-[0.06em] text-muted uppercase";
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

/** A button that opens a panel below it; closes on outside click or Escape. */
export function Dropdown({
  button,
  children,
  align = "left",
  width = "w-64",
}: {
  button: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  width?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape") return;
      if (e instanceof PointerEvent && ref.current?.contains(e.target as Node))
        return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="group/dd inline-flex cursor-pointer items-center gap-2 rounded-md border border-border-strong bg-surface px-3 py-2 text-body-sm text-text hover:border-text aria-expanded:border-text"
      >
        {button}
        <svg
          viewBox="0 0 10 6"
          aria-hidden="true"
          className="w-2.5 fill-none stroke-current stroke-[1.4] transition-transform group-aria-expanded/dd:rotate-180"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>
      {open && (
        <div
          id={id}
          className={cn(
            "absolute top-full z-20 mt-2 max-h-80 overflow-auto rounded-md border border-border-strong bg-surface p-2 shadow-[0_16px_40px_-20px_color-mix(in_srgb,var(--text)_45%,transparent)]",
            width,
            align === "right" ? "right-0" : "left-0",
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/** A checkbox row with a count, for tech lists. */
export function TechOption({
  s,
  tech,
  count,
}: {
  s: FilterState;
  tech: string;
  count: number;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-sm px-2 py-1.5 text-body-sm hover:bg-raised">
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={s.filters.tech.includes(tech)}
          onChange={() => s.toggleTech(tech)}
          className="accent-(--accent)"
        />
        {tech}
      </span>
      <span className="text-xs text-muted tabular-nums">{count}</span>
    </label>
  );
}

/** A radio row with a count, for the type list. */
export function TypeOption({
  s,
  value,
  text,
  count,
  name,
}: {
  s: FilterState;
  value: keyof typeof PROJECT_TYPES | null;
  text: string;
  count: number;
  name: string;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-sm px-2 py-1.5 text-body-sm hover:bg-raised">
      <span className="flex items-center gap-2">
        <input
          type="radio"
          name={name}
          checked={s.filters.type === value}
          onChange={() => s.set({ type: value })}
          className="accent-(--accent)"
        />
        {text}
      </span>
      <span className="text-xs text-muted tabular-nums">{count}</span>
    </label>
  );
}
