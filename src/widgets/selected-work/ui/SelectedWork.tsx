import {
  featuredProjects,
  ProjectCard,
  visibleProjects,
} from "@/entities/project";
import { ButtonLink } from "@/shared/ui/button";
import { Section } from "@/shared/ui/section";

/** Three or four featured demo projects and a link to all of them. */
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
      title="Projects you can open and try, each live on its own subdomain."
    >
      <div className="grid gap-x-[clamp(24px,3vw,48px)] gap-y-14 md:grid-cols-2">
        {featured.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      <div className="mt-[clamp(40px,5vw,72px)] flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <p className="text-muted">
          Filter all {all.length} projects by type and tech.
        </p>
        <ButtonLink href="/projects" variant="primary">
          All projects →
        </ButtonLink>
      </div>
    </Section>
  );
}
