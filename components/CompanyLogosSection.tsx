'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import LightParticles from '@/components/ui/light-particles';
import { Handshake } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const LogoCarousel = dynamic(() => import('@/components/ui/general/LogoCarousel'), { ssr: false });

interface CompanyLogo {
  name: string;
  src: string;
  alt: string;
}

interface CompanyLogosSectionProps {
  logos: CompanyLogo[];
}

export default function CompanyLogosSection({ logos }: CompanyLogosSectionProps) {
  const t = useTranslations('Home.partners');
  return (
    <section className="py-16 bg-gradient-to-b from-background via-background/95 to-background relative overflow-x-hidden">
      <LightParticles />
      <div className="w-full relative z-10">
        <div className="mb-8">
          <SectionHeading title={t('title')} icon={Handshake} />
        </div>
        <div className="relative w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-3xl"></div>
          <div className="relative w-full py-6">
            <LogoCarousel logos={logos} />
          </div>
        </div>
      </div>
    </section>
  );
} 