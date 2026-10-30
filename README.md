# Ali Moradi — Personal portfolio

Portfolio of Ali Moradi, Senior Frontend Developer: https://ali-moradi-develop.com

Built with Next.js 16 (App Router) on Feature-Sliced Design. The visual language is a
design-tool inspector: ruled cells, rulers and coordinates, a pixel dissolve on hover, and
three palettes (Sage, Midnight, Inferno), each light and dark.

## Local setup

Requirements: Node.js 20.9+ and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000. The dev server uses Turbopack.

| Command             | What it does                                         |
| ------------------- | ---------------------------------------------------- |
| `pnpm build`        | Production build (standalone output, used by Docker) |
| `pnpm start`        | Run the production build                             |
| `pnpm lint`         | ESLint (with FSD import rules) and steiger           |
| `pnpm typecheck`    | Generate route types and run `tsc`                   |
| `pnpm format`       | Prettier with the Tailwind class sorter              |
| `pnpm format:check` | Check formatting (runs in CI)                        |
| `pnpm test`         | Vitest unit tests                                    |
| `pnpm test:e2e`     | Playwright E2E tests against the production build    |

## What is inside

- **Home** (`/`):
  - Hero, one viewport tall: the name with a WebGL2 fluid trail, the bio, and a live sample
    dashboard (Highcharts, TanStack Table) inside an inspector that reports design tokens and
    WCAG contrast.
  - Selected work: six featured demo projects and a link to all of them.
  - Experience: four roles as rows that open one at a time. The Neor and Asiatech rows hold
    small working samples of the company products (dashboard builder, form builder with a Zod
    schema, UI kit, customer portal); the real products are private.
  - Skills, About (how Ali works, education, languages) and Contact (email, CV download,
    LinkedIn, GitHub).
- **Projects** (`/projects`): every demo project in one list, filtered by type, tech and text,
  and sorted; the filters live in the URL query.
- **Motion**: line-by-line text reveals and fades on scroll (GSAP with SplitText and
  ScrambleText), Lenis smooth scrolling, and a cursor with a short trail outside the hero.
  Reduced motion turns all of it off.
- **Theme**: palette and light/dark mode (next-themes) are remembered in localStorage and
  applied before the first paint.

All copy lives in `src/shared/config/content.ts` and uses only facts from the CV. The CV PDF is
`public/ali-moradi-cv.pdf`.

## Projects

Each demo project runs on its own subdomain (`<slug>.ali-moradi-develop.com`). There are no
detail pages.

1. Add an entry to `src/entities/project/model/projects.ts` (fields are documented in
   `types.ts`). `featured: true` puts it on the home page (the first four).
2. Put its images in `public/projects/`: a `<slug>.jpg` still (16:10) and, if wanted, a short
   muted loop as `<slug>.mp4` (H.264, about 720 px wide, under 2 MB) and `<slug>.webm`.
   Videos play only while their card is hovered, one at a time. Without them the card shows a
   "Preview coming soon" frame.
3. Record the preview from the live site: add a scene to `scripts/previews/scenes.mjs` (what
   to click and scroll, about 8 to 10 seconds) and run `pnpm previews <slug>`. It needs
   `ffmpeg`; set `CHROMIUM_PATH` to use an installed Chromium. Frames come from the DevTools
   screencast and are encoded at 960×600 (mp4 H.264, webm VP9, jpg poster = first frame).

## Structure

App Router in `src/app`, with [Feature-Sliced Design](https://feature-sliced.design) layers
next to it in `src/`:

| Folder         | Holds                                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| `src/app`      | Routes (`layout.tsx`, `page.tsx`, `projects/`, icons, OG image), global CSS, fonts                             |
| `src/views`    | Page compositions: `home`, `projects` (the FSD pages layer)                                                    |
| `src/widgets`  | `header`, `hero`, `sample-dashboard`, `selected-work`, `experience`, `skills`, `approach`, `contact`, `footer` |
| `src/features` | `inspect-element`, `switch-theme`, `filter-projects`, `copy-text`                                              |
| `src/entities` | `project`: the demo project model, filters and cards                                                           |
| `src/shared`   | Config (tokens, content), lib (theme, motion, cn, contrast, logo), UI (button, section, reveal, cursor, …)     |

The pages layer is called `views` because Next.js reads a `src/pages` folder as the Pages
Router. Each slice exposes a public `index.ts`. `pnpm lint` checks the layer import direction
(`eslint-plugin-boundaries`) and the slice structure (`steiger`).

Styling is Tailwind CSS 4 only; the design tokens (palette colors, radii, type scale, easing)
are in the `@theme` blocks of `src/app/globals.css`.

## Deploy

- **CI** (`.github/workflows/ci.yml`, required check `ci`): format, lint, typecheck, unit
  tests, build and E2E tests on every pull request and push to `main`.
- **CD** (`.github/workflows/docker.yml`): after CI passed on `main`, builds the Docker image
  `ghcr.io/ali-moradi-design/portfolio:<commit SHA>`, then
  [deploy-kit](https://github.com/ali-moradi-design/deploy-kit)'s `deploy-app.yml` sends the SHA
  over SSH. On the server the key is forced to `deploy-app portfolio`: it pulls the image, restarts
  with `up --wait` and rolls back by itself if the new container is not healthy. Then a few pages
  are checked through Nginx.

## Stack

Next.js 16 (App Router, React Compiler, Cache Components), React 19, TypeScript, Tailwind CSS 4,
next-themes, GSAP, Lenis, Highcharts, TanStack Table, Zod, WebGL2. Font: Huninn (one weight)
via `next/font/local`. Vitest and Playwright for tests.
