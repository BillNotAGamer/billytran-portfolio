# PORTFOLIO_R0_DEEP_AUDIT_REPORT

This document provides a highly detailed audit of the Billy Tran Portfolio Next.js project. It acts as a comprehensive reference for anyone who has never seen this repository before to understand its architecture, current content, risks, and internationalization (i18n) readiness.

---

## 1. Executive Summary

* **Portfolio Type:** This is a premium personal portfolio website designed for a software engineer.
* **Architecture:** It is a single-page landing site built with Next.js using the **App Router** (`app/page.tsx` serves the homepage).
* **Framework & Major Libraries:**
  * **Next.js**: version `16.2.2` (Next.js 16/17 prerelease/current style).
  * **React**: version `19.2.4` (React 19).
  * **Framer Motion**: version `12.38.0` for animations.
  * **Tailwind CSS**: version `4.x` with `@tailwindcss/postcss` for styling.
* **Target Presentation:** The website presents Billy Tran as an independent software engineer / full-stack developer with mobile range, emphasizing precision, engineering craft, system design, and product judgment.
* **Content Status:** The current content is **mixed/placeholder**. The structure and headings are fully formed, but the projects (e.g., "Frame Commerce", "Pulseboard", "Northstar Mobile") are template case studies with generic placeholder metrics. Social media links point to Billy's actual profiles, but contact copy explicitly tells the user to "Replace the placeholder contact channels below with live details".
* **Key Files and Folders:**
  * [data/portfolio.ts](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/data/portfolio.ts): The central store containing all copy, project descriptions, skills, and contact links.
  * [app/page.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/app/page.tsx): Main layout router mounting all sections.
  * [components/sections/](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections): Contains the modular code for each portfolio section.
  * [components/ui/](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/ui): Reusable UI primitives, signatures, and animation hooks.
* **Key Risks:**
  * **TypeScript Build Failure:** The project currently fails to compile during production builds (`npm run build`) because `portfolioData` in `data/portfolio.ts` is missing a mandatory `footer` field declared in the `PortfolioData` type definition.
  * **No Multi-Language Support (i18n):** All static headings (e.g. "Featured Projects", "What Billy Builds", etc.) are hardcoded directly in JSX/TSX section components instead of being pulled from `data/portfolio.ts`. To support Vietnamese/English bilingual switching, these strings must be extracted.
  * **Missing and Generic Assets:** The `public/` directory contains only default Next.js template SVGs. It lacks a real profile avatar, custom project thumbnails, and a resume/CV PDF file.

---

## 2. Project Environment and Stack

The project environment is initialized with React 19 and Next.js 16. Details of the stack extracted from key config files:

| Technology / Library | Version / Tool | Evidence Source |
| :--- | :--- | :--- |
| **Next.js** | `16.2.2` | [package.json](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/package.json#L13) |
| **React & React-DOM** | `19.2.4` | [package.json](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/package.json#L14-L15) |
| **TypeScript** | `^5` (Strict enabled) | [package.json](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/package.json#L25) & [tsconfig.json](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/tsconfig.json#L7) |
| **Package Manager** | npm (based on `package-lock.json`) | Project Root structure |
| **Styling System** | Tailwind CSS v4.0.0 (`@tailwindcss/postcss`) | [package.json](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/package.json#L18) & [app/globals.css](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/app/globals.css#L1) |
| **Animation Library** | Framer Motion (`^12.38.0`) | [package.json](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/package.json#L12) |
| **Icon Libraries** | Custom SVG glyphs / No external icon pack | `components/ui/signature-glyph.tsx` |
| **Form/Contact Libs** | None (uses raw mailto anchor links) | `components/sections/contact-section.tsx` |
| **Lint / Config** | ESLint (`^9` with Flat Config style) | [package.json](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/package.json#L22) & `eslint.config.mjs` |

### Build and Package Scripts
As defined in [package.json](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/package.json#L5-L10):
* `npm run dev`: Starts the local Next.js development server (`next dev`).
* `npm run build`: Bundles the application for production deployment (`next build`). Currently failing due to TS type mismatch.
* `npm run start`: Starts the built production server.
* `npm run lint`: Performs lint checks via ESLint (`eslint`). Currently passes without warnings.

---

## 3. Repository Structure

```
billytran-portfolio/
├── .next/                  # Built bundles (temporary, gitignored)
├── app/                    # Next.js App Router Page & Layout Structure
│   ├── favicon.ico         # Browser tab icon
│   ├── globals.css         # Tailwind v4 import & Custom Theme/Variables
│   ├── layout.tsx          # Root HTML frame, SEO tags, skip-to-content links
│   └── page.tsx            # Entrypoint routing the portfolio sections
├── components/
│   ├── sections/           # Large layout block sections
│   │   ├── about-section.tsx
│   │   ├── contact-section.tsx
│   │   ├── featured-projects-section.tsx
│   │   ├── footer.tsx
│   │   ├── hero-section.tsx
│   │   ├── journey-section.tsx
│   │   ├── services-section.tsx
│   │   ├── site-header.tsx
│   │   └── tech-stack-section.tsx
│   └── ui/                 # Reusable micro-components and design primitives
│       ├── button-link.tsx
│       ├── container.tsx
│       ├── hero-orbit.tsx
│       ├── reveal.tsx
│       ├── section-heading.tsx
│       ├── section-pill.tsx
│       ├── signature-blueprint.tsx
│       ├── signature-glyph.tsx
│       ├── site-backdrop.tsx
│       ├── site-section.tsx
│       ├── spotlight-panel.tsx
│       ├── tag.tsx
│       └── use-motion-ready.ts
├── data/
│   └── portfolio.ts        # Primary typescript object mapping of data
├── lib/
│   └── utils.ts            # Contains class merger helper 'cn'
├── public/                 # Default Next.js template SVGs (file, globe, next, vercel, window)
├── eslint.config.mjs       # ESLint configurations
├── next-env.d.ts           # Next.js environment typings
├── next.config.ts          # Empty NextConfig wrapper
├── tsconfig.json           # Strict TypeScript compiler options
└── package.json            # Scripts and dependency lists
```

### Analysis of Anomalies and Structure Quality
1. **Dead Code / Unused Files:**
   * `CLAUDE.md`: Contains only `run build`. It can be ignored or deleted.
   * `public/*.svg`: Assets like `window.svg`, `globe.svg`, `file.svg` are default template items that are never imported or rendered in the application.
2. **Duplicate/Redundant Primitives:** None detected. The division between `components/sections` (macro structures) and `components/ui` (micro items) is kept clean.
3. **Naming Inconsistencies:** The file structure strictly adheres to kebab-case convention.

---

## 4. Routing and Page Architecture

The project has a **single-page architecture** mapping the entire user journey on a single scrolling page.

### Layout & Page Mapping
* **Root Layout:** [app/layout.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/app/layout.tsx)
  * Sets basic viewport properties, imports global CSS variables, and wraps children with an accessibility skip link (`#main-content`).
* **Main Page:** [app/page.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/app/page.tsx)
  * Acts as the compositor, ordering all sections chronologically.

### Route Map details

| Route Path | File Path | Component Focus | Purpose |
| :--- | :--- | :--- | :--- |
| `/` | `app/page.tsx` | Entire application | Single-page scroll containing all details. |
| `#about` | `components/sections/about-section.tsx` | About | Headline, bio, core pillars, and professional roles. |
| `#tech-stack` | `components/sections/tech-stack-section.tsx` | Tech Stack | Grouped technical skills. |
| `#featured-projects` | `components/sections/featured-projects-section.tsx` | Projects | List of highlights and preview/repo links. |
| `#journey` | `components/sections/journey-section.tsx` | Journey | Chronological timeline of capabilities. |
| `#services` | `components/sections/services-section.tsx` | Services | Details on target capabilities (web, full-stack, mobile). |
| `#contact` | `components/sections/contact-section.tsx` | Contact | Direct CTA, address list, and collaboration note. |

### SEO and Metadata Handling
* **Location:** Stored statically in `app/layout.tsx` metadata configuration object.
* **Open Graph / Twitter:** Fully defined. Configured with fallback title and description variables.
* **Robots configuration:** Configured to index/follow by default.
* **Missing Items:** No `sitemap.ts` or `robots.txt` exist in the repository yet.
* **Translation Risk:** The site-wide title, description, and keywords are hardcoded in English inside `app/layout.tsx` and will not dynamically update when i18n is implemented.

---

## 5. Component Architecture

Below is a detailed audit of all major UI components in the application:

### Macro Components (Sections)

| Component Name | File Path | Client/Server | Data Source | Translation Ready? | Key Details / Hardcoded text |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `SiteHeader` | [site-header.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/site-header.tsx) | Server | `portfolioData` | **Needs adjustment** | Header brand text `"Billy Tran"` and `"Fullstack Systems + Mobile Delivery"` are hardcoded. Nav links use dynamic labels. |
| `HeroSection` | [hero-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/hero-section.tsx) | Server | `portfolioData` | **Ready** | Standard Server component referencing the hero data structure. Buttons display text `"View Projects"` and `"Contact Me"` which are hardcoded. |
| `AboutSection` | [about-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/about-section.tsx) | Server | `portfolioData` | **Ready** | Sections display eyebrow labels like `"About"`. Bio paragraph strings map dynamically from array. |
| `TechStackSection` | [tech-stack-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/tech-stack-section.tsx) | Server | `portfolioData` | **Needs adjustment** | Section eyebrow `"Tech Stack"`, description, and loop suffix `"{group.items.length} focused tools"` are hardcoded. |
| `FeaturedProjectsSection` | [featured-projects-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/featured-projects-section.tsx) | Server | `portfolioData` | **Needs adjustment** | Section headings are hardcoded. Inside project articles: `"Preview"` and `"Repository"` button strings are hardcoded. |
| `JourneySection` | [journey-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/journey-section.tsx) | Server | `portfolioData` | **Needs adjustment** | Timeline header and section descriptions are hardcoded. Phase titles and descriptions pull from the journey dataset. |
| `ServicesSection` | [services-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/services-section.tsx) | Server | `portfolioData` | **Needs adjustment** | Service section title and descriptions are hardcoded. Cards pull details dynamically from `portfolioData.services`. |
| `ContactSection` | [contact-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/contact-section.tsx) | Server | `portfolioData` | **Needs adjustment** | Form CTA title, email actions, and address label headings (`"Contact"`, `"Collaboration Note"`) are hardcoded. |
| `Footer` | [footer.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/footer.tsx) | Server | `portfolioData` | **Needs adjustment** | Static role text string is hardcoded in the paragraph node next to the name rendering. |

### Micro Primitives (UI Components)
* `SiteBackdrop` / `Container` / `SiteSection`: Static layout blocks wrapper.
* `Reveal` / `SpotlightPanel` / `useMotionReady`: **Client Components** (`"use client"`) using Framer Motion to handle layout triggers, animations, and radial spotlights based on coordinates.
* `SignatureBlueprint` / `SignatureGlyph`: Inline SVG graphic decorators rendering background lines and custom logo emblems.
* `ButtonLink` / `Tag`: Presentation buttons and pill components.

---

## 6. Current Content Inventory

### 6.1 Personal / Profile Content
The details mapped from [data/portfolio.ts](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/data/portfolio.ts) are outlined below:

* **Name:** "Billy Tran" (Real)
* **Roles / Subtitles:** "Software Engineer", "Fullstack Web Developer", "Mobile Developer" (Real)
* **Availability Copy:** "Open to select product collaborations" (Real)
* **Location:** Not explicitly declared (Missing)
* **Social Links:**
  * **GitHub:** `https://github.com/BillNotAGamer` (Real)
  * **LinkedIn:** `https://www.linkedin.com/in/bảo-trần-2171a5260` (Real)
* **Email:** `tranbao64416@gmail.com` (Real)
* **Resume/CV PDF:** Not defined anywhere (Missing)

### 6.2 Skills / Tech Stack Content
Grouped inside `portfolioData.techGroups` with default items:

| Category | Skills List | Accuracy / Review Status |
| :--- | :--- | :--- |
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Design Systems | Generic, modern stack |
| **Backend** | Node.js, NestJS, Express, REST APIs, GraphQL, Auth Flows | Generic backend stack |
| **Mobile** | React Native, Expo, Flutter, Navigation, Offline States | Standard cross-platform skills |
| **Database** | PostgreSQL, MongoDB, Prisma, Firebase, SQL Server, SQL Design | Standard persistence layers |
| **Tooling** | Git, Docker, ESLint, Testing, Figma, CI/CD | Standard dev tools |
| **Cloud & DevOps** | Vercel, AWS, Supabase, Monitoring, Observability, Scaling | Standard hosting/cloud services |

### 6.3 Projects Content
Defined inside `portfolioData.projects` array:

* **Project 1:** "Frame Commerce"
  * Category: "Web + Systems"
  * Description: "A premium commerce platform designed around fast storefront performance, structured operations, and an internal workflow layer..." (Placeholder)
  * Impact: "Reduced operational friction, clarified ownership across the product flow..." (Generic outcomes)
  * Tech Stack: Next.js, TypeScript, Node.js, PostgreSQL, Redis, Stripe.
  * Live Preview / Repository Links: Both point to `#contact`. (Placeholders)
* **Project 2:** "Pulseboard"
  * Category: "Product Dashboard"
  * Description: "An operations workspace for reporting, approvals, and analytics that turns scattered internal workflows..." (Placeholder)
  * Impact: "Sharpened decision speed, reduced context switching..." (Generic outcomes)
  * Tech Stack: React, Next.js, Tailwind CSS, Data Viz, API Design, Auth.
  * Live Preview / Repository Links: Both point to `#contact`. (Placeholders)
* **Project 3:** "Northstar Mobile"
  * Category: "Mobile Product"
  * Description: "A mobile-first product experience shaped around responsive task flow..." (Placeholder)
  * Impact: "Lowered repeat-task friction and improved product continuity..." (Generic outcomes)
  * Tech Stack: React Native, Expo, TypeScript, Realtime Sync, Offline Support, Testing.
  * Live Preview / Repository Links: Both point to `#contact`. (Placeholders)

### 6.4 Experience / Journey Content
Mapped to `portfolioData.journey`:
* Phase 01: "Building strong engineering fundamentals" ("Craft foundation")
* Phase 02: "Taking ownership across the full stack" ("System range")
* Phase 03: "Extending product thinking into mobile" ("Mobile depth")
* Phase 04: "Defining a sharper signature as an engineer" ("Current direction")
* *Status:* Extremely generic/conceptual description. Needs to be replaced with real employment chronology or specific project timeline dates.

### 6.5 Education / Certification Content
* *Status:* **Missing** from both code layouts and data structures.

### 6.6 Contact Section Content
Mapped to `portfolioData.contact`:
* CTA text: `"Let's build something with precision, clarity, and real product ambition."` (Hardcoded in component)
* Methods: Links to Email (`tranbao64416@gmail.com`), Github, and LinkedIn.
* Integration: Pure client mailto links (`mailto:tranbao64416@gmail.com`). No API submission handlers exist.

---

## 7. Data and Content Management Model

The codebase currently uses a **hybrid model**:
1. **Centralized Variables:** Dynamic lists (skills, project arrays, social media channels, contact methods) are managed in a single typescript object inside `data/portfolio.ts`.
2. **Hardcoded Content:** Structural content, including section headers, subtitles, and CTA buttons, is hardcoded directly into the component files.

### Evaluation of Scalability for Content & Translations
* **Updating Project Data:** The existing typescript structure easily supports updating properties or adding new objects inside `portfolioData.projects`.
* **Scalability:** It is clean and modular, but not yet ready for multi-language dictionary switching because section headers and layout labels are hardcoded in English.
* **i18n Target Schema:** To enable English/Vietnamese language switching without major refactoring, the file `data/portfolio.ts` should be split or modified to host localized strings. For example:
  ```typescript
  export type LocalizedString = {
    en: string;
    vi: string;
  };
  ```

---

## 8. Styling, UI, and Visual Presentation

* **Design Style:** Clean, high-fidelity dark-mode interface. It uses smooth transitions, glassmorphic radial gradients, spotlight grid borders, and subtle upward reveal triggers.
* **Colors:** Dark backdrop (`#07090f`), sharp borders, cyan/gold glow accents (`#8de0ff`, `#79a1ff`, `#dcb47b`).
* **Typography:** Uses Aptos, Segoe UI Variable, and Segoe UI fallbacks.
* **Responsive Layout:**
  * Uses Tailwind flexbox and CSS grids.
  * Collapses columns on small viewports (`lg:grid-cols-2` down to single columns).
  * **Nav Bar:** Responsively adapts from inline menu options on desktop to a horizontal scrollable menu ribbon on mobile devices (`lg:hidden`).
* **Visual Risks with Bilingual Content:**
  * Vietnamese words are on average 20-30% longer than English equivalents.
  * Static heights or narrow flex elements could cause overflows.
  * Components that must be monitored: `SectionPill`, `Tag` pills, and `SiteHeader` mobile navigation scroll wrapper.

---

## 9. Images and Static Assets

The `public/` directory contains no real visual media assets.

| Asset File Path | Where Used | Status / Recommendations |
| :--- | :--- | :--- |
| `public/favicon.ico` | Tab Bar / Browser Icon | Standard Next.js favicon icon, acceptable to keep but could be branded. |
| `public/file.svg` | Not imported | **Unused template file.** Safe to delete. |
| `public/globe.svg` | Not imported | **Unused template file.** Safe to delete. |
| `public/next.svg` | Not imported | **Unused template file.** Safe to delete. |
| `public/vercel.svg` | Not imported | **Unused template file.** Safe to delete. |
| `public/window.svg` | Not imported | **Unused template file.** Safe to delete. |

### Missing Assets Checklist
* [ ] **Profile Photo / Avatar Image:** No avatar is loaded or declared in `AboutSection` or `HeroSection`.
* [ ] **Project Mockups / Thumbnails:** The projects do not render any preview image element.
* [ ] **Resume/CV File:** No downloadable document exists.

---

## 10. SEO and Metadata Audit

* **Page Title:** Configured with template `"%s \| Billy Tran"` defaulting to `"Billy Tran | Software Engineer"`.
* **Description:** `"Premium portfolio website for Billy Tran, a software engineer building fullstack web platforms, mobile applications, and scalable digital products."`
* **Keywords:** Hardcoded array of common search terms.
* **Semantic HTML:**
  * Single `<h1>` tag in `HeroSection`.
  * Modular `SiteSection` wraps child elements inside semantic `<section>` or `<article>` landmarks with proper `aria-labelledby` linkages.
* **Current i18n SEO Limitations:** The layout sets `html lang="en"` statically. During Vietnamese translations, this property must dynamically reflect the active language (`vi` or `en`) to ensure search engines recognize the localization.

---

## 11. i18n / Language Switching Readiness

To implement a clean English <-> Vietnamese language switcher, the current codebase must resolve several issues.

### Current Translation Blockers
* Section headings, description texts, and buttons are hardcoded in English inside the components.
* The `html` node `lang="en"` attribute is hardcoded in the root layout.
* SEO metadata properties are hardcoded inside `app/layout.tsx`.

### Recommended Translation Architecture
We recommend a **Client-Side Cookie / localStorage Switcher** or **Next-intl Middleware Router** configuration.

1. **Option A: Simple Client State (Context / localStorage)**
   * **Pros:** Minimal architectural overhead. No route prefixes (`/vi`, `/en`) required.
   * **Cons:** Hydration mismatches if server components render different values from local storage.
2. **Option B: App Router Next-intl with Sub-routes (Recommended)**
   * **Pros:** SEO friendly. Pages are pre-rendered statically for both locales at `/vi` and `/en`. Google indexes both versions.
   * **Cons:** Requires restructure of `app/` folder into `app/[locale]/`.

### Immediate i18n Strategy
To maintain the lightweight nature of this project, we recommend utilizing a **Custom Locale Hook / Context wrapper** or moving all translatable terms to a structured dictionary file:
* Extract all hardcoded copy from JSX files into `data/locale-dictionary.ts`.
* Convert the shell frame layout to dynamically read from the selected context language parameter.

---

## 12. Build, Lint, and Runtime Health

* **Lint Check Results:** Running `npm run lint` finishes successfully with **no violations or warnings**.
* **Production Build Results:** Running `npm run build` **fails with Exit Code 1**.
  * **Error Logs:**
    ```
    ./data/portfolio.ts:88:14
    Type error: Property 'footer' is missing in type '{ name: string; roles: string[]; ... }' but required in type 'PortfolioData'.
    ```
  * **Cause:** The type declaration `PortfolioData` enforces `footer: { note: string; }`, but the instantiated variable `portfolioData` at line 88 misses this block.
  * **Remedy:** Define `footer: { note: "..." }` at the end of the `portfolioData` object in [data/portfolio.ts](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/data/portfolio.ts).

---

## 13. Recruiter/Freelance Positioning Audit

### Analysis of Current Positioning
* **Experience & Credibility:** Currently weak. Recruiter queries will immediately bounce when encountering dummy placeholder case studies that links back to contact forms.
* **Outcome focus:** The current template emphasizes abstract engineering ideals ("clarity", "restraint") rather than demonstrating concrete business outcomes (e.g. system cost-reduction metrics, uptime improvements, user growth).
* **Missing Components:**
  * Proof of real employment (e.g. past companies, timeline).
  * Direct case studies showing codebase structures or design architecture.
  * Visual proof of interface execution.

### Tactical Recommendations
1. Replace placeholder text in the 3 featured projects with Billy's actual work.
2. Update the `JourneySection` from a conceptual checklist to a realistic work experience history.
3. Link preview buttons to live deployments or showcase repos instead of `#contact`.

---

## 14. Future Implementation Plan Proposal

### R1 - Content Extraction Preparation
* **Goal:** Prepare project properties for custom content and i18n integration.
* **Actions:**
  1. Fix the `footer` TypeScript compiler error in `data/portfolio.ts` to restore build health.
  2. Extract all hardcoded section titles, buttons, and accessibility copy from the components and place them into structured dictionaries.
  3. Validate that standard dev builds (`npm run dev`) launch successfully.

### R2 - Real Project Content Integration
* **Goal:** Populate the site with real project case studies.
* **Actions:**
  1. Gather project descriptions, tags, metrics, and repository links from the user.
  2. Update `projects`, `techGroups`, and `journey` in the data model with real values.
  3. Swap placeholder SVGs in `/public` with optimized thumbnails.

### R3 - Bilingual Content Model
* **Goal:** Prepare the data layer for bilingual support.
* **Actions:**
  1. Update data types to support bilingual content fields (e.g., `{ en: string, vi: string }`).
  2. Adapt components to support reading localized values based on the active locale.

### R4 - Language Switcher UI
* **Goal:** Implement the language switcher UI.
* **Actions:**
  1. Build a custom context or hook to manage the active locale.
  2. Implement a language switcher button in the `SiteHeader`.
  3. Ensure transitions between languages are smooth and handle text layout adjustments dynamically.

### R5 - SEO and QA Polish
* **Goal:** Finalize the portfolio for production deployment.
* **Actions:**
  1. Update metadata dynamically in `app/layout.tsx` to match the selected language.
  2. Test responsive layouts on mobile devices.
  3. Run a final production build (`npm run build`) to ensure all compiler checks pass.

---

## 15. File-by-File Change Candidate List

| File Path | Type of Future Change | Why It Needs to Change |
| :--- | :--- | :--- |
| [data/portfolio.ts](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/data/portfolio.ts) | Content Update / i18n Support | Needs the `footer` property added, real project details filled in, and content translated. |
| [app/layout.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/app/layout.tsx) | i18n / SEO Metadata | The metadata object and `html lang` attribute must be updated dynamically. |
| [components/sections/site-header.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/site-header.tsx) | Component Refactor | Extract hardcoded text and add the language switching button. |
| [components/sections/footer.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/footer.tsx) | i18n / Component Refactor | Render the `footer` note and extract hardcoded roles text. |
| [components/sections/contact-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/contact-section.tsx) | Content Update / i18n | Extract hardcoded CTA texts and button labels. |
| [components/sections/about-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/about-section.tsx) | i18n | Extract hardcoded headings and labels. |
| [components/sections/featured-projects-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/featured-projects-section.tsx) | i18n | Extract hardcoded button text and headings. |
| [components/sections/journey-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/journey-section.tsx) | i18n | Extract hardcoded section labels. |
| [components/sections/services-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/services-section.tsx) | i18n | Extract hardcoded headings. |
| [components/sections/tech-stack-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/tech-stack-section.tsx) | i18n | Extract hardcoded headings and tool counters. |

---

## 16. Questions / Missing Information Needed From User

Before proceeding with the content updates and language switching implementation, we need the following details from the user:
1. **Real Personal details:** Preferred display name, contact email, and active social profile URLs.
2. **Resume/CV Document:** Do you have an active resume file (e.g. `resume.pdf`) that we should place in `/public` and link to?
3. **Project Details (3 Projects):**
   * Real project names, roles, and descriptions (Vietnamese and English).
   * Key business/technical outcomes and metrics for each project.
   * Technologies used.
   * Live preview and GitHub repository links.
   * Project image assets to display.
4. **Journey Timeline:** Real dates, roles, and descriptions for your career path.
5. **i18n Default Preference:** Should the default language on page load be Vietnamese (`vi`) or English (`en`)?
6. **Tone of Voice:** Do you prefer a formal professional tone, a confident startup-style tone, or a friendly developer tone?

---

## 17. Final Audit Summary

* **Current Portfolio Structure Score:** `9.5 / 10` (Very clean structure and separation of components)
* **Content Readiness Score:** `3.0 / 10` (Template placeholders, missing avatar and real metrics)
* **i18n Readiness Score:** `2.5 / 10` (Hardcoded strings scattered throughout the codebase)
* **SEO Readiness Score:** `5.0 / 10` (Basic tags are present but lacks dynamic locale support)
* **Technical Risk Level:** **Medium**
  * *Reason:* The production build is currently broken due to a TypeScript error. We need to fix this error and extract the hardcoded content to enable smooth i18n updates.
* **Recommended Next Action:**
  1. Fix the TypeScript type error in `data/portfolio.ts` by adding the `footer` object.
  2. Align with the user on the real project details and default language choice.
