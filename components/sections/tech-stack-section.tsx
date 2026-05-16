import { portfolioData } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SignatureGlyph } from "@/components/ui/signature-glyph";
import { SiteSection } from "@/components/ui/site-section";
import { SpotlightPanel } from "@/components/ui/spotlight-panel";
import { Tag } from "@/components/ui/tag";

export function TechStackSection() {
  return (
    <SiteSection id="tech-stack" labelledBy="tech-stack-title">
      <SectionHeading
        eyebrow="Tech Stack"
        title="A modern toolkit across frontend, backend, mobile, and production infrastructure."
        description="Organized for clarity and maintainability, making it easy to swap, expand, or tailor Billy's stack over time without touching the section structure."
        titleId="tech-stack-title"
      />

      <ul className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {portfolioData.techGroups.map((group, index) => (
          <li key={group.title}>
            <Reveal delay={index * 0.05}>
              <SpotlightPanel className="rounded-[28px]">
                <article className="rounded-[28px] border border-border bg-white/[0.03] p-6 shadow-[0_28px_80px_-52px_rgba(0,0,0,0.8)]">
                  <div className="h-px w-full bg-[linear-gradient(90deg,rgba(141,224,255,0.35),transparent)]" />
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">
                      {group.title}
                    </h3>
                    <SignatureGlyph size="xs" subdued className="text-accent" />
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted">
                    {group.items.length} focused tools
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-3">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Tag>{item}</Tag>
                      </li>
                    ))}
                  </ul>
                </article>
              </SpotlightPanel>
            </Reveal>
          </li>
        ))}
      </ul>
    </SiteSection>
  );
}
