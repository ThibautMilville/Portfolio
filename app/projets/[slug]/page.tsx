import { getProjectBySlug, getRelatedExperience, getRelatedFormations, getAllProjects, getProjectSlug, type Project, type Experience, type Formation } from "@/lib/data";
import { notFound } from "next/navigation";
import ClientProjectPage from "./project-client";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  const relatedExperience = getRelatedExperience(project as Project) as Experience | undefined;
  const relatedFormations = getRelatedFormations(project as Project) as Formation[];
  return (
    <ClientProjectPage
      project={project as Project}
      relatedExperience={relatedExperience}
      relatedFormations={relatedFormations}
    />
  );
}

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: getProjectSlug(p) }));
}


