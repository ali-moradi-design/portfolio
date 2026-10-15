# Graph Report - portfolio  (2026-10-15)

## Corpus Check
- 62 files · ~12,648 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 18 file(s) not represented in the graph (top: .css 12, (none) 4, .ttf 1)

## Summary
- 301 nodes · 543 edges · 12 communities (11 shown, 1 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `22243ecd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Hero.tsx
- next
- Tests and Lint Setup
- Header.tsx
- content.ts
- CI/CD Workflows
- SampleDashboard.tsx
- TypeScript Config
- devDependencies
- RootLayout.tsx
- Inspector.tsx

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `TOKENS` - 12 edges
3. `useTheme()` - 12 edges
4. `react` - 11 edges
5. `next` - 10 edges
6. `Inspector()` - 10 edges
7. `SampleDashboard()` - 10 edges
8. `describe()` - 9 edges
9. `parseColor()` - 9 edges
10. `scripts` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Huninn Font OFL License` --conceptually_related_to--> `Inter font via next/font`  [AMBIGUOUS]
  src/app/fonts/OFL-Huninn.txt → README.md
- `CI Workflow (lint, typecheck, test, build, e2e)` --references--> `pnpm scripts (dev, build, start, lint)`  [INFERRED]
  .github/workflows/ci.yml → README.md
- `pnpm install --frozen-lockfile` --conceptually_related_to--> `pnpm allowBuilds (unrs-resolver: false)`  [INFERRED]
  .github/workflows/ci.yml → pnpm-workspace.yaml
- `Ali Moradi 3D Personal Portfolio` --references--> `ali-moradi-develop.com`  [EXTRACTED]
  README.md → .github/workflows/docker.yml
- `Inspector()` --calls--> `Button()`  [EXTRACTED]
  src/features/inspect-element/ui/Inspector.tsx → src/shared/ui/button/Button.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **CI/CD flow: build image to ghcr, SSH deploy via compose, health check** — _github_workflows_docker_image_job, _github_workflows_docker_ghcr_portfolio_image, _github_workflows_docker_deploy_job, _github_workflows_docker_srv_apps_portfolio, _github_workflows_docker_site_health_check [EXTRACTED 1.00]

## Communities (12 total, 1 thin omitted)

### Community 0 - "Hero.tsx"
Cohesion: 0.10
Nodes (15): alt, contentType, OpenGraphImage(), size, tick(), HomePage(), hero, person (+7 more)

### Community 1 - "next"
Cohesion: 0.17
Nodes (11): contentType, size, contentType, size, nextConfig, next, LOGO_BRACKETS, LOGO_LETTERS (+3 more)

### Community 2 - "Tests and Lint Setup"
Cohesion: 0.06
Nodes (32): eslintConfig, dependencies, highcharts, highcharts-react-official, next, react, react-dom, @tanstack/react-table (+24 more)

### Community 3 - "Header.tsx"
Cohesion: 0.13
Nodes (17): ThemeSwitcher(), Button(), ButtonLink(), classes(), Inner(), Size, Variant, Logo() (+9 more)

### Community 4 - "content.ts"
Cohesion: 0.18
Nodes (10): aboutHighlights, experience, nav, Role, seo, servicesWords, skillGroups, summary (+2 more)

### Community 5 - "CI/CD Workflows"
Cohesion: 0.08
Nodes (26): CI Workflow (lint, typecheck, test, build, e2e), Playwright E2E Tests (chromium), Playwright Report Artifact Upload (on failure), pnpm install --frozen-lockfile, ali-moradi-develop.com, Deploy Job (SSH, compose pull/up --wait), Docker Workflow (build, push, deploy), GitHub Actions build cache (type=gha) (+18 more)

### Community 6 - "SampleDashboard.tsx"
Cohesion: 0.10
Nodes (20): highcharts, highcharts-react-official, @tanstack/react-table, Chart(), HcChart, alpha(), baseOptions(), RangeKey (+12 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "devDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, eslint, eslint-config-next, @feature-sliced/steiger-plugin, @playwright/test, steiger, @types/node, @types/react (+3 more)

### Community 9 - "RootLayout.tsx"
Cohesion: 0.11
Nodes (26): react, css, metadata, RootLayout(), viewport, huninn, Mode, Palette (+18 more)

### Community 11 - "Inspector.tsx"
Cohesion: 0.11
Nodes (28): vitest, AA_GRAPHICS, AA_TEXT, GRAPHIC_ROLES, isGraphicRole(), isToken(), parseTokens(), TokenGroup (+20 more)

## Ambiguous Edges - Review These
- `Inter font via next/font` → `Huninn Font OFL License`  [AMBIGUOUS]
  src/app/fonts/OFL-Huninn.txt · relation: conceptually_related_to

## Knowledge Gaps
- **14 isolated node(s):** `react-dom`, `@types/node`, `@types/react`, `@types/react-dom`, `typescript` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 124 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `RootLayout.tsx` to `Hero.tsx`, `Tests and Lint Setup`, `Header.tsx`, `SampleDashboard.tsx`, `Inspector.tsx`?**
  _High betweenness centrality (0.203) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `useTheme()` (e.g. with `read()` and `serverSnapshot()`) actually correct?**
  _`useTheme()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `react-dom`, `@types/node`, `@types/react` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Hero.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1010752688172043 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `Hero.tsx`, `Tests and Lint Setup`, `Header.tsx`, `SampleDashboard.tsx`, `RootLayout.tsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `Tests and Lint Setup` be split into smaller, more focused modules?**
  _Cohesion score 0.057057057057057055 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Inter font via next/font` and `Huninn Font OFL License`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._