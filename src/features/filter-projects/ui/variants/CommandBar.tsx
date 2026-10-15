"use client";

import { useId, useState, type KeyboardEvent } from "react";
import type { ProjectType } from "@/entities/project";
import { cn } from "@/shared/lib/cn";
import type { FilterState } from "../../model/useProjectFilters";
import { ResultCount, Results, SortSelect, typeLabel } from "../parts";

type Suggestion =
  | { kind: "type"; value: ProjectType; text: string; count: number }
  | { kind: "tech"; value: string; text: string; count: number };

/**
 * 3. Command bar: one field. Typing suggests types and tech; picked ones
 * become tokens in the field. Plain words search the text.
 */
export function CommandBar({ s }: { s: FilterState }) {
  const [draft, setDraft] = useState(s.filters.q);
  const [focus, setFocus] = useState(false);
  const [index, setIndex] = useState(0);
  const listId = useId();
  const word = draft.trim().toLowerCase();

  const suggestions: Suggestion[] = word
    ? [
        ...s.types
          .filter(([t]) => typeLabel(t).toLowerCase().includes(word))
          .filter(([t]) => s.filters.type !== t)
          .map(([t, n]): Suggestion => ({
            kind: "type",
            value: t,
            text: typeLabel(t),
            count: n,
          })),
        ...s.tech
          .filter(([t]) => t.toLowerCase().includes(word))
          .filter(([t]) => !s.filters.tech.includes(t))
          .map(([t, n]): Suggestion => ({
            kind: "tech",
            value: t,
            text: t,
            count: n,
          })),
      ].slice(0, 6)
    : [];

  const pick = (sg: Suggestion) => {
    if (sg.kind === "type") s.set({ type: sg.value, q: "" });
    else s.set({ tech: [...s.filters.tech, sg.value], q: "" });
    setDraft("");
    setIndex(0);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" && suggestions.length) {
      e.preventDefault();
      setIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp" && suggestions.length) {
      e.preventDefault();
      setIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && suggestions[index]) {
      e.preventDefault();
      pick(suggestions[index]);
    } else if (e.key === "Backspace" && draft === "") {
      // Remove the last token.
      if (s.filters.tech.length) s.toggleTech(s.filters.tech.at(-1)!);
      else if (s.filters.type) s.set({ type: null });
    }
  };

  const token =
    "inline-flex items-center gap-1 rounded-sm bg-accent px-2 py-1 text-xs text-on-accent";
  const open = focus && suggestions.length > 0;

  return (
    <div className="grid gap-8">
      <div className="grid gap-3">
        <div className="relative">
          <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-text bg-surface px-3 py-2.5 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent">
            <span className="text-xs tracking-[0.06em] text-accent uppercase">
              Filter
            </span>
            {s.filters.type && (
              <button
                type="button"
                className={token}
                onClick={() => s.set({ type: null })}
              >
                type: {typeLabel(s.filters.type)}{" "}
                <span aria-hidden="true">×</span>
                <span className="sr-only">(remove)</span>
              </button>
            )}
            {s.filters.tech.map((t) => (
              <button
                key={t}
                type="button"
                className={token}
                onClick={() => s.toggleTech(t)}
              >
                tech: {t} <span aria-hidden="true">×</span>
                <span className="sr-only">(remove)</span>
              </button>
            ))}
            <input
              role="combobox"
              aria-expanded={open}
              aria-controls={listId}
              aria-activedescendant={open ? `${listId}-${index}` : undefined}
              aria-label="Filter projects by type, tech or text"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                setIndex(0);
                s.set({ q: e.target.value });
              }}
              onKeyDown={onKey}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              placeholder="Type “react”, “dashboard” or any word…"
              className="min-w-48 flex-1 bg-transparent py-1 text-body text-text outline-none placeholder:text-muted"
            />
          </div>
          {open && (
            <ul
              id={listId}
              role="listbox"
              className="absolute top-full right-0 left-0 z-20 mt-2 grid rounded-md border border-border-strong bg-surface p-1.5 shadow-[0_16px_40px_-20px_color-mix(in_srgb,var(--text)_45%,transparent)]"
            >
              {suggestions.map((sg, i) => (
                <li
                  key={`${sg.kind}-${sg.value}`}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === index}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    pick(sg);
                  }}
                  onMouseEnter={() => setIndex(i)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-3 rounded-sm px-2.5 py-2 text-body-sm",
                    i === index && "bg-raised",
                  )}
                >
                  <span>
                    <span className="mr-2 text-xs text-muted">{sg.kind}</span>
                    {sg.text}
                  </span>
                  <span className="text-xs text-muted tabular-nums">
                    {sg.count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ResultCount s={s} />
          <SortSelect s={s} />
        </div>
      </div>
      <Results s={s} />
    </div>
  );
}
