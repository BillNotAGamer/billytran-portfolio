import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Billy Tran | Software Engineer",
    template: "%s | Billy Tran",
  },
  description:
    "Premium portfolio website for Billy Tran, a software engineer building fullstack web platforms, mobile applications, and scalable digital products.",
  keywords: [
    "Billy Tran",
    "Software Engineer",
    "Fullstack Web Developer",
    "Mobile Developer",
    "Next.js Portfolio",
  ],
  applicationName: "Billy Tran Portfolio",
  category: "technology",
  openGraph: {
    title: "Billy Tran | Software Engineer",
    description:
      "Fullstack web, mobile, and product-focused engineering with premium execution.",
    siteName: "Billy Tran Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Billy Tran | Software Engineer",
    description:
      "Fullstack web, mobile, and product-focused engineering with premium execution.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#07090f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-background font-sans text-foreground">
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[100] rounded-full border border-white/10 bg-background px-4 py-2 text-sm text-foreground shadow-lg focus:not-sr-only focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
