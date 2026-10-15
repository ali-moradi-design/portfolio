import type { Project } from "../model/types";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectKicker, ProjectTags } from "./ProjectMeta";
import { ProjectPreview } from "./ProjectPreview";

/** Home page card: preview, title, one line, a few tags and the links. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid content-start gap-4">
      <ProjectPreview project={project} />
      <div className="grid gap-2">
        <ProjectKicker project={project} />
        <h3 className="text-heading-sm leading-tight">{project.title}</h3>
        <p className="text-muted">{project.summary}</p>
      </div>
      <ProjectTags project={project} limit={4} />
      <ProjectLinks project={project} />
    </article>
  );
}

/** Projects page row: preview next to the full description and every tag. */
export function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="grid gap-5 border-t border-border py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-[clamp(24px,3vw,48px)]">
      <ProjectPreview project={project} />
      <div className="grid content-start gap-3">
        <ProjectKicker project={project} />
        <h2 className="text-[clamp(1.625rem,2.6vw,2.0625rem)] leading-tight">
          {project.title}
        </h2>
        <p className="max-w-[62ch] text-muted">{project.description}</p>
        <ProjectTags project={project} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
