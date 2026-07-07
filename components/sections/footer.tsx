import { getPortfolioData, type Locale, type PortfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/container";
import { SignatureGlyph } from "@/components/ui/signature-glyph";
import { resolveLocalizedHref } from "@/lib/routes";

export function Footer({
  data,
  locale = "en",
}: {
  data?: PortfolioData;
  locale?: Locale;
}) {
  const portfolioData = data ?? getPortfolioData(locale);

  return (
    <footer className="border-t border-white/[0.06] py-8">
      <Container>
        <div className="flex flex-col gap-6 text-sm text-muted lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <SignatureGlyph size="xs" subdued className="text-accent" />
            <p>
              {portfolioData.name} • {portfolioData.footer.roleLine}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-4">
            {portfolioData.navigation.map((item) => (
              <a
                key={item.href}
                href={resolveLocalizedHref(locale, item.href)}
                className="rounded-md transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
