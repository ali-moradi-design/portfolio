"use client";

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import type { SampleKey, WorkSample } from "@/shared/config";
import { cn } from "@/shared/lib/cn";
import { Tag } from "@/shared/ui/tag";
import { DashboardBuilderSample } from "./samples/DashboardBuilderSample";
import { EcareSample } from "./samples/EcareSample";
import { FormBuilderSample } from "./samples/FormBuilderSample";
import { UiKitSample } from "./samples/UiKitSample";

const SAMPLES: Record<SampleKey, () => ReactNode> = {
  "dashboard-builder": () => <DashboardBuilderSample />,
  "form-builder": () => <FormBuilderSample />,
  "ui-kit": () => <UiKitSample />,
  ecare: () => <EcareSample />,
};

/**
 * The products of one role, each with a small working sample. The real
 * products are private, so the samples are built for this site and say so.
 * More than one product gets tabs.
 */
export function WorkSamples({ items }: { items: readonly WorkSample[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const item = items[active];

  const onKey = (e: KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + items.length) % items.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-4">
      <p className="text-xs tracking-[0.06em] text-muted uppercase">
        Work samples
      </p>
      {items.length > 1 && (
        <div
          role="tablist"
          aria-label="Products"
          onKeyDown={onKey}
          className="flex flex-wrap border-b border-border"
        >
          {items.map((w, i) => (
            <button
              key={w.sample}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "-mb-px cursor-pointer border-b-2 border-transparent px-3 py-2 text-body-sm text-muted hover:text-text",
                i === active && "border-accent text-text",
              )}
            >
              {w.title}
            </button>
          ))}
        </div>
      )}
      <div
        id={`${id}-panel`}
        role={items.length > 1 ? "tabpanel" : undefined}
        aria-labelledby={items.length > 1 ? `${id}-tab-${active}` : undefined}
        className="grid gap-4"
      >
        <div className="grid gap-2">
          {items.length === 1 && <h4 className="text-body-lg">{item.title}</h4>}
          <p className="max-w-[60ch] text-muted">{item.summary}</p>
          <ul className="flex flex-wrap gap-1.5" aria-label="Key parts">
            {item.tags.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        </div>
        <SampleFrame title={item.title}>{SAMPLES[item.sample]()}</SampleFrame>
      </div>
    </div>
  );
}

/** The inspector look from the hero: dotted canvas, a label tab, corner ticks. */
function SampleFrame({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const tick = "absolute size-2.5 border-accent";
  return (
    <figure
      aria-label={`Working sample of the ${title}`}
      className="relative m-0 min-w-0 rounded-lg border border-border bg-bg bg-[radial-gradient(circle,color-mix(in_srgb,var(--muted)_28%,transparent)_1px,transparent_1.2px)] bg-size-[16px_16px] p-[clamp(12px,2.5vw,32px)] pt-10"
    >
      <figcaption className="absolute top-3 left-3 flex items-center gap-2 text-[11px] leading-none text-muted">
        <span className="rounded-sm bg-accent px-1.5 py-1 text-on-accent">
          Sample
        </span>
        Built for this site; the real product is private.
      </figcaption>
      <span
        className={`${tick} -top-px -left-px border-t border-l`}
        aria-hidden="true"
      />
      <span
        className={`${tick} -top-px -right-px border-t border-r`}
        aria-hidden="true"
      />
      <span
        className={`${tick} -bottom-px -left-px border-b border-l`}
        aria-hidden="true"
      />
      <span
        className={`${tick} -right-px -bottom-px border-r border-b`}
        aria-hidden="true"
      />
      <div className="@container">{children}</div>
    </figure>
  );
}
