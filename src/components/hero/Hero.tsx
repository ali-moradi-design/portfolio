"use client";

import { hero, person } from "@/data/content";
import { ClipLine } from "@/components/ui/ClipTitle";
import { ParticleRing } from "@/components/fx/ParticleRing";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] pt-[54px]"
      aria-labelledby="hero-heading"
    >
      <div className="hero-stage">
        <div className="hero-blob" aria-hidden="true">
          <ParticleRing />
        </div>

        <span className="bracket bracket-tl" aria-hidden="true" />
        <span className="bracket bracket-tr" aria-hidden="true" />
        <span className="bracket bracket-bl" aria-hidden="true" />
        <span className="bracket bracket-br" aria-hidden="true" />

        <p className="hero-meta hero-meta-tl">
          {hero.corners.role.index}. {hero.corners.role.label}
        </p>
        <p className="hero-meta hero-meta-tr">
          {hero.corners.place.index}. {hero.corners.place.label}
        </p>

        <div className="hero-meta hero-meta-bl">
          <div className="mb-1">
            {hero.corners.contactIndex}.
          </div>
          <a
            href={person.emailHref}
            className="block min-h-9 max-w-[16rem] break-all normal-case tracking-normal text-ink-muted transition hover:text-ink sm:max-w-none"
          >
            {person.email}
          </a>
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 inline-flex min-h-9 items-center transition hover:text-ink"
          >
            LinkedIn
          </a>
        </div>

        <a
          href="#contact"
          className="hero-meta hero-meta-br inline-flex min-h-11 items-center gap-2 transition hover:text-ink"
        >
          {hero.corners.availability.index}. {hero.corners.availability.label}
          <span className="status-dot" aria-hidden="true" />
        </a>

        <div className="hero-core">
          <div className="hero-panel">
            <div className="hero-copy">
              <h1 id="hero-heading" className="hero-name">
                <span className="hero-name-line">
                  <ClipLine delay={0.06}>Ali</ClipLine>
                </span>
                <span className="hero-name-line">
                  <ClipLine delay={0.14}>Moradi</ClipLine>
                </span>
              </h1>
              <p className="hero-role">
                <ClipLine delay={0.22}>{person.role}</ClipLine>
              </p>
              <p className="hero-bio">{hero.bio}</p>
            </div>
            <div className="hero-void" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
