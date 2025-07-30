'use client';

import dynamic from 'next/dynamic';
import LightParticles from '@/components/ui/light-particles';

const LogoCarousel = dynamic(() => import('@/components/ui/logo-carousel'), { ssr: false });

interface CompanyLogo {
  name: string;
  src: string;
  alt: string;
}

interface CompanyLogosSectionProps {
  logos: CompanyLogo[];
}

export default function CompanyLogosSection({ logos }: CompanyLogosSectionProps) {
  return (
    <section className="py-10 px-6 bg-background relative">
      <LightParticles />
      <div className="max-w-5xl mx-auto relative z-10">
        <h3 className="text-center text-lg font-semibold mb-6 text-muted-foreground">Ils m'ont fait confiance</h3>
        <LogoCarousel logos={logos} />
      </div>
    </section>
  );
} 