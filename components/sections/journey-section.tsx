import { getPortfolioData, type PortfolioData } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SignatureGlyph } from "@/components/ui/signature-glyph";
import { SiteSection } from "@/components/ui/site-section";
import { SpotlightPanel } from "@/components/ui/spotlight-panel";

export function JourneySection({ data }: { data?: PortfolioData }) {
  const portfolioData = data ?? getPortfolioData("en");

  return (
    <SiteSection id="journey" labelledBy="journey-title">
      <SectionHeading
        eyebrow={portfolioData.journeySection.eyebrow}
        title={portfolioData.journeySection.title}
        description={portfolioData.journeySection.description}
        titleId="journey-title"
      />

      <ol className="relative mt-14 space-y-6 before:absolute before:bottom-0 before:left-[1.1rem] before:top-0 before:w-px before:bg-[linear-gradient(180deg,rgba(141,224,255,0.35),transparent 95%)] sm:before:left-[7.5rem]">
        {portfolioData.journey.map((item, index) => {
          const itemTitleId = `journey-item-${item.phase}`;

          return (
            <li key={item.phase} className="grid gap-4 sm:grid-cols-[6rem_1fr] sm:gap-6">
              <div className="relative z-10 flex items-start sm:justify-end">
                <span className="inline-flex h-9 items-center rounded-full border border-accent/20 bg-background px-4 text-xs font-medium uppercase tracking-[0.24em] text-accent">
                  {item.phase}
                </span>
              </div>

              <Reveal delay={index * 0.06}>
                <SpotlightPanel className="rounded-[28px]">
                  <article
                    aria-labelledby={itemTitleId}
                    className="rounded-[28px] border border-border bg-white/[0.03] p-6 sm:p-7"
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
