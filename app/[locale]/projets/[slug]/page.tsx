import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/portfolio";
import { getLocalizedRoute, type Locale } from "@/lib/localized-routes";
import { buildAlternates, buildLocalizedPath, createPageMetadata, getAbsoluteUrl } from "@/lib/seo";
import { getTranslatedProject } from "@/lib/server-translations";
import { getProjectBySlug, getProjectSlug } from "@/services/ProjectService";
import { getRelatedExperience, getRelatedFormations } from "@/services/RelationService";
import type { Experience, Formation, Project } from "@/types/portfolio";
import ClientProjectPage from "./project-client";

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang = (locale === "fr" ? "fr" : "en") as Locale;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const translated = await getTranslatedProject(lang, project);
  const path = buildLocalizedPath(lang, "projets", slug);

  return createPageMetadata({
    locale: lang,
    title: `${translated.title} | Thibaut MILVILLE`,
    description: translated.description,
    path,
    alternates: buildAlternates(
      {
        en: `/en${getLocalizedRoute("projets", "en")}/${slug}`,
        fr: `/fr${getLocalizedRoute("projets", "fr")}/${slug}`,
      },
      lang,
    ),
    image: getAbsoluteUrl(translated.image),
    imageAlt: translated.title,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const relatedExperience = (await getRelatedExperience(project as Project)) as
    | Experience
    | undefined;
  const relatedFormations = (await getRelatedFormations(project as Project)) as Formation[];
  return (
    <ClientProjectPage
      project={project as Project}
      relatedExperience={relatedExperience}
      relatedFormations={relatedFormations}
    />
  );
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: getProjectSlug(project),
  }));
}
