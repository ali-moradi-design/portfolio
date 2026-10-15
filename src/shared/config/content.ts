// All site copy. Every fact here comes from Ali's CV (the redesign notes keep a
// copy); do not add facts that are not in it.

export const person = {
  name: "Ali Moradi",
  initials: "AM",
  role: "Senior Frontend Developer",
  location: "Istanbul, Türkiye",
  email: "ali.moradi.design@gmail.com",
  emailHref: "mailto:ali.moradi.design@gmail.com",
  linkedin: "https://www.linkedin.com/in/ali-moradi-dev",
  linkedinLabel: "linkedin.com/in/ali-moradi-dev",
  github: "https://github.com/ali-moradi-design",
  githubLabel: "github.com/ali-moradi-design",
  cv: "/ali-moradi-cv.pdf",
  cvFileName: "Ali_Moradi_Senior_Frontend_Developer.pdf",
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
} as const;

/** Keys of the live samples that stand in for the real (private) products. */
export type SampleKey =
  "dashboard-builder" | "form-builder" | "ui-kit" | "ecare";

/** Company products shown with a small working sample in the Experience rows. */
export type WorkSample = {
  sample: SampleKey;
  /** The Experience row it belongs to. */
  roleId: string;
  title: string;
  /** One sentence: what it is and who uses it. */
  summary: string;
  /** Key parts or tools, each named in the CV. */
  tags: readonly string[];
};

export const workSamples: readonly WorkSample[] = [
  {
    sample: "dashboard-builder",
    roleId: "neor",
    title: "Dynamic dashboard builder",
    summary:
      "A builder, similar to Metabase, where users compose their own dashboards from drag-and-drop widgets, chart types and filters.",
    tags: ["Drag-and-drop widgets", "Chart types", "Filters"],
  },
  {
    sample: "form-builder",
    roleId: "neor",
    title: "Dynamic form builder",
    summary:
      "Generates complex forms from configuration, with schema-based validation and file upload.",
    tags: ["React Hook Form", "Zod", "Yup", "File upload"],
  },
  {
    sample: "ui-kit",
    roleId: "neor",
    title: "Company-wide UI kit",
    summary:
      "A UI kit on shadcn/ui and Radix UI in a Turborepo monorepo, documented in Storybook and used across all of the company's dashboard products.",
    tags: ["shadcn/ui", "Radix UI", "Turborepo", "Storybook"],
  },
  {
    sample: "ecare",
    roleId: "asiatech",
    title: "eCare customer portal",
    summary:
      "The self-service portal, rebuilt from scratch, where 500K+ registered customers purchase services and track their own usage statistics.",
    tags: ["500K+ customers", "JWT", "Refresh tokens", "Protected routes"],
  },
];

export type Role = {
  id: string;
  role: string;
  company: string;
  /** The company in one line, from the CV. */
  about: string;
  location: string;
  period: string;
  bullets: readonly string[];
};

export const experience: readonly Role[] = [
  {
    id: "neor",
    role: "Senior Frontend Developer",
    company: "Neor",
    about:
      "Big data company building B2B dashboards for enterprises and businesses.",
    location: "Tehran, Iran",
    period: "Jan 2024 – Present",
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
    about:
      "One of Iran's leading internet service providers (founded 2003): broadband, data center, hosting, cloud and CDN.",
    location: "Tehran, Iran",
    period: "Feb 2023 – Jan 2024",
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
    about:
      "Health and nutrition company with a startup product for athletes and coaches.",
    location: "Tehran, Iran",
    period: "Oct 2020 – Dec 2022",
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
    about: "File sharing platform.",
    location: "Tehran, Iran",
    period: "Oct 2018 – Oct 2020",
    bullets: [
      "Maintained and customized the platform's admin dashboard, adding new features and adapting existing pages to business needs.",
      "Integrated the dashboard with RESTful APIs and handled loading and error states for a smooth user experience.",
      "Fixed bugs and improved the UI with responsive, cross-browser HTML5, CSS3/SCSS, JavaScript, and React.",
    ],
  },
];

/** The three skills shown largest. */
export const coreSkills = ["React", "Next.js", "TypeScript"] as const;

export const skillGroups = [
  {
    title: "Frontend",
    items: [
      "React.js",
      "Next.js (SSR, SSG, ISR, PPR, Cache Components)",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "SCSS",
      "Context API",
      "PWA",
    ],
  },
  {
    title: "State, data and auth",
    items: [
      "Redux Toolkit",
      "Zustand",
      "TanStack Query",
      "SWR",
      "RESTful APIs",
      "GraphQL",
      "WebSocket",
      "Axios",
      "JWT",
      "Access and refresh tokens",
      "RBAC",
      "Protected routes",
    ],
  },
  {
    title: "UI, design systems and forms",
    items: [
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "Material UI",
      "Ant Design",
      "Bootstrap",
      "Storybook",
      "React Hook Form",
      "Zod",
      "Yup",
      "Dynamic form builders",
      "File upload",
    ],
  },
  {
    title: "Data grids, charts and maps",
    items: [
      "AG Grid",
      "TanStack Table",
      "Highcharts",
      "Recharts",
      "Chart.js",
      "React Flow",
      "Mapbox",
      "Leaflet",
    ],
  },
  {
    title: "Architecture, testing and quality",
    items: [
      "Turborepo monorepo",
      "Micro-frontends",
      "Feature-Sliced Design",
      "Atomic Design",
      "Clean Architecture",
      "Jest",
      "React Testing Library",
      "Playwright",
      "Cypress",
      "Core Web Vitals",
      "Lighthouse",
      "Code splitting",
      "Lazy loading",
      "SEO",
      "Accessibility (WCAG)",
    ],
  },
  {
    title: "Backend, tooling and teamwork",
    items: [
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Git",
      "Git Flow",
      "CI/CD",
      "Docker",
      "Vite",
      "Webpack",
      "Turbopack",
      "Agile / Scrum",
      "Code review",
      "Mentoring",
    ],
  },
] as const;

export const approach = [
  {
    title: "Architecture",
    text: "Feature-Sliced Design keeps features isolated, scalable and easy for a team to work on in parallel. Shared UI lives in a component kit: shadcn/ui and Radix UI in a Turborepo monorepo, documented in Storybook.",
  },
  {
    title: "Performance",
    text: "Big data on screen stays fast: AG Grid virtualization, TanStack Query caching, code splitting and lazy loading, measured with Core Web Vitals and Lighthouse.",
  },
  {
    title: "Quality",
    text: "WCAG-compliant components, and unit, component and E2E tests with Jest, React Testing Library and Playwright. Pull request reviews and mentoring for junior developers.",
  },
] as const;

export const facts = [
  {
    label: "Education",
    value: "B.Sc. in Civil Engineering, Islamic Azad University, 2017",
  },
  {
    label: "Languages",
    value: "English (professional working proficiency), Persian (native)",
  },
  { label: "Based in", value: "Istanbul, Türkiye" },
  { label: "Open to", value: "Remote roles worldwide, on-site in Istanbul" },
] as const;

export const seo = {
  title: "Ali Moradi — Senior Frontend Developer",
  description:
    "Senior Frontend Developer with 7+ years of experience in React, Next.js, and TypeScript, specialized in B2B enterprise dashboards and data visualization. Open to remote roles.",
} as const;
