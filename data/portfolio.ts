export type Locale = "en" | "vi";

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

export type ProjectDetailHighlight = {
  title: string;
  description: string;
};

export type ProjectDetail = {
  eyebrow: string;
  overviewTitle: string;
  overview: string[];
  problemTitle: string;
  problem: string[];
  solutionTitle: string;
  solution: string[];
  roleTitle: string;
  role: string[];
  technicalTitle: string;
  technicalHighlights: ProjectDetailHighlight[];
  featuresTitle: string;
  businessValueTitle: string;
  businessValue: string[];
  stackTitle: string;
  galleryTitle: string;
  galleryNote: string;
  linksTitle: string;
  backLabel: string;
  contactCtaTitle: string;
  contactCtaDescription: string;
  contactCtaLabel: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export type Project = {
  slug: string;
  category: string;
  description: string;
  features: string[];
  impact: string;
  impactLabel: string;
  links: {
    detailLabel: string;
    previewHref: string;
    previewLabel: string;
    sourceHref: string;
    sourceLabel: string;
  };
  stack: string[];
  title: string;
  detail: ProjectDetail;
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

export type TechGroup = {
  items: string[];
  title: string;
};

export type ContactFormCopy = {
  eyebrow: string;
  title: string;
  description: string;
  requiredHint: string;
  optionalLabel: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  inquiryTypeLabel: string;
  inquiryTypePlaceholder: string;
  inquiryTypes: string[];
  budgetLabel: string;
  budgetPlaceholder: string;
  budgetOptions: string[];
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  errorMessage: string;
  validationMessage: string;
  privacyNote: string;
  fieldErrors: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    messageRequired: string;
    messageTooShort: string;
    fieldTooLong: string;
  };
};

export type PortfolioData = {
  name: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  header: {
    brandName: string;
    tagline: string;
    ctaLabel: string;
    availability: string;
  };
  navigation: NavigationItem[];
  hero: {
    eyebrow: string;
    headlineLead: string;
    headlineAccent: string;
    description: string;
    availability: string;
    primaryCta: string;
    secondaryCta: string;
    strips: string[];
    orbitEyebrow: string;
    orbitTitle: string;
    orbitDescription: string;
  };
  heroMetrics: HeroMetric[];
  heroOrbitTags: string[];
  about: {
    eyebrow: string;
    title: string;
    description: string;
    paragraphs: string[];
    pillars: Pillar[];
    roles: string[];
  };
  tech: {
    eyebrow: string;
    title: string;
    description: string;
    focusedToolsLabel: string;
  };
  techGroups: TechGroup[];
  projectsSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  projects: Project[];
  journeySection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  journey: JourneyItem[];
  servicesSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  services: Service[];
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    methods: ContactMethod[];
    noteTitle: string;
    note: string;
    email: string;
    form: ContactFormCopy;
  };
  footer: {
    roleLine: string;
    note: string;
  };
};

export const locales = ["en", "vi"] as const;

export const defaultLocale: Locale = "en";

export const portfolioContent: Record<Locale, PortfolioData> = {
  en: {
    name: "Billy Tran",
    metadata: {
      title: "Billy Tran | Software Engineer",
      description: "Premium portfolio website for Billy Tran, a software engineer building fullstack web platforms, mobile applications, and scalable digital products.",
      keywords: ["Billy Tran", "Software Engineer", "Fullstack Web Developer", "Mobile Developer", "Next.js Portfolio"],
    },
    header: {
      brandName: "Billy Tran",
      tagline: "Fullstack Systems + Mobile Delivery",
      ctaLabel: "Let's Talk",
      availability: "Open to select product collaborations",
    },
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
      headlineLead: "Full-stack developer building business-ready",
      headlineAccent: "web systems, dashboards, and client portals.",
      description: "I build practical web products with clean interfaces, secure data flows, and maintainable backend logic — from logistics operations dashboards to restaurant booking platforms and bilingual customer portals.",
      availability: "Open to remote web development roles, freelance projects, and business platform builds.",
      primaryCta: "View Real Projects",
      secondaryCta: "Start a Conversation",
      strips: [
        "Next.js & ASP.NET Core MVC systems",
        "Database designs & secure data flows",
        "Bilingual UX & admin dashboard builds",
      ],
      orbitEyebrow: "Signature Focus",
      orbitTitle: "Calm systems. Sharp execution. Product continuity.",
      orbitDescription: "Billy works at the point where interface precision, backend rigor, and mobile delivery need to feel like one coherent product system.",
    },
    heroMetrics: [
      {
        label: "Craft",
        value: "Practical interfaces backed by clear business logic",
      },
      {
        label: "Range",
        value: "Next.js, ASP.NET Core, PostgreSQL, and API delivery",
      },
      {
        label: "Mode",
        value: "Production-minded builder focused on operational value",
      },
    ],
    heroOrbitTags: [
      "Admin dashboards",
      "Booking systems",
      "Client portals",
      "Bilingual UX",
    ],
    about: {
      eyebrow: "About",
      title: "I am a full-stack web developer focused on building practical systems for real business workflows.",
      description: "My recent work spans logistics operations dashboards, restaurant brand platforms, reservation systems, bilingual customer portals, and admin tools. I enjoy turning messy manual processes into clean interfaces, structured data models, and reliable workflows that teams can actually use.",
      paragraphs: [
        "I write clean TypeScript and C# backend logic, model relational databases with PostgreSQL, and connect services like Cloudinary, Resend, and external REST APIs to build complete web products.",
        "Whether designing role-based admin panels or optimizing user-facing booking forms, I focus on what makes the system secure, performant, and maintainable over the long term.",
      ],
      pillars: [
        {
          title: "Fullstack Development",
          copy: "Implementing complete web flows across responsive frontends, backend APIs, and structured database models.",
        },
        {
          title: "Business Workflows",
          copy: "Designing systems modeled around real-world business requirements, roles, and permissions.",
        },
        {
          title: "System Integration",
          copy: "Connecting messaging layers, cloud media storage, and third-party APIs into clean service architectures.",
        },
        {
          title: "Performance & SEO",
          copy: "Tuning databases, optimizing static/dynamic asset loading, and setting proper meta configurations.",
        },
      ],
      roles: ["Fullstack Web Developer", "Next.js Developer", "Business Web Systems Builder"],
    },
    tech: {
      eyebrow: "Tech Stack",
      title: "A modern toolkit across frontend, backend, database, and integrations.",
      description: "Organized for clarity and maintainability, making it easy to see which tools back my web systems without unnecessary framework overhead.",
      focusedToolsLabel: "focused tools",
    },
    techGroups: [
      {
        title: "Frontend",
        items: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Razor Views",
          "Vanilla JavaScript",
          "Responsive UI",
        ],
      },
      {
        title: "Backend",
        items: [
          "Node.js",
          "ASP.NET Core",
          "C#",
          "REST APIs",
          "Auth Flows",
          "Business Logic",
          "Server Actions",
        ],
      },
      {
        title: "Database & ORM",
        items: [
          "PostgreSQL",
          "Drizzle ORM",
          "Entity Framework Core",
          "SQL Modeling",
          "Relational Schemas",
        ],
      },
      {
        title: "Auth & Security",
        items: [
          "Better Auth",
          "JWT",
          "RBAC",
          "Session Management",
          "Role-Based Workflows",
        ],
      },
      {
        title: "Integrations",
        items: [
          "Cloudinary",
          "Resend API",
          "Google Drive API",
          "Vercel",
          "Railway",
          "REST Integrations",
        ],
      },
      {
        title: "Product Delivery",
        items: [
          "Admin Dashboards",
          "Booking Systems",
          "Logistics Workflows",
          "Client Portals",
          "Bilingual UX",
          "SEO-aware Pages",
        ],
      },
    ],
    projectsSection: {
      eyebrow: "Featured Projects",
      title: "Selected web platforms and operations systems built for real-world utility.",
      description: "These case studies represent production-oriented web applications featuring structured backend logic, roles verification, and dynamic user interfaces.",
    },
    projects: [
      {
        slug: "uniwave-go-freight",
        title: "UniWave Go Freight",
        category: "Fullstack Logistics Operations",
        description: "A full-stack logistics operations dashboard for managing freight jobsheets, role-based sales/accounting workflows, and structured tax calculation rules.",
        features: [
          "Role-based dashboards for Sales, Accounting, and Admin",
          "Structured shipping note and jobsheet workflows",
          "Separated selling charges, buying charges, and tax-sensitive records",
          "PostgreSQL-backed operational data with type-safe schema handling",
        ],
        impactLabel: "Core Operations",
        impact: "Built as a production-oriented internal operations platform, it brings logistics workflows into a secure Next.js dashboard separating sales and accounting data.",
        stack: [
          "Next.js",
          "React",
          "TypeScript",
          "PostgreSQL",
          "Drizzle ORM",
          "Better Auth",
          "Tailwind CSS",
          "Zod",
        ],
        links: {
          detailLabel: "View Case Study",
          previewHref: "#contact",
          previewLabel: "Discuss Demo",
          sourceHref: "#contact",
          sourceLabel: "Source on request",
        },
        detail: {
          eyebrow: "Project Detail",
          overviewTitle: "Overview",
          overview: [
            "UniWave Go Freight is positioned as an internal logistics operations system for handling freight jobsheets, charge structures, and role-based operational workflows in one place.",
            "The project emphasizes secure full-stack delivery with Next.js App Router, TypeScript, PostgreSQL, Drizzle ORM, and Better Auth, making it the strongest technical case study in the portfolio.",
            "Rather than treating the workflow as a set of disconnected forms, the system organizes operational records, permissions, and financial visibility around real day-to-day roles.",
          ],
          problemTitle: "Problem",
          problem: [
            "Freight operations often depend on scattered spreadsheets, copied files, and manual handoffs between teams.",
            "Sales and accounting teams need different visibility into pricing, costs, and margin-sensitive data.",
            "Jobsheets, shipping notes, selling charges, buying charges, VAT logic, and export-ready records need structured handling instead of informal tracking.",
          ],
          solutionTitle: "Solution",
          solution: [
            "The system was built as a secure internal dashboard with role-based access for Sales, Accounting, and Admin flows.",
            "Operational data was modeled in PostgreSQL with Drizzle ORM so freight records, charges, and related workflows could stay consistent and type-safe across the application.",
            "Better Auth and session-aware routing were used to support role-aware permissions, while shipping note, charge, and VAT logic were mapped into maintainable web workflows.",
          ],
          roleTitle: "My Role",
          role: [
            "Designed and implemented the full-stack application structure across the frontend, backend, and data layer.",
            "Built the relational database schema and type-safe data flows used by the operational workflows.",
            "Implemented role-aware views and permission-sensitive workflow behavior.",
            "Helped translate manual freight operations into a maintainable internal web system.",
          ],
          technicalTitle: "Technical Highlights",
          technicalHighlights: [
            {
              title: "Role-based access with Better Auth",
              description: "Sales, Accounting, and Admin flows were separated so each role could work with the right level of visibility and control.",
            },
            {
              title: "Relational schema with PostgreSQL and Drizzle ORM",
              description: "Core freight records, charges, and related entities were modeled in a structured schema to reduce ambiguity and keep updates predictable.",
            },
            {
              title: "Shipping note and charge workflow handling",
              description: "Shipping notes, selling charges, and buying charges were organized into operational CRUD flows rather than loose spreadsheet-style data entry.",
            },
            {
              title: "VAT and tax-rule logic",
              description: "Tax-sensitive operational records were handled with explicit workflow rules so accounting-related calculations were clearer and easier to maintain.",
            },
            {
              title: "Export-ready operational records",
              description: "The system was shaped around records that could support reporting and downstream export needs without rebuilding the data model later.",
            },
          ],
          featuresTitle: "Key Features",
          businessValueTitle: "Business Value",
          businessValue: [
            "Creates more structured freight operations with less reliance on spreadsheet-only coordination.",
            "Improves privacy for margin-sensitive accounting data by separating visibility across roles.",
            "Clarifies operational ownership between sales, accounting, and admin users.",
            "Provides a more maintainable foundation for future logistics workflow expansion.",
          ],
          stackTitle: "Tech Stack",
          galleryTitle: "Gallery",
          galleryNote: "Real project screenshots will be added later.",
          linksTitle: "Project Links",
          backLabel: "Back to projects",
          contactCtaTitle: "Discuss a similar project",
          contactCtaDescription: "If you need a structured internal system for operations, roles, and workflow visibility, this is the type of product work I can help shape and implement.",
          contactCtaLabel: "Go to contact form",
          metadata: {
            title: "UniWave Go Freight Case Study",
            description: "Bilingual case study for UniWave Go Freight, a full-stack logistics operations system built with Next.js, TypeScript, PostgreSQL, Drizzle ORM, and Better Auth.",
            keywords: [
              "UniWave Go Freight",
              "logistics operations system",
              "Next.js case study",
              "PostgreSQL dashboard",
              "Drizzle ORM",
              "Better Auth",
            ],
          },
        },
      },
      {
        title: "Truyền Thuyết Champong Brand Portal",
        category: "Restaurant Web Platform",
        description: "A restaurant brand platform combining a public marketing website, digital menu experience, reservation flow, and back-office management tools.",
        slug: "truyen-thuyet-champong",
        features: [
          "Public restaurant brand pages with branch and menu discovery",
          "Reservation logic with availability and blockout handling",
          "Admin workflows for content, branches, menus, and bookings",
          "Cloudinary-backed media handling and booking email notifications",
        ],
        impactLabel: "Business Digital Channel",
        impact: "Delivers a full web presence for a restaurant brand, combining table booking logic, email notifications, Cloudinary-powered media handling, and branch locators.",
        stack: [
          "ASP.NET Core",
          "C#",
          "PostgreSQL",
          "Entity Framework Core",
          "Tailwind CSS",
          "Cloudinary",
          "Resend",
          "Razor Views",
        ],
        links: {
          detailLabel: "View Case Study",
          previewHref: "#contact",
          previewLabel: "Discuss Demo",
          sourceHref: "#contact",
          sourceLabel: "Source on request",
        },
        detail: {
          eyebrow: "Project Detail",
          overviewTitle: "Overview",
          overview: [
            "Truyền Thuyết Champong Brand Portal is positioned as a restaurant business platform rather than a simple brochure website.",
            "The project connects public brand presentation, menu exploration, and reservation flows with internal admin workflows used by restaurant staff.",
            "It demonstrates practical backend and business workflow work with ASP.NET Core MVC, PostgreSQL, Entity Framework Core, Cloudinary, and Resend.",
          ],
          problemTitle: "Problem",
          problem: [
            "A restaurant brand needs more than static pages to support real customer and staff workflows.",
            "Customers need access to menu, branch, and booking information in a usable digital format.",
            "Staff need internal tools to manage reservations, content, branches, and menus without treating updates as code changes.",
          ],
          solutionTitle: "Solution",
          solution: [
            "The platform combines public-facing pages with admin workflows so the website can support both brand communication and day-to-day restaurant operations.",
            "Reservation logic was built around branch availability and holiday or blockout rules, helping bookings reflect more realistic operating conditions.",
            "Cloudinary was integrated for media handling, while Resend was used for booking-related email communication and an interactive menu flipbook supported richer menu browsing.",
          ],
          roleTitle: "My Role",
          role: [
            "Built backend services and MVC workflows across the public site and admin areas.",
            "Structured Entity Framework Core models and PostgreSQL-backed data flows.",
            "Implemented admin workflows for bookings, branches, menus, and content management.",
            "Helped connect customer-facing restaurant UX with internal operational needs.",
          ],
          technicalTitle: "Technical Highlights",
          technicalHighlights: [
            {
              title: "ASP.NET Core MVC architecture",
              description: "The application was organized around an MVC structure that supported both public pages and staff-facing management workflows.",
            },
            {
              title: "Entity Framework Core data model",
              description: "Reservation, branch, content, and menu data were modeled in a structured relational layer backed by PostgreSQL.",
            },
            {
              title: "Reservation and branch availability logic",
              description: "Booking flows accounted for branch-specific availability as well as holiday and blockout conditions.",
            },
            {
              title: "Resend notification flow",
              description: "Booking-related communication was supported through email notifications instead of leaving confirmation entirely to manual follow-up.",
            },
            {
              title: "Cloudinary media pipeline",
              description: "Media assets could be managed more cleanly without hardcoding images into static templates.",
            },
            {
              title: "Interactive menu flipbook",
              description: "The menu experience was designed to feel more presentation-ready than a plain static image list.",
            },
          ],
          featuresTitle: "Key Features",
          businessValueTitle: "Business Value",
          businessValue: [
            "Improves the customer booking experience with clearer digital reservation flows.",
            "Makes restaurant content and media easier to manage without repeated code edits.",
            "Strengthens brand presentation across public-facing pages.",
            "Reduces operational friction for staff managing reservations, branches, and menu content.",
          ],
          stackTitle: "Tech Stack",
          galleryTitle: "Gallery",
          galleryNote: "Real project screenshots will be added later.",
          linksTitle: "Project Links",
          backLabel: "Back to projects",
          contactCtaTitle: "Discuss a similar project",
          contactCtaDescription: "If you need a business website that also supports booking logic and internal workflows, this project reflects the kind of platform work I can help deliver.",
          contactCtaLabel: "Go to contact form",
          metadata: {
            title: "Truyền Thuyết Champong Brand Portal Case Study",
            description: "Bilingual case study for Truyền Thuyết Champong Brand Portal, a restaurant platform combining public brand pages, reservation logic, admin workflows, Cloudinary, and Resend.",
            keywords: [
              "Truyền Thuyết Champong",
              "restaurant web platform",
              "ASP.NET Core MVC case study",
              "Entity Framework Core",
              "Cloudinary",
              "Resend",
            ],
          },
        },
      },
      {
        title: "UniWave Customer Portal",
        category: "Bilingual Client Portal",
        description: "A bilingual logistics customer portal with shipment tracking, freight quote estimation, and JWT-secured client dashboard flows.",
        slug: "uniwave-customer-portal",
        features: [
          "Bilingual Vietnamese and English customer-facing flows",
          "Shipment tracking and freight quote estimation UI",
          "JWT token storage, expiry checks, and authenticated requests",
          "Lightweight portal architecture with Vercel rewrite routing",
        ],
        impactLabel: "Self-Service Integration",
        impact: "UniWave Customer Portal focuses on lightweight, practical client-side delivery. It combines a custom translation engine, REST API calls, Vercel rewrites, and JWT handling.",
        stack: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "REST API",
          "JWT",
          "Vercel",
          "i18n",
          "JSON",
        ],
        links: {
          detailLabel: "View Case Study",
          previewHref: "#contact",
          previewLabel: "Discuss Demo",
          sourceHref: "#contact",
          sourceLabel: "Source on request",
        },
        detail: {
          eyebrow: "Project Detail",
          overviewTitle: "Overview",
          overview: [
            "UniWave Customer Portal is positioned as a bilingual client-facing logistics portal focused on practical self-service rather than unnecessary framework complexity.",
            "The project combines lightweight frontend delivery, REST API integration, and JWT-based session handling to support authenticated tracking and quote-related flows.",
            "It is also a strong example of practical localization work, showing how bilingual routing and interface copy can stay clear without turning the product into a heavy SPA.",
          ],
          problemTitle: "Problem",
          problem: [
            "Logistics customers need self-service access to shipment tracking and quote estimation instead of depending on repeated manual support.",
            "Both Vietnamese-speaking and English-speaking users need access to the same portal experience.",
            "The solution needed to stay lightweight while still supporting authenticated client-facing flows.",
          ],
          solutionTitle: "Solution",
          solution: [
            "The portal was built as a bilingual Vietnamese and English experience using a JSON dictionary-based localization approach.",
            "REST API calls were used to support tracking, quote estimation, and client dashboard flows without introducing unnecessary frontend overhead.",
            "JWT token storage, expiry checks, and authenticated request handling were implemented alongside Vercel rewrites for clean multilingual routes.",
          ],
          roleTitle: "My Role",
          role: [
            "Built client-side localization and UI flows for bilingual usage.",
            "Implemented API client logic and JWT-based session handling.",
            "Configured clean multilingual routing behavior for the portal structure.",
            "Helped shape a practical self-service customer portal around real logistics use cases.",
          ],
          technicalTitle: "Technical Highlights",
          technicalHighlights: [
            {
              title: "JSON-based i18n",
              description: "A dictionary-driven localization approach kept English and Vietnamese copy manageable without introducing a heavier localization stack than the project needed.",
            },
            {
              title: "REST API integration",
              description: "Tracking, quote, and dashboard-related flows were connected through API requests rather than tightly coupling the frontend to a monolithic backend view layer.",
            },
            {
              title: "JWT session handling",
              description: "Token storage, expiry checks, and authenticated request behavior were handled on the client to support protected portal flows.",
            },
            {
              title: "Vercel rewrite routing",
              description: "Clean multilingual subpaths were supported through practical deployment-side routing configuration.",
            },
            {
              title: "Shipment tracking UI",
              description: "The tracking experience was designed to provide clearer status visibility for customers in a self-service format.",
            },
            {
              title: "Freight quote estimator",
              description: "Customers could interact with lightweight quote-related workflows instead of relying entirely on manual back-and-forth communication.",
            },
          ],
          featuresTitle: "Key Features",
          businessValueTitle: "Business Value",
          businessValue: [
            "Reduces repetitive support needs by giving customers direct access to shipment information.",
            "Improves customer visibility into logistics workflows through self-service tracking.",
            "Supports bilingual access for Vietnamese and international users.",
            "Delivers useful portal functionality with a lightweight, practical stack.",
          ],
          stackTitle: "Tech Stack",
          galleryTitle: "Gallery",
          galleryNote: "Real project screenshots will be added later.",
          linksTitle: "Project Links",
          backLabel: "Back to projects",
          contactCtaTitle: "Discuss a similar project",
          contactCtaDescription: "If you need a bilingual customer-facing portal with API integration and session-aware flows, this is the kind of implementation direction I can help with.",
          contactCtaLabel: "Go to contact form",
          metadata: {
            title: "UniWave Customer Portal Case Study",
            description: "Bilingual case study for UniWave Customer Portal, a lightweight Vietnamese and English logistics portal with REST API integration, JWT handling, and clean Vercel routing.",
            keywords: [
              "UniWave Customer Portal",
              "bilingual client portal",
              "REST API integration",
              "JWT portal",
              "Vercel rewrites",
              "logistics customer portal",
            ],
          },
        },
      },
    ],
    journeySection: {
      eyebrow: "Journey",
      title: "A trajectory centered on product depth, technical range, and useful delivery.",
      description: "Instead of abstract checklists, this timeline frames my path as a sequence of sharper technical capabilities and stronger product judgment.",
    },
    journey: [
      {
        phase: "01",
        title: "Business Website & Backend Foundations",
        description: "Focused on C#, ASP.NET Core, PostgreSQL, and Entity Framework Core, building reservation engines, Cloudinary media flows, and transactional email alert notifications.",
        tag: "ASP.NET Core & Database",
      },
      {
        phase: "02",
        title: "Modern Full-Stack Operations Systems",
        description: "Engineering full-stack web applications with Next.js, TypeScript, PostgreSQL, Drizzle ORM, and Better Auth, establishing role-based permissions and strict schema validations.",
        tag: "Next.js & Strict Security",
      },
      {
        phase: "03",
        title: "Client Portals & Bilingual Product Experience",
        description: "Developing lightweight client-facing sites, configuring bilingual JSON locale translations, REST API integrations, JWT session states, and clean routing architectures.",
        tag: "i18n & API Integration",
      },
      {
        phase: "04",
        title: "Current Direction",
        description: "Delivering business-ready web systems, admin dashboards, and custom client portals as a remote developer and project-based partner.",
        tag: "Business Web Systems",
      },
    ],
    servicesSection: {
      eyebrow: "What I Build",
      title: "Delivery across the interface, the database, and the workflows in between.",
      description: "Positioned for teams and businesses that need practical, clean web platforms. Each service is tuned to solve operational friction without unnecessary complexity.",
    },
    services: [
      {
        title: "Business Web Applications",
        tag: "Brand Platforms + Booking",
        description: "Landing pages, brand websites, booking flows, and content workflows designed for customer conversion and operational utility.",
        points: [
          "Custom booking/reservation calendar systems",
          "Tailwind CSS styling and responsive layouts",
          "Cloudinary-powered image storage and optimization",
        ],
      },
      {
        title: "Full-Stack Dashboards",
        tag: "Operations + CRUD Systems",
        description: "Operations panels, role-based workflows, database CRUD tools, and admin interfaces designed for secure internal data management.",
        points: [
          "Role-Based Access Control and Better Auth sessions",
          "Structured PostgreSQL tables and Drizzle/EF ORM modeling",
          "Strict input validation and server-side workflow rules",
        ],
      },
      {
        title: "Client Portals & Integrations",
        tag: "Authenticated + Bilingual UX",
        description: "Bilingual client dashboards, shipment tracking modules, instant quote estimators, and external REST API integrations.",
        points: [
          "Bilingual (English/Vietnamese) localizations",
          "JWT storage, token checks, and fetch API connectors",
          "Vercel rewrite routing and clean multilingual subpaths",
        ],
      },
      {
        title: "Maintenance & Product Polish",
        tag: "Debugging + Refactoring",
        description: "Performance optimization, database tuning, SEO improvements, bugs resolution, and preparing legacy sites for deployment.",
        points: [
          "Optimizing layouts for Google Lighthouse/Core Web Vitals",
          "Securing database endpoints and cleaning deprecated logic",
          "Configuring production deployment pipelines on Vercel/Railway",
        ],
      },
    ],
    contact: {
      eyebrow: "Contact",
      title: "Have a web app, dashboard, or business workflow that needs to be built properly?",
      description: "I am open to remote full-stack roles, freelance builds, and project-based collaboration. Send me a short brief, existing repo, or product idea — I can help turn it into a clean, maintainable web system.",
      primaryCta: "Email Billy",
      secondaryCta: "View highlighted work",
      methods: [
        {
          label: "Email",
          value: "tranbao64416@gmail.com",
          href: "mailto:tranbao64416@gmail.com",
        },
        {
          label: "GitHub",
          value: "github.com/BillNotAGamer",
          href: "https://github.com/BillNotAGamer",
        },
        {
          label: "LinkedIn",
          value: "linkedin.com/in/bảo-trần-2171a5260",
          href: "https://www.linkedin.com/in/bảo-trần-2171a5260",
        },
      ],
      noteTitle: "Collaboration Note",
      note: "I am open to remote full-stack roles, freelance builds, and project-based collaboration. Send me a short brief, existing repo, or product idea — I can help turn it into a clean, maintainable web system.",
      email: "tranbao64416@gmail.com",
      form: {
        eyebrow: "Project Brief",
        title: "Send a direct message",
        description: "Share the goal, timeline, or current blocker. I will reply by email when the brief is a fit.",
        requiredHint: "* Required fields",
        optionalLabel: "Optional",
        nameLabel: "Name",
        namePlaceholder: "Your name",
        emailLabel: "Email",
        emailPlaceholder: "you@example.com",
        companyLabel: "Company / Organization",
        companyPlaceholder: "Company name",
        inquiryTypeLabel: "Inquiry type",
        inquiryTypePlaceholder: "Select an inquiry type",
        inquiryTypes: [
          "Remote role",
          "Freelance project",
          "Business website",
          "Dashboard / internal system",
          "Client portal",
          "Maintenance / bug fixing",
          "Other",
        ],
        budgetLabel: "Budget / project size",
        budgetPlaceholder: "Select a budget range",
        budgetOptions: [
          "Not sure yet",
          "Under $500",
          "$500 - $1,500",
          "$1,500 - $3,000",
          "$3,000+",
          "Prefer to discuss",
        ],
        messageLabel: "Message",
        messagePlaceholder: "Tell me what you are building, what stage it is in, and where you need help.",
        submitLabel: "Send message",
        submittingLabel: "Sending...",
        successMessage: "Message sent successfully.",
        errorMessage: "Unable to send your message right now.",
        validationMessage: "Please check the form and try again.",
        privacyNote: "Your message is sent directly by email through a secure server-side route. No newsletter signup or third-party email API is used here.",
        fieldErrors: {
          nameRequired: "Please enter your name.",
          emailRequired: "Please enter your email address.",
          emailInvalid: "Please enter a valid email address.",
          messageRequired: "Please enter a message.",
          messageTooShort: "Please provide at least 20 characters so I have enough context.",
          fieldTooLong: "Please shorten this field and try again.",
        },
      },
    },
    footer: {
      roleLine: "Software Engineer • Fullstack Web Developer • Next.js Developer",
      note: "Building practical full-stack web systems for businesses, teams, and digital products.",
    },
  },
  vi: {
    name: "Billy Tran",
    metadata: {
      title: "Billy Tran | Kỹ sư Phần mềm",
      description: "Trang web portfolio cao cấp của Billy Tran, kỹ sư phần mềm chuyên xây dựng hệ thống web full-stack, ứng dụng di động và các sản phẩm kỹ thuật số có khả năng mở rộng.",
      keywords: ["Billy Tran", "Kỹ sư phần mềm", "Lập trình viên Fullstack", "Lập trình di động", "Next.js Portfolio"],
    },
    header: {
      brandName: "Billy Tran",
      tagline: "Hệ thống Fullstack + Phát triển ứng dụng Di động",
      ctaLabel: "Liên hệ",
      availability: "Sẵn sàng cho các cơ hội hợp tác sản phẩm",
    },
    navigation: [
      { label: "Giới thiệu", href: "#about" },
      { label: "Công nghệ", href: "#tech-stack" },
      { label: "Dự án", href: "#featured-projects" },
      { label: "Hành trình", href: "#journey" },
      { label: "Dịch vụ", href: "#services" },
      { label: "Liên hệ", href: "#contact" },
    ],
    hero: {
      eyebrow: "Lập trình viên Độc lập / Billy Tran",
      headlineLead: "Lập trình viên full-stack xây dựng hệ thống web,",
      headlineAccent: "dashboard vận hành và cổng khách hàng doanh nghiệp.",
      description: "Tôi thiết kế các sản phẩm web thực tế với giao diện gọn gàng, luồng dữ liệu an toàn và logic backend dễ bảo trì — từ dashboard quản lý logistics đến hệ thống đặt bàn nhà hàng và cổng thông tin khách hàng song ngữ.",
      availability: "Sẵn sàng nhận các vị trí full-stack remote, dự án freelance và phát triển hệ thống doanh nghiệp.",
      primaryCta: "Xem Dự án Thực tế",
      secondaryCta: "Bắt đầu cuộc trao đổi",
      strips: [
        "Hệ thống Next.js & ASP.NET Core MVC",
        "Thiết kế cơ sở dữ liệu & luồng dữ liệu bảo mật",
        "Trải nghiệm người dùng song ngữ & dashboard quản trị",
      ],
      orbitEyebrow: "Trọng tâm Kỹ nghệ",
      orbitTitle: "Hệ thống tối giản. Thực thi sắc sảo. Sản phẩm đồng nhất.",
      orbitDescription: "Tôi làm việc tại điểm giao thoa nơi sự sắc sảo của giao diện, sự chặt chẽ của hệ thống và tính đồng nhất trên di động hòa làm một sản phẩm hoàn chỉnh.",
    },
    heroMetrics: [
      {
        label: "Kỹ nghệ",
        value: "Giao diện thực tế được củng cố bởi logic kinh doanh rõ ràng",
      },
      {
        label: "Năng lực",
        value: "Phát triển Next.js, ASP.NET Core, PostgreSQL và API",
      },
      {
        label: "Phương châm",
        value: "Tập trung tạo ra giá trị vận hành thực tế cho sản phẩm",
      },
    ],
    heroOrbitTags: [
      "Dashboard quản trị",
      "Hệ thống đặt bàn",
      "Cổng khách hàng",
      "Trải nghiệm song ngữ",
    ],
    about: {
      eyebrow: "Giới thiệu",
      title: "Tôi là lập trình viên full-stack tập trung xây dựng các hệ thống thực tế cho quy trình vận hành doanh nghiệp.",
      description: "Các dự án gần đây của tôi bao gồm dashboard quản lý logistics, nền tảng thương hiệu nhà hàng, hệ thống đặt bàn ăn, cổng thông tin khách hàng song ngữ và các công cụ quản trị nội bộ. Tôi yêu thích việc số hóa các quy trình thủ công phức tạp thành giao diện trực quan, mô hình dữ liệu chặt chẽ và luồng vận hành tin cậy.",
      paragraphs: [
        "Tôi viết logic backend an toàn bằng TypeScript và C#, thiết kế cơ sở dữ liệu quan hệ với PostgreSQL, và tích hợp các dịch vụ như Cloudinary, Resend và các REST API bên ngoài để hoàn thiện sản phẩm web.",
        "Dù là thiết kế bảng quản trị phân quyền hay tối ưu hóa biểu mẫu đặt bàn cho người dùng, tôi luôn chú trọng tính bảo mật, hiệu năng và khả năng bảo trì lâu dài của hệ thống.",
      ],
      pillars: [
        {
          title: "Phát triển Fullstack",
          copy: "Triển khai toàn bộ quy trình web từ giao diện responsive, API backend đến mô hình cơ sở dữ liệu quan hệ.",
        },
        {
          title: "Quy trình Doanh nghiệp",
          copy: "Thiết kế hệ thống xoay quanh yêu cầu thực tế, phân vai trò và kiểm soát quyền truy cập chặt chẽ.",
        },
        {
          title: "Tích hợp Hệ thống",
          copy: "Kết nối luồng gửi tin nhắn, lưu trữ phương tiện đám mây và các API bên thứ ba vào kiến trúc dịch vụ sạch.",
        },
        {
          title: "Hiệu năng & SEO",
          copy: "Tối ưu hóa cơ sở dữ liệu, đẩy nhanh tốc độ tải tài nguyên tĩnh/động và cấu hình meta chuẩn SEO.",
        },
      ],
      roles: ["Lập trình viên Fullstack", "Lập trình viên Next.js", "Xây dựng Hệ thống Web Doanh nghiệp"],
    },
    tech: {
      eyebrow: "Công nghệ",
      title: "Bộ công cụ hiện đại từ frontend, backend, cơ sở dữ liệu đến các dịch vụ tích hợp.",
      description: "Được sắp xếp rõ ràng và khoa học, giúp dễ dàng nắm bắt các công nghệ cốt lõi cấu thành hệ thống mà không có chi phí dư thừa.",
      focusedToolsLabel: "công cụ cốt lõi",
    },
    techGroups: [
      {
        title: "Frontend",
        items: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Razor Views",
          "Vanilla JavaScript",
          "Responsive UI",
        ],
      },
      {
        title: "Backend",
        items: [
          "Node.js",
          "ASP.NET Core",
          "C#",
          "REST APIs",
          "Auth Flows",
          "Business Logic",
          "Server Actions",
        ],
      },
      {
        title: "Database & ORM",
        items: [
          "PostgreSQL",
          "Drizzle ORM",
          "Entity Framework Core",
          "SQL Modeling",
          "Relational Schemas",
        ],
      },
      {
        title: "Auth & Security",
        items: [
          "Better Auth",
          "JWT",
          "RBAC",
          "Session Management",
          "Role-Based Workflows",
        ],
      },
      {
        title: "Integrations",
        items: [
          "Cloudinary",
          "Resend API",
          "Google Drive API",
          "Vercel",
          "Railway",
          "REST Integrations",
        ],
      },
      {
        title: "Product Delivery",
        items: [
          "Admin Dashboards",
          "Booking Systems",
          "Logistics Workflows",
          "Client Portals",
          "Bilingual UX",
          "SEO-aware Pages",
        ],
      },
    ],
    projectsSection: {
      eyebrow: "Dự án Nổi bật",
      title: "Các nền tảng web và hệ thống vận hành chọn lọc được xây dựng cho nhu cầu thực tế.",
      description: "Các nghiên cứu điển hình này đại diện cho các ứng dụng web thực tế với logic backend chặt chẽ, kiểm tra phân quyền và giao diện người dùng động.",
    },
    projects: [
      {
        title: "UniWave Go Freight",
        slug: "uniwave-go-freight",
        category: "Hệ thống vận hành logistics full-stack",
        description: "Dashboard quản lý logistics full-stack hỗ trợ xử lý jobsheet vận chuyển, quy trình phân quyền giữa bộ phận bán hàng/kế toán, và quy tắc tính thuế tự động.",
        features: [
          "Dashboard theo vai trò cho Sales, Accounting và Admin",
          "Quy trình shipping note và jobsheet có cấu trúc rõ ràng",
          "Tách selling charges, buying charges và dữ liệu nhạy cảm về thuế",
          "Dữ liệu vận hành lưu trên PostgreSQL với schema type-safe",
        ],
        impactLabel: "Vận hành Cốt lõi",
        impact: "Được xây dựng như một nền tảng nội bộ thực tế, dự án đưa toàn bộ quy trình logistics vào một dashboard Next.js an toàn, phân tách rõ ràng dữ liệu kinh doanh và kế toán.",
        stack: [
          "Next.js",
          "React",
          "TypeScript",
          "PostgreSQL",
          "Drizzle ORM",
          "Better Auth",
          "Tailwind CSS",
          "Zod",
        ],
        links: {
          detailLabel: "Xem case study",
          previewHref: "#contact",
          previewLabel: "Trao đổi demo",
          sourceHref: "#contact",
          sourceLabel: "Mã nguồn theo yêu cầu",
        },
        detail: {
          eyebrow: "Chi tiết dự án",
          overviewTitle: "Tổng quan",
          overview: [
            "UniWave Go Freight được định vị là một hệ thống vận hành logistics nội bộ, nơi jobsheet, charge structure và workflow theo vai trò được gom về một nơi thay vì xử lý rời rạc.",
            "Đây là case study full-stack mạnh nhất trong portfolio, tập trung vào Next.js App Router, TypeScript, PostgreSQL, Drizzle ORM và Better Auth.",
            "Điểm quan trọng của dự án là đưa dữ liệu vận hành, quyền truy cập và logic tài chính về một cấu trúc rõ ràng theo đúng vai trò sử dụng hằng ngày.",
          ],
          problemTitle: "Bài toán",
          problem: [
            "Nhiều quy trình freight vẫn dựa vào spreadsheet rời rạc, file copy thủ công và các bước handoff thiếu kiểm soát.",
            "Bộ phận sales và accounting cần mức độ hiển thị dữ liệu khác nhau, đặc biệt với các thông tin nhạy cảm về giá vốn và margin.",
            "Jobsheet, shipping note, selling charge, buying charge, VAT và dữ liệu phục vụ export cần được xử lý có cấu trúc thay vì theo dõi thủ công.",
          ],
          solutionTitle: "Giải pháp",
          solution: [
            "Hệ thống được xây như một dashboard nội bộ bảo mật, với phân quyền cho Sales, Accounting và Admin.",
            "Dữ liệu vận hành được mô hình hóa trên PostgreSQL bằng Drizzle ORM để freight records, charges và các workflow liên quan giữ được tính nhất quán và type-safe.",
            "Better Auth cùng session-aware routing được dùng để hỗ trợ phân quyền theo vai trò, đồng thời workflow cho shipping note, charge và VAT được chuyển thành các luồng web dễ bảo trì.",
          ],
          roleTitle: "Vai trò của tôi",
          role: [
            "Thiết kế và triển khai cấu trúc full-stack cho frontend, backend và data layer.",
            "Xây dựng relational schema và các luồng dữ liệu type-safe cho workflow vận hành.",
            "Triển khai giao diện và hành vi hệ thống theo từng vai trò sử dụng.",
            "Hỗ trợ chuyển các thao tác freight thủ công thành một hệ thống nội bộ dễ bảo trì hơn.",
          ],
          technicalTitle: "Điểm nổi bật kỹ thuật",
          technicalHighlights: [
            {
              title: "Phân quyền với Better Auth",
              description: "Luồng Sales, Accounting và Admin được tách rõ để mỗi vai trò làm việc với đúng mức dữ liệu và quyền hạn cần thiết.",
            },
            {
              title: "Relational schema với PostgreSQL và Drizzle ORM",
              description: "Freight records, charges và các entity liên quan được mô hình hóa chặt chẽ để giảm mơ hồ và giúp cập nhật dữ liệu ổn định hơn.",
            },
            {
              title: "Workflow shipping note và charge",
              description: "Shipping note, selling charge và buying charge được đưa vào các luồng CRUD vận hành rõ ràng thay vì nhập liệu kiểu spreadsheet.",
            },
            {
              title: "Logic VAT và tax-rule",
              description: "Các bản ghi nhạy cảm về thuế được xử lý bằng rule rõ ràng để việc theo dõi phía accounting dễ hiểu và dễ bảo trì hơn.",
            },
            {
              title: "Bản ghi sẵn sàng cho export",
              description: "Cấu trúc dữ liệu được thiết kế theo hướng phục vụ reporting và export về sau mà không phải đập lại mô hình từ đầu.",
            },
          ],
          featuresTitle: "Tính năng chính",
          businessValueTitle: "Giá trị mang lại",
          businessValue: [
            "Giúp quy trình freight có cấu trúc hơn và bớt phụ thuộc vào spreadsheet.",
            "Tăng mức riêng tư cho dữ liệu nhạy cảm về kế toán và margin.",
            "Làm rõ trách nhiệm vận hành giữa sales, accounting và admin.",
            "Tạo nền tảng dễ mở rộng hơn cho các workflow logistics về sau.",
          ],
          stackTitle: "Công nghệ sử dụng",
          galleryTitle: "Hình ảnh dự án",
          galleryNote: "Hình ảnh thực tế của dự án sẽ được bổ sung sau.",
          linksTitle: "Liên kết dự án",
          backLabel: "Quay lại danh sách dự án",
          contactCtaTitle: "Trao đổi về dự án tương tự",
          contactCtaDescription: "Nếu bạn cần một hệ thống nội bộ có workflow rõ ràng, phân vai và kiểm soát dữ liệu tốt hơn, đây là kiểu sản phẩm tôi có thể cùng xây dựng.",
          contactCtaLabel: "Đi tới form liên hệ",
          metadata: {
            title: "Case study UniWave Go Freight",
            description: "Case study song ngữ cho UniWave Go Freight, hệ thống vận hành logistics full-stack xây bằng Next.js, TypeScript, PostgreSQL, Drizzle ORM và Better Auth.",
            keywords: [
              "UniWave Go Freight",
              "hệ thống logistics",
              "case study Next.js",
              "dashboard PostgreSQL",
              "Drizzle ORM",
              "Better Auth",
            ],
          },
        },
      },
      {
        title: "Truyền Thuyết Champong Brand Portal",
        category: "Nền tảng web cho nhà hàng",
        description: "Nền tảng thương hiệu nhà hàng kết hợp trang giới thiệu công cộng, trải nghiệm thực đơn số tương tác, luồng đặt bàn tự động và các công cụ quản trị nội bộ.",
        slug: "truyen-thuyet-champong",
        features: [
          "Trang thương hiệu công khai với thông tin chi nhánh và menu",
          "Logic đặt bàn có availability và blockout rõ ràng",
          "Workflow admin cho nội dung, chi nhánh, menu và booking",
          "Xử lý media qua Cloudinary và email booking tự động",
        ],
        impactLabel: "Kênh Số Doanh nghiệp",
        impact: "Cung cấp sự hiện diện số toàn diện cho chuỗi nhà hàng ẩm thực Hàn Quốc, tích hợp logic đặt bàn, thông báo email, xử lý hình ảnh Cloudinary và tìm kiếm chi nhánh.",
        stack: [
          "ASP.NET Core",
          "C#",
          "PostgreSQL",
          "Entity Framework Core",
          "Tailwind CSS",
          "Cloudinary",
          "Resend",
          "Razor Views",
        ],
        links: {
          detailLabel: "Xem case study",
          previewHref: "#contact",
          previewLabel: "Trao đổi demo",
          sourceHref: "#contact",
          sourceLabel: "Mã nguồn theo yêu cầu",
        },
        detail: {
          eyebrow: "Chi tiết dự án",
          overviewTitle: "Tổng quan",
          overview: [
            "Truyền Thuyết Champong Brand Portal được định vị như một nền tảng kinh doanh cho nhà hàng, chứ không chỉ là website giới thiệu đơn thuần.",
            "Dự án kết nối phần trình bày thương hiệu công khai, trải nghiệm xem menu, luồng đặt bàn và các workflow quản trị nội bộ cho staff.",
            "Đây là ví dụ rõ về backend và business workflow với ASP.NET Core MVC, PostgreSQL, Entity Framework Core, Cloudinary và Resend.",
          ],
          problemTitle: "Bài toán",
          problem: [
            "Một thương hiệu nhà hàng cần nhiều hơn các trang tĩnh nếu muốn hỗ trợ đồng thời khách hàng và vận hành nội bộ.",
            "Khách cần xem menu, chi nhánh và thông tin đặt bàn theo cách dễ sử dụng hơn.",
            "Staff cần công cụ để quản lý booking, nội dung, chi nhánh và menu mà không phải đụng vào code mỗi lần cập nhật.",
          ],
          solutionTitle: "Giải pháp",
          solution: [
            "Nền tảng kết hợp phần public-facing với các workflow admin để website vừa làm tốt vai trò thương hiệu, vừa hỗ trợ vận hành hằng ngày.",
            "Logic reservation được xây theo availability của từng chi nhánh, đồng thời tính tới holiday và blockout rule.",
            "Cloudinary được dùng cho media handling, Resend hỗ trợ thông báo booking và trải nghiệm menu flipbook giúp phần menu sống động hơn.",
          ],
          roleTitle: "Vai trò của tôi",
          role: [
            "Xây dựng backend services và MVC workflows cho cả phần public site lẫn admin.",
            "Thiết kế Entity Framework Core models và data flow trên PostgreSQL.",
            "Triển khai workflow admin cho booking, chi nhánh, menu và quản lý nội dung.",
            "Hỗ trợ kết nối UX phía khách hàng với các nhu cầu vận hành thực tế của nhà hàng.",
          ],
          technicalTitle: "Điểm nổi bật kỹ thuật",
          technicalHighlights: [
            {
              title: "Kiến trúc ASP.NET Core MVC",
              description: "Ứng dụng được tổ chức theo cấu trúc MVC để phục vụ đồng thời phần public pages và các workflow quản trị cho staff.",
            },
            {
              title: "Data model với Entity Framework Core",
              description: "Reservation, branch, content và menu được mô hình hóa thành lớp dữ liệu quan hệ rõ ràng trên PostgreSQL.",
            },
            {
              title: "Logic đặt bàn và availability theo chi nhánh",
              description: "Booking flow có tính tới availability của từng branch, cùng các điều kiện holiday và blockout.",
            },
            {
              title: "Thông báo email qua Resend",
              description: "Các email liên quan tới booking được tự động hóa thay vì phụ thuộc hoàn toàn vào việc follow-up thủ công.",
            },
            {
              title: "Media pipeline với Cloudinary",
              description: "Việc quản lý hình ảnh và media sạch hơn thay vì hardcode asset vào template tĩnh.",
            },
            {
              title: "Interactive menu flipbook",
              description: "Phần menu được triển khai theo hướng trình bày hấp dẫn hơn so với việc chỉ liệt kê ảnh tĩnh.",
            },
          ],
          featuresTitle: "Tính năng chính",
          businessValueTitle: "Giá trị mang lại",
          businessValue: [
            "Cải thiện trải nghiệm đặt bàn cho khách hàng bằng luồng số rõ ràng hơn.",
            "Giúp nội dung và media của nhà hàng được cập nhật dễ hơn mà không cần sửa code liên tục.",
            "Tăng chất lượng trình bày thương hiệu trên môi trường số.",
            "Giảm ma sát vận hành cho staff khi quản lý booking, chi nhánh và menu.",
          ],
          stackTitle: "Công nghệ sử dụng",
          galleryTitle: "Hình ảnh dự án",
          galleryNote: "Hình ảnh thực tế của dự án sẽ được bổ sung sau.",
          linksTitle: "Liên kết dự án",
          backLabel: "Quay lại danh sách dự án",
          contactCtaTitle: "Trao đổi về dự án tương tự",
          contactCtaDescription: "Nếu bạn cần website doanh nghiệp có logic booking và workflow nội bộ đi cùng nhau, đây là kiểu nền tảng tôi có thể hỗ trợ xây dựng.",
          contactCtaLabel: "Đi tới form liên hệ",
          metadata: {
            title: "Case study Truyền Thuyết Champong Brand Portal",
            description: "Case study song ngữ cho Truyền Thuyết Champong Brand Portal, nền tảng nhà hàng kết hợp website thương hiệu, reservation flow, admin workflow, Cloudinary và Resend.",
            keywords: [
              "Truyền Thuyết Champong",
              "nền tảng web nhà hàng",
              "case study ASP.NET Core MVC",
              "Entity Framework Core",
              "Cloudinary",
              "Resend",
            ],
          },
        },
      },
      {
        title: "UniWave Customer Portal",
        category: "Cổng khách hàng song ngữ",
        description: "Cổng thông tin khách hàng logistics song ngữ tích hợp tính năng tra cứu trạng thái lô hàng, ước tính báo giá và luồng dashboard khách hàng bảo mật bằng JWT.",
        slug: "uniwave-customer-portal",
        features: [
          "Luồng sử dụng song ngữ Việt - Anh cho khách hàng",
          "UI tra cứu shipment và ước tính báo giá",
          "Lưu JWT, kiểm tra hết hạn và request có xác thực",
          "Portal gọn nhẹ với định tuyến rewrite trên Vercel",
        ],
        impactLabel: "Tích hợp Tự phục vụ",
        impact: "UniWave Customer Portal tập trung vào việc triển khai phía client gọn nhẹ và hiệu quả. Dự án kết hợp bộ dịch ngôn ngữ tùy biến, kết nối REST API, định tuyến Vercel và quản lý phiên JWT.",
        stack: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "REST API",
          "JWT",
          "Vercel",
          "i18n",
          "JSON",
        ],
        links: {
          detailLabel: "Xem case study",
          previewHref: "#contact",
          previewLabel: "Trao đổi demo",
          sourceHref: "#contact",
          sourceLabel: "Mã nguồn theo yêu cầu",
        },
        detail: {
          eyebrow: "Chi tiết dự án",
          overviewTitle: "Tổng quan",
          overview: [
            "UniWave Customer Portal được định vị là một cổng khách hàng logistics song ngữ, tập trung vào self-service thực tế thay vì đẩy dự án theo hướng SPA nặng nề.",
            "Dự án kết hợp frontend gọn nhẹ, REST API integration và JWT-based session handling để phục vụ các luồng tracking và quote có xác thực.",
            "Đây cũng là ví dụ rõ cho việc làm i18n thực dụng, nơi bilingual routing và interface copy được giữ gọn, rõ và dễ vận hành.",
          ],
          problemTitle: "Bài toán",
          problem: [
            "Khách hàng logistics cần tự tra cứu shipment và ước tính báo giá thay vì phải hỏi support lặp đi lặp lại.",
            "Người dùng Việt Nam và quốc tế đều cần truy cập cùng một portal với trải nghiệm rõ ràng.",
            "Giải pháp cần đủ nhẹ nhưng vẫn hỗ trợ các luồng client-facing có xác thực.",
          ],
          solutionTitle: "Giải pháp",
          solution: [
            "Portal được xây như một trải nghiệm song ngữ Việt - Anh dựa trên JSON dictionary cho phần localization.",
            "REST API được dùng cho tracking, quote estimation và dashboard flow mà không thêm quá nhiều frontend overhead.",
            "JWT token storage, expiry check và authenticated request handling được triển khai cùng Vercel rewrites để giữ routing đa ngôn ngữ sạch và thực dụng.",
          ],
          roleTitle: "Vai trò của tôi",
          role: [
            "Xây dựng localization và UI flow phía client cho trải nghiệm song ngữ.",
            "Triển khai API client logic và JWT-based session handling.",
            "Cấu hình routing đa ngôn ngữ gọn gàng cho cấu trúc portal.",
            "Hỗ trợ định hình một cổng self-service phù hợp với use case logistics thực tế.",
          ],
          technicalTitle: "Điểm nổi bật kỹ thuật",
          technicalHighlights: [
            {
              title: "JSON-based i18n",
              description: "Cách tiếp cận dictionary-based giúp giữ phần dịch Việt - Anh dễ quản lý mà không phải đưa thêm một localization stack nặng hơn mức cần thiết.",
            },
            {
              title: "REST API integration",
              description: "Tracking, quote và dashboard flow được kết nối qua API thay vì gắn chặt frontend vào một backend view layer cứng.",
            },
            {
              title: "JWT session handling",
              description: "Việc lưu token, kiểm tra hết hạn và authenticated request được xử lý ở client để phục vụ các luồng bảo mật của portal.",
            },
            {
              title: "Vercel rewrite routing",
              description: "Subpath đa ngôn ngữ sạch được hỗ trợ bằng cấu hình routing thực dụng ở phía deploy.",
            },
            {
              title: "Shipment tracking UI",
              description: "UI tracking được thiết kế để khách hàng nhìn rõ trạng thái lô hàng hơn theo hướng self-service.",
            },
            {
              title: "Freight quote estimator",
              description: "Người dùng có thể thao tác với các luồng quote gọn nhẹ thay vì phụ thuộc hoàn toàn vào trao đổi thủ công.",
            },
          ],
          featuresTitle: "Tính năng chính",
          businessValueTitle: "Giá trị mang lại",
          businessValue: [
            "Giảm nhu cầu support lặp lại nhờ khách hàng có thể tự xem thông tin shipment.",
            "Tăng độ minh bạch cho khách hàng về tiến trình logistics.",
            "Hỗ trợ truy cập song ngữ cho người dùng Việt Nam và quốc tế.",
            "Mang lại chức năng portal hữu ích với một stack gọn và thực dụng.",
          ],
          stackTitle: "Công nghệ sử dụng",
          galleryTitle: "Hình ảnh dự án",
          galleryNote: "Hình ảnh thực tế của dự án sẽ được bổ sung sau.",
          linksTitle: "Liên kết dự án",
          backLabel: "Quay lại danh sách dự án",
          contactCtaTitle: "Trao đổi về dự án tương tự",
          contactCtaDescription: "Nếu bạn cần một portal song ngữ cho khách hàng với API integration và luồng xác thực rõ ràng, đây là hướng triển khai tôi có thể hỗ trợ.",
          contactCtaLabel: "Đi tới form liên hệ",
          metadata: {
            title: "Case study UniWave Customer Portal",
            description: "Case study song ngữ cho UniWave Customer Portal, portal logistics Việt - Anh với REST API integration, JWT handling và routing sạch trên Vercel.",
            keywords: [
              "UniWave Customer Portal",
              "cổng khách hàng song ngữ",
              "REST API integration",
              "JWT portal",
              "Vercel rewrites",
              "portal logistics",
            ],
          },
        },
      },
    ],
    journeySection: {
      eyebrow: "Hành trình",
      title: "Quá trình tích lũy chuyên môn sâu về sản phẩm, năng lực công nghệ và tư duy bàn giao thực tế.",
      description: "Thay vì các danh sách lý thuyết, hành trình này ghi lại những cột mốc phát triển năng lực kỹ thuật thực tế và tư duy xây dựng sản phẩm.",
    },
    journey: [
      {
        phase: "01",
        title: "Nền tảng Website Doanh nghiệp & Backend",
        description: "Tập trung phát triển C#, ASP.NET Core, PostgreSQL và Entity Framework Core, xây dựng các công cụ đặt lịch, quản lý hình ảnh Cloudinary và dịch vụ gửi email thông báo.",
        tag: "ASP.NET Core & CSDL",
      },
      {
        phase: "02",
        title: "Hệ thống Vận hành Full-Stack Hiện đại",
        description: "Thiết kế các ứng dụng web full-stack với Next.js, TypeScript, PostgreSQL, Drizzle ORM và Better Auth, thiết lập phân quyền người dùng và kiểm soát schema nghiêm ngặt.",
        tag: "Next.js & Bảo mật Chặt chẽ",
      },
      {
        phase: "03",
        title: "Cổng Khách hàng & Trải nghiệm Sản phẩm Song ngữ",
        description: "Phát triển các cổng thông tin gọn nhẹ phía client, cấu hình dịch song ngữ qua tệp JSON, kết nối REST API, quản lý phiên đăng nhập JWT và cấu hình định tuyến Vercel.",
        tag: "i18n & Tích hợp API",
      },
      {
        phase: "04",
        title: "Định hướng Hiện tại",
        description: "Cung cấp các hệ thống web doanh nghiệp, dashboard quản trị và cổng khách hàng tùy biến với tư cách là lập trình viên remote và đối tác phát triển dự án tin cậy.",
        tag: "Hệ thống Web Doanh nghiệp",
      },
    ],
    servicesSection: {
      eyebrow: "Dịch vụ cung cấp",
      title: "Triển khai trọn vẹn từ giao diện người dùng, cơ sở dữ liệu đến các luồng xử lý trung gian.",
      description: "Đồng hành cùng các đội ngũ và doanh nghiệp cần những sản phẩm web thực tế và sạch sẽ. Mỗi dịch vụ đều được tối ưu hóa để giải quyết các nút thắt vận hành mà không gây phức tạp dư thừa.",
    },
    services: [
      {
        title: "Ứng dụng Web Doanh nghiệp",
        tag: "Nền tảng Thương hiệu + Đặt lịch",
        description: "Trang giới thiệu, website thương hiệu, luồng đặt bàn/đặt lịch hẹn và quy trình quản lý nội dung được thiết kế tối ưu cho trải nghiệm người dùng và vận hành thực tế.",
        points: [
          "Hệ thống lịch đặt chỗ / đặt bàn tùy chỉnh",
          "Thiết kế giao diện responsive với Tailwind CSS",
          "Lưu trữ và tối ưu hóa hình ảnh qua Cloudinary",
        ],
      },
      {
        title: "Dashboard Full-Stack",
        tag: "Quản trị Vận hành + CRUD",
        description: "Bảng quản lý quy trình, luồng phân quyền người dùng, công cụ CRUD cơ sở dữ liệu và giao diện admin chuyên biệt hỗ trợ quản trị dữ liệu nội bộ an toàn.",
        points: [
          "Phân quyền theo vai trò (RBAC) & phiên Better Auth",
          "Thiết kế bảng PostgreSQL & mô hình hóa ORM (Drizzle/EF)",
          "Kiểm soát dữ liệu đầu vào nghiêm ngặt & quy tắc nghiệp vụ backend",
        ],
      },
      {
        title: "Cổng Khách hàng & Tích hợp",
        tag: "Xác thực + Trải nghiệm Song ngữ",
        description: "Dashboard khách hàng bảo mật, module tra cứu trạng thái lô hàng, công cụ ước tính giá tức thời và tích hợp các REST API bên ngoài.",
        points: [
          "Hỗ trợ đa ngôn ngữ (Anh/Việt) đồng bộ",
          "Lưu trữ token JWT, kiểm tra thời hạn và kết nối Fetch API",
          "Định tuyến viết lại Vercel (rewrites) & subpaths ngôn ngữ sạch",
        ],
      },
      {
        title: "Bảo trì & Tối ưu Sản phẩm",
        tag: "Sửa lỗi + Tối ưu hóa Code",
        description: "Tối ưu hóa hiệu năng, tinh chỉnh truy vấn cơ sở dữ liệu, nâng cấp SEO, giải quyết các lỗi tồn đọng và chuẩn bị môi trường deploy.",
        points: [
          "Tối ưu hóa bố cục đạt chuẩn Google Lighthouse/Core Web Vitals",
          "Bảo mật các endpoint cơ sở dữ liệu & dọn dẹp logic lỗi thời",
          "Cấu hình pipeline triển khai sản phẩm trên Vercel/Railway",
        ],
      },
    ],
    contact: {
      eyebrow: "Liên hệ",
      title: "Bạn có ứng dụng web, dashboard hay quy trình doanh nghiệp cần được xây dựng chuẩn chỉ?",
      description: "Tôi luôn sẵn sàng cho các vị trí full-stack remote, dự án freelance và hợp tác phát triển sản phẩm. Hãy gửi cho tôi bản mô tả ngắn, mã nguồn hiện tại hoặc ý tưởng sản phẩm — tôi sẽ giúp bạn biến nó thành một hệ thống web sạch sẽ và dễ bảo trì.",
      primaryCta: "Gửi Email cho Billy",
      secondaryCta: "Xem các dự án nổi bật",
      methods: [
        {
          label: "Email",
          value: "tranbao64416@gmail.com",
          href: "mailto:tranbao64416@gmail.com",
        },
        {
          label: "GitHub",
          value: "github.com/BillNotAGamer",
          href: "https://github.com/BillNotAGamer",
        },
        {
          label: "LinkedIn",
          value: "linkedin.com/in/bảo-trần-2171a5260",
          href: "https://www.linkedin.com/in/bảo-trần-2171a5260",
        },
      ],
      noteTitle: "Ghi chú hợp tác",
      note: "Tôi luôn sẵn sàng cho các vị trí full-stack remote, dự án freelance và hợp tác phát triển sản phẩm. Hãy gửi cho tôi bản mô tả ngắn, mã nguồn hiện tại hoặc ý tưởng sản phẩm — tôi sẽ giúp bạn biến nó thành một hệ thống web sạch sẽ và dễ bảo trì.",
      email: "tranbao64416@gmail.com",
      form: {
        eyebrow: "Trao đổi dự án",
        title: "Gửi tin nhắn trực tiếp",
        description: "Hãy chia sẻ mục tiêu, mốc thời gian hoặc vướng mắc hiện tại. Tôi sẽ phản hồi qua email nếu nội dung phù hợp.",
        requiredHint: "* Trường bắt buộc",
        optionalLabel: "Tùy chọn",
        nameLabel: "Họ và tên",
        namePlaceholder: "Tên của bạn",
        emailLabel: "Email",
        emailPlaceholder: "ban@example.com",
        companyLabel: "Công ty / Tổ chức",
        companyPlaceholder: "Tên công ty",
        inquiryTypeLabel: "Loại nhu cầu",
        inquiryTypePlaceholder: "Chọn loại nhu cầu",
        inquiryTypes: [
          "Công việc remote",
          "Dự án freelance",
          "Website doanh nghiệp",
          "Dashboard / hệ thống nội bộ",
          "Cổng khách hàng",
          "Bảo trì / sửa lỗi",
          "Khác",
        ],
        budgetLabel: "Ngân sách / quy mô dự án",
        budgetPlaceholder: "Chọn khoảng ngân sách",
        budgetOptions: [
          "Chưa chắc",
          "Dưới $500",
          "$500 - $1,500",
          "$1,500 - $3,000",
          "Trên $3,000",
          "Trao đổi thêm",
        ],
        messageLabel: "Nội dung",
        messagePlaceholder: "Hãy mô tả bạn đang xây gì, đang ở giai đoạn nào và cần tôi hỗ trợ phần nào.",
        submitLabel: "Gửi tin nhắn",
        submittingLabel: "Đang gửi...",
        successMessage: "Đã gửi tin nhắn thành công.",
        errorMessage: "Hiện chưa thể gửi tin nhắn của bạn.",
        validationMessage: "Vui lòng kiểm tra lại biểu mẫu và thử lại.",
        privacyNote: "Tin nhắn của bạn sẽ được gửi trực tiếp qua email bằng route phía server. Không có đăng ký newsletter hay email API bên thứ ba ở phần này.",
        fieldErrors: {
          nameRequired: "Vui lòng nhập họ và tên.",
          emailRequired: "Vui lòng nhập địa chỉ email.",
          emailInvalid: "Vui lòng nhập địa chỉ email hợp lệ.",
          messageRequired: "Vui lòng nhập nội dung.",
          messageTooShort: "Vui lòng nhập ít nhất 20 ký tự để tôi có đủ ngữ cảnh.",
          fieldTooLong: "Vui lòng rút gọn trường này rồi thử lại.",
        },
      },
    },
    footer: {
      roleLine: "Kỹ sư Phần mềm • Lập trình viên Fullstack • Lập trình viên Next.js",
      note: "Xây dựng hệ thống web full-stack thực tế cho doanh nghiệp, đội ngũ và các sản phẩm kỹ thuật số.",
    },
  },
};

export function getPortfolioData(locale: Locale = defaultLocale): PortfolioData {
  return portfolioContent[locale] ?? portfolioContent[defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "vi";
}

export function getProjectBySlug(
  locale: Locale,
  slug: string,
): Project | undefined {
  return getPortfolioData(locale).projects.find((project) => project.slug === slug);
}

export function getProjectRouteParams() {
  return locales.flatMap((locale) =>
    getPortfolioData(locale).projects.map((project) => ({
      locale,
      slug: project.slug,
    })),
  );
}
