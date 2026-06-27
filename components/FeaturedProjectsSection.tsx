"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FeaturedProjectCard } from "@/components/featured-projects/FeaturedProjectCard";
import { Button } from "@/components/ui/button";
import LightParticles from "@/components/ui/light-particles";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useFeaturedProjectsSelection } from "@/hooks/featured-projects/useFeaturedProjectsSelection";
import { getLocalizedRoute } from "@/lib/localized-routes";
import type { Project as PortfolioProject } from "@/types/portfolio";

interface FeaturedProjectsSectionProps {
  projects: PortfolioProject[];
}

export default function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  const t = useTranslations("Home.featuredProjects");
  const locale = useLocale() as "en" | "fr";
  const { spotlight, gridItems } = useFeaturedProjectsSelection(projects);
  const projectsRoute = getLocalizedRoute("projets", locale);

  if (!spotlight) {
    return null;
  }

  return (
    <section
      className="relative scroll-mt-24 px-6 py-10 md:py-14"
      aria-labelledby="featured-projects-heading"
    >
      <LightParticles />
      <div className="relative z-10 mx-auto max-w-7xl space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            id="featured-projects-heading"
            title={t("title")}
            subtitle={t("subtitle")}
            icon="projects"
          />
        </motion.div>

        <FeaturedProjectCard project={spotlight} variant="spotlight" index={0} />

        {gridItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gridItems.map((project, index) => (
              <FeaturedProjectCard
                key={project.original.id}
                project={project}
                variant="compact"
                index={index + 1}
              />
            ))}
          </div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Button size="lg" asChild className="sweep-light">
            <Link href={projectsRoute}>
              {t("viewAll")}
              <ArrowRight className="ml-2 h-4 w-4 text-white" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
