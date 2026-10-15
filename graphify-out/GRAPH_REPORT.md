# Graph Report - portfolio  (2026-10-15)

## Corpus Check
- 124 files · ~26,127 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .ttf 1, .woff2 1)

## Summary
- 535 nodes · 1187 edges · 23 communities (19 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `33b9cc6c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- scripts
- lib/logo/index.ts
- package.json
- Button.tsx
- react
- CI/CD Workflows
- SampleDashboard.tsx
- TypeScript Config
- devDependencies
- RootLayout.tsx
- project/index.ts
- Inspector.tsx
- .prettierrc.json
- Code style
- WorkSamples.tsx
- dependencies
- eslint.config.mjs
- DashboardBuilderSample.tsx
- @playwright/test
- engines
- motion/index.ts
- FormBuilderSample.tsx
- @feature-sliced/steiger-plugin

## God Nodes (most connected - your core abstractions)
1. `cn()` - 42 edges
2. `react` - 25 edges
3. `compilerOptions` - 16 edges
4. `Section()` - 15 edges
5. `next` - 14 edges
6. `useTheme()` - 14 edges
7. `Reveal()` - 14 edges
8. `HomePage()` - 13 edges
9. `vitest` - 12 edges
10. `Project` - 12 edges

## Surprising Connections (you probably didn't know these)
- `Huninn Font OFL License` --conceptually_related_to--> `Inter font via next/font`  [AMBIGUOUS]
  src/app/fonts/OFL-Huninn.txt → README.md
- `CI Workflow (lint, typecheck, test, build, e2e)` --references--> `pnpm scripts (dev, build, start, lint)`  [INFERRED]
  .github/workflows/ci.yml → README.md
- `pnpm install --frozen-lockfile` --conceptually_related_to--> `pnpm allowBuilds (unrs-resolver: false)`  [INFERRED]
  .github/workflows/ci.yml → pnpm-workspace.yaml
- `columns` --calls--> `cn()`  [EXTRACTED]
  src/widgets/sample-dashboard/ui/ServicesTable.tsx → src/shared/lib/cn/cn.ts
- `Ali Moradi 3D Personal Portfolio` --references--> `ali-moradi-develop.com`  [EXTRACTED]
  README.md → .github/workflows/docker.yml

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **CI/CD flow: build image to ghcr, SSH deploy via compose, health check** — _github_workflows_docker_image_job, _github_workflows_docker_ghcr_portfolio_image, _github_workflows_docker_deploy_job, _github_workflows_docker_srv_apps_portfolio, _github_workflows_docker_site_health_check [EXTRACTED 1.00]

## Communities (23 total, 4 thin omitted)

### Community 0 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, dev, format, format:check, lint, start, start:standalone (+3 more)

### Community 1 - "lib/logo/index.ts"
Cohesion: 0.32
Nodes (7): contentType, size, LOGO_BRACKETS, LOGO_LETTERS, LOGO_STROKES, LOGO_VIEWBOX, logoSvg()

### Community 2 - "package.json"
Cohesion: 0.13
Nodes (14): name, packageManager, private, version, babel-plugin-react-compiler, prettier, prettier-plugin-tailwindcss, react-dom (+6 more)

### Community 3 - "Button.tsx"
Cohesion: 0.10
Nodes (27): nextConfig, clsx, next, tailwind-merge, ThemeSwitcher(), cn(), twMerge, Button() (+19 more)

### Community 4 - "react"
Cohesion: 0.12
Nodes (15): react, alt, contentType, OpenGraphImage(), size, tick(), hero, person (+7 more)

### Community 5 - "CI/CD Workflows"
Cohesion: 0.08
Nodes (26): CI Workflow (lint, typecheck, test, build, e2e), Playwright E2E Tests (chromium), Playwright Report Artifact Upload (on failure), pnpm install --frozen-lockfile, ali-moradi-develop.com, Deploy Job (SSH, compose pull/up --wait), Docker Workflow (build, push, deploy), GitHub Actions build cache (type=gha) (+18 more)

### Community 6 - "SampleDashboard.tsx"
Cohesion: 0.10
Nodes (22): highcharts, highcharts-react-official, @tanstack/react-table, Chart(), HcChart, alpha(), baseOptions(), Legend() (+14 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, eslint-config-prettier, eslint-plugin-boundaries, @feature-sliced/steiger-plugin, @playwright/test (+10 more)

### Community 9 - "RootLayout.tsx"
Cohesion: 0.09
Nodes (30): next-themes, huninn, contentType, size, metadata, RootLayout(), themeStyles, viewport (+22 more)

### Community 10 - "project/index.ts"
Cohesion: 0.09
Nodes (45): metadata, Page(), applyFilters(), facets(), filtersToQuery(), haystack(), isFiltered(), isSort() (+37 more)

### Community 11 - "Inspector.tsx"
Cohesion: 0.10
Nodes (31): vitest, AA_GRAPHICS, AA_TEXT, GRAPHIC_ROLES, isGraphicRole(), isToken(), parseTokens(), spacingPx() (+23 more)

### Community 12 - ".prettierrc.json"
Cohesion: 0.50
Nodes (3): plugins, tailwindFunctions, tailwindStylesheet

### Community 14 - "WorkSamples.tsx"
Cohesion: 0.09
Nodes (27): Page(), CopyButton(), approach, coreSkills, experience, facts, nav, Role (+19 more)

### Community 15 - "dependencies"
Cohesion: 0.14
Nodes (14): dependencies, clsx, gsap, @gsap/react, highcharts, highcharts-react-official, lenis, next (+6 more)

### Community 16 - "eslint.config.mjs"
Cohesion: 0.22
Nodes (8): eslintConfig, fsd, layers, sliced, eslint, eslint-config-next, eslint-config-prettier, eslint-plugin-boundaries

### Community 17 - "DashboardBuilderSample.tsx"
Cohesion: 0.08
Nodes (31): Tag(), linePath(), series(), CATALOG, DashboardBuilderSample(), insert(), Kind, KINDS (+23 more)

### Community 20 - "motion/index.ts"
Cohesion: 0.14
Nodes (10): gsap, @gsap/react, lenis, Fx, fxOff(), EASE, prefersReducedMotion(), motionScript (+2 more)

### Community 21 - "FormBuilderSample.tsx"
Cohesion: 0.19
Nodes (13): zod, buildSchema(), FieldConfig, fieldSchema(), FieldType, MISSING, readForm(), fields (+5 more)

## Ambiguous Edges - Review These
- `Inter font via next/font` → `Huninn Font OFL License`  [AMBIGUOUS]
  src/app/fonts/OFL-Huninn.txt · relation: conceptually_related_to

## Knowledge Gaps
- **19 isolated node(s):** `react-dom`, `@tailwindcss/turbopack`, `@types/node`, `@types/react`, `@types/react-dom` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 189 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `package.json`, `Button.tsx`, `SampleDashboard.tsx`, `RootLayout.tsx`, `project/index.ts`, `Inspector.tsx`, `WorkSamples.tsx`, `DashboardBuilderSample.tsx`, `motion/index.ts`, `FormBuilderSample.tsx`?**
  _High betweenness centrality (0.231) - this node is a cross-community bridge._
- **What connects `react-dom`, `@tailwindcss/turbopack`, `@types/node` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `cn()` connect `Button.tsx` to `SampleDashboard.tsx`, `project/index.ts`, `Inspector.tsx`, `WorkSamples.tsx`, `DashboardBuilderSample.tsx`, `FormBuilderSample.tsx`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Should `Button.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10104529616724739 - nodes in this community are weakly interconnected._
- **Why does `next` connect `Button.tsx` to `lib/logo/index.ts`, `package.json`, `react`, `SampleDashboard.tsx`, `RootLayout.tsx`, `project/index.ts`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Inter font via next/font` and `Huninn Font OFL License`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._