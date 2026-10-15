# Graph Report - portfolio  (2026-10-15)

## Corpus Check
- 123 files · ~26,549 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .ttf 1, .woff2 1)

## Summary
- 532 nodes · 1185 edges · 20 communities (18 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fd628e3d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- scripts
- opengraph-image.tsx
- package.json
- motion/index.ts
- react
- Deploy Job (SSH, compose pull/up --wait)
- SampleDashboard.tsx
- compilerOptions
- devDependencies
- config/index.ts
- project/index.ts
- Inspector.tsx
- .prettierrc.json
- Code style
- HomePage.tsx
- dependencies
- eslint.config.mjs
- cn
- @playwright/test
- react

## God Nodes (most connected - your core abstractions)
1. `cn()` - 42 edges
2. `react` - 26 edges
3. `next` - 16 edges
4. `compilerOptions` - 16 edges
5. `Section()` - 15 edges
6. `useTheme()` - 14 edges
7. `Reveal()` - 14 edges
8. `HomePage()` - 14 edges
9. `SampleDashboard()` - 13 edges
10. `vitest` - 12 edges

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

## Communities (20 total, 2 thin omitted)

### Community 0 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, dev, format, format:check, lint, start, test (+2 more)

### Community 1 - "opengraph-image.tsx"
Cohesion: 0.11
Nodes (17): nextConfig, next, contentType, size, contentType, size, alt, contentType (+9 more)

### Community 2 - "package.json"
Cohesion: 0.11
Nodes (18): engines, node, name, packageManager, private, version, babel-plugin-react-compiler, @feature-sliced/steiger-plugin (+10 more)

### Community 3 - "motion/index.ts"
Cohesion: 0.22
Nodes (5): gsap, @gsap/react, lenis, EASE, motionScript

### Community 4 - "react"
Cohesion: 0.31
Nodes (7): react, FitStage(), compile(), Double, Fbo, link(), TrailField()

### Community 5 - "Deploy Job (SSH, compose pull/up --wait)"
Cohesion: 0.08
Nodes (26): CI Workflow (lint, typecheck, test, build, e2e), Playwright E2E Tests (chromium), Playwright Report Artifact Upload (on failure), pnpm install --frozen-lockfile, ali-moradi-develop.com, Deploy Job (SSH, compose pull/up --wait), Docker Workflow (build, push, deploy), GitHub Actions build cache (type=gha) (+18 more)

### Community 6 - "SampleDashboard.tsx"
Cohesion: 0.10
Nodes (23): highcharts, highcharts-react-official, @tanstack/react-table, Chart(), HcChart, alpha(), baseOptions(), Legend() (+15 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, eslint-config-prettier, eslint-plugin-boundaries, @feature-sliced/steiger-plugin, @playwright/test (+10 more)

### Community 9 - "config/index.ts"
Cohesion: 0.10
Nodes (30): next-themes, huninn, metadata, RootLayout(), themeStyles, viewport, seo, Mode (+22 more)

### Community 10 - "project/index.ts"
Cohesion: 0.10
Nodes (36): applyFilters(), facets(), filtersToQuery(), haystack(), isFiltered(), isSort(), isType(), NO_FILTERS (+28 more)

### Community 11 - "Inspector.tsx"
Cohesion: 0.10
Nodes (31): vitest, AA_GRAPHICS, AA_TEXT, GRAPHIC_ROLES, isGraphicRole(), isToken(), parseTokens(), spacingPx() (+23 more)

### Community 12 - ".prettierrc.json"
Cohesion: 0.50
Nodes (3): plugins, tailwindFunctions, tailwindStylesheet

### Community 14 - "HomePage.tsx"
Cohesion: 0.07
Nodes (33): Page(), metadata, Page(), CopyButton(), approach, coreSkills, experience, facts (+25 more)

### Community 15 - "dependencies"
Cohesion: 0.14
Nodes (14): dependencies, clsx, gsap, @gsap/react, highcharts, highcharts-react-official, lenis, next (+6 more)

### Community 16 - "eslint.config.mjs"
Cohesion: 0.22
Nodes (8): eslintConfig, fsd, layers, sliced, eslint, eslint-config-next, eslint-config-prettier, eslint-plugin-boundaries

### Community 17 - "cn"
Cohesion: 0.06
Nodes (46): clsx, tailwind-merge, zod, FilterState, ActiveChips(), chip, ResultCount(), Results() (+38 more)

### Community 21 - "react"
Cohesion: 0.09
Nodes (30): ThemeSwitcher(), Button(), ButtonLink(), classes(), Inner(), Size, sizes, Variant (+22 more)

## Ambiguous Edges - Review These
- `Inter font via next/font` → `Huninn Font OFL License`  [AMBIGUOUS]
  src/app/fonts/OFL-Huninn.txt · relation: conceptually_related_to

## Knowledge Gaps
- **19 isolated node(s):** `react-dom`, `@tailwindcss/turbopack`, `@types/node`, `@types/react`, `@types/react-dom` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 187 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `package.json`, `motion/index.ts`, `SampleDashboard.tsx`, `config/index.ts`, `project/index.ts`, `Inspector.tsx`, `HomePage.tsx`, `cn`, `react`?**
  _High betweenness centrality (0.231) - this node is a cross-community bridge._
- **What connects `react-dom`, `@tailwindcss/turbopack`, `@types/node` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `opengraph-image.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10804597701149425 - nodes in this community are weakly interconnected._
- **Why does `next` connect `opengraph-image.tsx` to `package.json`, `SampleDashboard.tsx`, `config/index.ts`, `project/index.ts`, `HomePage.tsx`, `react`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Why does `cn()` connect `cn` to `SampleDashboard.tsx`, `project/index.ts`, `Inspector.tsx`, `HomePage.tsx`, `react`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Inter font via next/font` and `Huninn Font OFL License`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._