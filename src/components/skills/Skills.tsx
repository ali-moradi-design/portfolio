"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { person, servicesWords, skillGroups } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

function StackedWords({ words }: { words: readonly string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((v) => (v + 1) % words.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [reduce, words.length]);

  if (reduce) {
    return (
      <ul className="display-word text-[clamp(1.8rem,4.5vw,2.75rem)]">
        {words.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>
    );
  }

  const visible = [0, 1, 2, 3].map((offset) => words[(index + offset) % words.length]);

  return (
    <div className="relative overflow-hidden" aria-hidden="true">
      <ul className="display-word text-[clamp(1.8rem,4.5vw,2.75rem)]">
        {visible.map((word, i) => (
          <li key={`${word}-${index}-${i}`} className="overflow-hidden">
            <motion.span
              className={cn(
                "block",
                i === 0 ? "text-ink" : i === 1 ? "text-ink-muted" : "text-ink-faint",
              )}
              initial={{ y: "80%", clipPath: "inset(0% 0% 100% 0%)" }}
              animate={{ y: "0%", clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  const marqueeItems = skillGroups.flatMap((group) => group.items);
  const loop = [...marqueeItems, ...marqueeItems];

  return (
    <section id="skills" className="section-block overflow-hidden">
      <div className="section-shell">
        <SectionHeading
          title="Skills"
          kicker="A stack shaped by dashboards, not demo apps."
          action={
            <a href={person.emailHref} className="pill">
              Contact
            </a>
          }
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-20">
          <Reveal>
            <p className="index-label">Building with</p>
            <div className="mt-4">
              <StackedWords words={servicesWords} />
            </div>
            <p className="mt-8 max-w-sm text-sm font-light leading-relaxed text-ink-muted">
              {person.years} years on React and Next.js interfaces — forms, tables, maps, charts, and
              the systems around them.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid sm:grid-cols-2 sm:gap-x-10">
              {skillGroups.map((group) => (
                <div key={group.title} className="skill-group">
                  <h3 className="index-label">{group.title}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm font-light leading-relaxed text-ink-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="marquee mt-14 border-y border-line py-2.5" aria-hidden="true">
        <div className="marquee-track text-[0.7rem] font-light uppercase tracking-[0.22em] text-ink-faint sm:text-[0.78rem]">
          {loop.map((item, i) => (
            <span key={`${item}-${i}`} className="px-1.5">
              {item}
              <span className="ml-8 text-ink-faint">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
