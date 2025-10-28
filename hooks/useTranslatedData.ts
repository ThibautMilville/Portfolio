import { useTranslations } from "next-intl";
import {
  getAllProjects,
  getAllExperiences,
  getAllFormations,
} from "@/lib/data";
import { useLocale } from "next-intl";
import React from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  status: string;
  category: string;
  role: string;
  duration: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  [key: string]: any;
}

interface Experience {
  id: number;
  title: string;
  description: string;
  achievements: string[];
  [key: string]: any;
}

interface Formation {
  id: number;
  title: string;
  description: string;
  skills: string[];
  [key: string]: any;
}

export function useTranslatedData() {
  const locale = useLocale();

  // Charger les données traduites directement depuis les fichiers JSON
  const [translatedProjects, setTranslatedProjects] = React.useState<any[]>([]);
  const [translatedExperiences, setTranslatedExperiences] = React.useState<
    any[]
  >([]);
  const [translatedFormations, setTranslatedFormations] = React.useState<any[]>(
    []
  );

  React.useEffect(() => {
    const loadTranslatedData = async () => {
      try {
        const [projectsData, experiencesData, formationsData] =
          await Promise.all([
            import(`@/messages/${locale}/data/projects.json`),
            import(`@/messages/${locale}/data/experiences.json`),
            import(`@/messages/${locale}/data/formations.json`),
          ]);

        setTranslatedProjects(projectsData.default.projects || []);
        setTranslatedExperiences(experiencesData.default.experiences || []);
        setTranslatedFormations(formationsData.default.formations || []);
      } catch (error) {
        console.warn("Could not load translated data:", error);
      }
    };

    loadTranslatedData();
  }, [locale]);

  const getTranslatedProject = (project: Project): Project => {
    try {
      const projectData = translatedProjects.find(
        (p: any) => p.id === project.id
      );
      if (!projectData) {
        return project;
      }

      return {
        ...project,
        title: projectData?.title || project.title,
        description: projectData?.description || project.description,
        longDescription:
          projectData?.longDescription || project.longDescription,
        status: projectData?.status || project.status,
        category: projectData?.category || project.category,
        role: projectData?.role || project.role,
        duration: projectData?.duration || project.duration,
        features: (projectData?.features || project.features) as string[],
        challenges: (projectData?.challenges || project.challenges) as string[],
        solutions: (projectData?.solutions || project.solutions) as string[],
        image: project.image,
        technologies: project.technologies,
        date: projectData?.date || project.date,
        github: project.github,
        demo: project.demo,
      };
    } catch (error) {
      return project;
    }
  };

  const getTranslatedExperience = (experience: Experience): Experience => {
    try {
      const experienceData = translatedExperiences.find(
        (e: any) => e.id === experience.id
      );
      if (!experienceData) {
        return experience;
      }

      return {
        ...experience,
        title: experienceData?.title || experience.title,
        description: experienceData?.description || experience.description,
        achievements: (experienceData?.achievements ||
          experience.achievements) as string[],
      };
    } catch (error) {
      return experience;
    }
  };

  const getTranslatedFormation = (formation: Formation): Formation => {
    try {
      const formationData = translatedFormations.find(
        (f: any) => f.id === formation.id
      );
      if (!formationData) {
        return formation;
      }

      return {
        ...formation,
        title: formationData?.title || formation.title,
        institution: formationData?.institution || formation.institution,
        location: formationData?.location || formation.location,
        date: formationData?.date || formation.date,
        description: formationData?.description || formation.description,
        skills: (formationData?.skills || formation.skills || []) as string[],
        mention: formationData?.mention || formation.mention,
        type: formationData?.type || formation.type,
        projectIds: formation.projectIds,
        relatedExperienceIds: formation.relatedExperienceIds,
        credentialUrl: formation.credentialUrl,
        logoUrl: formation.logoUrl,
      };
    } catch (error) {
      return formation;
    }
  };

  return {
    getTranslatedProject,
    getTranslatedExperience,
    getTranslatedFormation,
  };
}
