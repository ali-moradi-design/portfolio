import { projectUrl } from "../model/types";
import type { Project } from "../model/types";

const link =
  "inline-flex items-center gap-1 text-xs tracking-[0.06em] text-text uppercase underline decoration-border-strong underline-offset-4 hover:text-accent hover:decoration-accent";

/** Live site and source code, opening in a new tab. */
export function ProjectLinks({ project }: { project: Project }) {
  return (
    <p className="flex flex-wrap gap-4">
      <a
        href={projectUrl(project)}
        target="_blank"
        rel="noreferrer"
        className={link}
      >
        Open live<span aria-hidden="true">↗</span>
        <span className="sr-only">: {project.title} (new tab)</span>
      </a>
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className={link}
        >
          Source code<span aria-hidden="true">↗</span>
          <span className="sr-only">: {project.title} (new tab)</span>
        </a>
      )}
    </p>
  );
}
