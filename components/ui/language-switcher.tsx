"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/data/portfolio";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const targetLocale: Locale = locale === "en" ? "vi" : "en";

  // Re-build path safely
  let targetPath = `/${targetLocale}`;
  if (pathname) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && (segments[0] === "en" || segments[0] === "vi")) {
      segments[0] = targetLocale;
      targetPath = "/" + segments.join("/");
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const hash = window.location.hash || "";
    window.location.href = `${targetPath}${hash}`;
  };

  const label = targetLocale.toUpperCase();
  const ariaLabel =
    locale === "en"
      ? "Switch language to Vietnamese"
      : "Chuyển ngôn ngữ sang tiếng Anh";

  return (
    <a
      href={targetPath}
      onClick={handleClick}
      aria-label={ariaLabel}
      className="group relative flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-xs font-semibold tracking-wider text-muted transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.08] hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className="relative z-10 flex items-center gap-1.5">
        <span className="text-[10px] opacity-65">🌐</span>
        <span>{label}</span>
      </span>
      <span className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(135deg,rgba(141,224,255,0.06),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </a>
  );
}
