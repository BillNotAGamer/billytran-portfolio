import type { Metadata, Viewport } from "next";
import { getPortfolioData, type Locale } from "@/data/portfolio";
import "../globals.css";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const data = getPortfolioData(locale as Locale);

  return {
    title: {
      default: data.metadata.title,
      template: `%s | ${data.header.brandName}`,
    },
    description: data.metadata.description,
    keywords: data.metadata.keywords,
    applicationName: `${data.header.brandName} Portfolio`,
    category: "technology",
    openGraph: {
      title: data.metadata.title,
      description: data.metadata.description,
      siteName: `${data.header.brandName} Portfolio`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.metadata.title,
      description: data.metadata.description,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      languages: {
        en: "/en",
        vi: "/vi",
      },
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#07090f",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale} className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-background font-sans text-foreground">
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[100] rounded-full border border-white/10 bg-background px-4 py-2 text-sm text-foreground shadow-lg focus:not-sr-only focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {locale === "vi" ? "Chuyển đến nội dung chính" : "Skip to content"}
        </a>
        {children}
      </body>
    </html>
  );
}
