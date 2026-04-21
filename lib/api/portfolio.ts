import { Experience, Formation, Project, Skill } from "@/types/portfolio";
import { experiencesData, formationsData, projectsData, skillsData } from "@/data/portfolio";

export const fetchExperiences = async (): Promise<Experience[]> => experiencesData;

export const fetchFormations = async (): Promise<Formation[]> => formationsData;

export const fetchProjects = async (): Promise<Project[]> => projectsData;
export const fetchSkills = async (): Promise<Skill[]> => skillsData;
