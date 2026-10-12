"use client";

import { person, work } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Work() {
  return (
    <section id="work" className="section-block">
      <div className="section-shell">
        <SectionHeading
          title="Selected Work"
          kicker="Dashboards and interfaces shipped in production. No live demos to link."
          action={
            <a href={person.emailHref} className="pill">
              Contact
            </a>
          }
        />

        <ul className="mt-2">
          {work.map((item, i) => (
            <li key={item.id} className="panel-row">
              <Reveal delay={Math.min(i * 0.04, 0.16)}>
                <article className="group grid gap-5 py-10 md:grid-cols-[4.5rem_minmax(0,1.05fr)_minmax(0,1.35fr)] md:gap-10 md:py-12">
                  <p className="index-label pt-1">{item.index}</p>
                  <div>
                    <h3 className="entry-title group-hover:text-accent">{item.title}</h3>
                    <p className="mt-2.5 index-label">{item.context}</p>
                  </div>
                  <div>
                    <p className="max-w-xl text-sm font-light leading-[1.7] text-ink-muted sm:text-[0.95rem]">
                      {item.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li key={tag} className="tag">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
