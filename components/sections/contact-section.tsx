import { getPortfolioData, type PortfolioData } from "@/data/portfolio";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionPill } from "@/components/ui/section-pill";
import { SignatureBlueprint } from "@/components/ui/signature-blueprint";
import { SignatureGlyph } from "@/components/ui/signature-glyph";
import { SiteSection } from "@/components/ui/site-section";
import { SpotlightPanel } from "@/components/ui/spotlight-panel";

export function ContactSection({ data }: { data?: PortfolioData }) {
  const portfolioData = data ?? getPortfolioData("en");

  return (
    <SiteSection id="contact" labelledBy="contact-title">
      <SpotlightPanel className="rounded-[36px]">
        <div className="relative overflow-hidden rounded-[36px] border border-border bg-[linear-gradient(145deg,rgba(15,19,30,0.96),rgba(10,12,19,0.9))] p-8 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.88)] sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute right-[-4rem] top-[-3rem] hidden h-[20rem] w-[20rem] text-accent/10 lg:block">
            <SignatureBlueprint />
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <div className="relative">
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(141,224,255,0.25),transparent)]" />
              <SectionPill>{portfolioData.contact.eyebrow}</SectionPill>
              <h2
                id="contact-title"
                className="mt-5 max-w-2xl font-display text-4xl font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-5xl lg:text-6xl"
              >
                {portfolioData.contact.title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-muted-strong sm:text-lg">
                {portfolioData.contact.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink
                  href={`mailto:${portfolioData.contact.email}`}
                  variant="primary"
                >
                  {portfolioData.contact.primaryCta}
                </ButtonLink>
                <ButtonLink href="#featured-projects" variant="secondary">
                  {portfolioData.contact.secondaryCta}
                </ButtonLink>
              </div>
            </div>

            <address className="space-y-4 not-italic">
              <ul className="space-y-4">
                {portfolioData.contact.methods.map((item, index) => (
                  <li key={item.label}>
                    <Reveal delay={index * 0.06}>
                      <SpotlightPanel className="rounded-[24px]" lift={false}>
                        <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-sm uppercase tracking-[0.24em] text-muted">
                              {item.label}
                            </p>
                            <SignatureGlyph
                              size="xs"
                              subdued
                              className="text-accent-warm/80"
                            />
                          </div>
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                            aria-label={`${item.label}: ${item.value}`}
                            className="mt-3 block rounded-md text-lg font-medium text-foreground transition-colors hover:text-accent focus-visible:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          >
                            {item.value}
                          </a>
                        </div>
                      </SpotlightPanel>
                    </Reveal>
                  </li>
                ))}
              </ul>

              <SpotlightPanel className="rounded-[24px]" lift={false}>
                <div className="rounded-[24px] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-muted">
                    {portfolioData.contact.noteTitle}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-strong">
                    {portfolioData.contact.note}
                  </p>
                </div>
              </SpotlightPanel>
            </address>
          </div>
        </div>
      </SpotlightPanel>
    </SiteSection>
  );
}

