"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import dynamic from "next/dynamic";
import LightParticles from "@/components/ui/light-particles";
import { ArrowRight } from "lucide-react";

const ExperienceCarousel = dynamic(
  () => import("@/components/ui/experience-carousel"),
  {
    ssr: false,
    loading: () => {
      const t = useTranslations('Home.experiences');
      return <div className="text-center py-8">{t('loading')}</div>;
    },
  }
);

export default function ExperiencesSection() {
  const t = useTranslations('Home.experiences');
  return (
    <section className="py-6 md:py-8 px-6 relative">
      <LightParticles />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ExperienceCarousel />
        </motion.div>

        <div className="flex justify-center mt-12">
          <Button size="lg" asChild className="sweep-light">
            <Link href="/experiences">
              {t('viewAll')}
              <ArrowRight className="ml-2 h-4 w-4 text-white" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
