import type { Locale } from "@/data/portfolio";

export function getLocalePath(locale: Locale) {
  return `/${locale}`;
}

export function getLocalizedSectionPath(locale: Locale, hash: string) {
  const normalizedHash = hash.startsWith("#") ? hash : `#${hash}`;
  return `${getLocalePath(locale)}${normalizedHash}`;
}

export function resolveLocalizedHref(locale: Locale, href: string) {
  return href.startsWith("#") ? getLocalizedSectionPath(locale, href) : href;
}

export function getProjectPath(locale: Locale, slug: string) {
  return `${getLocalePath(locale)}/projects/${slug}`;
}
