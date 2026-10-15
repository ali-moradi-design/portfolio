import { Tag } from "@/shared/ui/tag";
import { PROJECT_TYPES, type Project } from "../model/types";

export function ProjectKicker({ project }: { project: Project }) {
  return (
    <p className="flex gap-3 text-xs tracking-[0.06em] text-muted uppercase">
      <span className="text-accent">{PROJECT_TYPES[project.type]}</span>
      <span>{project.year}</span>
    </p>
  );
}

/** Tech first, then the other tags; `limit` keeps cards short. */
export function ProjectTags({
  project,
  limit,
}: {
  project: Project;
  limit?: number;
}) {
  const all = [...project.tech, ...(project.tags ?? [])];
  const shown = limit ? all.slice(0, limit) : all;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tech and tags">
      {shown.map((t) => (
        <li key={t}>
          <Tag>{t}</Tag>
        </li>
      ))}
      {shown.length < all.length && (
        <li className="self-center text-xs text-muted">
          +{all.length - shown.length}
        </li>
      )}
    </ul>
  );
}
