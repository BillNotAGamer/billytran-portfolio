import { portfolioData } from "@/data/portfolio";
import { ButtonLink } from "@/components/ui/button-link";
import { HeroOrbit } from "@/components/ui/hero-orbit";
import { Reveal } from "@/components/ui/reveal";
import { SectionPill } from "@/components/ui/section-pill";
import { SignatureBlueprint } from "@/components/ui/signature-blueprint";
import { SignatureGlyph } from "@/components/ui/signature-glyph";
import { SpotlightPanel } from "@/components/ui/spotlight-panel";
import { Tag } from "@/components/ui/tag";
import { Container } from "@/components/ui/container";

export function HeroSection() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-24 pt-16 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-24"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top,rgba(121,161,255,0.2),transparent_34%),radial-gradient(circle_at_18%_20%,rgba(141,224,255,0.16),transparent_20%),radial-gradient(circle_at_82%_10%,rgba(220,180,123,0.08),transparent_20%)]" />
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <div className="relative max-w-3xl">
            <div className="pointer-events-none absolute -right-20 top-4 hidden h-[22rem] w-[22rem] text-accent/12 lg:block">
              <SignatureBlueprint />
            </div>

            <Reveal>
              <SectionPill>{portfolioData.hero.eyebrow}</SectionPill>
            </Reveal>

            <Reveal delay={0.05}>
              <ul className="mt-6 flex flex-wrap gap-3">
                {portfolioData.roles.map((role) => (
                  <li key={role}>
                    <Tag>{role}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <h1
                id="hero-title"
                className="mt-8 max-w-4xl font-display text-5xl font-semibold tracking-[-0.055em] text-balance text-foreground sm:text-6xl lg:text-7xl xl:text-[5.8rem]"
              >
                {portfolioData.hero.headlineLead}
                <span className="bg-[linear-gradient(135deg,#f5f7fb_0%,#8de0ff_38%,#dcb47b_100%)] bg-clip-text text-transparent">
                  {" "}
                  {portfolioData.hero.headlineAccent}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-strong sm:text-lg">
                {portfolioData.hero.description}
              </p>
            </Reveal>

            <Reveal delay={0.24} className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="#featured-projects" variant="primary">
                View Projects
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                Contact Me
              </ButtonLink>
            </Reveal>

            <Reveal delay={0.28} className="mt-7">
              <SectionPill caps={false} className="text-muted-strong" iconClassName="text-accent">
                {portfolioData.hero.availability}
              </SectionPill>
            </Reveal>

            <Reveal delay={0.32}>
              <ul className="mt-10 flex flex-col gap-3 text-sm text-muted">
                {portfolioData.hero.strips.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-px w-10 bg-[linear-gradient(90deg,rgba(141,224,255,0.72),transparent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <dl className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {portfolioData.heroMetrics.map((item, index) => (
                <Reveal key={item.label} delay={0.4 + index * 0.06}>
                  <SpotlightPanel className="rounded-[24px]">
                    <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5 backdrop-blur-sm">
                      <dt className="flex items-center justify-between gap-4 text-sm uppercase tracking-[0.22em] text-muted">
                        <span>{item.label}</span>
                        <SignatureGlyph
                          size="xs"
                          subdued
                          className="text-accent-warm/80"
                        />
                      </dt>
                      <dd className="mt-5 text-lg leading-8 text-foreground">
                        {item.value}
                      </dd>
                    </div>
                  </SpotlightPanel>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal delay={0.16} className="lg:justify-self-end">
            <HeroOrbit />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

