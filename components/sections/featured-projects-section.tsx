import { getPortfolioData, type PortfolioData } from "@/data/portfolio";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SignatureBlueprint } from "@/components/ui/signature-blueprint";
import { SignatureGlyph } from "@/components/ui/signature-glyph";
import { SiteSection } from "@/components/ui/site-section";
import { SpotlightPanel } from "@/components/ui/spotlight-panel";
import { Tag } from "@/components/ui/tag";

export function FeaturedProjectsSection({ data }: { data?: PortfolioData }) {
  const portfolioData = data ?? getPortfolioData("en");

  return (
    <SiteSection id="featured-projects" labelledBy="featured-projects-title">
      <div className="relative">
        <div className="pointer-events-none absolute right-0 top-[-3rem] hidden h-[18rem] w-[18rem] text-accent/10 xl:block">
          <SignatureBlueprint />
        </div>
        <SectionHeading
          eyebrow={portfolioData.projectsSection.eyebrow}
          title={portfolioData.projectsSection.title}
          description={portfolioData.projectsSection.description}
          titleId="featured-projects-title"
        />
      </div>

      <ol className="mt-14 grid gap-6 lg:grid-cols-2">
        {portfolioData.projects.map((project, index) => {
          const projectTitleId = `project-title-${index + 1}`;

          return (
            <li
              key={project.title}
              className={index === 0 ? "lg:col-span-2" : undefined}
            >
              <Reveal delay={index * 0.08}>
                <SpotlightPanel className="rounded-[32px]">
                  <article
                    aria-labelledby={projectTitleId}
                    className="group relative h-full overflow-hidden rounded-[32px] border border-border bg-white/[0.03] p-[1px] shadow-[0_32px_90px_-44px_rgba(0,0,0,0.88)] transition-transform duration-500"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(141,224,255,0.16),transparent_35%,rgba(220,180,123,0.12)_78%,rgba(255,255,255,0.04))] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative flex h-full flex-col rounded-[31px] bg-[linear-gradient(180deg,rgba(15,20,31,0.96),rgba(10,13,21,0.9))] p-7 sm:p-8">
                      <div className="absolute right-7 top-7 hidden h-16 w-16 text-accent/10 md:block">
                        <SignatureBlueprint />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <Tag accent>{project.category}</Tag>
                        <div className="flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-muted">
                          <span>0{index + 1}</span>
                          <SignatureGlyph
                            size="xs"
                            subdued
                            className="text-accent-warm/85"
                          />
                        </div>
                      </div>

                      <div className="mt-8 grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
                        <div>
                          <p className="text-sm uppercase tracking-[0.22em] text-muted">
                            {project.impactLabel}
                          </p>
                          <h3
                            id={projectTitleId}
                            className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl"
                          >
                            {project.title}
                          </h3>
                          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-strong">
                            {project.description}
                          </p>

                          <ul className="mt-8 flex flex-wrap gap-3">
                            {project.stack.map((item) => (
                              <li key={item}>
                                <Tag>{item}</Tag>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <SpotlightPanel className="rounded-[24px]" lift={false}>
                          <div className="flex h-full flex-col justify-between rounded-[24px] border border-white/8 bg-white/[0.03] p-6">
                            <div>
                              <div className="h-px w-12 bg-[linear-gradient(90deg,rgba(141,224,255,0.65),transparent)]" />
                              <p className="mt-4 text-lg leading-8 text-foreground">
                                {project.impact}
                              </p>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                              <ButtonLink href={project.links.preview} variant="primary">
                                {project.links.previewLabel}
                              </ButtonLink>
                              <ButtonLink
                                href={project.links.repository}
                                variant="secondary"
                              >
                                {project.links.repositoryLabel}
                              </ButtonLink>
                            </div>
                          </div>
                        </SpotlightPanel>
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
