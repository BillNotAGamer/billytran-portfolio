export type TechGroup = {
  items: string[];
  title: string;
};

export type NavigationItem = {
  href: string;
  label: string;
};

export type HeroMetric = {
  label: string;
  value: string;
};

export type Pillar = {
  copy: string;
  title: string;
};

export type Project = {
  category: string;
  description: string;
  impact: string;
  impactLabel: string;
  links: {
    preview: string;
    repository: string;
  };
  stack: string[];
  title: string;
};

export type JourneyItem = {
  description: string;
  phase: string;
  tag: string;
  title: string;
};

export type Service = {
  description: string;
  points: string[];
  tag: string;
  title: string;
};

export type ContactMethod = {
  href: string;
  label: string;
  value: string;
};

export type PortfolioData = {
  about: {
    description: string;
    paragraphs: string[];
    pillars: Pillar[];
    title: string;
  };
  contact: {
    email: string;
    methods: ContactMethod[];
    note: string;
  };
  footer: {
    note: string;
  };
  hero: {
    availability: string;
    description: string;
    eyebrow: string;
    headlineAccent: string;
    headlineLead: string;
    strips: string[];
  };
  heroMetrics: HeroMetric[];
  heroOrbitTags: string[];
  journey: JourneyItem[];
  name: string;
  navigation: NavigationItem[];
  projects: Project[];
  roles: string[];
  services: Service[];
  techGroups: TechGroup[];
};

export const portfolioData: PortfolioData = {
  name: "Billy Tran",
  roles: ["Software Engineer", "Fullstack Web Developer", "Mobile Developer"],
  navigation: [
    { label: "About", href: "#about" },
    { label: "Stack", href: "#tech-stack" },
    { label: "Projects", href: "#featured-projects" },
    { label: "Journey", href: "#journey" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Independent Engineer / Billy Tran",
    headlineLead: "Engineering precise digital products with",
    headlineAccent: "fullstack depth and mobile range.",
    description:
      "Billy Tran builds web platforms, backend systems, and mobile experiences with a bias for clarity, shipping rhythm, and product quality that still feels deliberate under real use.",
    availability: "Open to select product collaborations",
    strips: [
      "Interface systems with restraint",
      "Backend architecture that stays legible",
      "Mobile delivery with product continuity",
    ],
  },
  heroMetrics: [
    {
      label: "Craft",
      value: "Polished interfaces backed by structural discipline",
    },
    {
      label: "Range",
      value: "Frontend, backend, data, and mobile execution",
    },
    {
      label: "Mode",
      value: "Product-minded delivery with calm technical taste",
    },
  ],
  heroOrbitTags: [
    "System design",
    "Experience quality",
    "API and data layer",
    "Cross-platform delivery",
  ],
  about: {
    title: "A product engineer who treats clarity as part of the product.",
    description:
      "Billy works across the full delivery stack and brings the same level of care to user experience, backend structure, and mobile consistency. The goal is never just to ship. The goal is to ship something that stays coherent as it grows.",
    paragraphs: [
      "That means interfaces with rhythm and restraint, systems that remain understandable under pressure, and engineering decisions that support product velocity instead of fighting it later.",
      "He brings a fullstack perspective shaped by engineering craftsmanship, product thinking, and the ability to move between browser, API, data layer, and mobile surface without losing continuity.",
    ],
    pillars: [
      {
        title: "Engineering Craft",
        copy: "Thoughtful structure, clean abstractions, and execution that still feels sharp after the first version ships.",
      },
      {
        title: "Fullstack Ownership",
        copy: "Comfort across interface architecture, application logic, APIs, persistence, and deployment paths.",
      },
      {
        title: "Mobile Product Sense",
        copy: "Cross-platform thinking that respects user context, continuity, and the realities of app behavior beyond desktop.",
      },
      {
        title: "Product Judgment",
        copy: "A practical bias toward what helps the product become clearer, faster, and easier to evolve.",
      },
    ],
  },
  techGroups: [
    {
      title: "Frontend",
      items: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Design Systems",
      ],
    },
    {
      title: "Backend",
      items: [
        "Node.js",
        "NestJS",
        "Express",
        "REST APIs",
        "GraphQL",
        "Auth Flows",
      ],
    },
    {
      title: "Mobile",
      items: [
        "React Native",
        "Expo",
        "Flutter",
        "Navigation",
        "Offline States",
      ],
    },
    {
      title: "Database",
      items: [
        "PostgreSQL",
        "MongoDB",
        "Prisma",
        "Firebase",
        "Redis",
        "SQL Design",
      ],
    },
    {
      title: "Tooling",
      items: ["Git", "Docker", "ESLint", "Testing", "Figma", "CI/CD"],
    },
    {
      title: "Cloud & DevOps",
      items: [
        "Vercel",
        "AWS",
        "Supabase",
        "Monitoring",
        "Observability",
        "Scaling",
      ],
    },
  ],
  projects: [
    {
      title: "Frame Commerce",
      category: "Web + Systems",
      description:
        "A premium commerce platform designed around fast storefront performance, structured operations, and an internal workflow layer that keeps growth teams moving without clutter.",
      impactLabel: "What Changed",
      impact:
        "Reduced operational friction, clarified ownership across the product flow, and created a more dependable path from feature release to commercial outcome.",
      stack: [
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Redis",
        "Stripe",
      ],
      links: {
        preview: "#contact",
        repository: "#contact",
      },
    },
    {
      title: "Pulseboard",
      category: "Product Dashboard",
      description:
        "An operations workspace for reporting, approvals, and analytics that turns scattered internal workflows into a cleaner decision layer for product and business teams.",
      impactLabel: "Operational Gain",
      impact:
        "Sharpened decision speed, reduced context switching, and gave non-technical stakeholders a more legible operating surface.",
      stack: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Data Viz",
        "API Design",
        "Auth",
      ],
      links: {
        preview: "#contact",
        repository: "#contact",
      },
    },
    {
      title: "Northstar Mobile",
      category: "Mobile Product",
      description:
        "A mobile-first product experience shaped around responsive task flow, dependable sync states, and a more considered relationship between app behavior and backend systems.",
      impactLabel: "Experience Outcome",
      impact:
        "Lowered repeat-task friction and improved product continuity across notifications, mobile interaction, and shared account state.",
      stack: [
        "React Native",
        "Expo",
        "TypeScript",
        "Realtime Sync",
        "Offline Support",
        "Testing",
      ],
      links: {
        preview: "#contact",
        repository: "#contact",
      },
    },
  ],
  journey: [
    {
      phase: "01",
      title: "Building strong engineering fundamentals",
      description:
        "Developing disciplined habits around structure, maintainability, performance, and the kind of technical clarity that scales with product complexity.",
      tag: "Craft foundation",
    },
    {
      phase: "02",
      title: "Taking ownership across the full stack",
      description:
        "Moving from isolated implementation into broader product ownership across UI systems, APIs, data models, and delivery workflows.",
      tag: "System range",
    },
    {
      phase: "03",
      title: "Extending product thinking into mobile",
      description:
        "Applying the same product rigor to mobile interactions, continuity, and platform-aware experience design rather than treating mobile as a secondary surface.",
      tag: "Mobile depth",
    },
    {
      phase: "04",
      title: "Defining a sharper signature as an engineer",
      description:
        "Bringing together technical rigor, interface sensitivity, and product judgment into a style of execution that feels deliberate, modern, and dependable.",
      tag: "Current direction",
    },
  ],
  services: [
    {
      title: "Web Applications",
      tag: "Interfaces + Systems",
      description:
        "Responsive product surfaces built with stronger hierarchy, cleaner interactions, and an implementation standard that feels considered under real usage.",
      points: [
        "Marketing sites, dashboards, and product frontends",
        "Composable UI systems that stay consistent as they expand",
        "Performance-aware implementation and interaction polish",
      ],
    },
    {
      title: "Fullstack Systems",
      tag: "Application Layer",
      description:
        "End-to-end product delivery that connects interface quality with readable backend architecture, durable APIs, and structured data flow.",
      points: [
        "API design, integration layers, and auth flows",
        "Data models and service structure built for maintainability",
        "Scalable systems without unnecessary complexity debt",
      ],
    },
    {
      title: "Mobile Apps",
      tag: "Cross-Platform Delivery",
      description:
        "Mobile products built with careful interaction flow, strong continuity with the wider system, and attention to how people actually use the product in motion.",
      points: [
        "Cross-platform product delivery with mobile-first care",
        "Clear interaction design for repeated real-world tasks",
        "Closer alignment between app behavior and backend state",
      ],
    },
    {
      title: "Scalable Digital Products",
      tag: "Strategy + Execution",
      description:
        "A practical engineering partner for teams that need product shape, technical coherence, and polished delivery to move together.",
      points: [
        "Early product architecture and delivery support",
        "Design-aware implementation across the stack",
        "Execution tuned for iteration, clarity, and long-term growth",
      ],
    },
  ],
  contact: {
    email: "billy.tran@example.com",
    methods: [
      {
        label: "Email",
        value: "billy.tran@example.com",
        href: "mailto:billy.tran@example.com",
      },
      {
        label: "GitHub",
        value: "github.com/billytran",
        href: "https://github.com/billytran",
      },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/billytran",
        href: "https://www.linkedin.com/in/billytran",
      },
    ],
    note: "Ideal for founders, product teams, and companies looking for an engineering partner who can move from interface craft to backend systems and mobile delivery without losing product focus.",
  },
  footer: {
    note: "Crafted with Next.js, TypeScript, Tailwind CSS, and Framer Motion.",
  },
};
