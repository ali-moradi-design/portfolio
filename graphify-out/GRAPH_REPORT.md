# Graph Report - portfolio  (2026-10-15)

## Corpus Check
- 95 files · ~19,420 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .ttf 1, .woff2 1)

## Summary
- 430 nodes · 839 edges · 17 communities (16 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f8299b7f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Button.tsx
- next
- Tests and Lint Setup
- Header.tsx
- SelectedWork.tsx
- CI/CD Workflows
- SampleDashboard.tsx
- TypeScript Config
- devDependencies
- RootLayout.tsx
- scripts
- Inspector.tsx
- .prettierrc.json
- Code style
- DashboardBuilderSample.tsx
- FormBuilderSample.tsx
- dependencies

## God Nodes (most connected - your core abstractions)
1. `cn()` - 30 edges
2. `react` - 18 edges
3. `compilerOptions` - 16 edges
4. `Section()` - 13 edges
5. `HomePage()` - 13 edges
6. `TOKENS` - 12 edges
7. `useTheme()` - 12 edges
8. `SampleDashboard()` - 12 edges
9. `scripts` - 11 edges
10. `next` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Huninn Font OFL License` --conceptually_related_to--> `Inter font via next/font`  [AMBIGUOUS]
  src/app/fonts/OFL-Huninn.txt → README.md
- `CI Workflow (lint, typecheck, test, build, e2e)` --references--> `pnpm scripts (dev, build, start, lint)`  [INFERRED]
  .github/workflows/ci.yml → README.md
- `pnpm install --frozen-lockfile` --conceptually_related_to--> `pnpm allowBuilds (unrs-resolver: false)`  [INFERRED]
  .github/workflows/ci.yml → pnpm-workspace.yaml
- `Ali Moradi 3D Personal Portfolio` --references--> `ali-moradi-develop.com`  [EXTRACTED]
  README.md → .github/workflows/docker.yml
- `Page()` --calls--> `HomePage()`  [EXTRACTED]
  src/app/page.tsx → src/views/home/ui/HomePage.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **CI/CD flow: build image to ghcr, SSH deploy via compose, health check** — _github_workflows_docker_image_job, _github_workflows_docker_ghcr_portfolio_image, _github_workflows_docker_deploy_job, _github_workflows_docker_srv_apps_portfolio, _github_workflows_docker_site_health_check [EXTRACTED 1.00]

## Communities (17 total, 1 thin omitted)

### Community 0 - "Button.tsx"
Cohesion: 0.28
Nodes (8): react, FitStage(), Hero(), compile(), Double, Fbo, link(), TrailField()

### Community 1 - "next"
Cohesion: 0.11
Nodes (15): contentType, size, contentType, size, alt, contentType, OpenGraphImage(), size (+7 more)

### Community 2 - "Tests and Lint Setup"
Cohesion: 0.06
Nodes (29): eslintConfig, fsd, layers, sliced, engines, node, name, packageManager (+21 more)

### Community 3 - "Header.tsx"
Cohesion: 0.09
Nodes (30): ThemeSwitcher(), Button(), ButtonLink(), classes(), Inner(), Size, sizes, Variant (+22 more)

### Community 4 - "SelectedWork.tsx"
Cohesion: 0.07
Nodes (30): Page(), CopyButton(), approach, coreSkills, experience, facts, nav, person (+22 more)

### Community 5 - "CI/CD Workflows"
Cohesion: 0.08
Nodes (26): CI Workflow (lint, typecheck, test, build, e2e), Playwright E2E Tests (chromium), Playwright Report Artifact Upload (on failure), pnpm install --frozen-lockfile, ali-moradi-develop.com, Deploy Job (SSH, compose pull/up --wait), Docker Workflow (build, push, deploy), GitHub Actions build cache (type=gha) (+18 more)

### Community 6 - "SampleDashboard.tsx"
Cohesion: 0.10
Nodes (24): highcharts, highcharts-react-official, @tanstack/react-table, cn(), twMerge, Chart(), HcChart, alpha() (+16 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, eslint-config-prettier, eslint-plugin-boundaries, @feature-sliced/steiger-plugin, @playwright/test (+10 more)

### Community 9 - "RootLayout.tsx"
Cohesion: 0.11
Nodes (28): nextConfig, next, next-themes, huninn, metadata, RootLayout(), themeStyles, viewport (+20 more)

### Community 10 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, dev, format, format:check, lint, start, start:standalone (+3 more)

### Community 11 - "Inspector.tsx"
Cohesion: 0.10
Nodes (31): vitest, AA_GRAPHICS, AA_TEXT, GRAPHIC_ROLES, isGraphicRole(), isToken(), parseTokens(), spacingPx() (+23 more)

### Community 12 - ".prettierrc.json"
Cohesion: 0.50
Nodes (3): plugins, tailwindFunctions, tailwindStylesheet

### Community 14 - "DashboardBuilderSample.tsx"
Cohesion: 0.18
Nodes (16): linePath(), series(), MiniBars(), MiniLine(), CATALOG, DashboardBuilderSample(), insert(), Kind (+8 more)

### Community 15 - "FormBuilderSample.tsx"
Cohesion: 0.19
Nodes (13): zod, buildSchema(), FieldConfig, fieldSchema(), FieldType, MISSING, readForm(), fields (+5 more)

### Community 16 - "dependencies"
Cohesion: 0.18
Nodes (11): dependencies, clsx, highcharts, highcharts-react-official, next, next-themes, react, react-dom (+3 more)

## Ambiguous Edges - Review These
- `Inter font via next/font` → `Huninn Font OFL License`  [AMBIGUOUS]
  src/app/fonts/OFL-Huninn.txt · relation: conceptually_related_to

## Knowledge Gaps
- **19 isolated node(s):** `react-dom`, `@tailwindcss/turbopack`, `@types/node`, `@types/react`, `@types/react-dom` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 173 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Button.tsx` to `Tests and Lint Setup`, `Header.tsx`, `SelectedWork.tsx`, `SampleDashboard.tsx`, `RootLayout.tsx`, `Inspector.tsx`, `DashboardBuilderSample.tsx`, `FormBuilderSample.tsx`?**
  _High betweenness centrality (0.194) - this node is a cross-community bridge._
- **What connects `react-dom`, `@tailwindcss/turbopack`, `@types/node` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.10837438423645321 - nodes in this community are weakly interconnected._
- **Why does `cn()` connect `SampleDashboard.tsx` to `Header.tsx`, `SelectedWork.tsx`, `Inspector.tsx`, `DashboardBuilderSample.tsx`, `FormBuilderSample.tsx`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Should `Tests and Lint Setup` be split into smaller, more focused modules?**
  _Cohesion score 0.06386554621848739 - nodes in this community are weakly interconnected._
- **Why does `next` connect `RootLayout.tsx` to `next`, `Tests and Lint Setup`, `Header.tsx`, `SelectedWork.tsx`, `SampleDashboard.tsx`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Inter font via next/font` and `Huninn Font OFL License`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._