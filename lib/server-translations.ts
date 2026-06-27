import type { Locale } from "@/lib/localized-routes";
import type { Project } from "@/types/portfolio";

type TranslatedProjectData = {
  id: number;
  title?: string;
  description?: string;
  longDescription?: string;
  status?: string;
  category?: string;
  role?: string;
  duration?: string;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  date?: string;
};

async function loadTranslatedProjects(locale: Locale): Promise<TranslatedProjectData[]> {
  const data = await import(`@/messages/${locale}/data/projects.json`);
  return data.default.projects ?? [];
}

export async function getTranslatedProject(locale: Locale, project: Project): Promise<Project> {
  const translatedProjects = await loadTranslatedProjects(locale);
  const projectData = translatedProjects.find((p) => p.id === project.id);

  if (!projectData) {
    return project;
  }

  return {
    ...project,
    title: projectData.title ?? project.title,
    description: projectData.description ?? project.description,
    longDescription: projectData.longDescription ?? project.longDescription,
    status: (projectData.status ?? project.status) as Project["status"],
    category: projectData.category ?? project.category,
    role: projectData.role ?? project.role,
    duration: projectData.duration ?? project.duration,
    features: projectData.features ?? project.features,
    challenges: projectData.challenges ?? project.challenges,
    solutions: projectData.solutions ?? project.solutions,
    date: projectData.date ?? project.date,
  };
}
