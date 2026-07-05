# PORTFOLIO_R3_BILINGUAL_CONTENT_MODEL_REPORT

This report details the preparation of a bilingual content model for the portfolio, separating English and Vietnamese datasets and dynamically binding them inside components.

---

## 1. Summary of the Bilingual Content Model
We implemented a dynamic dictionary model:
* **Locale Type:** `"en" | "vi"`
* **Centralized Data Record:** `portfolioContent` containing both localized sets.
* **Accessor Helper:** `getPortfolioData(locale)` to retrieve the requested language profile.
* **Component-Level Customization:** Adjusted all section signatures and sub-components to support an optional `data` prop of type `PortfolioData`, falling back to English default when no prop is specified.

---

## 2. Files Changed
* [data/portfolio.ts](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/data/portfolio.ts) (Bilingual content definitions and schemas)
* [app/page.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/app/page.tsx) (Passed pre-resolved locale data to components)
* [components/sections/site-header.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/site-header.tsx)
* [components/sections/hero-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/hero-section.tsx)
* [components/sections/about-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/about-section.tsx)
* [components/sections/tech-stack-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/tech-stack-section.tsx)
* [components/sections/featured-projects-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/featured-projects-section.tsx)
* [components/sections/journey-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/journey-section.tsx)
* [components/sections/services-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/services-section.tsx)
* [components/sections/contact-section.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/contact-section.tsx)
* [components/sections/footer.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/sections/footer.tsx)
* [components/ui/hero-orbit.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/components/ui/hero-orbit.tsx) (Client component dynamic translations)

---

## 3. English Rendering Verification
* **Status:** **FULLY OPERATIONAL**
* By default, the root Home route calls `getPortfolioData("en")`. The rendered page is visually identical to R2, but is now powered entirely by dynamic properties from the locale dictionary instead of hardcoded strings.

---

## 4. Vietnamese Content Verification
* **Status:** **FULLY OPERATIONAL**
* Coherent, professional Vietnamese copy has been authored and saved under `portfolioContent.vi`. 
* Switching to `getPortfolioData("vi")` in [app/page.tsx](file:///f:/Coding/Web%20development/Personal%20Portfolio/billytran-portfolio/app/page.tsx) automatically loads the full Vietnamese dataset without any typescript compiler errors or component edits.

---

## 5. Remaining Hardcoded User-Visible Strings
* None. All visible section titles, descriptions, buttons, link labels, availability flags, accessibility descriptions, and copyright lines have been successfully bound to the locale dictionary.

---

## 6. Items Intentionally Deferred to R4
* **Dynamic SEO Metadata:** Localized metadata is prepared inside `portfolioContent[locale].metadata`, but binding it to Next.js metadata system (using `generateMetadata`) has been deferred to R4.
* **Routing Setup:** Path configurations like `/vi` or `/en` and middleware configurations are deferred to R4.
* **Language Switcher Switch/Buttons:** No language toggle UI switcher was added to the header.

---

## 7. Validation Results
* **`npm run build` Status:** **PASSED** (Compiled statically in Turbopack).
* **`npm run lint` Status:** **PASSED** (Zero ESLint warnings).

---

## 8. Layout Risks with Vietnamese Copy
* **Mobile Nav:** Vietnamese navigation labels (`Giới thiệu`, `Hành trình`, etc.) are slightly longer than their English counterparts. Needs manual validation on extra small mobile screens to check if the horizontal swipe menu behaves correctly.
* **Project Cards & CTA Buttons:** Button labels like `"Mã nguồn theo yêu cầu"` (Source on request) are longer and might wrap on smaller screens.
* **Tech Tags:** Verify that the grid/flex wraps properly.

---

## 9. Recommended R4 Implementation Approach
We recommend a **route-based dynamic subpath mechanism** (`/[locale]/page.tsx` and custom middleware) rather than a client-side localStorage state switch:
1. **SEO Friendliness:** Search engine crawlers (Google, etc.) index both `/en` and `/vi` subpaths separately, allowing proper Vietnamese index caching.
2. **Standard Practice:** Next.js App Router integrates natively with dynamic segments like `/[locale]`.
3. **No Hydration Flashes:** Static rendering based on request parameters eliminates "language flashing" upon first page paint.

---

## 10. i18n Scope Isolation Confirmation
* No external i18n packages (`next-intl`, etc.) have been installed.
* No middleware has been introduced.
* No switcher buttons or language logic routes exist yet.
