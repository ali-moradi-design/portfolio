import type { Project } from "./types";

// Ali's demo projects, newest first. Each one runs on its own subdomain.
// Add a project here and its preview files in public/projects/ (see the
// `preview` field in types.ts). Entries marked `placeholder` are samples for
// development only; delete them once real projects are in.

const sample = (slug: string) => ({
  webm: `/projects/samples/${slug}.webm`,
  mp4: `/projects/samples/${slug}.mp4`,
  poster: `/projects/samples/${slug}.jpg`,
});

export const projects: readonly Project[] = [
  {
    slug: "sample-analytics",
    title: "Sample: analytics dashboard",
    summary: "Placeholder entry. A real project's one-line summary goes here.",
    description:
      "Placeholder entry for development. The projects page shows a longer description: what the project does, what is interesting about how it is built, and what to try when you open it.",
    type: "dashboard",
    tech: ["Next.js", "TypeScript", "TanStack Query", "Highcharts"],
    tags: ["Real-time"],
    year: 2026,
    preview: sample("sage"),
    featured: true,
    placeholder: true,
  },
  {
    slug: "sample-builder",
    title: "Sample: form builder",
    summary: "Placeholder entry. A real project's one-line summary goes here.",
    description:
      "Placeholder entry for development. Replace it with a real project; the filters are built from the type and tech of the projects in this list.",
    type: "web-app",
    tech: ["React", "TypeScript", "React Hook Form", "Zod"],
    year: 2026,
    preview: sample("midnight"),
    featured: true,
    placeholder: true,
  },
  {
    slug: "sample-maps",
    title: "Sample: map explorer",
    summary: "Placeholder entry. A real project's one-line summary goes here.",
    description: "Placeholder entry for development.",
    type: "dashboard",
    tech: ["React", "Mapbox", "Zustand"],
    tags: ["Maps"],
    year: 2025,
    preview: sample("inferno"),
    featured: true,
    placeholder: true,
  },
  {
    slug: "sample-kit",
    title: "Sample: component kit",
    summary: "Placeholder entry. A real project's one-line summary goes here.",
    description: "Placeholder entry for development, without a preview.",
    type: "ui-library",
    tech: ["React", "Radix UI", "Tailwind CSS", "Storybook"],
    year: 2025,
    featured: true,
    placeholder: true,
  },
  {
    slug: "sample-landing",
    title: "Sample: product site",
    summary: "Placeholder entry. A real project's one-line summary goes here.",
    description: "Placeholder entry for development.",
    type: "website",
    tech: ["Next.js", "Tailwind CSS"],
    tags: ["SEO"],
    year: 2025,
    placeholder: true,
  },
  {
    slug: "sample-cli",
    title: "Sample: data import tool",
    summary: "Placeholder entry. A real project's one-line summary goes here.",
    description: "Placeholder entry for development.",
    type: "tool",
    tech: ["TypeScript", "Node.js"],
    year: 2024,
    repo: "https://github.com/ali-moradi-design",
    placeholder: true,
  },
];
