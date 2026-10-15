# Graph Report - portfolio  (2026-10-15)

## Corpus Check
- 121 files · ~26,313 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .ttf 1, .woff2 1)

## Summary
- 519 nodes · 1211 edges · 22 communities (18 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1bac4547`
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
- @feature-sliced/steiger-plugin
- engines

## God Nodes (most connected - your core abstractions)
1. `cn()` - 49 edges
2. `react` - 25 edges
3. `next` - 16 edges
4. `compilerOptions` - 16 edges
5. `typeLabel()` - 14 edges
6. `ResultCount()` - 14 edges
7. `Results()` - 14 edges
8. `Section()` - 13 edges
9. `HomePage()` - 13 edges
10. `ProjectsPage()` - 13 edges

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

## Communities (22 total, 4 thin omitted)

### Community 0 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, dev, format, format:check, lint, start, start:standalone (+3 more)

### Community 1 - "next"
Cohesion: 0.07
Nodes (26): nextConfig, next, contentType, size, contentType, size, alt, contentType (+18 more)

### Community 2 - "package.json"
Cohesion: 0.12
Nodes (15): name, packageManager, private, version, babel-plugin-react-compiler, highcharts-react-official, prettier, prettier-plugin-tailwindcss (+7 more)

### Community 3 - "Button.tsx"
Cohesion: 0.09
Nodes (30): ThemeSwitcher(), Button(), ButtonLink(), classes(), Inner(), Size, sizes, Variant (+22 more)

### Community 4 - "cn"
Cohesion: 0.22
Nodes (27): clsx, react, tailwind-merge, Sort, SORTS, FilterState, ActiveChips(), chip (+19 more)

### Community 5 - "CI/CD Workflows"
Cohesion: 0.08
Nodes (26): CI Workflow (lint, typecheck, test, build, e2e), Playwright E2E Tests (chromium), Playwright Report Artifact Upload (on failure), pnpm install --frozen-lockfile, ali-moradi-develop.com, Deploy Job (SSH, compose pull/up --wait), Docker Workflow (build, push, deploy), GitHub Actions build cache (type=gha) (+18 more)

### Community 6 - "SampleDashboard.tsx"
Cohesion: 0.10
Nodes (21): highcharts, @tanstack/react-table, Chart(), HcChart, alpha(), baseOptions(), Legend(), RangeKey (+13 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, eslint-config-prettier, eslint-plugin-boundaries, @feature-sliced/steiger-plugin, @playwright/test (+10 more)

### Community 9 - "RootLayout.tsx"
Cohesion: 0.12
Nodes (26): next-themes, huninn, metadata, RootLayout(), themeStyles, viewport, Mode, Palette (+18 more)

### Community 10 - "project/index.ts"
Cohesion: 0.12
Nodes (30): applyFilters(), facets(), filtersToQuery(), haystack(), isFiltered(), isSort(), isType(), NO_FILTERS (+22 more)

### Community 11 - "Inspector.tsx"
Cohesion: 0.08
Nodes (38): vitest, AA_GRAPHICS, AA_TEXT, GRAPHIC_ROLES, isGraphicRole(), isToken(), parseTokens(), spacingPx() (+30 more)

### Community 12 - ".prettierrc.json"
Cohesion: 0.50
Nodes (3): plugins, tailwindFunctions, tailwindStylesheet

### Community 14 - "WorkSamples.tsx"
Cohesion: 0.07
Nodes (28): Page(), CopyButton(), approach, coreSkills, experience, facts, hero, nav (+20 more)

### Community 15 - "FormBuilderSample.tsx"
Cohesion: 0.19
Nodes (13): zod, buildSchema(), FieldConfig, fieldSchema(), FieldType, MISSING, readForm(), fields (+5 more)

### Community 16 - "dependencies"
Cohesion: 0.18
Nodes (11): dependencies, clsx, highcharts, highcharts-react-official, next, next-themes, react, react-dom (+3 more)

### Community 17 - "DashboardBuilderSample.tsx"
Cohesion: 0.18
Nodes (16): linePath(), series(), CATALOG, DashboardBuilderSample(), insert(), Kind, KINDS, Range (+8 more)

### Community 18 - "eslint.config.mjs"
Cohesion: 0.22
Nodes (8): eslintConfig, fsd, layers, sliced, eslint, eslint-config-next, eslint-config-prettier, eslint-plugin-boundaries

## Ambiguous Edges - Review These
- `Inter font via next/font` → `Huninn Font OFL License`  [AMBIGUOUS]
  src/app/fonts/OFL-Huninn.txt · relation: conceptually_related_to

## Knowledge Gaps
- **19 isolated node(s):** `react-dom`, `@tailwindcss/turbopack`, `@types/node`, `@types/react`, `@types/react-dom` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 181 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `cn` to `next`, `package.json`, `Button.tsx`, `SampleDashboard.tsx`, `RootLayout.tsx`, `project/index.ts`, `Inspector.tsx`, `WorkSamples.tsx`, `FormBuilderSample.tsx`, `DashboardBuilderSample.tsx`?**
  _High betweenness centrality (0.193) - this node is a cross-community bridge._
- **What connects `react-dom`, `@tailwindcss/turbopack`, `@types/node` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.0693815987933635 - nodes in this community are weakly interconnected._
- **Why does `cn()` connect `cn` to `next`, `Button.tsx`, `SampleDashboard.tsx`, `project/index.ts`, `Inspector.tsx`, `WorkSamples.tsx`, `FormBuilderSample.tsx`, `DashboardBuilderSample.tsx`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `package.json`, `Button.tsx`, `SampleDashboard.tsx`, `RootLayout.tsx`, `project/index.ts`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Inter font via next/font` and `Huninn Font OFL License`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._