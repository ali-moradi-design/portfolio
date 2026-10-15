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

| Command      | What it does             |
| ------------ | ------------------------ |
| `pnpm build` | Production build         |
| `pnpm start` | Run the production build |
| `pnpm lint`  | ESLint and steiger (FSD) |

## What is inside

- Home: a one-viewport hero (name with a WebGL2 fluid trail, bio, and a live sample dashboard
  inside an inspector that reports design tokens and WCAG contrast). More sections are on the way.
- Three palettes (Sage, Midnight, Inferno), each light and dark, remembered in localStorage and
  applied before the first paint
- Content lives in `src/shared/config/content.ts`

## Structure

[Feature-Sliced Design](https://feature-sliced.design), checked by `steiger` in `pnpm lint`:

| Folder | Holds |
| --- | --- |
| `app/` | Next.js routes only; each file re-exports from `src/` |
| `src/app` | Root layout, global styles, fonts |
| `src/pages` | Pages (`home`) |
| `src/widgets` | Page blocks: `header`, `hero`, `sample-dashboard` |
| `src/features` | `inspect-element`, `switch-theme` |
| `src/shared` | Config (tokens, content), lib (theme, contrast, logo), UI (button, pixels, chart, ...) |

`pages/README.md` keeps Next.js from reading `src/pages` as the Pages Router.
Styles are CSS Modules next to each component; there are no global class names.

## Stack

Next.js 16, React 19, TypeScript, CSS Modules, Highcharts, TanStack Table, WebGL2.

Font: Huninn (one weight) via `next/font/local`.

Reduced motion turns off the trail and all transitions.
