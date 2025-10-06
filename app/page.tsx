'use client';

import { getAllProjects, getAllFormations } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import FormationsSection from '@/components/FormationsSection';
import ExperiencesSection from '@/components/ExperiencesSection';
import CompanyLogosSection from '@/components/CompanyLogosSection';
import ObjectivesSection from '@/components/ObjectivesSection';
import SkillsSection from '@/components/SkillsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';

// Récupérer tous les projets
const allProjects = getAllProjects();

// Sélectionner tous les projets pour la section
const projets = allProjects;

const formations = getAllFormations();

const companyLogos = [
  {
    name: 'Ultra',
    src: '/images/company/logo_ultra.png',
    alt: 'Ultra',
    linkedinUrl: 'https://www.linkedin.com/company/ultracorp',
  },
  {
    name: 'Ultra Times',
    src: '/images/company/logo_UT.png',
    alt: 'Ultra Times',
    linkedinUrl: 'https://www.linkedin.com/company/ultra-times',
  },
  {
    name: 'SNCF Voyageurs',
    src: '/images/company/Logo-SNCF-Voyageurs.webp',
    alt: 'SNCF Voyageurs',
    linkedinUrl: 'https://www.linkedin.com/company/sncf-voyageurs/',
  },
  {
    name: 'DigitalLabs TM',
    src: '/images/company/digitallabs_tm_logo.jpeg',
    alt: 'DigitalLabs TM',
    linkedinUrl: 'https://www.linkedin.com/company/digitallabs-tm',
  },
  {
    name: 'Osmoz Communication',
    src: '/images/company/osmoz_com_logo.jpeg',
    alt: 'Osmoz Communication',
    linkedinUrl: 'https://www.linkedin.com/company/osmoz-com',
  },
  {
    name: 'ComeUp',
    src: '/images/company/comeup_logo.jpeg',
    alt: 'ComeUp',
    linkedinUrl: 'https://www.linkedin.com/company/bycomeup/',
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <HeroSection />
      <ProjectsSection projects={projets} />
      <ExperiencesSection />
      <FormationsSection formations={formations} />
      <SkillsSection />
      <ObjectivesSection />
      <CompanyLogosSection logos={companyLogos} />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}