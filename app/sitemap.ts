import type { MetadataRoute } from "next";
import { projectsData } from "@/data/portfolio/projects";
import { getLocalizedRoute, type Locale } from "@/lib/localized-routes";
import { SITE_URL } from "@/lib/seo";
import { getProjectSlug } from "@/services/ProjectService";

const LOCALES: Locale[] = ["en", "fr"];
const STATIC_ROUTES = ["projets", "experiences", "formations", "contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    });

    for (const routeKey of STATIC_ROUTES) {
      const route = getLocalizedRoute(routeKey, locale);
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: routeKey === "projets" ? "weekly" : "monthly",
        priority:
          routeKey === "projets"
            ? 0.8
            : routeKey === "experiences"
              ? 0.7
              : routeKey === "formations"
                ? 0.6
                : 0.5,
      });
    }

    for (const project of projectsData) {
      const slug = getProjectSlug(project);
      const route = getLocalizedRoute("projets", locale);
      entries.push({
        url: `${SITE_URL}/${locale}${route}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
