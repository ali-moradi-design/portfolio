import Link from "next/link";
import {
  featuredProjects,
  ProjectCard,
  projectGrid,
  visibleProjects,
} from "@/entities/project";
import { cn } from "@/shared/lib/cn";
import { Pixels, pixelHost, pixelLabel } from "@/shared/ui/pixels";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";

/** The featured demo projects and a clear way to all of them. */
export function SelectedWork() {
  const all = visibleProjects();
  const featured = featuredProjects(all);
  if (featured.length === 0) return null;
  return (
    <Section
      id="work"
      index="01"
      label="Selected work"
      note={`${featured.length} of ${all.length} projects`}
      title="Selected projects, built end to end and running live."
    >
      <Reveal each className={projectGrid[2]}>
        {featured.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </Reveal>
      <Reveal>
        <AllProjectsLink count={all.length} />
      </Reveal>
    </Section>
  );
}

/** A full-width ruled row that fills with pixels on hover, like the menu. */
function AllProjectsLink({ count }: { count: number }) {
  return (
    <Link
      href="/projects"
      className={cn(
        pixelHost,
        "group/all mt-[clamp(48px,6vw,88px)] flex items-center justify-between gap-6 border-y border-text px-[clamp(16px,2vw,28px)] py-[clamp(20px,3vw,40px)] text-text no-underline [--px-fill:var(--accent)] [--px-ink:var(--on-accent)]",
      )}
    >
      <Pixels cols={48} rows={6} />
      <span className={cn(pixelLabel, "grid gap-1")}>
        <span className="text-xs tracking-[0.06em] uppercase">
          All projects · {count}
        </span>
        <span className="text-[clamp(1.75rem,4.4vw,3.1875rem)] leading-none tracking-[-0.015em]">
          Browse every project
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          pixelLabel,
          "text-[clamp(1.75rem,4.4vw,3.1875rem)] leading-none transition-transform duration-320 ease-out-soft group-hover/all:translate-x-2",
        )}
      >
        →
      </span>
    </Link>
  );
}
