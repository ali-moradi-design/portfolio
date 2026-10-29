# Graph Report - portfolio  (2026-10-29)

## Corpus Check
- 128 files · ~28,645 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .ttf 1, .woff2 1)

## Summary
- 604 nodes · 1276 edges · 22 communities (20 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `52155a58`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- scripts
- opengraph-image.tsx
- package.json
- motion/index.ts
- with
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
- steps
- @feature-sliced/steiger-plugin
- content.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 42 edges
2. `react` - 27 edges
3. `next` - 17 edges
4. `compilerOptions` - 16 edges
5. `Section()` - 15 edges
6. `useTheme()` - 14 edges
7. `Reveal()` - 14 edges
8. `HomePage()` - 14 edges
9. `vitest` - 13 edges
10. `SampleDashboard()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `CI Workflow (lint, typecheck, test, build, e2e)` --references--> `pnpm scripts (dev, build, start, lint)`  [INFERRED]
  .github/workflows/ci.yml → README.md
- `Ali Moradi 3D Personal Portfolio` --references--> `ali-moradi-develop.com`  [EXTRACTED]
  README.md → .github/workflows/docker.yml
- `Huninn Font OFL License` --conceptually_related_to--> `Inter font via next/font`  [AMBIGUOUS]
  src/app/fonts/OFL-Huninn.txt → README.md
- `pnpm install --frozen-lockfile` --conceptually_related_to--> `allowBuilds`  [INFERRED]
  .github/workflows/ci.yml → pnpm-workspace.yaml
- `columns` --calls--> `cn()`  [EXTRACTED]
  src/widgets/sample-dashboard/ui/ServicesTable.tsx → src/shared/lib/cn/cn.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **CI/CD flow: build image to ghcr, SSH deploy via compose, health check** — _github_workflows_docker_image_job, _github_workflows_docker_ghcr_portfolio_image, _github_workflows_docker_deploy_job, _github_workflows_docker_srv_apps_portfolio, _github_workflows_docker_site_health_check [EXTRACTED 1.00]

## Communities (22 total, 2 thin omitted)

### Community 0 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, dev, format, format:check, lint, previews, start (+3 more)

### Community 1 - "opengraph-image.tsx"
Cohesion: 0.22
Nodes (9): contentType, size, contentType, size, LOGO_BRACKETS, LOGO_LETTERS, LOGO_STROKES, LOGO_VIEWBOX (+1 more)

### Community 2 - "package.json"
Cohesion: 0.18
Nodes (10): lenis@^1.3.26, tailwindcss@^4, engines, node, name, packageManager, private, version (+2 more)

### Community 3 - "motion/index.ts"
Cohesion: 0.18
Nodes (5): EASE, prefersReducedMotion(), motionScript, SmoothScroll(), Props

### Community 4 - "with"
Cohesion: 0.05
Nodes (42): cancel-in-progress, group, concurrency, environment, needs, runs-on, steps, timeout-minutes (+34 more)

### Community 5 - "Deploy Job (SSH, compose pull/up --wait)"
Cohesion: 0.07
Nodes (28): CI Workflow (lint, typecheck, test, build, e2e), Playwright E2E Tests (chromium), Playwright Report Artifact Upload (on failure), pnpm install --frozen-lockfile, ali-moradi-develop.com, Deploy Job (SSH, compose pull/up --wait), Docker Workflow (build, push, deploy), GitHub Actions build cache (type=gha) (+20 more)

### Community 6 - "SampleDashboard.tsx"
Cohesion: 0.11
Nodes (21): highcharts, Chart(), HcChart, alpha(), baseOptions(), Legend(), RangeKey, RANGES (+13 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler@1.0.0, prettier@^3.9.10, prettier-plugin-tailwindcss@^0.8.1, @tailwindcss/turbopack@^4, @types/node@^24.19.2, @types/react@^19, @types/react-dom@^19 (+10 more)

### Community 9 - "config/index.ts"
Cohesion: 0.11
Nodes (27): huninn, metadata, RootLayout(), themeStyles, viewport, Mode, Palette, PALETTE_LABELS (+19 more)

### Community 10 - "project/index.ts"
Cohesion: 0.09
Nodes (42): applyFilters(), facets(), filtersToQuery(), haystack(), isFiltered(), isSort(), isType(), NO_FILTERS (+34 more)

### Community 11 - "Inspector.tsx"
Cohesion: 0.08
Nodes (38): vitest, AA_GRAPHICS, AA_TEXT, GRAPHIC_ROLES, isGraphicRole(), isToken(), parseTokens(), spacingPx() (+30 more)

### Community 12 - ".prettierrc.json"
Cohesion: 0.50
Nodes (3): plugins, tailwindFunctions, tailwindStylesheet

### Community 14 - "HomePage.tsx"
Cohesion: 0.07
Nodes (44): nextConfig, next, Page(), metadata, Page(), projectGrid, CopyButton(), ThemeSwitcher() (+36 more)

### Community 15 - "dependencies"
Cohesion: 0.10
Nodes (20): dependencies, clsx@^2.1.1, gsap@^3.15.0, @gsap/react@^2.1.2, highcharts@^13.1.1, highcharts-react-official@^3.2.3, next@16.4.1, next-themes@^0.4.6 (+12 more)

### Community 16 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (12): eslintConfig, fsd, layers, sliced, eslint@^9, eslint-config-next@16.4.1, eslint-config-prettier@^10.1.8, eslint-plugin-boundaries@^7.2.0 (+4 more)

### Community 17 - "cn"
Cohesion: 0.06
Nodes (48): zod@^4.6.7, react, zod, cn(), twMerge, Tag(), buildSchema(), FieldConfig (+40 more)

### Community 19 - "steps"
Cohesion: 0.08
Nodes (23): runs-on, steps, timeout-minutes, jobs, ci, name, on, pull_request (+15 more)

### Community 20 - "@feature-sliced/steiger-plugin"
Cohesion: 0.40
Nodes (4): @feature-sliced/steiger-plugin@^0.8.0, steiger@^0.7.0, @feature-sliced/steiger-plugin, steiger

### Community 21 - "content.ts"
Cohesion: 0.07
Nodes (23): cursorScript(), helpers(), only, OUT, record(), VIEWPORT, scenes, alt (+15 more)

## Ambiguous Edges - Review These
- `Inter font via next/font` → `Huninn Font OFL License`  [AMBIGUOUS]
  src/app/fonts/OFL-Huninn.txt · relation: conceptually_related_to

## Knowledge Gaps
- **8 isolated node(s):** `next generate-agent-files.js (re-adds block on next dev)`, `Playwright Report Artifact Upload (on failure)`, `GitHub Actions build cache (type=gha)`, `SSH Deploy Key and Known Hosts Secrets`, `src/data/content.ts (editable copy)` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 192 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `cn` to `package.json`, `motion/index.ts`, `SampleDashboard.tsx`, `config/index.ts`, `project/index.ts`, `Inspector.tsx`, `HomePage.tsx`, `dependencies`?**
  _High betweenness centrality (0.178) - this node is a cross-community bridge._
- **What connects `next generate-agent-files.js (re-adds block on next dev)`, `Playwright Report Artifact Upload (on failure)`, `GitHub Actions build cache (type=gha)` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `with` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._
- **Why does `next` connect `HomePage.tsx` to `opengraph-image.tsx`, `package.json`, `SampleDashboard.tsx`, `config/index.ts`, `project/index.ts`, `dependencies`, `content.ts`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Should `Deploy Job (SSH, compose pull/up --wait)` be split into smaller, more focused modules?**
  _Cohesion score 0.07196969696969698 - nodes in this community are weakly interconnected._
- **Why does `cn()` connect `cn` to `project/index.ts`, `Inspector.tsx`, `HomePage.tsx`, `SampleDashboard.tsx`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Inter font via next/font` and `Huninn Font OFL License`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._