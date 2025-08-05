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
    src: 'https://media.licdn.com/dms/image/v2/D4E0BAQEnrMai8iubKQ/company-logo_100_100/company-logo_100_100/0/1702751652849/digitallabs_tm_logo?e=1756339200&v=beta&t=aeMk2PmSBhlBUrvH_vRoFRv1QH5slDxRreVXcdBCc-8',
    alt: 'DigitalLabs TM',
    linkedinUrl: 'https://www.linkedin.com/company/digitallabs-tm',
  },
  {
    name: 'Osmoz Communication',
    src: 'https://media.licdn.com/dms/image/v2/D4E0BAQEwHImsKekvXg/company-logo_100_100/company-logo_100_100/0/1688559799403/osmoz_com_logo?e=1756339200&v=beta&t=lsxLljsjhbMXOfA9ju5owGZg_XaSbxOUsPdOI_fcX3Q',
    alt: 'Osmoz Communication',
    linkedinUrl: 'https://www.linkedin.com/company/osmoz-com',
  },
  {
    name: 'ComeUp',
    src: 'https://media.licdn.com/dms/image/v2/D4E0BAQHyLoDZ2hcMew/company-logo_100_100/company-logo_100_100/0/1666615300523/5euros_com_logo?e=1756339200&v=beta&t=Z3hs9K1GME9bOIWB8bDNKQSgqW5gzp-1-P1hHfqEgdo',
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
    </div>
  );
}