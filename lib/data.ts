import { slugify } from "./utils";

// Re-export everything from the data folder
export * from '../data';

// Keep the utility functions here for backward compatibility
export function getProjectById(id: number) {
  const { projects } = require('../data');
  return projects.find((project: any) => project.id === id);
}

export function getProjectBySlug(slug: string) {
  const { projects } = require('../data');
  return projects.find((project: any) => (project.slug ?? slugify(project.title)) === slug);
}

export function getProjectSlug(project: any): string {
  return project.slug ?? slugify(project.title);
}

export function getAllProjects() {
  const { projects } = require('../data');
  return projects;
}

export function getExperienceById(id: number) {
  const { experiences } = require('../data');
  return experiences.find((exp: any) => exp.id === id);
}

export function getAllExperiences() {
  const { experiences } = require('../data');
  return experiences;
}

export function getFormationById(id: number) {
  const { formations } = require('../data');
  return formations.find((formation: any) => formation.id === id);
}

export function getAllFormations() {
  const { formations } = require('../data');
  return formations;
}

export function getRelatedExperience(project: any) {
  if (project.relatedExperienceId) {
    return getExperienceById(project.relatedExperienceId);
  }
  return undefined;
}

export function getRelatedFormations(project: any) {
  if (project.relatedFormationIds) {
    return project.relatedFormationIds.map((id: number) => getFormationById(id)).filter(Boolean);
  }
  return [];
}

export function getProjectsByExperience(experienceId: number) {
  const { projects } = require('../data');
  return projects.filter((project: any) => project.relatedExperienceId === experienceId);
}

export function getProjectsByFormation(formationId: number) {
  const { projects } = require('../data');
  return projects.filter((project: any) => project.relatedFormationIds?.includes(formationId));
}

export function getFormationsByExperience(experience: any) {
  if (experience.relatedFormationIds) {
    return experience.relatedFormationIds.map((id: number) => getFormationById(id)).filter(Boolean);
  }
  return [];
}

export function getRelatedExperiences(formation: any) {
  if (formation.relatedExperienceIds) {
    return formation.relatedExperienceIds.map((id: number) => getExperienceById(id)).filter(Boolean);
  }
  return [];
}

export function getExperiencesByFormation(formationId: number) {
  const { experiences } = require('../data');
  return experiences.filter((exp: any) => exp.relatedFormationIds?.includes(formationId));
}

// Nouvelle fonction pour regrouper les expériences par entreprise
export function getGroupedExperiences(): Array<{
  company: string;
  experiences: any[];
  totalDuration: string;
  logoUrl?: string;
}> {
  const { experiences } = require('../data');
  const grouped = new Map<string, any[]>();
  
  // Grouper par entreprise
  experiences.forEach((exp: any) => {
    if (!grouped.has(exp.company)) {
      grouped.set(exp.company, []);
    }
    grouped.get(exp.company)!.push(exp);
  });
  
  // Trier les expériences de chaque entreprise par date (plus récent en premier)
  const result: Array<{
    company: string;
    experiences: any[];
    totalDuration: string;
    logoUrl?: string;
  }> = [];
  
  grouped.forEach((companyExperiences, company) => {
    const sortedExperiences = companyExperiences.sort((a, b) => {
      // Extraire les années des dates pour le tri
      const getYear = (dateStr: string) => {
        if (dateStr.includes('Présent')) return new Date().getFullYear();
        const yearMatch = dateStr.match(/(\d{4})/);
        return yearMatch ? parseInt(yearMatch[1]) : 0;
      };
      return getYear(b.date) - getYear(a.date);
    });
    
    // Calculer la durée totale
    const firstExp = sortedExperiences[sortedExperiences.length - 1]; // Plus ancienne
    const lastExp = sortedExperiences[0]; // Plus récente
    
    let totalDuration = '';
    if (sortedExperiences.length === 1) {
      totalDuration = firstExp.date;
    } else {
      const startDate = firstExp.date.split(' - ')[0];
      const endDate = lastExp.date.includes('Présent') ? 'Présent' : lastExp.date.split(' - ')[1];
      totalDuration = `${startDate} - ${endDate}`;
    }
    
    result.push({
      company,
      experiences: sortedExperiences,
      totalDuration,
      logoUrl: sortedExperiences[0].logoUrl
    });
  });
  
  // Trier par date de début de l'expérience la plus récente (plus récent en premier)
  return result.sort((a, b) => {
    const getDateTimestamp = (dateStr: string) => {
      const monthNames: { [key: string]: number } = {
        'Jan': 0, 'Fév': 1, 'Feb': 1, 'Mar': 2, 'Avr': 3, 'Apr': 3,
        'Mai': 4, 'May': 4, 'Juin': 5, 'Jun': 5, 'Jul': 6, 'Août': 7, 'Aug': 7,
        'Sep': 8, 'Oct': 9, 'Nov': 10, 'Déc': 11, 'Dec': 11
      };
      const parts = dateStr.split(' - ');
      const startPart = parts[0].trim();
      
      if (startPart.includes('Présent') || startPart.includes('Present')) {
        return Date.now();
      }
      
      const monthMatch = startPart.match(/^([A-Za-zÀ-ÿ]+)/);
      const yearMatch = startPart.match(/(\d{4})/);
      
      if (monthMatch && yearMatch) {
        const month = monthNames[monthMatch[1]] ?? 0;
        const year = parseInt(yearMatch[1]);
        return new Date(year, month).getTime();
      }
      const yearOnly = startPart.match(/(\d{4})/);
      if (yearOnly) {
        return new Date(parseInt(yearOnly[1]), 0).getTime();
      }
      return 0;
    };
    
    const mostRecentA = a.experiences[0];
    const mostRecentB = b.experiences[0];
    
    return getDateTimestamp(mostRecentB.date) - getDateTimestamp(mostRecentA.date);
  });
}
