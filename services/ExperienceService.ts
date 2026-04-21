import { experiencesData } from "@/data/portfolio";
import { Experience } from "@/types/portfolio";

export const getAllExperiences = async (): Promise<Experience[]> => experiencesData;

export const getExperienceById = async (id: number): Promise<Experience | undefined> => {
  const experiences = await getAllExperiences();
  return experiences.find((experience) => experience.id === id);
};

export const getExperiencesByFormation = async (formationId: number): Promise<Experience[]> => {
  const experiences = await getAllExperiences();
  return experiences.filter((experience) => experience.relatedFormationIds?.includes(formationId));
};
