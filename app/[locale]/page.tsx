import type { Metadata } from "next";
import CompanyLogosSection from "@/components/CompanyLogosSection";
import ContactSection from "@/components/ContactSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import FormationsSection from "@/components/FormationsSection";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { fetchProjects } from "@/lib/api/portfolio";
import { createHomeMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createHomeMetadata(locale);
}

const companyLogos = [
  {
    name: "Cloak",
    src: "/images/company/cloak-logo.webp",
    alt: "Cloak",
    linkedinUrl: "https://www.linkedin.com/company/cloakprotocol/",
  },
  {
    name: "Ultra",
    src: "/images/company/logo_ultra.webp",
    alt: "Ultra",
    linkedinUrl: "https://www.linkedin.com/company/ultracorp",
  },
  {
    name: "Ultra Times",
    src: "/images/company/logo_UT.webp",
    alt: "Ultra Times",
    linkedinUrl: "https://www.linkedin.com/company/ultra-times",
  },
  {
    name: "Black Ice Studios",
    src: "/images/company/black_ice_studios_logo.webp",
    alt: "Black Ice Studios",
    linkedinUrl: "https://www.linkedin.com/company/black-ice-studios",
  },
  {
    name: "SNCF Voyageurs",
    src: "/images/company/Logo-SNCF-Voyageurs.webp",
    alt: "SNCF Voyageurs",
    linkedinUrl: "https://www.linkedin.com/company/sncf-voyageurs/",
  },
  {
    name: "Osmoz Communication",
    src: "/images/company/osmoz_com_logo.webp",
    alt: "Osmoz Communication",
    linkedinUrl: "https://www.linkedin.com/company/osmoz-com",
  },
  {
    name: "ComeUp",
    src: "/images/company/comeup_logo.webp",
    alt: "ComeUp",
    linkedinUrl: "https://www.linkedin.com/company/bycomeup/",
  },
];

export default async function Home() {
  const projets = await fetchProjects();
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section - Présentation principale */}
      <HeroSection />

      {/* Section Projets - Mise en avant des réalisations */}
      <FeaturedProjectsSection projects={projets} />

      {/* Section Expériences - Parcours professionnel */}
      <ExperiencesSection />

      {/* Section Formations - Compétences académiques */}
      <FormationsSection />

      {/* Section Compétences - Expertise technique */}
      <SkillsSection />

      {/* Section Partenaires - Entreprises de confiance */}
      <CompanyLogosSection logos={companyLogos} />

      {/* Section Témoignages - Retours clients */}
      <TestimonialsSection />

      {/* Section Contact - Prise de contact */}
      <ContactSection />
    </div>
  );
}
