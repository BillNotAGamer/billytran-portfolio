"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isLocale, type Locale } from "@/lib/locales";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const targetLocale: Locale = locale === "en" ? "vi" : "en";
  const [hash, setHash] = useState("");

  // Carry the reader's place across the locale change. Read on mount and kept
  // current as the anchor handler pushes new hashes.
  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);

    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, [pathname]);

  const segments = (pathname ?? "").split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = targetLocale;
  } else {
    segments.splice(0, segments.length, targetLocale);
  }

  const targetHref = `/${segments.join("/")}${hash}`;

  const ariaLabel =
    locale === "en"
      ? "Switch language to Vietnamese"
      : "Chuyển ngôn ngữ sang tiếng Anh";

  return (
    <Link
      href={targetHref}
      aria-label={ariaLabel}
      className="group relative flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-xs font-semibold tracking-wider text-muted transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.08] hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className="relative z-10 flex items-center gap-1.5">
        <span aria-hidden="true" className="text-[10px] opacity-65">
          🌐
        </span>
        <span>{targetLocale.toUpperCase()}</span>
      </span>
      <span className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(135deg,rgba(141,224,255,0.06),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
}
