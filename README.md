# Ali Moradi — Personal portfolio

A 3D personal portfolio built with Next.js (App Router) and TypeScript.
Dark instrument-panel layout on `#1C1C1C` with a hairline grid and a teal accent (`#3FD0B8`).

> **Status: early prototype.** The design, content and structure are not final and
> will change a lot. Final URL: https://ali-moradi-develop.com

Visual language is inspired by [vanlent.dev](https://vanlent.dev/) as look and feel only
(numbered hero corners, grid cells, clip-path title reveals). None of Tim van Lent's copy,
projects, name, phone, logo or branding is used.

## Local setup

Requirements: Node.js 20.9+ and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000. The dev server uses Turbopack.

Other scripts:

| Command             | What it does                                      |
| ------------------- | ------------------------------------------------- |
| `pnpm build`        | Production build (standalone output)              |
| `pnpm lint`         | ESLint (with FSD import rules) and steiger        |
| `pnpm typecheck`    | Generate route types and run `tsc`                |
| `pnpm format`       | Prettier with the Tailwind class sorter           |
| `pnpm format:check` | Check formatting (runs in CI)                     |
| `pnpm test`         | Vitest unit tests                                 |
| `pnpm test:e2e`     | Playwright E2E tests against the production build |

## What is inside

- Home: a one-viewport hero (name with a WebGL2 fluid trail, bio, and a live sample dashboard
  inside an inspector that reports design tokens and WCAG contrast). More sections are on the way.
- Three palettes (Sage, Midnight, Inferno), each light and dark (mode by next-themes),
  remembered in localStorage and applied before the first paint
- Content lives in `src/shared/config/content.ts` (copy from the CV)
- `/projects`: demo projects, each on its own subdomain, filtered by type and tech in the URL

## Adding a project

1. Add an entry to `src/entities/project/model/projects.ts` (fields are documented in
   `types.ts`). `featured: true` puts it on the home page (up to four).
2. Put its preview in `public/projects/`: `<slug>.webm`, `<slug>.mp4` and a `<slug>.jpg` poster
   (16:10, a few seconds, muted; it loops).
3. Delete the `placeholder` sample entries once real projects are in. They show only in
   `pnpm dev` and in builds with `SHOW_SAMPLE_PROJECTS=1` (the CI build for E2E tests).

## Structure

App Router in `src/app`, with [Feature-Sliced Design](https://feature-sliced.design)
layers next to it in `src/`:

| Folder         | Holds                                                                    |
| -------------- | ------------------------------------------------------------------------ |
| `src/app`      | Routes (`layout.tsx`, `page.tsx`, icons, OG image), global CSS, fonts    |
| `src/views`    | Page compositions (`home`); the FSD pages layer                          |
| `src/widgets`  | Page blocks: `header`, `hero`, `sample-dashboard`                        |
| `src/features` | `inspect-element`, `switch-theme`                                        |
| `src/shared`   | Config (tokens, content), lib (theme, cn, contrast, logo), UI components |

The pages layer is called `views` because Next.js reads a `src/pages` folder as
the Pages Router. Each slice exposes a public `index.ts`. `pnpm lint` checks the
layer import direction (`eslint-plugin-boundaries`) and the slice structure
(`steiger`).

## Stack

Next.js 16 (App Router, React Compiler, Cache Components), React 19, TypeScript,
Tailwind CSS 4, next-themes, Highcharts, TanStack Table, WebGL2.

Font: Huninn (one weight) via `next/font/local`.

Reduced motion turns off the trail and all transitions.
