"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/general/Tooltip";
import { ExternalLink, FolderKanban, Github } from "lucide-react";
import LightParticles from "@/components/ui/light-particles";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import { useHorizontalWheelLock } from "@/hooks/useHorizontalWheelLock";
import { getProjectSlug } from "@/services/ProjectService";
import type { Project as PortfolioProject } from "@/types/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { getLocalizedProjectRoute } from "@/lib/localized-routes";

interface FeaturedProjectsSectionProps {
  projects: PortfolioProject[];
}

export default function FeaturedProjectsSection({
  projects,
}: FeaturedProjectsSectionProps) {
  const t = useTranslations("Home.featuredProjects");
  const locale = useLocale() as "en" | "fr";
  const { getTranslatedProject } = useTranslatedData();
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [maxCardHeight, setMaxCardHeight] = useState<number>(0);

  const flaggedFeaturedProjects = projects.filter((project) => project.isFeatured);
  const fallbackProjects = projects.filter((project) => !project.isFeatured);
  const selectedFeaturedProjects = [...flaggedFeaturedProjects, ...fallbackProjects].slice(0, 5);
  const featuredProjects = selectedFeaturedProjects.map((project) => ({
    original: project,
    translated: getTranslatedProject(project as any),
  }));

  const measureItemsHeight = useCallback(() => {
    let nextMaxHeight = 0;
    itemRefs.current.forEach((item) => {
      if (!item) return;
      item.style.height = "auto";
      nextMaxHeight = Math.max(nextMaxHeight, item.getBoundingClientRect().height);
    });
    if (nextMaxHeight > 0) {
      setMaxCardHeight(nextMaxHeight);
    }
  }, []);

  useLayoutEffect(() => {
    if (featuredProjects.length === 0) {
      setMaxCardHeight(0);
      return;
    }
    const frame = requestAnimationFrame(measureItemsHeight);
    const timeout = window.setTimeout(measureItemsHeight, 220);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [featuredProjects.length, measureItemsHeight]);

  useEffect(() => {
    if (featuredProjects.length === 0) return;
    const onResize = () => measureItemsHeight();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [featuredProjects.length, measureItemsHeight]);

  useEffect(() => {
    if (!trackRef.current || featuredProjects.length === 0) return;
    const observer = new ResizeObserver(() => {
      measureItemsHeight();
    });
    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });
    return () => observer.disconnect();
  }, [featuredProjects.length, measureItemsHeight]);

  useEffect(() => {
    if (!document.fonts?.ready) return;
    document.fonts.ready.then(() => {
      measureItemsHeight();
    });
  }, [measureItemsHeight]);

  useHorizontalWheelLock({
    sectionRef,
    trackRef,
    enabled: featuredProjects.length > 1,
  });

  return (
    <section
      ref={sectionRef}
      className="py-8 pl-6 pr-0 relative z-20"
      role="region"
      aria-labelledby="featured-projects-heading"
    >
      <LightParticles />
      <div className="w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 max-w-7xl mx-auto pr-6"
        >
          <SectionHeading
            id="featured-projects-heading"
            title={t("title")}
            subtitle={t("subtitle")}
            icon={FolderKanban}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div
            ref={trackRef}
            className="flex items-stretch gap-6 overflow-x-auto overflow-y-visible snap-x snap-mandatory scroll-px-[50vw] scrollbar-hide pb-4 pr-0"
          >
            <div
              className="shrink-0 w-[7vw] sm:w-[14vw] lg:w-[22vw] xl:w-[25vw]"
              aria-hidden="true"
            />
            {featuredProjects.map(({ original, translated }, index) => {
              const imageSrc = translated.image || "/images/placeholder.jpg";

              return (
                <motion.div
                  key={original.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
                  viewport={{ once: true }}
                  className="shrink-0 w-[86%] sm:w-[72%] lg:w-[56%] xl:w-[50%] snap-center"
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  style={maxCardHeight > 0 ? { height: `${maxCardHeight}px` } : undefined}
                >
                  <Link
                    href={getLocalizedProjectRoute(locale, getProjectSlug(original))}
                    className="block w-full h-full"
                  >
                    <Card
                      className="group relative z-0 w-full h-full bg-gradient-to-br from-zinc-900/95 via-zinc-800/90 to-zinc-900/95 dark:from-zinc-900/95 dark:via-zinc-800/90 dark:to-zinc-900/95 from-white/95 via-gray-50/90 to-white/95 backdrop-blur-md border-2 border-zinc-600/80 dark:border-zinc-600/80 border-gray-300/80 hover:border-primary/70 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-zinc-800/50 dark:ring-zinc-800/50 ring-gray-200/50 hover:z-30"
                    >
                      <div className="relative h-72 md:h-[24rem] overflow-hidden">
                        <Image
                          src={imageSrc}
                          alt={translated.title || "Projet"}
                          fill
                          sizes="(max-width: 640px) 86vw, (max-width: 1024px) 72vw, (max-width: 1280px) 56vw, 50vw"
                          className="object-cover"
                        />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 right-4 flex gap-2">
                        {translated.demo && (
                          <Tooltip
                            content={
                              translated.title === "Ashes of Mankind - Empires"
                                ? t("viewGame")
                                : t("viewDemo")
                            }
                            position="top"
                          >
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (translated.demo) {
                                  window.open(
                                    translated.demo,
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
                                translated.github,
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
                    <div className="p-6 flex flex-col h-full">
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors mb-3">
                        {translated.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-base leading-relaxed line-clamp-3">
                        {translated.description}
                      </p>
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">
                          {t("keyFeatures")}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                          {translated.features
                            ?.slice(0, 3)
                            .map((feature: string, featureIndex: number) => (
                              <div
                                key={featureIndex}
                                className="flex items-center gap-2 text-xs text-muted-foreground"
                              >
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                <span className="line-clamp-1">{feature}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {translated.technologies
                          .slice(0, 4)
                          .map((tech: string, techIndex: number) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="text-xs bg-zinc-800/80 dark:bg-zinc-800/80 bg-gray-100/80 border-zinc-600/80 dark:border-zinc-600/80 border-gray-300/80 text-zinc-100 dark:text-zinc-100 text-gray-700 font-medium"
                            >
                              {tech}
                            </Badge>
                          ))}
                        {translated.technologies.length > 4 && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-zinc-800/80 dark:bg-zinc-800/80 bg-gray-100/80 border-zinc-600/80 dark:border-zinc-600/80 border-gray-300/80 text-zinc-100 dark:text-zinc-100 text-gray-700 font-medium"
                          >
                            +{translated.technologies.length - 4} autres
                          </Badge>
                        )}
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2 border-t-2 border-zinc-600/80 dark:border-zinc-600/80 border-gray-300/80">
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
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
