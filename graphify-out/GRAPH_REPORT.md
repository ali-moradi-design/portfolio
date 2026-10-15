# Graph Report - portfolio  (2026-10-15)

## Corpus Check
- 67 files · ~14,530 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .ttf 1, .woff2 1)

## Summary
- 337 nodes · 601 edges · 14 communities (13 shown, 1 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `27063b8c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Button.tsx
- next
- Tests and Lint Setup
- Header.tsx
- opengraph-image.tsx
- CI/CD Workflows
- SampleDashboard.tsx
- TypeScript Config
- devDependencies
- RootLayout.tsx
- scripts
- Inspector.tsx
- .prettierrc.json
- Code style

## God Nodes (most connected - your core abstractions)
1. `cn()` - 16 edges
2. `compilerOptions` - 16 edges
3. `TOKENS` - 12 edges
4. `useTheme()` - 12 edges
5. `SampleDashboard()` - 12 edges
6. `scripts` - 11 edges
7. `next` - 10 edges
8. `react` - 10 edges
9. `Inspector()` - 10 edges
10. `vitest` - 9 edges

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

## Communities (14 total, 1 thin omitted)

### Community 0 - "Button.tsx"
Cohesion: 0.16
Nodes (16): react, Button(), ButtonLink(), classes(), Inner(), Size, sizes, Variant (+8 more)

### Community 1 - "next"
Cohesion: 0.18
Nodes (11): nextConfig, next, contentType, size, contentType, size, LOGO_BRACKETS, LOGO_LETTERS (+3 more)

### Community 2 - "Tests and Lint Setup"
Cohesion: 0.05
Nodes (37): eslintConfig, fsd, layers, sliced, dependencies, clsx, highcharts, highcharts-react-official (+29 more)

### Community 3 - "Header.tsx"
Cohesion: 0.15
Nodes (14): Page(), ThemeSwitcher(), Logo(), cache, delays(), noise(), pixelHost, pixelLabel (+6 more)

### Community 4 - "opengraph-image.tsx"
Cohesion: 0.09
Nodes (17): alt, contentType, OpenGraphImage(), size, tick(), aboutHighlights, experience, hero (+9 more)

### Community 5 - "CI/CD Workflows"
Cohesion: 0.08
Nodes (26): CI Workflow (lint, typecheck, test, build, e2e), Playwright E2E Tests (chromium), Playwright Report Artifact Upload (on failure), pnpm install --frozen-lockfile, ali-moradi-develop.com, Deploy Job (SSH, compose pull/up --wait), Docker Workflow (build, push, deploy), GitHub Actions build cache (type=gha) (+18 more)

### Community 6 - "SampleDashboard.tsx"
Cohesion: 0.09
Nodes (26): clsx, highcharts, highcharts-react-official, tailwind-merge, @tanstack/react-table, cn(), twMerge, Chart() (+18 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, eslint-config-prettier, eslint-plugin-boundaries, @feature-sliced/steiger-plugin, @playwright/test (+10 more)

### Community 9 - "RootLayout.tsx"
Cohesion: 0.12
Nodes (26): next-themes, huninn, metadata, RootLayout(), themeStyles, viewport, Mode, Palette (+18 more)

### Community 10 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, dev, format, format:check, lint, start, start:standalone (+3 more)

### Community 11 - "Inspector.tsx"
Cohesion: 0.10
Nodes (31): vitest, AA_GRAPHICS, AA_TEXT, GRAPHIC_ROLES, isGraphicRole(), isToken(), parseTokens(), spacingPx() (+23 more)

### Community 12 - ".prettierrc.json"
Cohesion: 0.50
Nodes (3): plugins, tailwindFunctions, tailwindStylesheet

## Ambiguous Edges - Review These
- `Inter font via next/font` → `Huninn Font OFL License`  [AMBIGUOUS]
  src/app/fonts/OFL-Huninn.txt · relation: conceptually_related_to

## Knowledge Gaps
- **19 isolated node(s):** `react-dom`, `@tailwindcss/turbopack`, `@types/node`, `@types/react`, `@types/react-dom` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 148 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Button.tsx` to `Tests and Lint Setup`, `Header.tsx`, `SampleDashboard.tsx`, `RootLayout.tsx`, `Inspector.tsx`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `useTheme()` (e.g. with `noop()` and `readPalette()`) actually correct?**
  _`useTheme()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `react-dom`, `@tailwindcss/turbopack`, `@types/node` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Tests and Lint Setup` be split into smaller, more focused modules?**
  _Cohesion score 0.05226480836236934 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `Button.tsx`, `Tests and Lint Setup`, `Header.tsx`, `opengraph-image.tsx`, `SampleDashboard.tsx`, `RootLayout.tsx`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Should `opengraph-image.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Inter font via next/font` and `Huninn Font OFL License`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._