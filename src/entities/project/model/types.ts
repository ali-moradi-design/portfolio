export const PROJECT_TYPES = {
  dashboard: "Dashboard",
  "web-app": "Web app",
  "e-commerce": "E-commerce",
  website: "Website",
  "3d": "3D",
  "ui-library": "UI library",
  tool: "Tool",
} as const;

export type ProjectType = keyof typeof PROJECT_TYPES;

/** A demo project, deployed on its own subdomain. */
export type Project = {
  /** Also the subdomain: https://<slug>.ali-moradi-develop.com */
  slug: string;
  title: string;
  /** One sentence for the home page card. */
  summary: string;
  /** A short paragraph for the projects page. */
  description: string;
  type: ProjectType;
  /** Libraries and tools; also the "Tech" filter. */
  tech: readonly string[];
  /** Other labels, e.g. "Real-time" or "Maps". */
  tags?: readonly string[];
  year: number;
  /** Live site; defaults to the slug's subdomain. */
  url?: string;
  /** Source code, if public. */
  repo?: string;
  /** Published npm package, if any. */
  npm?: string;
  /** Something to know before opening it, e.g. demo accounts. */
  note?: string;
  /**
   * Looping preview in public/projects/: `<slug>.mp4` (H.264, played first),
   * `<slug>.webm` and the still `<slug>.jpg`. It plays on hover, one at a
   * time. Leave out for a plain placeholder.
   */
  preview?: { webm?: string; mp4?: string; poster: string };
  /** Shown on the home page (the first four). */
  featured?: boolean;
};

export const SITE_DOMAIN = "ali-moradi-develop.com";

export const projectUrl = (p: Project) =>
  p.url ?? `https://${p.slug}.${SITE_DOMAIN}`;
