import { portfolioData } from "@/data/portfolio";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SignatureGlyph } from "@/components/ui/signature-glyph";

const navLinkClassName =
  "group relative rounded-full text-sm text-muted transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/68 backdrop-blur-xl">
      <Container>
        <div className="flex items-center justify-between gap-6 py-4">
          <a
            href="#top"
            aria-label="Billy Tran home"
            className="group flex items-center gap-4 rounded-full focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <SignatureGlyph
              size="sm"
              className="text-accent transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-3"
            />
            <div>
              <p className="font-display text-lg font-semibold text-foreground">
                Billy Tran
              </p>
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">
                Fullstack Systems + Mobile Delivery
              </p>
            </div>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {portfolioData.navigation.map((item) => (
              <a key={item.href} href={item.href} className={navLinkClassName}>
                <span>{item.label}</span>
                <span className="absolute inset-x-0 -bottom-2 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,rgba(141,224,255,0.8),transparent)] transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden xl:flex xl:items-center xl:gap-3 xl:text-sm xl:text-muted">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_rgba(141,224,255,0.8)]" />
              {portfolioData.hero.availability}
            </div>
            <ButtonLink
              href="#contact"
              variant="secondary"
              className="hidden sm:inline-flex"
            >
              Let&apos;s Talk
            </ButtonLink>
          </div>
        </div>

        <nav
          aria-label="Section shortcuts"
          className="no-scrollbar flex gap-2 overflow-x-auto pb-4 lg:hidden"
        >
          {portfolioData.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-muted transition-colors hover:border-white/16 hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
}
