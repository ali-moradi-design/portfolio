import type { ReactNode } from "react";
import { projects, type SampleKey } from "@/shared/config";
import { Section } from "@/shared/ui/section";
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

const featured = projects.filter((p) => p.sample);
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Four projects, each next to a small working sample. The real products are
 * private, so the samples are built for this site and say so.
 */
export function SelectedWork() {
  return (
    <Section
      id="work"
      index="01"
      label="Selected work"
      note={`${pad(featured.length)} projects`}
      title="Dashboards, builders and portals for data-heavy products."
    >
      <ol className="grid">
        {featured.map((p, i) => (
          <li
            key={p.id}
            className="grid gap-6 border-t border-border py-[clamp(24px,4vw,56px)] first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[clamp(24px,3vw,56px)]"
          >
            <div className="grid content-start gap-4 lg:sticky lg:top-[calc(var(--spacing-header)+24px)]">
              <p className="flex gap-3 text-xs tracking-[0.06em] text-muted uppercase">
                <span className="text-accent">
                  {pad(i + 1)}/{pad(featured.length)}
                </span>
                <span>
                  {p.company} · {p.period}
                </span>
              </p>
              <h3 className="text-[clamp(1.625rem,3vw,2.5625rem)] leading-[1.1] tracking-[-0.01em]">
                {p.title}
              </h3>
              <p className="max-w-[46ch] text-muted">{p.summary}</p>
              <ul className="flex flex-wrap gap-1.5" aria-label="Key parts">
                {p.tags.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            <SampleFrame title={p.title}>{SAMPLES[p.sample!]()}</SampleFrame>
          </li>
        ))}
      </ol>
    </Section>
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
