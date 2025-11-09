"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { ExternalLink, Github } from "lucide-react";
import LightParticles from "@/components/ui/light-particles";
import { slugify, translateDateSimple } from "@/lib/utils";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import { getProjectSlug } from "@/lib/data";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  status: "Terminé" | "En cours" | "En pause";
  category: string;
  demo: string | null;
  github: string;
}

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

export default function FeaturedProjectsSection({
  projects,
}: FeaturedProjectsSectionProps) {
  const t = useTranslations("Home.featuredProjects");
  const locale = useLocale();
  const { getTranslatedProject } = useTranslatedData();
  // Utiliser les mêmes projets phares qu'avant
  const featuredProjectTitles = [
    "Ashes of Mankind - Empires",
    "UT Marketplace",
    "Commercial website OZC Signalétique",
  ];
  const originalFeaturedProjects = featuredProjectTitles
    .map((title) => projects.find((p) => p.title === title))
    .filter((project): project is NonNullable<typeof project> =>
      Boolean(project)
    );
  const featuredProjects = originalFeaturedProjects.map((project) =>
    getTranslatedProject(project as any)
  );

  return (
    <section
      className="py-8 px-6 relative"
      role="region"
      aria-labelledby="featured-projects-heading"
    >
      <LightParticles />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2
            id="featured-projects-heading"
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent leading-normal pb-1"
          >
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Premier projet - pleine largeur sur mobile, première colonne sur desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link
              href={`/projets/${getProjectSlug(originalFeaturedProjects[0])}`}
            >
              <Card className="group h-full bg-gradient-to-br from-zinc-900/95 via-zinc-800/90 to-zinc-900/95 dark:from-zinc-900/95 dark:via-zinc-800/90 dark:to-zinc-900/95 from-white/95 via-gray-50/90 to-white/95 backdrop-blur-md border-2 border-zinc-600/80 dark:border-zinc-600/80 border-gray-300/80 hover:border-primary/70 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-zinc-800/50 dark:ring-zinc-800/50 ring-gray-200/50">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <Image
                    src={
                      featuredProjects[0]?.image || "/images/placeholder.jpg"
                    }
                    alt={featuredProjects[0]?.title || "Projet"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-primary/90 text-white">
                      {featuredProjects[0]?.status}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-background/80 text-foreground"
                    >
                      {featuredProjects[0]?.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    {featuredProjects[0]?.demo && (
                      <Tooltip
                        content={
                          featuredProjects[0]?.title ===
                          "Ashes of Mankind - Empires"
                            ? t("viewGame")
                            : t("viewDemo")
                        }
                        position="top"
                      >
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (featuredProjects[0].demo) {
                              window.open(
                                featuredProjects[0].demo,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            }
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-primary/90 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </Tooltip>
                    )}
                    <Tooltip content={t("viewCode")} position="top">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(
                            featuredProjects[0]?.github,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-primary/90 transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {featuredProjects[0]?.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        {featuredProjects[0]?.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 text-base leading-relaxed">
                    {featuredProjects[0]?.description}
                  </p>

                  {/* Informations détaillées pour le projet principal */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-muted-foreground">
                        {t("status")}: {featuredProjects[0]?.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-muted-foreground">
                        {featuredProjects[0]?.category}
                      </span>
                    </div>
                  </div>

                  {/* Section des fonctionnalités clés */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      {t("keyFeatures")}
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {featuredProjects[0]?.features
                        ?.slice(0, 4)
                        .map((feature: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredProjects[0]?.technologies
                      .slice(0, 4)
                      .map((tech: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-zinc-800/80 dark:bg-zinc-800/80 bg-gray-100/80 border-zinc-600/80 dark:border-zinc-600/80 border-gray-300/80 text-zinc-100 dark:text-zinc-100 text-gray-700 font-medium"
                        >
                          {tech}
                        </Badge>
                      ))}
                    {featuredProjects[0]?.technologies.length > 4 && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-zinc-800/80 dark:bg-zinc-800/80 bg-gray-100/80 border-zinc-600/80 dark:border-zinc-600/80 border-gray-300/80 text-zinc-100 dark:text-zinc-100 text-gray-700 font-medium"
                      >
                        +{featuredProjects[0].technologies.length - 4} autres
                      </Badge>
                    )}
                  </div>

                  {/* Call to action */}
                  <div className="flex items-center justify-between pt-2 border-t-2 border-zinc-600/80 dark:border-zinc-600/80 border-gray-300/80">
                    <span className="text-sm text-muted-foreground">
                      {t("viewProject")}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <svg
                        className="w-3 h-3 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Deuxième et troisième projets - deuxième colonne divisée en deux */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {featuredProjects.slice(1, 3).map((project, index) => {
              const originalProject = originalFeaturedProjects[index + 1];
              return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <Link href={`/projets/${getProjectSlug(originalProject)}`}>
                  <Card className="group h-full bg-gradient-to-br from-zinc-900/95 via-zinc-800/90 to-zinc-900/95 dark:from-zinc-900/95 dark:via-zinc-800/90 dark:to-zinc-900/95 from-white/95 via-gray-50/90 to-white/95 backdrop-blur-md border-2 border-zinc-600/80 dark:border-zinc-600/80 border-gray-300/80 hover:border-primary/70 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-zinc-800/50 dark:ring-zinc-800/50 ring-gray-200/50">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-1">
                        <Badge className="bg-primary/90 text-white text-xs">
                          {project.status}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3 flex gap-1">
                        {project.demo && (
                          <Tooltip
                            content={
                              project.title === "Ashes of Mankind - Empires"
                                ? t("viewGame")
                                : t("viewDemo")
                            }
                            position="top"
                          >
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (project.demo) {
                                  window.open(
                                    project.demo,
                                    "_blank",
                                    "noopener,noreferrer"
                                  );
                                }
                              }}
                              onMouseDown={(e) => e.stopPropagation()}
                              className="p-1.5 bg-background/80 backdrop-blur-sm rounded-full hover:bg-primary/90 transition-colors"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </button>
                          </Tooltip>
                        )}
                        <Tooltip content={t("viewCode")} position="top">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(
                                project.github,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            }}
                            onMouseDown={(e) => e.stopPropagation()}
                            className="p-1.5 bg-background/80 backdrop-blur-sm rounded-full hover:bg-primary/90 transition-colors"
                          >
                            <Github className="h-3 w-3" />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <span className="text-xs text-zinc-200 dark:text-zinc-200 text-gray-600 bg-zinc-800/80 dark:bg-zinc-800/80 bg-gray-100/80 px-2 py-1 rounded-full font-medium border border-zinc-600/60 dark:border-zinc-600/60 border-gray-300/60">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-3 text-sm line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-muted-foreground">
                          {project.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies
                          .slice(0, 2)
                          .map((tech: string, techIndex: number) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="text-xs bg-zinc-800/80 dark:bg-zinc-800/80 bg-gray-100/80 border-zinc-600/80 dark:border-zinc-600/80 border-gray-300/80 text-zinc-100 dark:text-zinc-100 text-gray-700 font-medium"
                            >
                              {tech}
                            </Badge>
                          ))}
                        {project.technologies.length > 2 && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-zinc-800/80 dark:bg-zinc-800/80 bg-gray-100/80 border-zinc-600/80 dark:border-zinc-600/80 border-gray-300/80 text-zinc-100 dark:text-zinc-100 text-gray-700 font-medium"
                          >
                            +{project.technologies.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
