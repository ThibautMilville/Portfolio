"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import dynamic from "next/dynamic";
import LightParticles from "@/components/ui/light-particles";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/data";

const ProjectCarousel = dynamic(
  () => import("@/components/ui/project-carousel"),
  { ssr: false }
);

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  // Séparer les projets phares des autres projets
  const featuredProjectTitles = [
    "UT Marketplace",
    "Institutional website OZC",
    "Commercial website OZC Signalétique",
  ];
  const featuredProjects = projects.filter((p) =>
    featuredProjectTitles.includes(p.title)
  );

  // Récupérer les 15 derniers projets réalisés (excluant les projets phares)
  // Trier par ID décroissant pour avoir les plus récents en premier
  const otherProjects = projects
    .filter((p) => !featuredProjectTitles.includes(p.title))
    .sort((a, b) => b.id - a.id)
    .slice(0, 15);

  return (
    <section className="py-6 md:py-8 px-6 bg-background/80 relative">
      <LightParticles />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Projets phares
          </h2>
          <p className="text-lg text-muted-foreground">
            Quelques réalisations techniques marquantes
          </p>
        </motion.div>

        {/* Projets phares en pleine largeur avec défilement */}
        {featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <ProjectCarousel projects={featuredProjects} isFeatured={true} />
          </motion.div>
        )}

        {/* Section autres projets en carousel */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-2">
                Dernières réalisations
              </h3>
              <p className="text-muted-foreground">
                Découvrez mes 15 derniers projets réalisés
              </p>
            </div>

            <ProjectCarousel projects={otherProjects} />
          </motion.div>
        )}

        <div className="flex justify-center mt-16">
          <Button size="lg" asChild className="sweep-light">
            <Link href="/projets">
              Voir tous les projets
              <ArrowRight className="ml-2 h-4 w-4 text-white" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
