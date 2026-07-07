import type { MetadataRoute } from "next";
import { getProjectRouteParams } from "@/data/portfolio";
import { getProjectPath } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const lastModified = new Date();

  const projectRoutes = getProjectRouteParams().map(({ locale, slug }) => ({
    url: `${baseUrl}${getProjectPath(locale, slug)}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/vi`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectRoutes,
  ];
}
