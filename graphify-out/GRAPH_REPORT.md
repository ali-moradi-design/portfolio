# Graph Report - portfolio  (2026-10-15)

## Corpus Check
- 129 files · ~28,038 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .ttf 1, .woff2 1)

## Summary
- 552 nodes · 1302 edges · 21 communities (19 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e0a31dac`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- scripts
- next
- package.json
- Button.tsx
- cn
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
- FormBuilderSample.tsx
- dependencies
- DashboardBuilderSample.tsx
- eslint.config.mjs
- @playwright/test
- motion/index.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 49 edges
2. `react` - 29 edges
3. `next` - 16 edges
4. `compilerOptions` - 16 edges
5. `Section()` - 15 edges
6. `typeLabel()` - 14 edges
7. `ResultCount()` - 14 edges
8. `Results()` - 14 edges
9. `useTheme()` - 14 edges
10. `ProjectsPage()` - 14 edges

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

## Communities (21 total, 2 thin omitted)

### Community 0 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, dev, format, format:check, lint, start, start:standalone (+3 more)

### Community 1 - "next"
Cohesion: 0.11
Nodes (15): contentType, size, contentType, size, alt, contentType, OpenGraphImage(), size (+7 more)

### Community 2 - "package.json"
Cohesion: 0.11
Nodes (18): engines, node, name, packageManager, private, version, babel-plugin-react-compiler, @feature-sliced/steiger-plugin (+10 more)

### Community 3 - "Button.tsx"
Cohesion: 0.08
Nodes (30): nextConfig, next, metadata, Page(), metadata, Page(), FILTER_DESIGNS, ProjectsBrowser() (+22 more)

### Community 4 - "cn"
Cohesion: 0.22
Nodes (26): clsx, tailwind-merge, Sort, SORTS, FilterState, ActiveChips(), chip, Dropdown() (+18 more)

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
Nodes (34): next-themes, huninn, metadata, RootLayout(), themeStyles, viewport, Mode, Palette (+26 more)

### Community 10 - "project/index.ts"
Cohesion: 0.13
Nodes (28): applyFilters(), facets(), filtersToQuery(), haystack(), isFiltered(), isSort(), isType(), NO_FILTERS (+20 more)

### Community 11 - "Inspector.tsx"
Cohesion: 0.10
Nodes (31): vitest, AA_GRAPHICS, AA_TEXT, GRAPHIC_ROLES, isGraphicRole(), isToken(), parseTokens(), spacingPx() (+23 more)

### Community 12 - ".prettierrc.json"
Cohesion: 0.50
Nodes (3): plugins, tailwindFunctions, tailwindStylesheet

### Community 14 - "WorkSamples.tsx"
Cohesion: 0.06
Nodes (35): react, Page(), CopyButton(), approach, coreSkills, experience, facts, nav (+27 more)

### Community 15 - "FormBuilderSample.tsx"
Cohesion: 0.19
Nodes (13): zod, buildSchema(), FieldConfig, fieldSchema(), FieldType, MISSING, readForm(), fields (+5 more)

### Community 16 - "dependencies"
Cohesion: 0.14
Nodes (14): dependencies, clsx, gsap, @gsap/react, highcharts, highcharts-react-official, lenis, next (+6 more)

### Community 17 - "DashboardBuilderSample.tsx"
Cohesion: 0.09
Nodes (30): linePath(), series(), CATALOG, DashboardBuilderSample(), insert(), Kind, KINDS, Range (+22 more)

### Community 18 - "eslint.config.mjs"
Cohesion: 0.22
Nodes (8): eslintConfig, fsd, layers, sliced, eslint, eslint-config-next, eslint-config-prettier, eslint-plugin-boundaries

### Community 20 - "motion/index.ts"
Cohesion: 0.22
Nodes (5): gsap, @gsap/react, lenis, EASE, motionScript

## Ambiguous Edges - Review These
- `Inter font via next/font` → `Huninn Font OFL License`  [AMBIGUOUS]
  src/app/fonts/OFL-Huninn.txt · relation: conceptually_related_to

## Knowledge Gaps
- **19 isolated node(s):** `react-dom`, `@tailwindcss/turbopack`, `@types/node`, `@types/react`, `@types/react-dom` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 193 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `WorkSamples.tsx` to `package.json`, `Button.tsx`, `cn`, `SampleDashboard.tsx`, `RootLayout.tsx`, `project/index.ts`, `Inspector.tsx`, `FormBuilderSample.tsx`, `DashboardBuilderSample.tsx`, `motion/index.ts`?**
  _High betweenness centrality (0.234) - this node is a cross-community bridge._
- **What connects `react-dom`, `@tailwindcss/turbopack`, `@types/node` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.10837438423645321 - nodes in this community are weakly interconnected._
- **Why does `cn()` connect `cn` to `Button.tsx`, `SampleDashboard.tsx`, `project/index.ts`, `Inspector.tsx`, `WorkSamples.tsx`, `FormBuilderSample.tsx`, `DashboardBuilderSample.tsx`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Why does `next` connect `Button.tsx` to `next`, `package.json`, `SampleDashboard.tsx`, `RootLayout.tsx`, `project/index.ts`, `WorkSamples.tsx`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Inter font via next/font` and `Huninn Font OFL License`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._