import { approach, facts } from "@/shared/config";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";

/** How Ali works (three principles) and the short facts. */
export function Approach() {
  return (
    <Section
      id="about"
      index="04"
      label="About"
      title="From the architecture to the last detail."
    >
      <Reveal
        as="ol"
        each
        className="grid gap-x-[clamp(24px,3vw,56px)] gap-y-10 md:grid-cols-3"
      >
        {approach.map((a, i) => (
          <li
            key={a.title}
            className="grid content-start gap-3 border-t border-text pt-4"
          >
            <p className="text-xs tracking-[0.06em] text-accent uppercase">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="text-heading-sm leading-tight">{a.title}</h3>
            <p className="text-muted">{a.text}</p>
          </li>
        ))}
      </Reveal>
      <Reveal
        as="dl"
        each
        className="mt-[clamp(48px,6vw,96px)] grid border-t border-border sm:grid-cols-2 lg:grid-cols-4"
      >
        {facts.map((f) => (
          <div
            key={f.label}
            className="grid content-start gap-1 border-b border-border py-4 sm:pr-6 lg:border-b-0"
          >
            <dt className="text-xs tracking-[0.06em] text-muted uppercase">
              {f.label}
            </dt>
            <dd className="text-body-sm">{f.value}</dd>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
