import type { MetadataRoute } from "next";
import { SITE_URL, SEO_PAGES } from "./seo.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = Object.values(SEO_PAGES).map(
    (page) => ({
      url: page.path === "/" ? SITE_URL : `${SITE_URL}${page.path}`,
      lastModified: new Date(),
      changeFrequency: (page.path === "/" ? "daily" : "weekly") as
        | "daily"
        | "weekly",
      priority: page.path === "/" ? 1.0 : 0.8,
    })
  );

  return staticRoutes;
}

