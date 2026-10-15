# Graph Report - portfolio  (2026-10-15)

## Corpus Check
- 64 files · ~17,574 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 4, .woff2 2, .css 2)

## Summary
- 352 nodes · 687 edges · 12 communities (11 shown, 1 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f57aee40`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Old Home Sections
- Next Config and Icons
- Tests and Lint Setup
- Old 3D Particle Hero
- Lab Hero Layout
- CI/CD Workflows
- Lab Dashboard Charts
- TypeScript Config
- Runtime Dependencies
- Root Layout and Cursor
- PostCSS Config
- opengraph-image.tsx

## God Nodes (most connected - your core abstractions)
1. `react` - 21 edges
2. `cn()` - 16 edges
3. `compilerOptions` - 16 edges
4. `SectionHeading()` - 13 edges
5. `person` - 13 edges
6. `next` - 12 edges
7. `Home()` - 12 edges
8. `Reveal()` - 12 edges
9. `TOKENS` - 11 edges
10. `describe()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Huninn Font OFL License` --conceptually_related_to--> `Inter font via next/font`  [AMBIGUOUS]
  src/app/fonts/OFL-Huninn.txt → README.md
- `CI Workflow (lint, typecheck, test, build, e2e)` --references--> `pnpm scripts (dev, build, start, lint)`  [INFERRED]
  .github/workflows/ci.yml → README.md
- `pnpm install --frozen-lockfile` --conceptually_related_to--> `pnpm allowBuilds (unrs-resolver: false)`  [INFERRED]
  .github/workflows/ci.yml → pnpm-workspace.yaml
- `Inter font via next/font` --references--> `Inter Font OFL License`  [INFERRED]
  README.md → src/app/fonts/OFL.txt
- `Ali Moradi 3D Personal Portfolio` --references--> `ali-moradi-develop.com`  [EXTRACTED]
  README.md → .github/workflows/docker.yml

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **CI/CD flow: build image to ghcr, SSH deploy via compose, health check** — _github_workflows_docker_image_job, _github_workflows_docker_ghcr_portfolio_image, _github_workflows_docker_deploy_job, _github_workflows_docker_srv_apps_portfolio, _github_workflows_docker_site_health_check [EXTRACTED 1.00]
- **Bundled fonts under SIL OFL 1.1** — src_app_fonts_ofl_inter_font_license, src_app_fonts_ofl_huninn_huninn_font_license, src_app_fonts_ofl_sil_open_font_license, readme_inter_font [INFERRED 0.85]

## Communities (12 total, 1 thin omitted)

### Community 0 - "Old Home Sections"
Cohesion: 0.09
Nodes (40): framer-motion, Home(), About(), Contact(), Experience(), Footer(), GridOverlay(), Ruler() (+32 more)

### Community 1 - "Next Config and Icons"
Cohesion: 0.10
Nodes (26): nextConfig, next, react, contentType, size, HeroNav(), ITEMS, Label() (+18 more)

### Community 2 - "Tests and Lint Setup"
Cohesion: 0.05
Nodes (40): eslintConfig, devDependencies, eslint, eslint-config-next, @playwright/test, tailwindcss, @tailwindcss/postcss, @types/node (+32 more)

### Community 3 - "Old 3D Particle Hero"
Cohesion: 0.11
Nodes (31): lenis, @react-three/fiber, three, Bloom(), ParticleRing(), ParticleRingCanvas, Placeholder(), SoftRing() (+23 more)

### Community 4 - "Lab Hero Layout"
Cohesion: 0.08
Nodes (41): FitStage(), HeroCombined(), HeroActions(), HeroKicker(), InspectorPanel(), Box, describe(), effectiveBackground() (+33 more)

### Community 5 - "CI/CD Workflows"
Cohesion: 0.08
Nodes (28): CI Workflow (lint, typecheck, test, build, e2e), Playwright E2E Tests (chromium), Playwright Report Artifact Upload (on failure), pnpm install --frozen-lockfile, ali-moradi-develop.com, Deploy Job (SSH, compose pull/up --wait), Docker Workflow (build, push, deploy), GitHub Actions build cache (type=gha) (+20 more)

### Community 6 - "Lab Dashboard Charts"
Cohesion: 0.12
Nodes (19): highcharts, @tanstack/react-table, alpha(), baseOptions(), HcChart, MiniDashboard(), RangeKey, RANGES (+11 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Runtime Dependencies"
Cohesion: 0.17
Nodes (12): dependencies, framer-motion, highcharts, highcharts-react-official, lenis, lucide-react, next, react (+4 more)

### Community 9 - "Root Layout and Cursor"
Cohesion: 0.28
Nodes (6): inter, metadata, RootLayout(), viewport, CustomCursor(), seo

### Community 11 - "opengraph-image.tsx"
Cohesion: 0.13
Nodes (14): vitest, contentType, size, alt, contentType, OpenGraphImage(), size, tick() (+6 more)

## Ambiguous Edges - Review These
- `Inter font via next/font` → `Huninn Font OFL License`  [AMBIGUOUS]
  src/app/fonts/OFL-Huninn.txt · relation: conceptually_related_to

## Knowledge Gaps
- **16 isolated node(s):** `react-dom`, `@tailwindcss/postcss`, `@types/node`, `@types/react`, `@types/react-dom` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 138 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Next Config and Icons` to `Old Home Sections`, `Tests and Lint Setup`, `Old 3D Particle Hero`, `Lab Hero Layout`, `Lab Dashboard Charts`, `Root Layout and Cursor`?**
  _High betweenness centrality (0.267) - this node is a cross-community bridge._
- **What connects `react-dom`, `@tailwindcss/postcss`, `@types/node` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Old Home Sections` be split into smaller, more focused modules?**
  _Cohesion score 0.08619777895293496 - nodes in this community are weakly interconnected._
- **Why does `next` connect `Next Config and Icons` to `Tests and Lint Setup`, `Old 3D Particle Hero`, `Lab Hero Layout`, `Lab Dashboard Charts`, `Root Layout and Cursor`, `opengraph-image.tsx`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `Next Config and Icons` be split into smaller, more focused modules?**
  _Cohesion score 0.10476190476190476 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Runtime Dependencies` to `Tests and Lint Setup`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Inter font via next/font` and `Huninn Font OFL License`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._