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

const projets = getAllProjects().slice(0, 3);
const formations = getAllFormations();

const companyLogos = [
  {
    name: 'SNCF',
    src: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Logo_SNCF_2011.svg',
    alt: 'SNCF',
  },
  {
    name: 'Slack',
    src: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png',
    alt: 'Slack',
  },
  {
    name: 'Spotify',
    src: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
    alt: 'Spotify',
  },
  {
    name: 'Airbnb',
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg',
    alt: 'Airbnb',
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
    </div>
  );
}