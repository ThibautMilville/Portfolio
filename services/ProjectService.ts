import { slugify } from "@/lib/utils";
import { projectsData } from "@/data/portfolio";
import { Project } from "@/types/portfolio";

export const getProjectSlug = (project: Project): string => project.slug ?? slugify(project.title);

export const getAllProjects = async (): Promise<Project[]> => projectsData;

export const getProjectById = async (id: number): Promise<Project | undefined> => {
  const projects = await getAllProjects();
  return projects.find((project) => project.id === id);
};

export const getProjectBySlug = async (slug: string): Promise<Project | undefined> => {
  const projects = await getAllProjects();
  return projects.find((project) => getProjectSlug(project) === slug);
};
