import { portfolioData } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SignatureGlyph } from "@/components/ui/signature-glyph";
import { SiteSection } from "@/components/ui/site-section";
import { SpotlightPanel } from "@/components/ui/spotlight-panel";

export function ServicesSection() {
  return (
    <SiteSection id="services" labelledBy="services-title">
      <SectionHeading
        eyebrow="What Billy Builds"
        title="Delivery across the interface, the backend, and the product system behind both."
        description="Positioned for teams that need more than surface-level implementation. Each service card is tuned to communicate capability without feeling broad or generic."
        titleId="services-title"
      />

      <ul className="mt-14 grid gap-6 lg:grid-cols-2">
        {portfolioData.services.map((service, index) => {
          const serviceTitleId = `service-title-${index + 1}`;

          return (
            <li key={service.title}>
              <Reveal delay={index * 0.06}>
                <SpotlightPanel className="rounded-[30px]">
                  <article
                    aria-labelledby={serviceTitleId}
                    className="rounded-[30px] border border-border bg-white/[0.03] p-7 sm:p-8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-display text-5xl font-semibold tracking-[-0.05em] text-white/14">
                        0{index + 1}
                      </p>
                      <SignatureGlyph size="xs" subdued className="text-accent" />
                    </div>

                    <p className="mt-5 text-sm uppercase tracking-[0.22em] text-muted">
                      {service.tag}
                    </p>
                    <h3
                      id={serviceTitleId}
                      className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground"
                    >
                      {service.title}
                    </h3>
                    <p className="mt-4 text-base leading-8 text-muted-strong">
                      {service.description}
                    </p>

                    <ul className="mt-6 space-y-3 text-sm leading-7 text-muted">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-warm" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </SpotlightPanel>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </SiteSection>
  );
}
