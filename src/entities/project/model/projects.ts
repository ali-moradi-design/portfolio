import type { Project } from "./types";

// Ali's demo projects. Each one runs on its own subdomain and has a public
// repo. The four `featured` ones prove the CV summary and show on the home
// page. Previews go in public/projects/ (see the `preview` field in types.ts).

const gh = (repo: string) => `https://github.com/ali-moradi-design/${repo}`;

/** Recorded with `pnpm previews` (scripts/previews). */
const preview = (slug: string) => ({
  mp4: `/projects/${slug}.mp4`,
  webm: `/projects/${slug}.webm`,
  poster: `/projects/${slug}.jpg`,
});

export const projects: readonly Project[] = [
  {
    slug: "aml-dashboard",
    preview: preview("aml-dashboard"),
    title: "AML Monitor",
    summary:
      "Anti-money-laundering dashboard for a fictional bank: alerts, cases, a money-flow network graph and role-based access.",
    description:
      "Transactions are checked against detection rules; suspicious ones become alerts, analysts review them and serious ones become cases. Large data grids, charts, an account network graph, a case workflow designer, reports with Excel export, scheduled jobs and an import wizard. Every request is limited by role, region and clearance, and the whole app is in five languages, two of them right to left.",
    type: "dashboard",
    tech: [
      "Next.js",
      "TanStack Query",
      "TanStack Table",
      "Highcharts",
      "React Flow",
      "Sigma.js",
      "Express",
      "PostgreSQL",
      "Socket.IO",
    ],
    tags: ["RBAC", "RTL", "i18n"],
    year: 2026,
    repo: gh("aml-dashboard"),
    note: "Sign in with one click as an analyst, a supervisor, a compliance manager or an admin. The data resets every night.",
    featured: true,
  },
  {
    slug: "dashboard-builder",
    preview: preview("dashboard-builder"),
    title: "Dashboard builder",
    summary:
      "Build dashboards from data without code, like Metabase, with queries running in the browser.",
    description:
      "Pick a dataset or drop in your own CSV, describe the query with drag and drop (measures, group-bys, filters) and show it as one of 11 widgets on a grid. Queries run in DuckDB-WASM inside a Web Worker, so no data leaves the browser. Undo and redo for every edit, autosave, JSON export and import, English and Persian.",
    type: "dashboard",
    tech: [
      "React",
      "Vite",
      "DuckDB-WASM",
      "ECharts",
      "TanStack Router",
      "Zustand",
      "dnd-kit",
      "React Hook Form",
      "Zod",
    ],
    tags: ["No server", "RTL"],
    year: 2026,
    repo: gh("dashboard-builder"),
    featured: true,
  },
  {
    slug: "formcanvas",
    preview: preview("formcanvas"),
    title: "formcanvas",
    summary:
      "Schema-driven form engine with a visual builder: publish forms by link, embed or npm package, then analyse the responses.",
    description:
      "Forms are JSON documents checked with Zod and run by a framework-free engine (values, rules, validation). The builder edits them visually; the app serves them through a REST API and collects, charts and exports the responses. The engine and its React renderer are published on npm, and the Arvand Partners contact form sends its messages here.",
    type: "web-app",
    tech: [
      "Next.js",
      "React Hook Form",
      "Zod",
      "Zustand",
      "Recharts",
      "Drizzle",
      "PostgreSQL",
      "Better Auth",
    ],
    tags: ["npm package", "Monorepo"],
    year: 2026,
    repo: gh("formcanvas"),
    npm: "https://www.npmjs.com/org/formcanvas",
    note: "Choose “Try the demo account” on the sign-in page. Its forms reset every night.",
    featured: true,
  },
  {
    slug: "pixelbits",
    preview: preview("pixelbits"),
    title: "Pixelbits UI kit",
    summary:
      "A calm React UI kit whose pixel effects appear only at the moment of interaction.",
    description:
      "Design tokens for dark and light themes, components built on Radix primitives with cva variants, a docs site with live demos and Storybook with interaction and visual tests. Install it from npm, or copy a single component's source with the shadcn CLI from its own registry.",
    type: "ui-library",
    tech: ["React", "Radix UI", "Tailwind CSS", "shadcn/ui", "Storybook"],
    tags: ["npm package", "Design system"],
    year: 2026,
    repo: gh("pixelbits"),
    npm: "https://www.npmjs.com/package/pixelbits",
    featured: true,
  },
  {
    slug: "crypto-dashboard",
    preview: preview("crypto-dashboard"),
    title: "Live crypto dashboard",
    summary:
      "Real-time prices, candlestick charts and an order book from a public exchange WebSocket, with no server.",
    description:
      "The exchange sends dozens of messages per second. They are buffered and applied once per animation frame, so a price change re-renders only its own row and the chart streams without React renders. Reconnect with backoff, a stale-data warning, price alerts, and English, Turkish and Persian.",
    type: "dashboard",
    tech: ["React", "Vite", "Redux Toolkit", "WebSocket", "Radix UI"],
    tags: ["Real-time", "RTL"],
    year: 2026,
    repo: gh("crypto-dashboard"),
  },
  {
    slug: "team-chat",
    preview: preview("team-chat"),
    title: "Team chat",
    summary:
      "Slack-style chat with channels, threads, reactions, files and live presence, on Node.js and MongoDB.",
    description:
      "Public and private channels, direct messages, threads, mentions, reactions, pinned messages, file uploads with thumbnails and full-text search. Messages are sent optimistically and confirmed by the server, typing and read receipts update live, and the client resyncs after a reconnect. Accounts use JWT access and refresh tokens.",
    type: "web-app",
    tech: [
      "React",
      "Vite",
      "TanStack Query",
      "Node.js",
      "Express",
      "Socket.IO",
      "MongoDB",
    ],
    tags: ["Real-time", "JWT", "RTL"],
    year: 2026,
    repo: gh("team-chat"),
    note: "One-click demo accounts and a bot that answers. The data resets every night.",
  },
  {
    slug: "shop-books",
    preview: preview("shop-books"),
    title: "Bay Book Company",
    summary:
      "Bookshop with Partial Prerendering: a cached page shell with live stock and reviews, on Postgres.",
    description:
      "200 books with search by title, author, genre and ISBN, a “look inside” preview, cart, discount codes, a simulated payment page, accounts, a reading list and a small admin. One of three shops on the same domain built with three databases and three rendering strategies.",
    type: "e-commerce",
    tech: ["Next.js", "Tailwind CSS", "Express", "Prisma", "PostgreSQL"],
    tags: ["PPR", "SEO"],
    year: 2026,
    repo: gh("shop-books"),
  },
  {
    slug: "leather-shop",
    preview: preview("leather-shop"),
    title: "Welt & Grain",
    summary:
      "Leather goods shop with Partial Prerendering, live stock per size and a MongoDB API.",
    description:
      "480 products with collection, size, width, leather and color filters, a mega menu, a cart drawer that merges at sign-in, discount codes, a simulated card payment, reviews and a small admin. The API is a modular monolith on Express and Mongoose.",
    type: "e-commerce",
    tech: ["Next.js", "Tailwind CSS", "Express", "MongoDB"],
    tags: ["PPR", "SEO"],
    year: 2026,
    url: "https://shop-leather.ali-moradi-develop.com",
    repo: gh("leather-shop"),
  },
  {
    slug: "shop-tools",
    preview: preview("shop-tools"),
    title: "Tool shop",
    summary:
      "Tool shop rendered on the server per request, with spec filters in your own units and side-by-side compare.",
    description:
      "500 tools, each category with its own technical specs. Filter by ranges in Nm or in·lb, mm or inches (kept in the URL), compare up to four products with the best value in each row marked, and see the stock of every warehouse. Server-side rendering with a CSP nonce per request, on MySQL.",
    type: "e-commerce",
    tech: ["Next.js", "Tailwind CSS", "Express", "Prisma", "MySQL"],
    tags: ["SSR", "SEO"],
    year: 2026,
    repo: gh("shop-tools"),
  },
  {
    slug: "arvand-company",
    preview: preview("arvand-company"),
    title: "Arvand Partners",
    summary:
      "Bilingual company site for a fictional consulting firm, in English and right-to-left Persian.",
    description:
      "Case studies, services, a blog written in MDX and a contact form that posts to formcanvas. Persian uses logical CSS, its own font and Persian digits; English and Persian pages share one layout.",
    type: "website",
    tech: ["Next.js", "next-intl", "MDX", "Tailwind CSS"],
    tags: ["RTL", "i18n", "SEO"],
    year: 2026,
    repo: gh("arvand-company"),
  },
  {
    slug: "cafe-hoor",
    preview: preview("cafe-hoor"),
    title: "Hoor Cafe & Restaurant",
    summary:
      "Site for a real Tehran cafe, with a fast mobile menu behind the QR code on its tables.",
    description:
      "Home, menu, gallery, about and contact pages in Persian and English, a map and a printable QR page. The menu is a data file checked with Zod, with search; English shows approximate prices in US dollars.",
    type: "website",
    tech: ["Next.js", "Tailwind CSS", "Zod", "Leaflet", "PhotoSwipe"],
    tags: ["RTL", "i18n", "Maps"],
    year: 2026,
    repo: gh("cafe-hoor"),
    note: "A real cafe; brand, photos and menu are used with the owner's permission.",
  },
  {
    slug: "aat-company",
    preview: preview("aat-company"),
    title: "Architecture studio site",
    summary:
      "Recreation of an architecture studio's site with scroll choreography and smooth scrolling.",
    description:
      "A study of an existing studio's site, rebuilt with Next.js, Lenis and Feature-Sliced Design: large project photos resized on the server, scroll-driven transitions and page choreography.",
    type: "website",
    tech: ["Next.js", "Tailwind CSS", "Lenis"],
    tags: ["Animation"],
    year: 2026,
    repo: gh("aat-company"),
    note: "A demo recreation of AAT|Architecten, not affiliated with the studio. The contact form sends nothing and the site is not indexed.",
  },
  // Ideabloom (brainstorming-tool) is left out until it gets more work.
  // {
  //   slug: "brainstorming-tool",
  //   preview: preview("brainstorming-tool"),
  //   title: "Ideabloom",
  //   summary:
  //     "Local-first mind-map tool: boards stay in your browser and work offline.",
  //   description:
  //     "Radial mind maps with keyboard shortcuts, free links between ideas, tags, notes, templates (SWOT, Six Hats and more), undo and redo, Ctrl K search and export to PNG, SVG or Markdown. Boards are stored in IndexedDB and backed up as JSON. English, Spanish and Persian.",
  //   type: "tool",
  //   tech: ["React", "Vite", "React Flow", "Dexie", "Zustand", "Zod"],
  //   tags: ["PWA", "Offline", "RTL"],
  //   year: 2026,
  //   repo: gh("brainstorming-tool"),
  // },
  {
    slug: "pulsefit",
    preview: preview("pulsefit"),
    title: "Pulsefit",
    summary:
      "Offline-first workout and diet tracker for a coach and an athlete, as an installable PWA.",
    description:
      "Every PWA strategy in one app: precached shell, cache first, stale-while-revalidate and network first, an IndexedDB outbox with Background Sync, notifications with actions, an update prompt that never interrupts a workout, Wake Lock and a barcode scanner. The server is simulated inside the service worker.",
    type: "web-app",
    tech: ["React", "Vite", "Workbox", "Dexie"],
    tags: ["PWA", "Offline"],
    year: 2026,
    repo: gh("Pulsefit"),
    note: "Open a second tab and switch it to Coach to see live updates; go offline to see the sync queue.",
  },
  {
    slug: "3d-configurator",
    preview: preview("3d-configurator"),
    title: "3D sneaker configurator",
    summary:
      "Change colorway, accent and finish on a live 3D shoe, share the design as a link or save a PNG.",
    description:
      "A landing page for a fictional sneaker brand. The accent color is applied by a small shader patch, so the sole and laces keep their color. The design lives in the URL, and the 3D scene loads only near the viewport while a poster shows first.",
    type: "3d",
    tech: ["Next.js", "React Three Fiber", "drei", "Zustand"],
    tags: ["WebGL"],
    year: 2026,
    repo: gh("3d-configurator"),
  },
  {
    slug: "3d-furniture-ar",
    preview: preview("3d-furniture-ar"),
    title: "Furniture shop with AR",
    summary:
      "Furniture product pages with a 3D viewer, fabric options and “view in your room” augmented reality.",
    description:
      "A fictional furniture shop with category listings and product pages. Each product turns in 3D with its fabric options and dimensions, and opens in AR on phones. Models are Draco-compressed and decoded on the site.",
    type: "3d",
    tech: ["Next.js", "model-viewer"],
    tags: ["AR", "WebGL"],
    year: 2026,
    repo: gh("3d-furniture-ar"),
  },
];
