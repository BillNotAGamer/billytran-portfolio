# PORTFOLIO_R4_LANGUAGE_ROUTING_SEO_REPORT

This report details the implementation of route-based language switching, localized SEO metadata, and dynamic HTML lang attributes for Billy Tran's Next.js portfolio.

---

## 1. Summary of R4 Changes
* **Dynamic localized paths:** Moved layout and page into the dynamic segment `app/[locale]/`.
* **Zero-nesting structure:** Safely deleted root-level `app/layout.tsx` and `app/page.tsx` to prevent invalid duplicate/nested `<html>` and `<body>` tags.
* **Server-level redirects:** Added config-level routing redirects inside `next.config.ts` mapping `/` to `/en` for high-performance and SEO compatibility.
* **Header Toggle UI:** Developed a lightweight client-side language switcher component (`components/ui/language-switcher.tsx`) that transitions between `/en` and `/vi` while preserving the URL hash segment (e.g. `#featured-projects`).
* **SEO Metadata & dynamic lang:** Configured `generateMetadata` dynamically parsing route parameters to output localized title, description, keywords, Open Graph attributes, Twitter cards, and alternates. Linked route parameter directly to `<html lang={locale}>`.

---

## 2. Files Changed

### Created / Moved
* [app/[locale]/layout.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/app/[locale]/layout.tsx)
* [app/[locale]/page.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/app/[locale]/page.tsx)
* [components/ui/language-switcher.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/ui/language-switcher.tsx)

### Modified
* [components/sections/site-header.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/site-header.tsx)
* [next.config.ts](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/next.config.ts)

### Deleted (Cleaned Up)
* `app/layout.tsx` (Legacy root layout)
* `app/page.tsx` (Legacy root page)

---

## 3. New Routing Behavior
* **`/` (Root):** Instantly redirects to `/en` (handled in Next.js configuration).
* **`/en` (English Page):** Renders dynamic English data model, outputs `lang="en"`, and sets English SEO tags.
* **`/vi` (Vietnamese Page):** Renders dynamic Vietnamese data model, outputs `lang="vi"`, and sets Vietnamese SEO tags.
* **Invalid Locales (e.g. `/fr`):** Checked inside `app/[locale]/page.tsx` and redirected to `/en`.

---

## 4. Language Switcher UI
* Implemented as a pill button in the header action group next to the CTA link.
* **Hash Preservation:** Attaches a client-side click handler that grabs `window.location.hash` and redirects dynamically (e.g., clicking `VI` on `/en#services` navigates directly to `/vi#services`).
* **Accessible Labels:**
  * English page: Switch option reads `VI` with `aria-label="Switch language to Vietnamese"`.
  * Vietnamese page: Switch option reads `EN` with `aria-label="Chuyển ngôn ngữ sang tiếng Anh"`.

---

## 5. Localized Metadata & HTML lang
* `<html lang={locale}>` is set dynamically inside the server component layout.
* Localized SEO keywords, canonical language alternates, descriptions, Open Graph, and Twitter metadata values are mapped dynamically using the Next.js `generateMetadata` function from the bilingual data dictionaries.

---

## 6. Validation Results
* **`npm run build` Status:** **PASSED**
  * Statically compiled `/[locale]` routes (`/en` and `/vi`) as HTML during the build process using `generateStaticParams()`.
* **`npm run lint` Status:** **PASSED**
  * Conforms perfectly to all rules.

---

## 7. Known Limitations & Deferred Items
* **Production Canonical Domain:** alternated URLs (canonical/alternates) are mapped as relative paths (`/en` and `/vi`). When the production domain is confirmed, we should configure a `metadataBase` variable to generate absolute alternate URLs.
* **Project Images:** Thumbnail placeholders continue using dynamic canvas blueprints; screenshots of the real audited systems should be integrated later in `public/`.

---

## 8. Confirmations
* **No external i18n package added:** Maintained a lightweight custom dictionary and route structure.
* **No visual redesign performed:** Retained the beautiful glassmorphism theme and animations.
* **Static generation preserved:** The project remains 100% compatible with static output builds.
