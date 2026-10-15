"use client";

import { useId, useState } from "react";
import { SORTS, type Sort } from "@/entities/project";
import { cn } from "@/shared/lib/cn";
import type { FilterState } from "../../model/useProjectFilters";
import {
  ActiveChips,
  Dropdown,
  ResultCount,
  Results,
  TechOption,
  TypeOption,
  typeLabel,
} from "../parts";

/**
 * 6. Menu bar: compact dropdowns (Type, Tech with its own search, Sort),
 * like the filters of a product tool, with the active ones as chips below.
 */
export function MenuBar({ s }: { s: FilterState }) {
  const [find, setFind] = useState("");
  const name = useId();
  const tech = s.tech.filter(([t]) =>
    t.toLowerCase().includes(find.trim().toLowerCase()),
  );
  const value = (text: string) => <span className="text-muted">{text}</span>;

  return (
    <div className="grid gap-8">
      <div className="grid gap-3 border-y border-border py-4">
        <div className="flex flex-wrap items-center gap-2">
          <Dropdown
            button={
              <>
                Type {value(s.filters.type ? typeLabel(s.filters.type) : "Any")}
              </>
            }
          >
            <TypeOption
              s={s}
              name={name}
              value={null}
              text="Any type"
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
          </Dropdown>
          <Dropdown
            width="w-72"
            button={
              <>
                Tech{" "}
                {value(
                  s.filters.tech.length === 0
                    ? "Any"
                    : s.filters.tech.length === 1
                      ? s.filters.tech[0]
                      : `${s.filters.tech.length} picked`,
                )}
              </>
            }
          >
            <input
              type="search"
              value={find}
              onChange={(e) => setFind(e.target.value)}
              placeholder="Find a technology"
              aria-label="Find a technology"
              className="mb-1 w-full rounded-sm border border-border px-2 py-1.5 text-body-sm"
            />
            {tech.map(([t, n]) => (
              <TechOption key={t} s={s} tech={t} count={n} />
            ))}
            {tech.length === 0 && (
              <p className="px-2 py-1.5 text-body-sm text-muted">No match.</p>
            )}
          </Dropdown>
          <span aria-hidden="true" className="mx-1 h-6 w-px bg-border" />
          <Dropdown
            align="left"
            width="w-48"
            button={<>Sort {value(SORTS[s.filters.sort])}</>}
          >
            {(Object.keys(SORTS) as Sort[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => s.set({ sort: k })}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-left text-body-sm hover:bg-raised",
                  s.filters.sort === k && "text-accent",
                )}
              >
                {SORTS[k]}
                {s.filters.sort === k && <span aria-hidden="true">✓</span>}
              </button>
            ))}
          </Dropdown>
          <ResultCount s={s} className="ml-auto" />
        </div>
        <ActiveChips s={s} />
      </div>
      <Results s={s} />
    </div>
  );
}
