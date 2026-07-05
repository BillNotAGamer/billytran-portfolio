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

export type Project = {
  category: string;
  description: string;
  impact: string;
  impactLabel: string;
  links: {
    preview: string;
    previewLabel: string;
    repository: string;
    repositoryLabel: string;
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

export type TechGroup = {
  items: string[];
  title: string;
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
  };
  footer: {
    roleLine: string;
    note: string;
  };
};

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
        title: "UniWave Go Freight",
        category: "Fullstack Logistics Operations",
        description: "A full-stack logistics operations dashboard for managing freight jobsheets, role-based sales/accounting workflows, and structured tax calculation rules.",
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
          preview: "#contact",
          previewLabel: "Discuss Demo",
          repository: "#contact",
          repositoryLabel: "Source on request",
        },
      },
      {
        title: "Truyền Thuyết Champong Brand Portal",
        category: "Restaurant Web Platform",
        description: "A restaurant brand platform combining a public marketing website, digital menu experience, reservation flow, and back-office management tools.",
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
          preview: "#contact",
          previewLabel: "Discuss Demo",
          repository: "#contact",
          repositoryLabel: "Source on request",
        },
      },
      {
        title: "UniWave Customer Portal",
        category: "Bilingual Client Portal",
        description: "A bilingual logistics customer portal with shipment tracking, freight quote estimation, and JWT-secured client dashboard flows.",
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
          preview: "#contact",
          previewLabel: "Discuss Demo",
          repository: "#contact",
          repositoryLabel: "Source on request",
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
        category: "Hệ thống vận hành logistics full-stack",
        description: "Dashboard quản lý logistics full-stack hỗ trợ xử lý jobsheet vận chuyển, quy trình phân quyền giữa bộ phận bán hàng/kế toán, và quy tắc tính thuế tự động.",
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
          preview: "#contact",
          previewLabel: "Yêu cầu Demo",
          repository: "#contact",
          repositoryLabel: "Mã nguồn theo yêu cầu",
        },
      },
      {
        title: "Truyền Thuyết Champong Brand Portal",
        category: "Nền tảng web cho nhà hàng",
        description: "Nền tảng thương hiệu nhà hàng kết hợp trang giới thiệu công cộng, trải nghiệm thực đơn số tương tác, luồng đặt bàn tự động và các công cụ quản trị nội bộ.",
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
          preview: "#contact",
          previewLabel: "Yêu cầu Demo",
          repository: "#contact",
          repositoryLabel: "Mã nguồn theo yêu cầu",
        },
      },
      {
        title: "UniWave Customer Portal",
        category: "Cổng khách hàng song ngữ",
        description: "Cổng thông tin khách hàng logistics song ngữ tích hợp tính năng tra cứu trạng thái lô hàng, ước tính báo giá và luồng dashboard khách hàng bảo mật bằng JWT.",
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
          preview: "#contact",
          previewLabel: "Yêu cầu Demo",
          repository: "#contact",
          repositoryLabel: "Mã nguồn theo yêu cầu",
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
