'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('Home.partners');
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-background via-background/95 to-background relative">
      <LightParticles />
      <div className="max-w-5xl mx-auto relative z-10">
        <h3 className="text-center text-xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          {t('title')}
        </h3>
        <div className="relative">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-card/50 via-card/30 to-card/50 rounded-3xl p-8 backdrop-blur-sm">
            <LogoCarousel logos={logos} />
          </div>
        </div>
      </div>
    </section>
  );
} 