"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/cn";
import { series } from "../../lib/series";
import { MiniBars } from "../MiniCharts";

const PLAN = { name: "LTE 100 GB", used: 68, total: 100, daysLeft: 12 };
const USAGE = series(14, 0.6, 5, 3);
const ADD_ONS = [
  { id: "10", label: "10 GB", days: 7, price: 4 },
  { id: "25", label: "25 GB", days: 30, price: 9 },
  { id: "50", label: "50 GB", days: 30, price: 15 },
] as const;

/** Sample of a customer portal: usage at a glance and buying an add-on. */
export function EcareSample() {
  const [pick, setPick] = useState<string>("25");
  const [bought, setBought] = useState<string | null>(null);
  const addOn = ADD_ONS.find((a) => a.id === pick)!;
  const left = PLAN.total - PLAN.used + (bought ? Number(bought) : 0);
  const total = PLAN.total + (bought ? Number(bought) : 0);

  return (
    <div className="grid gap-3 @lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <section
        aria-label="My usage"
        className="grid content-start gap-3 rounded-md border border-border bg-surface p-3"
      >
        <header className="flex items-baseline justify-between gap-2">
          <h3 className="text-body-sm">{PLAN.name}</h3>
          <span className="text-xs text-muted">{PLAN.daysLeft} days left</span>
        </header>
        <div>
          <p className="text-heading-sm leading-none tabular-nums">
            {left} GB
            <span className="text-body-sm text-muted"> left of {total} GB</span>
          </p>
          <div
            role="meter"
            aria-label="Data used"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={total - left}
            className="mt-2 h-2 overflow-hidden rounded-full bg-raised"
          >
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-600 ease-out-soft"
              style={{ width: `${((total - left) / total) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs text-muted">Daily use, last 14 days</p>
          <div className="h-16">
            <MiniBars values={USAGE} />
          </div>
        </div>
      </section>

      <section
        aria-label="Buy an add-on"
        className="grid content-start gap-2 rounded-md border border-border bg-surface p-3"
      >
        <h3 className="text-body-sm">Add data</h3>
        <fieldset className="grid gap-1.5">
          <legend className="sr-only">Package</legend>
          {ADD_ONS.map((a) => (
            <label
              key={a.id}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-2 rounded-md border px-2.5 py-2 text-body-sm",
                pick === a.id ? "border-accent bg-accent/8" : "border-border",
              )}
            >
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name="add-on"
                  value={a.id}
                  checked={pick === a.id}
                  onChange={() => setPick(a.id)}
                  className="accent-(--accent)"
                />
                {a.label}
                <span className="text-xs text-muted">{a.days} days</span>
              </span>
              <span className="tabular-nums">${a.price}</span>
            </label>
          ))}
        </fieldset>
        <button
          type="button"
          disabled={bought !== null}
          onClick={() => setBought(addOn.id)}
          className="cursor-pointer rounded-md bg-accent px-3 py-2 text-body-sm text-on-accent disabled:cursor-default disabled:opacity-60"
        >
          {bought
            ? "Added to your plan"
            : `Buy ${addOn.label} for $${addOn.price}`}
        </button>
        <p role="status" className="min-h-4 text-xs text-muted">
          {bought
            ? `${bought} GB added. This is a sample: no payment was made.`
            : ""}
        </p>
        {bought && (
          <button
            type="button"
            onClick={() => setBought(null)}
            className="cursor-pointer justify-self-start text-xs text-muted underline underline-offset-2"
          >
            Reset the sample
          </button>
        )}
      </section>
    </div>
  );
}
