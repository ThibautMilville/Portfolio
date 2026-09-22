"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, ExternalLink, Github, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import ProjectFilters, { type ProjectFilterState } from "@/components/ProjectFilters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LightParticles from "@/components/ui/light-particles";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import {
  FEATURED_PROJECT_PRIORITY,
  MAX_FEATURED_PROJECTS_PROJETS,
} from "@/hooks/featured-projects/constants";
import { getLocalizedProjectRoute } from "@/lib/localized-routes";
import { getProjectDemoCtaKey } from "@/lib/project-cta";
import { getProjectEndTs } from "@/lib/project-date";
import { getProjectSlug } from "@/services/ProjectService";

export default function Projets() {
  const t = useTranslations("Pages.projets");
  const locale = useLocale() as "en" | "fr";
  const { getTranslatedProject } = useTranslatedData();
  const { projects: projets, loading } = usePortfolioData();
  const [filters, setFilters] = useState<ProjectFilterState>({
    search: "",
    organization: "all",
    techs: [],
    years: [],
    status: "all",
    category: "all",
  });

  const organizations = useMemo(() => {
    // Dérive depuis experiences liées + mots-clés dans category
    const orgs = new Set<string>();
    projets.forEach((p: any) => {
      // Heuristique simple: mappe quelques IDs connus
      if (p.relatedExperienceId) {
        if ([1, 2].includes(p.relatedExperienceId)) orgs.add("SNCF Voyageurs");
        if ([8].includes(p.relatedExperienceId)) orgs.add("Ultra Times");
        if ([3].includes(p.relatedExperienceId)) orgs.add("DigitalLabs TM");
      }
    });
    return Array.from(orgs);
  }, [projets]);

  const technologies = useMemo(() => {
    const set = new Set<string>();
    for (const project of projets) {
      for (const technology of project.technologies) {
        set.add(technology);
      }
    }
    return Array.from(set).sort();
  }, [projets]);

  const years = useMemo(() => {
    const set = new Set<string>();
    for (const project of projets) {
      const match = project.date.match(/\d{4}/g);
      if (match) {
        for (const year of match) {
          set.add(year);
        }
      }
    }
    return Array.from(set).sort().reverse();
  }, [projets]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const project of projets) {
      set.add(getTranslatedProject(project).category);
    }
    return Array.from(set).sort();
  }, [projets, getTranslatedProject]);

  const filtered = useMemo(() => {
    return projets.filter((p: any) => {
      const translated = getTranslatedProject(p);
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const hay = [
          translated.title,
          translated.description,
          translated.category,
          ...(p.technologies || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.category !== "all" && translated.category !== filters.category) return false;
      if (filters.status !== "all" && p.status !== filters.status) return false;
      if (filters.organization !== "all") {
        const orgByExp =
          p.relatedExperienceId &&
          ([1, 2].includes(p.relatedExperienceId)
            ? "SNCF Voyageurs"
            : [8].includes(p.relatedExperienceId)
              ? "Ultra Times"
              : [3].includes(p.relatedExperienceId)
                ? "DigitalLabs TM"
                : undefined);
        if (orgByExp !== filters.organization) return false;
      }
      // OR logic: projet retenu si AU MOINS une techno sélectionnée est présente
      if (filters.techs.length && !filters.techs.some((t) => p.technologies.includes(t)))
        return false;
      if (filters.years.length) {
        const inYears = filters.years.some((y) => p.date.includes(y));
        if (!inYears) return false;
      }
      return true;
    });
  }, [filters, projets, getTranslatedProject]);

  const hasActiveFilters =
    Boolean(filters.search) ||
    filters.organization !== "all" ||
    filters.category !== "all" ||
    filters.status !== "all" ||
    filters.techs.length > 0 ||
    filters.years.length > 0;

  const featuredProjects = useMemo(
    () =>
      projets
        .filter((p: any) => p.isFeatured)
        .sort(
          (a: any, b: any) =>
            (FEATURED_PROJECT_PRIORITY[a.id] ?? Number.MAX_SAFE_INTEGER) -
            (FEATURED_PROJECT_PRIORITY[b.id] ?? Number.MAX_SAFE_INTEGER),
        )
        .slice(0, MAX_FEATURED_PROJECTS_PROJETS),
    [projets],
  );

  const featuredIds = useMemo(
    () => new Set(featuredProjects.map((p: any) => p.id)),
    [featuredProjects],
  );

  const sorted = useMemo(() => {
    // Sans filtre actif, les featured restent uniquement dans la section du haut
    const source = hasActiveFilters
      ? filtered
      : filtered.filter((p: any) => !featuredIds.has(p.id));

    // Grille "tous les projets" : date de fin décroissante (plus récemment terminé en premier)
    return [...source].sort(
      (a, b) => getProjectEndTs(b.date, b.status) - getProjectEndTs(a.date, a.status),
    );
  }, [filtered, featuredIds, hasActiveFilters]);

  const PER_PAGE = 18;
  const [currentPage, setCurrentPage] = useState(1);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  // Restaurer/sauvegarder la page via sessionStorage (pas d'URL)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("projetsPage");
        const pageFromStorage = stored ? parseInt(stored, 10) : 1;
        if (!Number.isNaN(pageFromStorage) && pageFromStorage > 0) {
          setCurrentPage(pageFromStorage);
        }
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("projetsPage", String(currentPage));
      } catch {}
    }
  }, [currentPage]);

  // Remettre à la page 1 uniquement quand les filtres changent (pas au mount,
  // pour ne pas écraser la restauration sessionStorage).
  const isFirstFiltersEffect = useRef(true);
  useEffect(() => {
    if (isFirstFiltersEffect.current) {
      isFirstFiltersEffect.current = false;
      return;
    }
    setCurrentPage(1);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("projetsPage", "1");
      } catch {}
    }
    scrollToTop();
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PER_PAGE;
  const pageItems = sorted.slice(startIndex, startIndex + PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (loading) {
    return <div className="py-24 text-center text-muted-foreground">{t("loading")}</div>;
  }

  return (
    <div className="py-6 md:py-8 px-6 relative">
      <LightParticles />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>

          {/* Barre horizontale stylisée moderne et dynamique */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full shadow-lg"
              style={{ width: "min(80vw, 300px)" }}
              animate={{
                width: ["min(80vw, 300px)", "min(90vw, 400px)", "min(80vw, 300px)"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        </motion.div>

        <ProjectFilters
          value={filters}
          onChange={setFilters}
          organizations={organizations}
          technologies={technologies}
          years={years}
          categories={categories}
          t={t}
        />

        {/* Section des projets mis en avant - seulement si aucun filtre actif */}
        {!hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">{t("featuredProjects")}</h2>
                <p className="text-muted-foreground">{t("featuredProjectsDescription")}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => {
                  if (!project) return null;

                  const translatedProject = getTranslatedProject(project);
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                    >
                      <Link href={getLocalizedProjectRoute(locale, getProjectSlug(project))}>
                        <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col border-2 border-primary/20 hover:border-primary/40">
                          <div className="relative overflow-hidden rounded-t-lg">
                            <Image
                              src={translatedProject.image}
                              alt={translatedProject.title}
                              width={400}
                              height={200}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge
                                variant="default"
                                className="bg-primary-solid text-primary-foreground"
                              >
                                {t("featured")}
                              </Badge>
                            </div>
                            <div className="absolute top-4 right-4">
                              <Badge
                                variant="secondary"
                                className="bg-background/80 text-foreground dark:bg-black dark:text-white border border-border/50 backdrop-blur px-2 py-1"
                              >
                                {translatedProject.category}
                              </Badge>
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <ArrowRight className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0" />
                            </div>
                          </div>

                          <CardHeader className="flex-0 min-h-[132px]">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1 min-h-[28px]">
                                  {translatedProject.title}
                                </CardTitle>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                  <Calendar className="h-4 w-4" />
                                  {translatedProject.date}
                                </div>
                              </div>
                            </div>
                            <CardDescription className="text-sm leading-relaxed line-clamp-3 min-h-[66px] max-h-[66px] overflow-hidden">
                              {translatedProject.description}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="space-y-4 flex flex-col flex-1">
                            <div className="min-h-[66px] max-h-[66px] overflow-hidden">
                              <h4 className="font-semibold text-sm mb-2">{t("keyFeatures")}</h4>
                              <ul className="space-y-1">
                                {translatedProject.features
                                  .slice(0, 3)
                                  .map((feature: string, idx: number) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-2 text-xs text-muted-foreground truncate"
                                    >
                                      <Star className="h-3 w-3 mt-0.5 flex-shrink-0 text-primary" />
                                      {feature}
                                    </li>
                                  ))}
                              </ul>
                            </div>

                            <div className="min-h-[56px] max-h-[56px] overflow-hidden">
                              <h4 className="font-semibold text-sm mb-2">{t("technologies")}</h4>
                              <div className="flex flex-nowrap items-center gap-1 overflow-hidden min-w-0">
                                {project.technologies.slice(0, 4).map((tech: string) => (
                                  <Badge
                                    key={tech}
                                    variant="outline"
                                    className="text-xs whitespace-nowrap"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                                {project.technologies.length > 4 && (
                                  <Badge variant="outline" className="text-xs whitespace-nowrap">
                                    +{project.technologies.length - 4}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="mt-auto pt-4 flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 sweep-light"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  window.open(project.github, "_blank");
                                }}
                              >
                                <Github className="mr-2 h-4 w-4" />
                                {t("code")}
                              </Button>
                              {project.demo && (
                                <Button
                                  size="sm"
                                  className="flex-1 sweep-light"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (!project.demo) return;
                                    window.open(project.demo, "_blank");
                                  }}
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  {t(getProjectDemoCtaKey(project))}
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

        <div className="text-sm text-muted-foreground mb-4">
          {sorted.length > 0 ? (
            <span>
              {t("displaying", {
                count: sorted.length,
              })}
            </span>
          ) : (
            <span>{t("noResults")}</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pageItems.map((projet, index) => {
            const translatedProject = getTranslatedProject(projet);
            return (
              <motion.div
                key={projet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.06 }}
                id={projet.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              >
                <Link
                  href={getLocalizedProjectRoute(locale, getProjectSlug(projet))}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      try {
                        sessionStorage.setItem("projetsPage", String(currentPage));
                      } catch {}
                    }
                  }}
                >
                  <Card className="h-full min-h-[560px] hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col border-2 border-primary/20 hover:border-primary/40">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={translatedProject.image}
                        alt={translatedProject.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant={translatedProject.status === "Terminé" ? "default" : "secondary"}
                        >
                          {translatedProject.status}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="secondary"
                          className="bg-background/80 text-foreground dark:bg-black dark:text-white border border-border/50 backdrop-blur px-2 py-1"
                        >
                          {translatedProject.category}
                        </Badge>
                      </div>
                      {/* Overlay avec icône */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <ArrowRight className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0" />
                      </div>
                    </div>

                    <CardHeader className="flex-0 min-h-[132px]">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1 min-h-[28px]">
                            {translatedProject.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="h-4 w-4" />
                            {translatedProject.date}
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-sm leading-relaxed line-clamp-3 min-h-[66px] max-h-[66px] overflow-hidden">
                        {translatedProject.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4 flex flex-col flex-1">
                      <div className="min-h-[66px] max-h-[66px] overflow-hidden">
                        <h4 className="font-semibold text-sm mb-2">{t("keyFeatures")}</h4>
                        <ul className="space-y-1">
                          {translatedProject.features
                            .slice(0, 3)
                            .map((feature: string, idx: number) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs text-muted-foreground truncate"
                              >
                                <Star className="h-3 w-3 mt-0.5 flex-shrink-0 text-primary" />
                                {feature}
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div className="min-h-[56px] max-h-[56px] overflow-hidden">
                        <h4 className="font-semibold text-sm mb-2">{t("technologies")}</h4>
                        <div className="flex flex-nowrap items-center gap-1 overflow-hidden min-w-0">
                          {projet.technologies.slice(0, 4).map((tech: string) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-xs whitespace-nowrap"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {projet.technologies.length > 4 && (
                            <Badge variant="outline" className="text-xs whitespace-nowrap">
                              +{projet.technologies.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mt-auto pt-4 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 sweep-light"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(projet.github, "_blank");
                          }}
                        >
                          <Github className="mr-2 h-4 w-4" />
                          {t("code")}
                        </Button>
                        {projet.demo && (
                          <Button
                            size="sm"
                            className="flex-1 sweep-light"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (!projet.demo) return;
                              window.open(projet.demo, "_blank");
                            }}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            {t(getProjectDemoCtaKey(projet))}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((p) => {
                        const next = Math.max(1, p - 1);
                        if (next !== p) scrollToTop();
                        return next;
                      });
                    }}
                    className={safePage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={safePage === i + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((p) => {
                        const next = Math.min(totalPages, p + 1);
                        if (next !== p) scrollToTop();
                        return next;
                      });
                    }}
                    className={safePage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
