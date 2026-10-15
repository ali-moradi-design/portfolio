# Graph Report - portfolio  (2026-10-15)

## Corpus Check
- 122 files · ~25,793 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .ttf 1, .woff2 1)

## Summary
- 529 nodes · 1163 edges · 18 communities (17 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f47a24c1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- scripts
- next
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
- FormBuilderSample.tsx
- DashboardBuilderSample.tsx
- motion/index.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 42 edges
2. `react` - 25 edges
3. `compilerOptions` - 16 edges
4. `Section()` - 15 edges
5. `next` - 14 edges
6. `useTheme()` - 14 edges
7. `Reveal()` - 13 edges
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

## Communities (18 total, 1 thin omitted)

### Community 0 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, dev, format, format:check, lint, start, start:standalone (+3 more)

### Community 1 - "next"
Cohesion: 0.10
Nodes (17): nextConfig, next, contentType, size, contentType, size, alt, contentType (+9 more)

### Community 2 - "package.json"
Cohesion: 0.05
Nodes (42): eslintConfig, fsd, layers, sliced, dependencies, clsx, gsap, @gsap/react (+34 more)

### Community 3 - "Button.tsx"
Cohesion: 0.13
Nodes (20): ThemeSwitcher(), Button(), ButtonLink(), classes(), Inner(), Size, sizes, Variant (+12 more)

### Community 4 - "react"
Cohesion: 0.28
Nodes (8): react, FitStage(), Hero(), compile(), Double, Fbo, link(), TrailField()

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
Cohesion: 0.11
Nodes (28): next-themes, huninn, metadata, RootLayout(), themeStyles, viewport, Mode, Palette (+20 more)

### Community 10 - "project/index.ts"
Cohesion: 0.10
Nodes (39): applyFilters(), facets(), filtersToQuery(), haystack(), isFiltered(), isSort(), isType(), NO_FILTERS (+31 more)

### Community 11 - "Inspector.tsx"
Cohesion: 0.10
Nodes (31): vitest, AA_GRAPHICS, AA_TEXT, GRAPHIC_ROLES, isGraphicRole(), isToken(), parseTokens(), spacingPx() (+23 more)

### Community 12 - ".prettierrc.json"
Cohesion: 0.50
Nodes (3): plugins, tailwindFunctions, tailwindStylesheet

### Community 14 - "WorkSamples.tsx"
Cohesion: 0.07
Nodes (33): Page(), metadata, Page(), projectGrid, CopyButton(), approach, coreSkills, experience (+25 more)

### Community 15 - "FormBuilderSample.tsx"
Cohesion: 0.19
Nodes (13): zod, buildSchema(), FieldConfig, fieldSchema(), FieldType, MISSING, readForm(), fields (+5 more)

### Community 17 - "DashboardBuilderSample.tsx"
Cohesion: 0.08
Nodes (35): clsx, tailwind-merge, cn(), twMerge, Tag(), linePath(), series(), CATALOG (+27 more)

### Community 20 - "motion/index.ts"
Cohesion: 0.16
Nodes (7): @gsap/react, lenis, EASE, prefersReducedMotion(), motionScript, SmoothScroll(), Props

## Ambiguous Edges - Review These
- `Inter font via next/font` → `Huninn Font OFL License`  [AMBIGUOUS]
  src/app/fonts/OFL-Huninn.txt · relation: conceptually_related_to

## Knowledge Gaps
- **19 isolated node(s):** `react-dom`, `@tailwindcss/turbopack`, `@types/node`, `@types/react`, `@types/react-dom` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 189 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `package.json`, `Button.tsx`, `SampleDashboard.tsx`, `RootLayout.tsx`, `project/index.ts`, `Inspector.tsx`, `WorkSamples.tsx`, `FormBuilderSample.tsx`, `DashboardBuilderSample.tsx`, `motion/index.ts`?**
  _High betweenness centrality (0.230) - this node is a cross-community bridge._
- **What connects `react-dom`, `@tailwindcss/turbopack`, `@types/node` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.09879032258064516 - nodes in this community are weakly interconnected._
- **Why does `cn()` connect `DashboardBuilderSample.tsx` to `Button.tsx`, `SampleDashboard.tsx`, `project/index.ts`, `Inspector.tsx`, `WorkSamples.tsx`, `FormBuilderSample.tsx`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.04521276595744681 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `package.json`, `Button.tsx`, `SampleDashboard.tsx`, `RootLayout.tsx`, `project/index.ts`, `WorkSamples.tsx`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Inter font via next/font` and `Huninn Font OFL License`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._