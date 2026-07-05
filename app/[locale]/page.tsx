import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { JourneySection } from "@/components/sections/journey-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SiteHeader } from "@/components/sections/site-header";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { SiteBackdrop } from "@/components/ui/site-backdrop";
import { getPortfolioData, type Locale } from "@/data/portfolio";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vi" }];
}

export default async function LocalizedPage({ params }: PageProps) {
  const { locale } = await params;

  // Validate locale parameter
  if (locale !== "en" && locale !== "vi") {
    redirect("/en");
  }

  const data = getPortfolioData(locale as Locale);

  return (
    <div className="relative isolate overflow-x-clip">
      <SiteBackdrop />
      <SiteHeader data={data} locale={locale as Locale} />
      <main id="main-content" aria-label={locale === "vi" ? "Trang thông tin Billy Tran" : "Billy Tran portfolio"}>
        <HeroSection data={data} />
        <AboutSection data={data} />
        <TechStackSection data={data} />
        <FeaturedProjectsSection data={data} />
        <JourneySection data={data} />
        <ServicesSection data={data} />
        <ContactSection data={data} />
      </main>
      <Footer data={data} />
    </div>
  );
}
