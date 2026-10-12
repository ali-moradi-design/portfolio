"use client";

import { aboutHighlights, person, summary } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="section-block">
      <div className="section-shell">
        <SectionHeading
          title="About"
          kicker={`${person.role} · ${person.location}`}
          action={
            <a href="#contact" className="pill">
              Contact
            </a>
          }
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
          <Reveal>
            <p className="max-w-2xl text-base font-light leading-relaxed text-ink-soft sm:text-lg sm:leading-relaxed">
              {summary}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="divide-y divide-line border-y border-line">
              {aboutHighlights.map((item) => (
                <div key={item.label} className="py-5">
                  <dt className="index-label">{item.label}</dt>
                  <dd className="mt-2.5 text-sm font-light leading-relaxed text-ink-muted">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
