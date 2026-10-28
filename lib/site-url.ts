const FALLBACK_SITE_URL = "http://localhost:3000";

function normalizeBaseUrl(value: string) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, "");
}

/**
 * Resolution order:
 * 1. NEXT_PUBLIC_SITE_URL - set this for any host, or to pin a custom domain on Vercel.
 * 2. VERCEL_PROJECT_PRODUCTION_URL - Vercel system variable, the project's production
 *    host without a protocol. Available at build and request time.
 * 3. localhost, for local development.
 */
export function getSiteUrl() {
  const explicitSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (explicitSiteUrl) {
    return normalizeBaseUrl(explicitSiteUrl);
  }

  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

  if (vercelProductionUrl) {
    return normalizeBaseUrl(vercelProductionUrl);
  }

  return FALLBACK_SITE_URL;
}
