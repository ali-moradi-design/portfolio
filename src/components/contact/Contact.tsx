"use client";

import { person } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Magnetic } from "@/components/ui/Magnetic";

export function Contact() {
  return (
    <section id="contact" className="section-block">
      <div className="section-shell">
        <SectionHeading
          title="Contact"
          kicker="Email is the fastest way to reach me. LinkedIn works too."
        />

        <Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end">
            <div>
              <Magnetic className="inline-block max-w-full">
                <a
                  href={person.emailHref}
                  className="block max-w-full break-all text-[clamp(1.15rem,3.2vw,2.15rem)] font-light uppercase tracking-[0.08em] text-ink transition-colors duration-200 hover:text-accent"
                >
                  {person.email}
                </a>
              </Magnetic>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={person.emailHref} className="pill">
                  Email me
                </a>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              <li className="flex min-h-[3.5rem] items-center justify-between gap-4 px-0">
                <span className="index-label">Loc</span>
                <span className="text-sm font-light uppercase tracking-[0.1em] text-ink">
                  {person.location}
                </span>
              </li>
              <li className="flex min-h-[3.5rem] items-center justify-between gap-4 px-0">
                <span className="index-label">Tel</span>
                <a
                  href={person.phoneHref}
                  className="text-sm font-light uppercase tracking-[0.1em] text-ink transition-colors duration-200 hover:text-accent"
                >
                  {person.phone}
                </a>
              </li>
              <li className="flex min-h-[3.5rem] items-center justify-between gap-4 px-0">
                <span className="index-label">In</span>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light uppercase tracking-[0.08em] text-ink transition-colors duration-200 hover:text-accent"
                >
                  ali-moradi-91542a213
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
