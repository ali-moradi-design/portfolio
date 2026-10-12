# Ali Moradi — Personal portfolio

A Next.js App Router + TypeScript portfolio. Dark instrument-panel layout on `#1C1C1C` with a hairline grid and teal accent (`#3FD0B8`).

Visual language is inspired by [vanlent.dev](https://vanlent.dev/) as look and feel only — numbered hero corners, grid cells, clip-path title reveals. None of Tim van Lent’s copy, projects, name, phone, logo, or branding is used.

Unzip and open in VS Code.

## Local setup

Need Node.js 20+ (20.19 or 22 LTS recommended). Scripts are in package.json: dev, build, start, lint. After the server is up, open http://localhost:3000

The dev server uses Turbopack by default in this Next.js version.

## What is inside

- Single page with anchored sections: Work, Experience, Skills, About, Contact
- Cell nav: ALI/MORADI left, hamburger (Menu/X) right — no clock
- Hero is a viewport instrument frame with numbered corners. A full-bleed particle ring sits behind a left-aligned glass copy card; the right column is empty
- Content lives in src/data/content.ts so copy is easy to edit
- Copy matches the CV. No invented metrics, extra links, or headshot.

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lenis, three.js / React Three Fiber (hero particle ring only, loaded client-side with `ssr: false`).

Font: Inter (light 300, wide tracking, mostly uppercase) via next/font.

Motion: Framer Motion clip-path and y-reveals. Lenis smooth scroll. Reduced-motion turns clip tricks, Lenis, and the 3D particle ring off.

some change
