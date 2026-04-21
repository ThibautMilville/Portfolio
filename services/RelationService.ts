import { Experience, Formation, Project } from "@/types/portfolio";
import { getAllExperiences, getExperienceById } from "@/services/ExperienceService";
import { getAllFormations } from "@/services/FormationService";

export const getRelatedExperience = async (project: Project): Promise<Experience | undefined> => {
  if (!project.relatedExperienceId) return undefined;
  return getExperienceById(project.relatedExperienceId);
};

export const getRelatedFormations = async (project: Project): Promise<Formation[]> => {
  if (!project.relatedFormationIds?.length) return [];
  const formations = await getAllFormations();
  return formations.filter((formation) => project.relatedFormationIds?.includes(formation.id));
};

export const getFormationsByExperience = async (experience: Experience): Promise<Formation[]> => {
  if (!experience.relatedFormationIds?.length) return [];
  const formations = await getAllFormations();
  return formations.filter((formation) => experience.relatedFormationIds?.includes(formation.id));
};

export const getRelatedExperiences = async (formation: Formation): Promise<Experience[]> => {
  if (!formation.relatedExperienceIds?.length) return [];
  const experiences = await getAllExperiences();
  return experiences.filter((experience) => formation.relatedExperienceIds?.includes(experience.id));
};
