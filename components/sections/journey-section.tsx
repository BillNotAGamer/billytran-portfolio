import type { PortfolioData } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SignatureGlyph } from "@/components/ui/signature-glyph";
import { SiteSection } from "@/components/ui/site-section";
import { SpotlightPanel } from "@/components/ui/spotlight-panel";

export function JourneySection({ data: portfolioData }: { data: PortfolioData }) {
  return (
    <SiteSection id="journey" labelledBy="journey-title">
      <SectionHeading
        eyebrow={portfolioData.journeySection.eyebrow}
        title={portfolioData.journeySection.title}
        description={portfolioData.journeySection.description}
        titleId="journey-title"
      />

      <ol data-journey-list className="relative mt-14 space-y-6">
        <span
          aria-hidden="true"
          data-journey-line
          className="absolute bottom-0 left-[1.1rem] top-0 w-px bg-[linear-gradient(180deg,rgba(141,224,255,0.35),transparent_95%)] sm:left-[7.5rem]"
        />
        {portfolioData.journey.map((item, index) => {
          const itemTitleId = `journey-item-${item.phase}`;

          return (
            <li key={item.phase} data-journey-item className="grid gap-4 sm:grid-cols-[6rem_1fr] sm:gap-6">
              <div className="relative z-10 flex items-start sm:justify-end">
                <span data-journey-badge className="inline-flex h-9 items-center rounded-full border border-accent/20 bg-background px-4 text-xs font-medium uppercase tracking-[0.24em] text-accent transition-colors duration-500">
                  {item.phase}
                </span>
              </div>

              <Reveal delay={index * 0.06}>
                <SpotlightPanel className="rounded-[28px]">
                  <article
                    aria-labelledby={itemTitleId}
                    data-journey-card
                    className="rounded-[28px] border border-border bg-white/[0.03] p-6 sm:p-7 transition-colors duration-500"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3
                          id={itemTitleId}
                          className="font-display text-2xl font-semibold tracking-[-0.03em] text-foreground"
                        >
                          {item.title}
                        </h3>
                        <p className="mt-3 max-w-3xl text-base leading-8 text-muted-strong">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-accent-warm/80">
                        <span>{item.tag}</span>
                        <SignatureGlyph
                          size="xs"
                          subdued
                          className="text-accent-warm/80"
                        />
                      </div>
                    </div>
                  </article>
                </SpotlightPanel>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </SiteSection>
  );
}
