import { Fragment } from "react";
import { coreSkills, skillGroups } from "@/shared/config";
import { Reveal, RevealText } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";
import { Tag } from "@/shared/ui/tag";

const count = skillGroups.reduce((n, g) => n + g.items.length, 0);

/** The three core skills large, then six ruled groups of the rest. */
export function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      label="Skills"
      note={`${count} tools and practices`}
      title="Everything it takes to ship a data-heavy frontend."
    >
      <RevealText className="mb-[clamp(32px,5vw,64px)] text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.05] tracking-[-0.02em] text-balance">
        {coreSkills.map((s, i) => (
          <Fragment key={s}>
            {i > 0 && (
              <>
                {" "}
                <span className="text-accent" aria-hidden="true">
                  /
                </span>{" "}
              </>
            )}
            {s}
          </Fragment>
        ))}
      </RevealText>
      <Reveal
        each
        className="grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillGroups.map((g, i) => (
          <section
            key={g.title}
            aria-label={g.title}
            className="grid content-start gap-4 border-r border-b border-border p-[clamp(16px,2vw,24px)]"
          >
            <h3 className="flex gap-3 text-xs tracking-[0.06em] text-muted uppercase">
              <span className="text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {g.title}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Reveal>
    </Section>
  );
}
