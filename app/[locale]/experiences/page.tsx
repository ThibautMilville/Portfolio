"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { translateDateSimple } from "@/lib/utils";
import { Building, Calendar, MapPin, Users, ExternalLink, GraduationCap, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LightParticles from "@/components/ui/light-particles";
import { useState, useEffect } from "react";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { getGroupedExperiencesFromList } from "@/utils/experience";
import { getProjectSlug } from "@/services/ProjectService";
import { getLocalizedProjectRoute } from "@/lib/localized-routes";

export default function Experiences() {
  const t = useTranslations("Pages.experiences");
  const locale = useLocale();
  const { getTranslatedExperience, getTranslatedProject, getTranslatedFormation } = useTranslatedData();
  const { experiences, formations, projects } = usePortfolioData();
  const groupedExperiences = getGroupedExperiencesFromList(experiences);
  // Initialiser avec toutes les entreprises qui ont plusieurs expériences
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(new Set());
  const [scrollableTracks, setScrollableTracks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setExpandedCompanies(new Set(groupedExperiences.filter((group) => group.experiences.length > 1).map((group) => group.company)));
  }, [groupedExperiences.length]);

  // Gestion du scroll automatique avec offset pour la navigation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Attendre que le DOM soit complètement chargé et que les animations soient terminées
          const scrollToElement = () => {
            const offset = 120; // Décalage pour la navigation fixe
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;
            const scrollPosition = elementTop - offset;

            window.scrollTo({
              top: scrollPosition,
              behavior: "smooth",
            });
          };

          // Essayer plusieurs fois avec des délais différents
          setTimeout(scrollToElement, 100);
          setTimeout(scrollToElement, 300);
          setTimeout(scrollToElement, 500);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const updateTracks = () => {
      const elements = document.querySelectorAll<HTMLElement>("[data-scroll-track='true']");
      setScrollableTracks((prev) => {
        const next: Record<string, boolean> = {};
        elements.forEach((element) => {
          if (element.id) {
            next[element.id] = element.scrollWidth > element.clientWidth + 1;
          }
        });
        const prevKeys = Object.keys(prev);
        const nextKeys = Object.keys(next);
        if (prevKeys.length === nextKeys.length && prevKeys.every((key) => prev[key] === next[key])) {
          return prev;
        }
        return next;
      });
    };

    updateTracks();
    window.addEventListener("resize", updateTracks);
    return () => window.removeEventListener("resize", updateTracks);
  }, [groupedExperiences.length, experiences.length, formations.length, projects.length, expandedCompanies]);

  const toggleCompany = (company: string) => {
    const newExpanded = new Set(expandedCompanies);
    if (newExpanded.has(company)) {
      newExpanded.delete(company);
    } else {
      newExpanded.add(company);
    }
    setExpandedCompanies(newExpanded);
  };

  const getRecencyScore = (date: string) => {
    const normalized = date
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const yearMatches = normalized.match(/\b(19|20)\d{2}\b/g);
    const year = yearMatches?.length ? Number(yearMatches[yearMatches.length - 1]) : 0;
    const isOngoing = normalized.includes("present");
    return (isOngoing ? 10_000_000 : 0) + year;
  };

  const getTrackId = (prefix: string, key: string) => {
    const safeKey = key.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `${prefix}-${safeKey}`;
  };

  const scrollTrack = (id: string, direction: "left" | "right") => {
    if (typeof window === "undefined") {
      return;
    }
    const element = document.getElementById(id);
    if (!element) {
      return;
    }
    const offset = direction === "left" ? -320 : 320;
    element.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="py-6 md:py-8 px-6 relative">
      <LightParticles />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16 relative">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>

            {/* Barre horizontale stylisée moderne et dynamique */}
            <motion.div className="flex justify-center mb-6" initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <motion.div
                className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full shadow-lg"
                style={{ width: "min(80vw, 400px)" }}
                animate={{
                  width: ["min(80vw, 400px)", "min(90vw, 500px)", "min(80vw, 400px)"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
          </div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

          <div className="space-y-8">
            {groupedExperiences.map((group, index) => (
              <motion.div key={group.company} id={group.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} className="relative">
                {/* Timeline dot */}
                <div className="hidden sm:block absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>

                <Card className="sm:ml-16 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {group.logoUrl ? (
                          <img src={group.logoUrl} alt={`Logo ${group.company}`} className="h-10 w-10 rounded object-contain bg-white p-1 flex-shrink-0" />
                        ) : (
                          <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                            <Building className="h-6 w-6 text-primary" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl mb-2">{group.company}</CardTitle>
                          <CardDescription className="text-base font-medium text-foreground">{group.experiences.length > 1 ? `${group.experiences.length} ${t("positions")}` : group.experiences[0].title}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center justify-start sm:justify-end gap-2 flex-shrink-0">
                        {group.experiences.length > 1 && (
                          <Button variant="ghost" size="sm" onClick={() => toggleCompany(group.company)} className="p-1 sweep-light">
                            {expandedCompanies.has(group.company) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        )}
                        <Badge variant="outline" className="text-sm">
                          {group.experiences.length > 1
                            ? t("multiplePositions")
                            : (() => {
                                const firstExp = getTranslatedExperience(group.experiences[0]);
                                const employmentType = group.experiences[0].employmentType || "fullTime";
                                return t(`employmentTypes.${employmentType}`);
                              })()}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {(() => {
                          const firstExp = getTranslatedExperience(group.experiences[group.experiences.length - 1]);
                          const lastExp = getTranslatedExperience(group.experiences[0]);
                          if (group.experiences.length === 1) {
                            return translateDateSimple(firstExp.date, locale);
                          } else {
                            const startDate = firstExp.date.split(" - ")[0];
                            const endDate = lastExp.date.includes("Présent") || lastExp.date.includes("Present") ? (locale === "fr" ? "Présent" : "Present") : lastExp.date.split(" - ")[1];
                            return `${startDate} - ${endDate}`;
                          }
                        })()}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {getTranslatedExperience(group.experiences[0]).location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {group.experiences.length} {t("position")}
                        {group.experiences.length > 1 ? "s" : ""}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Affichage des postes individuels si plusieurs expériences */}
                    {group.experiences.length > 1 && (
                      <div className="space-y-4">
                        {group.experiences.map((exp, expIndex) => {
                          const translatedExp = getTranslatedExperience(exp);
                          return (
                            <motion.div
                              key={exp.id}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{
                                opacity: expandedCompanies.has(group.company) ? 1 : 0,
                                height: expandedCompanies.has(group.company) ? "auto" : 0,
                              }}
                              transition={{ duration: 0.3 }}
                              className={`overflow-hidden border-l-2 border-primary/20 pl-4 ${expIndex > 0 ? "pt-4" : ""}`}>
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-foreground">{translatedExp.title}</h4>
                                <span className="text-sm text-muted-foreground">{translateDateSimple(translatedExp.date, locale)}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{translatedExp.description}</p>

                              <div className="mb-3">
                                <h5 className="font-medium text-sm mb-2">{t("achievements")}</h5>
                                <ul className="space-y-1">
                                  {translatedExp.achievements.slice(0, 3).map((achievement: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                      <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                                      <span className="line-clamp-1">{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {translatedExp.technologies.slice(0, 6).map((tech: string) => (
                                  <Badge key={tech} variant="secondary" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                                {translatedExp.technologies.length > 6 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{translatedExp.technologies.length - 6}
                                  </Badge>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}

                    {/* Affichage pour une seule expérience */}
                    {group.experiences.length === 1 &&
                      (() => {
                        const translatedExp = getTranslatedExperience(group.experiences[0]);
                        return (
                          <>
                            <p className="text-muted-foreground">{translatedExp.description}</p>

                            <div>
                              <h4 className="font-semibold mb-3">{t("keyAchievements")}</h4>
                              <ul className="space-y-2">
                                {translatedExp.achievements.map((achievement: string, idx: number) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                    <span className="line-clamp-1">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-3">{t("technologiesUsed")}</h4>
                              <div className="flex flex-wrap gap-2">
                                {translatedExp.technologies.map((tech: string) => (
                                  <Badge key={tech} variant="secondary" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </>
                        );
                      })()}

                    {/* Projets associés (tous les projets de toutes les expériences du groupe) */}
                    {(() => {
                      const allRelatedProjects = group.experiences.flatMap((exp) => projects.filter((project) => project.relatedExperienceId === exp.id));
                      const uniqueProjects = allRelatedProjects.filter((project, index, self) => index === self.findIndex((p) => p.id === project.id));
                      const translatedProjects = uniqueProjects.map((project) => getTranslatedProject(project));

                      return uniqueProjects.length > 0 ? (
                        <div>
                          <div className="mb-3 flex items-center justify-between gap-2">
                            <h4 className="font-semibold flex items-center gap-2">
                              <ExternalLink className="h-4 w-4" />
                              {t("relatedProjects")}
                            </h4>
                            {scrollableTracks[getTrackId("projects-track", group.company)] && (
                              <div className="flex items-center gap-1">
                                <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={() => scrollTrack(getTrackId("projects-track", group.company), "left")}>
                                  <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={() => scrollTrack(getTrackId("projects-track", group.company), "right")}>
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                          <div id={getTrackId("projects-track", group.company)} data-scroll-track="true" className="thin-scrollbar flex gap-3 overflow-x-auto pb-1">
                            {translatedProjects.map((project: any) => (
                              <Link
                                key={`project-preview-${project.id}`}
                                href={getLocalizedProjectRoute(locale as "en" | "fr", getProjectSlug(project))}
                                className="group block w-64 flex-shrink-0 overflow-hidden rounded-lg border border-border/60 bg-background/70 transition-all duration-300 hover:border-primary/40"
                              >
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="p-3">
                                  <p className="line-clamp-1 text-sm font-medium text-foreground">{project.title}</p>
                                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{project.description}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : null;
                    })()}

                    {/* Formations associées (toutes les formations de toutes les expériences du groupe) */}
                    {(() => {
                      const allRelatedFormations = group.experiences.flatMap((exp) => formations.filter((formation) => (exp.relatedFormationIds || []).includes(formation.id)));
                      const uniqueFormations = allRelatedFormations.filter((formation, index, self) => index === self.findIndex((f) => f.id === formation.id));
                      const translatedFormations = uniqueFormations
                        .sort((a, b) => getRecencyScore(b.date) - getRecencyScore(a.date))
                        .map((formation) => getTranslatedFormation(formation));

                      return uniqueFormations.length > 0 ? (
                        <div>
                          <div className="mb-3 flex items-center justify-between gap-2">
                            <h4 className="font-semibold flex items-center gap-2">
                              <GraduationCap className="h-4 w-4" />
                              {t("relatedFormations")}
                            </h4>
                            {scrollableTracks[getTrackId("formations-track", group.company)] && (
                              <div className="flex items-center gap-1">
                                <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={() => scrollTrack(getTrackId("formations-track", group.company), "left")}>
                                  <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={() => scrollTrack(getTrackId("formations-track", group.company), "right")}>
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                          <div id={getTrackId("formations-track", group.company)} data-scroll-track="true" className="thin-scrollbar flex gap-3 overflow-x-auto pb-1">
                            {translatedFormations.map((formation: any) => (
                              <Link
                                key={`formation-preview-${formation.id}`}
                                href="/formations"
                                className="group block w-64 flex-shrink-0 overflow-hidden rounded-lg border border-border/60 bg-background/70 p-3 transition-all duration-300 hover:border-primary/40"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/50 bg-white p-1">
                                    {formation.logoUrl ? (
                                      <img src={formation.logoUrl} alt={`Logo ${formation.institution}`} className="h-8 w-8 object-contain" />
                                    ) : (
                                      <GraduationCap className="h-4 w-4 text-primary" />
                                    )}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="line-clamp-1 text-sm font-medium text-foreground">{formation.title}</p>
                                    <p className="line-clamp-1 text-xs text-muted-foreground">{formation.institution}</p>
                                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{formation.description}</p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
