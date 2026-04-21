import { getProjectBySlug } from "@/services/ProjectService";
import { getRelatedExperience, getRelatedFormations } from "@/services/RelationService";
import type { Project, Experience, Formation } from "@/types/portfolio";
import { notFound } from "next/navigation";
import ClientProjectPage from "./project-client";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const relatedExperience = (await getRelatedExperience(project as Project)) as Experience | undefined;
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
  return [];
}
