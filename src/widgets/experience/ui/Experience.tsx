import { experience, person } from "@/shared/config";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";

// Work samples (Neor, Asiatech) are hidden for now, until we decide whether
// they stay. To bring them back, restore these lines and the block below.
// import { workSamples } from "@/shared/config";
// import { WorkSamples } from "./WorkSamples";
// const samplesOf = (roleId: string) =>
//   workSamples.filter((w) => w.roleId === roleId);

/** Roles as ruled rows; each opens to show what was done there. */

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      label="Experience"
      note={`${experience.length} companies`}
      title={`${person.years} years of building products with teams.`}
    >
      <Reveal each className="border-b border-border">
        {experience.map((r, i) => (
          <details
            key={r.id}
            name="experience"
            open={i === 0}
            className="group border-t border-border"
          >
            <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1 py-5 marker:hidden md:grid-cols-[180px_minmax(0,1fr)_minmax(0,16rem)_auto] md:items-baseline [&::-webkit-details-marker]:hidden">
              <span className="text-body-sm text-muted tabular-nums md:order-none">
                {r.period}
              </span>
              <span
                aria-hidden="true"
                className="row-span-3 self-center text-heading-sm leading-none text-accent transition-transform duration-320 ease-emph group-open:rotate-45 md:order-last md:row-span-1"
              >
                +
              </span>
              <span className="min-w-0">
                <span className="block text-heading-sm leading-tight">
                  {r.company}
                </span>
                <span className="mt-1 block max-w-[52ch] text-body-sm text-muted">
                  {r.about}
                </span>
              </span>
              <span className="text-body-sm md:text-body">
                {r.role}
                <span className="block text-body-sm text-muted">
                  {r.location}
                </span>
              </span>
            </summary>
            <div className="grid gap-10 pb-10 md:ml-[calc(180px+1.5rem)]">
              <ul className="grid max-w-[70ch] gap-2">
                {r.bullets.map((b) => (
                  <li
                    key={b}
                    className="relative pl-5 text-muted before:absolute before:top-[0.7em] before:left-0 before:size-1.5 before:bg-accent before:content-['']"
                  >
                    {b}
                  </li>
                ))}
              </ul>
              {/* {samplesOf(r.id).length > 0 && (
                <WorkSamples items={samplesOf(r.id)} />
              )} */}
            </div>
          </details>
        ))}
      </Reveal>
    </Section>
  );
}
