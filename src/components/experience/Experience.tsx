"use client";

import { experience } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="section-block">
      <div className="section-shell">
        <SectionHeading
          title="Experience"
          kicker="Four roles. Same through-line: interfaces that have to work."
        />

        <ol className="mt-2">
          {experience.map((role, i) => (
            <li key={role.id} className="panel-row">
              <Reveal delay={Math.min(i * 0.05, 0.15)}>
                <article className="grid gap-5 py-10 md:grid-cols-[10.5rem_minmax(0,1fr)] md:gap-12 md:py-12">
                  <p className="index-label md:pt-2">{role.period}</p>
                  <div>
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <h3 className="entry-title">{role.company}</h3>
                      <p className="index-label">{role.location}</p>
                    </div>
                    <p className="mt-2.5 text-sm font-light text-ink-muted">
                      {role.role} · {role.type}
                    </p>
                    <ul className="mt-6 max-w-3xl space-y-2.5 text-sm font-light leading-[1.7] text-ink-muted">
                      {role.bullets.map((bullet) => (
                        <li key={bullet} className="pl-4 [text-indent:-0.7rem]">
                          <span className="mr-2 text-ink-faint" aria-hidden="true">
                            —
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
