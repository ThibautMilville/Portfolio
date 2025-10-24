import { useLocale } from 'next-intl';
import React from 'react';

export function useTranslatedData() {
  const locale = useLocale();
  const [translatedProjects, setTranslatedProjects] = React.useState<any[]>([]);
  const [translatedExperiences, setTranslatedExperiences] = React.useState<any[]>([]);
  const [translatedFormations, setTranslatedFormations] = React.useState<any[]>([]);

  React.useEffect(() => {
    const loadTranslatedData = async () => {
      try {
        const [projectsData, experiencesData, formationsData] = await Promise.all([
          import(`@/messages/${locale}/data/projects.json`),
          import(`@/messages/${locale}/data/experiences.json`),
          import(`@/messages/${locale}/data/formations.json`),
        ]);
        setTranslatedProjects(projectsData.default.projects || []);
        setTranslatedExperiences(experiencesData.default.experiences || []);
        setTranslatedFormations(formationsData.default.formations || []);
      } catch (error) {
        console.warn('Could not load translated data:', error);
      }
    };
    loadTranslatedData();
  }, [locale]);

  const getTranslatedProject = (project: any) => {
    try {
      const projectData = translatedProjects.find((p: any) => p.id === project.id);
      if (!projectData) return project;
      return {
        ...project,
        title: projectData.title || project.title,
        description: projectData.description || project.description,
        longDescription: projectData.longDescription || project.longDescription,
        status: projectData.status || project.status,
        category: projectData.category || project.category,
        role: projectData.role || project.role,
        duration: projectData.duration || project.duration,
        features: projectData.features || project.features,
        challenges: projectData.challenges || project.challenges,
        solutions: projectData.solutions || project.solutions,
      };
    } catch (error) {
      return project;
    }
  };

  const getTranslatedExperience = (experience: any) => {
    try {
      const experienceData = translatedExperiences.find((e: any) => e.id === experience.id);
      if (!experienceData) return experience;
      return {
        ...experience,
        title: experienceData.title || experience.title,
        description: experienceData.description || experience.description,
        achievements: experienceData.achievements || experience.achievements,
      };
    } catch (error) {
      return experience;
    }
  };

  const getTranslatedFormation = (formation: any) => {
    try {
      const formationData = translatedFormations.find((f: any) => f.id === formation.id);
      if (!formationData) return formation;
      return {
        ...formation,
        title: formationData.title || formation.title,
        institution: formationData.institution || formation.institution,
        location: formationData.location || formation.location,
        date: formationData.date || formation.date,
        description: formationData.description || formation.description,
        skills: formationData.skills || formation.skills,
        mention: formationData.mention || formation.mention,
        type: formationData.type || formation.type,
      };
    } catch (error) {
      return formation;
    }
  };

  return {
    getTranslatedProject,
    getTranslatedExperience,
    getTranslatedFormation
  };
}
