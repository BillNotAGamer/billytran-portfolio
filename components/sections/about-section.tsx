import { portfolioData } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SignatureGlyph } from "@/components/ui/signature-glyph";
import { SiteSection } from "@/components/ui/site-section";
import { SpotlightPanel } from "@/components/ui/spotlight-panel";
import { Tag } from "@/components/ui/tag";

export function AboutSection() {
  return (
    <SiteSection id="about" labelledBy="about-title">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeading
          eyebrow="About"
          title={portfolioData.about.title}
          description={portfolioData.about.description}
          titleId="about-title"
          className="lg:pt-4"
        />

        <SpotlightPanel className="rounded-[34px]">
          <div className="relative overflow-hidden rounded-[34px] border border-border bg-white/[0.03] p-8 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.85)] sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(141,224,255,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(220,180,123,0.08),transparent_28%)]" />
            <div className="relative space-y-8">
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-4">
                  {portfolioData.about.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-8 text-muted-strong sm:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <SignatureGlyph
                  size="md"
                  className="hidden shrink-0 text-accent-warm/85 sm:inline-flex"
                />
              </div>

              <ul className="grid gap-4 sm:grid-cols-2">
                {portfolioData.about.pillars.map((pillar, index) => (
                  <li key={pillar.title}>
                    <Reveal delay={index * 0.06}>
                      <SpotlightPanel className="rounded-[24px]" lift={false}>
                        <article className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-sm uppercase tracking-[0.24em] text-accent-warm/80">
                              0{index + 1}
                            </p>
                            <div className="h-px w-10 bg-[linear-gradient(90deg,rgba(141,224,255,0.65),transparent)]" />
                          </div>
                          <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                            {pillar.title}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-muted">
                            {pillar.copy}
                          </p>
                        </article>
                      </SpotlightPanel>
                    </Reveal>
                  </li>
                ))}
              </ul>

              <ul className="flex flex-wrap gap-3">
                {portfolioData.roles.map((role) => (
                  <li key={role}>
                    <Tag>{role}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SpotlightPanel>
      </div>
    </SiteSection>
  );
}
