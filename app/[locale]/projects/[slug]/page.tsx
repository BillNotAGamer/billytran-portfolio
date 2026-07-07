import type { Metadata } from "next";
import { Footer } from "@/components/sections/footer";
import { SiteHeader } from "@/components/sections/site-header";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionPill } from "@/components/ui/section-pill";
import { SignatureBlueprint } from "@/components/ui/signature-blueprint";
import { SiteBackdrop } from "@/components/ui/site-backdrop";
import { SiteSection } from "@/components/ui/site-section";
import { SpotlightPanel } from "@/components/ui/spotlight-panel";
import { Tag } from "@/components/ui/tag";
import {
  getPortfolioData,
  getProjectBySlug,
  getProjectRouteParams,
  isLocale,
} from "@/data/portfolio";
import {
  getLocalizedSectionPath,
  getProjectPath,
  resolveLocalizedHref,
} from "@/lib/routes";
import { notFound, redirect } from "next/navigation";

type ProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectRouteParams();
}

function getPageData(localeParam: string, slug: string) {
  if (!isLocale(localeParam)) {
    redirect("/en");
  }

  const locale = localeParam;
  const data = getPortfolioData(locale);
  const project = getProjectBySlug(locale, slug);

  if (!project) {
    notFound();
  }

  return { locale, data, project };
}

function SectionHeader({
  eyebrow,
  title,
  titleId,
}: {
  eyebrow: string;
  title: string;
  titleId: string;
}) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <SectionPill>{eyebrow}</SectionPill>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          id={titleId}
          className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl"
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const { locale, data, project } = getPageData(localeParam, slug);
  const metadata = project.detail.metadata;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      siteName: `${data.header.brandName} Portfolio`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
    alternates: {
      canonical: getProjectPath(locale, project.slug),
      languages: {
        en: getProjectPath("en", project.slug),
        vi: getProjectPath("vi", project.slug),
      },
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { locale: localeParam, slug } = await params;
  const { locale, data, project } = getPageData(localeParam, slug);
  const backToProjectsHref = getLocalizedSectionPath(locale, "#featured-projects");
  const contactHref = getLocalizedSectionPath(locale, "#contact");
  const previewHref = resolveLocalizedHref(locale, project.links.previewHref);
  const sourceHref = resolveLocalizedHref(locale, project.links.sourceHref);
  const detail = project.detail;

  return (
    <div className="relative isolate overflow-x-clip">
      <SiteBackdrop />
      <SiteHeader data={data} locale={locale} />
      <main
        id="main-content"
        aria-label={
          locale === "vi"
            ? `Chi tiết dự án ${project.title}`
            : `${project.title} project detail`
        }
      >
        <section className="relative overflow-hidden pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
          <div className="pointer-events-none absolute right-[-4rem] top-[-2rem] hidden h-[22rem] w-[22rem] text-accent/10 xl:block">
            <SignatureBlueprint />
          </div>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-start lg:gap-12">
              <div className="max-w-4xl">
                <Reveal>
                  <SectionPill>{detail.eyebrow}</SectionPill>
                </Reveal>

                <Reveal delay={0.05} className="mt-6 flex flex-wrap gap-3">
                  <Tag accent>{project.category}</Tag>
                  <Tag>{project.impactLabel}</Tag>
                </Reveal>

                <Reveal delay={0.1}>
                  <h1 className="mt-8 font-display text-5xl font-semibold tracking-[-0.05em] text-balance text-foreground sm:text-6xl lg:text-[4.4rem]">
                    {project.title}
                  </h1>
                </Reveal>

                <Reveal delay={0.16}>
                  <p className="mt-6 max-w-3xl text-base leading-8 text-muted-strong sm:text-lg">
                    {project.description}
                  </p>
                </Reveal>

                <Reveal delay={0.22}>
                  <ul className="mt-8 flex flex-wrap gap-3">
                    {project.stack.map((item) => (
                      <li key={item}>
                        <Tag>{item}</Tag>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={0.28} className="mt-10 flex flex-wrap gap-4">
                  <ButtonLink href={backToProjectsHref} variant="secondary">
                    {detail.backLabel}
                  </ButtonLink>
                  <ButtonLink href={contactHref} variant="primary">
                    {detail.contactCtaLabel}
                  </ButtonLink>
                </Reveal>
              </div>

              <Reveal delay={0.14}>
                <SpotlightPanel className="rounded-[28px]">
                  <div className="rounded-[28px] border border-white/8 bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_28px_80px_-46px_rgba(0,0,0,0.92)] sm:p-7">
                    <p className="text-sm uppercase tracking-[0.22em] text-muted">
                      {project.impactLabel}
                    </p>
                    <p className="mt-4 text-lg leading-8 text-foreground">
                      {project.impact}
                    </p>

                    <div className="mt-8 border-t border-white/8 pt-6">
                      <p className="text-sm uppercase tracking-[0.22em] text-muted">
                        {detail.linksTitle}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <ButtonLink href={previewHref} variant="secondary">
                          {project.links.previewLabel}
                        </ButtonLink>
                        <ButtonLink href={sourceHref} variant="secondary">
                          {project.links.sourceLabel}
                        </ButtonLink>
                      </div>
                    </div>
                  </div>
                </SpotlightPanel>
              </Reveal>
            </div>
          </Container>
        </section>

        <SiteSection id="project-overview" labelledBy="project-overview-title">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionHeader
                eyebrow={detail.eyebrow}
                title={detail.overviewTitle}
                titleId="project-overview-title"
              />
              <div className="mt-8 space-y-5">
                {detail.overview.map((paragraph, index) => (
                  <Reveal key={paragraph} delay={0.1 + index * 0.05}>
                    <p className="max-w-3xl text-base leading-8 text-muted-strong sm:text-lg">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.12}>
              <SpotlightPanel className="rounded-[28px]">
                <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6 sm:p-7">
                  <p className="text-sm uppercase tracking-[0.22em] text-muted">
                    {detail.featuresTitle}
                  </p>
                  <ul className="mt-5 space-y-4">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-muted-strong"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightPanel>
            </Reveal>
          </div>
        </SiteSection>

        <SiteSection
          id="project-problem-solution"
          labelledBy="project-problem-solution-title"
        >
          <SectionHeader
            eyebrow={detail.eyebrow}
            title={
              locale === "vi" ? "Bài toán và giải pháp" : "Problem and Solution"
            }
            titleId="project-problem-solution-title"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <SpotlightPanel className="rounded-[28px]">
                <div className="h-full rounded-[28px] border border-white/8 bg-white/[0.03] p-6 sm:p-7">
                  <p className="text-sm uppercase tracking-[0.22em] text-muted">
                    {detail.problemTitle}
                  </p>
                  <ul className="mt-5 space-y-4">
                    {detail.problem.map((item) => (
                      <li
                        key={item}
                        className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-muted-strong"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightPanel>
            </Reveal>

            <Reveal delay={0.08}>
              <SpotlightPanel className="rounded-[28px]">
                <div className="h-full rounded-[28px] border border-white/8 bg-[linear-gradient(160deg,rgba(141,224,255,0.08),rgba(255,255,255,0.03))] p-6 sm:p-7">
                  <p className="text-sm uppercase tracking-[0.22em] text-muted">
                    {detail.solutionTitle}
                  </p>
                  <ul className="mt-5 space-y-4">
                    {detail.solution.map((item) => (
                      <li
                        key={item}
                        className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-muted-strong"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightPanel>
            </Reveal>
          </div>
        </SiteSection>

        <SiteSection id="project-role-tech" labelledBy="project-role-tech-title">
          <SectionHeader
            eyebrow={detail.eyebrow}
            title={
              locale === "vi"
                ? "Vai trò và điểm nổi bật kỹ thuật"
                : "Role and Technical Highlights"
            }
            titleId="project-role-tech-title"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <Reveal>
              <SpotlightPanel className="rounded-[28px]">
                <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6 sm:p-7">
                  <p className="text-sm uppercase tracking-[0.22em] text-muted">
                    {detail.roleTitle}
                  </p>
                  <ul className="mt-5 space-y-4">
                    {detail.role.map((item) => (
                      <li
                        key={item}
                        className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-muted-strong"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightPanel>
            </Reveal>

            <div>
              <Reveal delay={0.05}>
                <p className="text-sm uppercase tracking-[0.22em] text-muted">
                  {detail.technicalTitle}
                </p>
              </Reveal>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {detail.technicalHighlights.map((highlight, index) => (
                  <Reveal key={highlight.title} delay={0.08 + index * 0.04}>
                    <SpotlightPanel className="h-full rounded-[24px]" lift={false}>
                      <div className="h-full rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                        <h3 className="text-lg font-semibold text-foreground">
                          {highlight.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-muted-strong">
                          {highlight.description}
                        </p>
                      </div>
                    </SpotlightPanel>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </SiteSection>

        <SiteSection id="project-value-stack" labelledBy="project-value-stack-title">
          <SectionHeader
            eyebrow={detail.eyebrow}
            title={
              locale === "vi" ? "Giá trị và công nghệ" : "Business Value and Stack"
            }
            titleId="project-value-stack-title"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <SpotlightPanel className="rounded-[28px]">
                <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6 sm:p-7">
                  <p className="text-sm uppercase tracking-[0.22em] text-muted">
                    {detail.businessValueTitle}
                  </p>
                  <ul className="mt-5 space-y-4">
                    {detail.businessValue.map((item) => (
                      <li
                        key={item}
                        className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-muted-strong"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightPanel>
            </Reveal>

            <Reveal delay={0.08}>
              <SpotlightPanel className="rounded-[28px]">
                <div className="rounded-[28px] border border-white/8 bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 sm:p-7">
                  <p className="text-sm uppercase tracking-[0.22em] text-muted">
                    {detail.stackTitle}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-3">
                    {project.stack.map((item) => (
                      <li key={item}>
                        <Tag>{item}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightPanel>
            </Reveal>
          </div>
        </SiteSection>

        <SiteSection id="project-gallery" labelledBy="project-gallery-title">
          <SectionHeader
            eyebrow={detail.eyebrow}
            title={detail.galleryTitle}
            titleId="project-gallery-title"
          />
          <Reveal className="mt-10">
            <SpotlightPanel className="rounded-[32px]">
              <div className="rounded-[32px] border border-dashed border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-10 text-center shadow-[0_30px_90px_-54px_rgba(0,0,0,0.92)] sm:p-14">
                <p className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  {detail.galleryTitle}
                </p>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-strong">
                  {detail.galleryNote}
                </p>
              </div>
            </SpotlightPanel>
          </Reveal>
        </SiteSection>

        <SiteSection id="project-contact-cta" labelledBy="project-contact-cta-title">
          <Reveal>
            <SpotlightPanel className="rounded-[32px]">
              <div className="rounded-[32px] border border-white/8 bg-[linear-gradient(145deg,rgba(15,19,30,0.96),rgba(10,12,19,0.9))] p-8 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.88)] sm:p-10 lg:p-12">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                  <div>
                    <SectionPill>{detail.eyebrow}</SectionPill>
                    <h2
                      id="project-contact-cta-title"
                      className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl"
                    >
                      {detail.contactCtaTitle}
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-muted-strong">
                      {detail.contactCtaDescription}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 lg:justify-end">
                    <ButtonLink href={contactHref} variant="primary">
                      {detail.contactCtaLabel}
                    </ButtonLink>
                    <ButtonLink href={backToProjectsHref} variant="secondary">
                      {detail.backLabel}
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </SpotlightPanel>
          </Reveal>
        </SiteSection>
      </main>
      <Footer data={data} locale={locale} />
    </div>
  );
}
