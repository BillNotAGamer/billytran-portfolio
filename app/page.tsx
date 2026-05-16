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

export default function Home() {
  return (
    <div className="relative isolate overflow-x-clip">
      <SiteBackdrop />
      <SiteHeader />
      <main id="main-content" aria-label="Billy Tran portfolio">
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <FeaturedProjectsSection />
        <JourneySection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
