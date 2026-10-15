export const person = {
  name: "Ali Moradi",
  initials: "AM",
  role: "Senior Frontend Developer",
  location: "Istanbul, Türkiye",
  email: "ali.moradi.design@gmail.com",
  emailHref: "mailto:ali.moradi.design@gmail.com",
  linkedin: "https://www.linkedin.com/in/ali-moradi-dev",
  linkedinLabel: "ali-moradi-dev",
  github: "https://github.com/ali-moradi-design",
  githubLabel: "ali-moradi-design",
  years: "7+",
} as const;

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export const hero = {
  bio: "Senior frontend engineer with 7+ years of turning complex, data-heavy products into interfaces people enjoy using. I build them end to end, from the architecture to the last detail, and ship them fast, accessible and tested.",
  corners: {
    role: { index: "01", label: "Senior Frontend Developer" },
    place: { index: "02", label: "Istanbul · Remote" },
    contactIndex: "03",
    availability: { index: "04", label: "Open to work" },
  },
} as const;

export const servicesWords = [
  "React",
  "Next.js",
  "TypeScript",
  "Dashboards",
  "Data viz",
  "UI kits",
] as const;

export const summary =
  "Senior Frontend Developer with 7+ years of experience building scalable, high-performance web applications with React, Next.js, and TypeScript. Specialized in B2B enterprise dashboards for big data products, including a dynamic dashboard builder, a dynamic form builder, a company-wide UI kit, and a customer portal with 500K+ registered users. Contributes to front-end architecture (Feature-Sliced Design), reviews code, and mentors junior developers, with a focus on performance, accessibility, and testing. Open to remote roles worldwide and on-site roles in Istanbul.";

export const aboutHighlights = [
  {
    label: "Focus",
    value:
      "B2B enterprise dashboards for big data: data grids, maps, charts, and builders that let users compose their own views.",
  },
  {
    label: "Approach",
    value:
      "Feature-Sliced Design, component-driven UI kits, and performance work (virtualization, caching, code splitting) backed by unit, component, and E2E tests.",
  },
  {
    label: "Team",
    value:
      "Code review, mentoring junior developers, and close work with Product, Design, Backend, and QA in Agile / Scrum teams.",
  },
] as const;

export type WorkCard = {
  id: string;
  index: string;
  title: string;
  context: string;
  description: string;
  tags: readonly string[];
};

export const work: readonly WorkCard[] = [
  {
    id: "dashboard-builder",
    index: "01",
    title: "Dynamic dashboard builder",
    context: "Neor",
    description:
      "A Metabase-like builder where users compose their own dashboards from drag-and-drop widgets, chart types, and filters.",
    tags: ["Drag and drop", "Chart widgets", "Filters"],
  },
  {
    id: "form-builder",
    index: "02",
    title: "Dynamic form builder",
    context: "Neor",
    description:
      "Generates complex forms from configuration, with schema-based validation and file upload.",
    tags: ["React Hook Form", "Zod", "Yup", "File upload"],
  },
  {
    id: "enterprise-dashboards",
    index: "03",
    title: "Enterprise big data dashboards",
    context: "Neor",
    description:
      "Multiple B2B dashboards built from the ground up that display big data through data grids, charts, and interactive maps, with performance as a core requirement.",
    tags: ["AG Grid", "TanStack Query", "Mapbox", "Highcharts"],
  },
  {
    id: "ui-kit",
    index: "04",
    title: "Company-wide UI kit",
    context: "Neor",
    description:
      "A UI kit on shadcn/ui and Radix UI in a Turborepo monorepo, documented in Storybook, and used across all of the company's dashboard products.",
    tags: ["shadcn/ui", "Radix UI", "Storybook", "Turborepo"],
  },
  {
    id: "ecare",
    index: "05",
    title: "eCare customer portal",
    context: "Asiatech",
    description:
      "The customer self-service portal, rebuilt from scratch and used by 500K+ registered customers to purchase services and track their own usage statistics.",
    tags: ["500K+ users", "JWT", "Production"],
  },
  {
    id: "asiatech-bss",
    index: "06",
    title: "Business Support System",
    context: "Asiatech",
    description:
      "A BSS panel built from scratch to manage ADSL, LTE, and other internet services, each with its own business rules and workflows. Form-heavy screens and large data tables.",
    tags: ["React Table", "Material UI", "Complex forms"],
  },
  {
    id: "coach-athlete",
    index: "07",
    title: "Coach and athlete platform",
    context: "Homa Pharmed",
    description:
      "A startup product where coaches create training and diet plans and athletes view and follow their personalized programs, with a Node.js and MongoDB API behind it.",
    tags: ["Next.js", "Node.js", "MongoDB"],
  },
];

export type Role = {
  id: string;
  role: string;
  company: string;
  type: string;
  location: string;
  period: string;
  start: string;
  bullets: readonly string[];
};

export const experience: readonly Role[] = [
  {
    id: "neor",
    role: "Senior Frontend Developer",
    company: "Neor",
    type: "Full-time",
    location: "Tehran, Iran",
    period: "Jan 2024 – present",
    start: "2024",
    bullets: [
      "Developed multiple B2B enterprise dashboards from the ground up that display big data through data grids, charts, and interactive maps, with performance as a core requirement.",
      "Designed and built a dynamic dashboard builder (similar to Metabase) where users compose their own dashboards from drag-and-drop widgets, chart types, and filters.",
      "Engineered a dynamic form builder that generates complex forms from configuration, with schema-based validation (React Hook Form, Zod, Yup) and file upload.",
      "Structured the frontend with Feature-Sliced Design (FSD), keeping features isolated, scalable, and easy for the team to work on in parallel.",
      "Created a company-wide UI kit on shadcn/ui and Radix UI in a Turborepo monorepo, documented in Storybook, and used across all of the company's dashboard products.",
      "Implemented JWT authentication with access and refresh tokens and role-based access control (RBAC) for dashboards, pages, and actions.",
      "Optimized rendering and data loading for large datasets with AG Grid virtualization, TanStack Query caching, code splitting, and lazy loading.",
      "Delivered interactive maps with Mapbox and Leaflet and charts with Highcharts, Recharts, and Chart.js to turn big data into clear insights.",
      "Ensured accessibility with WCAG-compliant components and wrote unit, component, and E2E tests with Jest, React Testing Library, and Playwright.",
      "Reviewed pull requests, mentored junior developers, and worked closely with the team to deliver products on schedule.",
    ],
  },
  {
    id: "asiatech",
    role: "Senior Frontend Developer",
    company: "Asiatech",
    type: "Full-time",
    location: "Tehran, Iran",
    period: "Feb 2023 – Jan 2024",
    start: "2023",
    bullets: [
      "Rebuilt the eCare customer self-service portal from scratch, used by 500K+ registered customers to purchase services and track their own usage statistics.",
      "Developed the Business Support System (BSS) panel from scratch to manage ADSL, LTE, and other internet services, each with its own business rules and workflows.",
      "Implemented form-heavy interfaces with complex client-side validation and large data tables using React Table, Material UI, and Bootstrap.",
      "Secured customer and internal panels with JWT authentication, access and refresh tokens, and protected routes.",
      "Improved existing components, debugged and maintained both applications in production, and worked with the QA team to resolve issues before release.",
      "Participated in code reviews and suggested technical improvements and best practices to the team.",
    ],
  },
  {
    id: "homa",
    role: "Frontend Developer",
    company: "Homa Pharmed",
    type: "Full-time",
    location: "Tehran, Iran",
    period: "Oct 2020 – Dec 2022",
    start: "2020",
    bullets: [
      "Launched and maintained the company's main website and product websites with responsive, SEO-friendly pages.",
      "Built a startup product where coaches create training and diet plans and athletes view and follow their personalized programs.",
      "Developed reusable UI components to keep the interface consistent and maintainable as the product grew.",
      "Designed, implemented, and maintained server-side components and RESTful APIs with Node.js, Express, MongoDB, and Mongoose.",
    ],
  },
  {
    id: "asre-jadooye-danesh",
    role: "Frontend Developer",
    company: "Asre Jadooye Danesh",
    type: "Full-time",
    location: "Tehran, Iran",
    period: "Oct 2018 – Oct 2020",
    start: "2018",
    bullets: [
      "Maintained and customized the platform's admin dashboard, adding new features and adapting existing pages to business needs.",
      "Integrated the dashboard with RESTful APIs and handled loading and error states for a smooth user experience.",
      "Fixed bugs and improved the UI with responsive, cross-browser HTML5, CSS3/SCSS, JavaScript, and React.",
    ],
  },
];

export const skillGroups = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "SCSS"],
  },
  {
    title: "Frontend",
    items: ["React.js", "Next.js (SSR, SSG, ISR, PPR)", "Context API", "PWA"],
  },
  {
    title: "State / data",
    items: ["Redux Toolkit", "Zustand", "TanStack Query", "SWR", "GraphQL", "WebSocket", "REST APIs"],
  },
  {
    title: "Auth",
    items: ["JWT", "Access and refresh tokens", "RBAC", "Protected routes"],
  },
  {
    title: "UI",
    items: ["Tailwind CSS", "shadcn/ui", "Radix UI", "Material UI", "Ant Design", "Bootstrap", "Storybook"],
  },
  {
    title: "Data viz / maps",
    items: ["AG Grid", "TanStack Table", "Highcharts", "Recharts", "Chart.js", "React Flow", "Mapbox", "Leaflet"],
  },
  {
    title: "Forms",
    items: ["React Hook Form", "Zod", "Yup", "Dynamic form builders", "File upload"],
  },
  {
    title: "Architecture",
    items: ["Turborepo monorepo", "Micro-frontends", "Feature-Sliced Design", "Atomic Design", "Clean Architecture"],
  },
  {
    title: "Testing",
    items: ["Jest", "React Testing Library", "Playwright", "Cypress"],
  },
  {
    title: "Quality",
    items: ["Core Web Vitals", "Lighthouse", "Code splitting", "Lazy loading", "SEO", "Accessibility (WCAG)"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "MongoDB", "Mongoose"],
  },
  {
    title: "DevOps / tooling",
    items: ["Git", "CI/CD", "Docker", "Vite", "Webpack", "Turbopack"],
  },
] as const;

export const seo = {
  title: "Ali Moradi — Senior Frontend Developer",
  description:
    "Senior Frontend Developer with 7+ years of experience in React, Next.js, and TypeScript, specialized in B2B enterprise dashboards and data visualization. Open to remote roles.",
} as const;
