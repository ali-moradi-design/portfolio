import type { Project } from "../model/types";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectKicker, ProjectTags } from "./ProjectMeta";
import { ProjectPreview } from "./ProjectPreview";

/**
 * A project card: preview, title, text, tags and links. The home page uses
 * the short summary and a few tags; the projects page (`detailed`) the full
 * description, the note and every tag.
 */
export function ProjectCard({
  project,
  detailed = false,
}: {
  project: Project;
  detailed?: boolean;
}) {
  const Title = detailed ? "h2" : "h3";
  return (
    <article className="grid content-start gap-4">
      <ProjectPreview project={project} />
      <div className="grid gap-2">
        <ProjectKicker project={project} />
        <Title className="text-heading-sm leading-tight">{project.title}</Title>
        <p className="text-muted">
          {detailed ? project.description : project.summary}
        </p>
        {detailed && project.note && (
          <p className="border-l-2 border-accent pl-3 text-body-sm">
            {project.note}
          </p>
        )}
      </div>
      <ProjectTags project={project} limit={detailed ? undefined : 4} />
      <ProjectLinks project={project} />
    </article>
  );
}

/** Responsive card grid: `columns` on wide screens, fewer as space shrinks. */
export const projectGrid = {
  2: "grid gap-x-[clamp(24px,3vw,48px)] gap-y-14 md:grid-cols-2",
  3: "grid gap-x-[clamp(20px,2.5vw,40px)] gap-y-14 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))]",
} as const;
