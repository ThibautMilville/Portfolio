export interface Project {
  id: number;
  title: string;
  slug?: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  date: string;
  status: "Terminé" | "En cours" | "En pause";
  github: string;
  demo: string | null;
  category: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  screenshots?: string[];
  duration: string;
  teamSize?: number;
  role: string;
  relatedExperienceId?: number;
  relatedFormationIds?: number[];
  periods?: Array<{
    date: string;
    title?: string;
    description?: string;
  }>;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
  technologies: string[];
  achievements: string[];
  projectIds?: number[];
  relatedFormationIds?: number[];
  logoUrl?: string;
  employmentType?: "freelance" | "fullTime" | "entrepreneur" | "apprenticeship";
}

export interface Formation {
  id: number;
  title: string;
  institution: string;
  location: string;
  date: string;
  description: string;
  skills: string[];
  mention: string;
  type: "Diplôme" | "Certification" | "Formation";
  projectIds?: number[];
  relatedExperienceIds?: number[];
  credentialUrl?: string;
  logoUrl?: string;
}
