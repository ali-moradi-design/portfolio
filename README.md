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
| `pnpm lint`  | Run ESLint               |

## What is inside

- Single page with anchored sections: Work, Experience, Skills, About, Contact
- Cell nav: ALI/MORADI on the left, hamburger (Menu/X) on the right
- Hero is a viewport instrument frame with numbered corners. A full-bleed particle ring
  sits behind a left-aligned glass copy card; the right column is empty
- Content lives in `src/data/content.ts` so copy is easy to edit

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lenis,
three.js / React Three Fiber (hero particle ring only, loaded client-side with `ssr: false`).

Font: Inter (light 300, wide tracking, mostly uppercase) via `next/font`.

Motion: Framer Motion clip-path and y-reveals, Lenis smooth scroll.
Reduced-motion turns off the clip tricks, Lenis and the 3D particle ring.
