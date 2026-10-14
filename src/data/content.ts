export const person = {
  name: "Ali Moradi",
  initials: "AM",
  role: "Senior Front-end developer",
  location: "Tehran, Iran",
  phone: "+(98) 9196891321",
  phoneHref: "tel:+989196891321",
  email: "ali.moradi.design@gmail.com",
  emailHref: "mailto:ali.moradi.design@gmail.com",
  linkedin: "https://www.linkedin.com/in/ali-moradi-91542a213/",
  linkedinLabel: "linkedin.com/in/ali-moradi-91542a213",
  heroLine: "5+ years building the dashboards people actually work in — AG Grid, maps, charts, React Flow, a Metabase-like builder. Fast React/Next.js for high-traffic teams in Tehran.",
  years: "5+",
} as const;

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export const hero = {
  bio: "5+ years building the dashboards people actually work in — AG Grid, maps, charts, React Flow, a Metabase-like builder. Fast React/Next.js for high-traffic teams in Tehran.",
  corners: {
    role: { index: "01", label: "Senior Front-end developer" },
    place: { index: "02", label: "Tehran based" },
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
  "Front-end Developer with 5+ years of experience building modern, responsive, and scalable web applications. Specialized in complex dashboards, data visualization, and performant React/Next.js interfaces. Strong focus on clean architecture, developer experience, and delivering practical solutions that balance user needs with business goals. Experienced in high-traffic production environments and collaborative team settings.";

export const aboutHighlights = [
  {
    label: "Focus",
    value:
      "Complex dashboards, data visualization, and React/Next.js interfaces that stay fast under real data.",
  },
  {
    label: "Approach",
    value:
      "Clean architecture, thoughtful developer experience, and practical tradeoffs between user needs and business goals.",
  },
  {
    label: "Context",
    value:
      "High-traffic production environments and collaborative teams — from planning through maintenance.",
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
    title: "Dashboard builder",
    context: "Neor",
    description:
      "A Metabase-like builder that lets people create their own dashboards — drag-and-drop widgets, mixed chart types, and dynamic forms — instead of waiting on a developer for every view.",
    tags: ["Drag and drop", "Dynamic forms", "Chart widgets"],
  },
  {
    id: "data-tables",
    index: "02",
    title: "Large-scale data tables",
    context: "Neor",
    description:
      "Main dashboards built from scratch around AG Grid and React Table so teams can work through large datasets and generate reports without the interface getting in the way.",
    tags: ["AG Grid", "React Table", "Reporting"],
  },
  {
    id: "maps-charts",
    index: "03",
    title: "Maps and charts",
    context: "Neor",
    description:
      "Interactive maps and charts with Leaflet, Highcharts, and Recharts — so trends and insights are visible, not buried in raw numbers.",
    tags: ["Leaflet", "Highcharts", "Recharts"],
  },
  {
    id: "react-flow",
    index: "04",
    title: "Workflow visualization",
    context: "Neor",
    description:
      "React Flow views of how data moves through the system. Built so both developers and non-technical people can follow the workflows.",
    tags: ["React Flow", "Data flow"],
  },
  {
    id: "ui-kit",
    index: "05",
    title: "Design system / UI kit",
    context: "Neor",
    description:
      "A reusable UI kit on shadcn/ui and Radix UI, documented in Storybook with real examples, and wired through a Turborepo monorepo with Turbopack so the team could ship faster and stay consistent.",
    tags: ["shadcn/ui", "Radix UI", "Storybook", "Turborepo"],
  },
  {
    id: "asiatech-bss",
    index: "06",
    title: "Asiatech BSS",
    context: "Asiatech Co.",
    description:
      "Business Support System dashboards for multiple internet services such as ADSL and LTE — each with their own rules, workflows, and data structures. Form-heavy screens, client-side validation, and complex tables in a live production environment.",
    tags: ["React Table", "Material UI", "Bootstrap", "Production"],
  },
  {
    id: "nutrition",
    index: "07",
    title: "Coach and athlete nutrition dashboards",
    context: "Homa Pharmed",
    description:
      "Dedicated dashboards for coaches and athletes: coaches create diet plans, athletes view and manage their personalized nutrition programs. Reusable UI kept the product consistent as it grew.",
    tags: ["Dashboards", "Reusable UI"],
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
    role: "Front-end developer",
    company: "Neor",
    type: "Full-time",
    location: "Tehran",
    period: "Jan 2024 – present",
    start: "2024",
    bullets: [
      "Built the main dashboards from scratch using AG Grid and React Table, giving users a much faster and smoother way to work with large datasets and generate reports.",
      "Added interactive maps and charts using Leaflet, Highcharts, and Recharts so the team could actually see trends and insights instead of just staring at raw numbers.",
      "Implemented large-scale and dynamic forms using React Hook Form and Yup, ensuring validation, usability, and maintainability.",
      "Used React Flow to visualize how data moves through the system — helping both the dev team and non-technical people understand the workflows.",
      "Created a reusable UI kit with shadcn/ui and Radix UI, set up with Turbopack so builds were faster and the team could work more comfortably.",
      "Documented components in Storybook with real examples, so other developers didn’t have to guess how things should be used.",
      "Worked inside a Turborepo monorepo and helped keep the JavaScript/TypeScript part of the project organized and scalable as it grew.",
      "Built a dashboard builder (kind of like Metabase) that let users create their own dashboards with drag-and-drop widgets, different chart types, and dynamic forms.",
    ],
  },
  {
    id: "asiatech",
    role: "Front-end developer",
    company: "Asiatech Co.",
    type: "Full-time",
    location: "Tehran",
    period: "Feb 2023 – Jan 2024",
    start: "2023",
    bullets: [
      "Worked on the Asiatech Business Support System, a complex dashboard for managing multiple internet services like ADSL and LTE, each with their own business rules, workflows, and data structures.",
      "Built form-heavy interfaces with heavy client-side validation and complex data tables using React Table, Material UI, and Bootstrap to keep things accurate and usable for the team.",
      "Collaborated with other developers to design scalable solutions that could handle many different service types as the system grew more complex.",
      "Helped fix bugs, improve existing features, and maintain the application in a live production environment.",
    ],
  },
  {
    id: "homa",
    role: "Front-end developer",
    company: "Homa Pharmed",
    type: "Full-time",
    location: "Tehran",
    period: "Jun 2021 – Nov 2022",
    start: "2021",
    bullets: [
      "Built dedicated dashboards for coaches and athletes that let coaches create diet plans and athletes view and manage their personalized nutrition programs.",
      "Developed reusable UI components to keep the interface consistent and easier to maintain as the application grew.",
      "Worked closely with the team from the planning stage through development and ongoing maintenance.",
    ],
  },
  {
    id: "mizan",
    role: "Node.js Developer",
    company: "Mizan Gostaran Sharif",
    type: "Full-time",
    location: "Tehran",
    period: "Dec 2020 – Mar 2021",
    start: "2020",
    bullets: [
      "Developed high-performance Node.js applications with reusable, efficient code.",
      "Documented server processes and database schemas, preparing technical reports.",
      "Built and maintained server-side components and APIs.",
      "Collaborated with front-end developers for smooth integration.",
    ],
  },
];

export const skillGroups = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "SCSS"],
  },
  {
    title: "Frameworks",
    items: ["React.js", "Next.js (hooks, Context API, SSR)"],
  },
  {
    title: "UI",
    items: [
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "Bootstrap",
      "Material UI",
      "Responsive design",
    ],
  },
  {
    title: "Data viz",
    items: [
      "AG Grid",
      "React Table",
      "Leaflet",
      "Highcharts",
      "Recharts",
      "React Flow",
    ],
  },
  {
    title: "State / data",
    items: [
      "Redux Toolkit",
      "React Query",
      "Zustand",
      "REST APIs (Fetch, Axios)",
      "React Hook Form",
      "Yup",
    ],
  },
  {
    title: "Tooling",
    items: [
      "Git",
      "Storybook",
      "Turborepo",
      "Turbopack",
      "UI kit (shadcn/ui + Radix)",
    ],
  },
  {
    title: "Practices",
    items: [
      "Core Web Vitals",
      "Lazy loading",
      "Code splitting",
      "Lighthouse",
      "Agile / Scrum",
    ],
  },
] as const;

export const seo = {
  title: "Ali Moradi — Senior Front-end developer",
  description:
    "Senior front-end developer in Tehran specializing in complex dashboards, data visualization, and performant React/Next.js interfaces.",
} as const;
