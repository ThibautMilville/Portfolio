"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Github,
  ExternalLink,
  Calendar,
  Star,
  ArrowRight,
  FolderClosed,
  Rocket,
  Layers,
  Hourglass,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getAllProjects, getProjectSlug } from "@/lib/data";
import ProjectFilters, {
  ProjectFilterState,
} from "@/components/ProjectFilters";
import { useMemo, useState, useEffect } from "react";
import LightParticles from "@/components/ui/light-particles";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Récupérer les projets depuis le fichier de données partagé
const projets = getAllProjects();

export default function Projets() {
  const t = useTranslations('Pages.projets');
  const { getTranslatedProject } = useTranslatedData();
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
  }, []);

  const technologies = useMemo(() => {
    const set = new Set<string>();
    projets.forEach((p: any) => p.technologies.forEach((t: string) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const years = useMemo(() => {
    const set = new Set<string>();
    projets.forEach((p: any) => {
      const match = p.date.match(/\d{4}/g);
      if (match) match.forEach((y: string) => set.add(y));
    });
    return Array.from(set).sort().reverse();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projets.forEach((p: any) => set.add(p.category));
    return Array.from(set).sort();
  }, []);

  const totalProjects = projets.length;
  const web3Count = useMemo(
    () => projets.filter((p: any) => p.category === "Web3").length,
    []
  );

  const filtered = useMemo(() => {
    return projets.filter((p: any) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const hay = [
          p.title,
          p.description,
          p.category,
          ...(p.technologies || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.category !== "all" && p.category !== filters.category)
        return false;
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
      if (
        filters.techs.length &&
        !filters.techs.some((t) => p.technologies.includes(t))
      )
        return false;
      if (filters.years.length) {
        const inYears = filters.years.some((y) => p.date.includes(y));
        if (!inYears) return false;
      }
      return true;
    });
  }, [filters]);

  // Parse une date de début (commencement) à partir d'une chaîne libre en FR
  const getProjectStartTs = (dateStr: string): number => {
    const normalize = (s: string) =>
      s
        .toLowerCase()
        .normalize("NFD")
        // Retire les diacritiques sans utiliser les classes Unicode (compat ES5)
        .replace(/[\u0300-\u036f]/g, "");

    const monthMap: Record<string, number> = {
      jan: 1,
      janvier: 1,
      fev: 2,
      fevr: 2,
      fevrier: 2,
      mar: 3,
      mars: 3,
      avr: 4,
      avril: 4,
      mai: 5,
      jun: 6,
      juin: 6,
      jul: 7,
      juil: 7,
      juillet: 7,
      aou: 8,
      aout: 8,
      sep: 9,
      sept: 9,
      septembre: 9,
      oct: 10,
      octobre: 10,
      nov: 11,
      novembre: 11,
      dec: 12,
      decembre: 12,
    };

    const parts = dateStr.split(";").map((s) => s.trim());
    const startCandidates: number[] = [];

    for (const part of parts) {
      const normalized = normalize(part);
      // Cherche forme "mois année"
      const monthYearMatch = normalized.match(
        /(janvier|fevrier|fevr|fev|jan|fev|mar|mars|avr|avril|mai|jun|juin|jul|juil|juillet|aou|aout|sep|sept|septembre|oct|octobre|nov|novembre|dec|decembre)\s+(\d{4})/
      );
      if (monthYearMatch) {
        const mKey = monthYearMatch[1];
        const y = parseInt(monthYearMatch[2], 10);
        const m = monthMap[mKey] || 1;
        startCandidates.push(new Date(y, m - 1, 1).getTime());
        continue;
      }
      // Sinon, prend juste l'année
      const yearMatch = normalized.match(/(\d{4})/);
      if (yearMatch) {
        const y = parseInt(yearMatch[1], 10);
        startCandidates.push(new Date(y, 0, 1).getTime());
      }
    }

    if (!startCandidates.length) return 0;
    // Positionnement basé sur la PREMIÈRE période (la plus ancienne)
    return Math.min(...startCandidates);
  };

  const sorted = useMemo(() => {
    return [...filtered].sort(
      (a, b) => getProjectStartTs(b.date) - getProjectStartTs(a.date)
    );
  }, [filtered]);

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

  useEffect(() => {
    setCurrentPage(1);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("projetsPage", "1");
      } catch {}
    }
    scrollToTop();
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const startIndex = (currentPage - 1) * PER_PAGE;
  const pageItems = sorted.slice(startIndex, startIndex + PER_PAGE);

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>

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
                width: [
                  "min(80vw, 300px)",
                  "min(90vw, 400px)",
                  "min(80vw, 300px)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <p className="text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
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

        <div className="text-sm text-muted-foreground mb-4">
          {sorted.length > 0 ? (
            <span>
              {t('displaying', {
                count: sorted.length
              })}
            </span>
          ) : (
            <span>{t('noResults')}</span>
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
                href={`/projets/${getProjectSlug(projet)}`}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    try {
                      sessionStorage.setItem(
                        "projetsPage",
                        String(currentPage)
                      );
                    } catch {}
                  }
                }}
              >
                <Card className="h-full min-h-[560px] hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col">
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
                        variant={
                          translatedProject.status === "Terminé" ? "default" : "secondary"
                        }
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
                          {projet.date}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed line-clamp-3 min-h-[66px] max-h-[66px] overflow-hidden">
                      {translatedProject.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 flex flex-col flex-1">
                    <div className="min-h-[66px] max-h-[66px] overflow-hidden">
                      <h4 className="font-semibold text-sm mb-2">
                        {t('keyFeatures')}
                      </h4>
                      <ul className="space-y-1">
                        {translatedProject.features.slice(0, 3).map((feature: string, idx: number) => (
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
                      <h4 className="font-semibold text-sm mb-2">
                        {t('technologies')}
                      </h4>
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
                          <Badge
                            variant="outline"
                            className="text-xs whitespace-nowrap"
                          >
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
                        {t('code')}
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
                          {["Showcase", "E-commerce", "Corporate"].includes(
                            projet.category
                          )
                            ? t('viewSite')
                            : t('demo')}
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
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === i + 1}
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
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="relative overflow-hidden p-6 rounded-2xl border border-primary/30 bg-card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl group">
              {/* Dégradé de base avec vraie transition */}
              <div 
                className="absolute top-0 left-0 w-20 h-20 shadow-lg flex items-start justify-start pt-2 pl-2" 
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                  backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 30%, hsl(var(--primary) / 0.3) 60%, #000 100%)'
                }} 
              >
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="relative z-10 text-center">
                <div className="text-4xl font-black text-primary mb-1 drop-shadow-lg">+25</div>
                <div className="text-sm text-muted-foreground">{t('projects')}</div>
              </div>
            </div>
            <div className="relative overflow-hidden p-6 rounded-2xl border border-primary/30 bg-card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl group">
              {/* Dégradé de base avec vraie transition */}
              <div 
                className="absolute top-0 left-0 w-20 h-20 shadow-lg flex items-start justify-start pt-2 pl-2" 
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                  backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 30%, hsl(var(--primary) / 0.3) 60%, #000 100%)'
                }} 
              >
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="relative z-10 text-center">
                <div className="text-4xl font-black text-primary mb-1 drop-shadow-lg">{web3Count}</div>
                <div className="text-sm text-muted-foreground">{t('web3Projects')}</div>
              </div>
            </div>
            <div className="relative overflow-hidden p-6 rounded-2xl border border-primary/30 bg-card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl group">
              {/* Dégradé de base avec vraie transition */}
              <div 
                className="absolute top-0 left-0 w-20 h-20 shadow-lg flex items-start justify-start pt-2 pl-2" 
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                  backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 30%, hsl(var(--primary) / 0.3) 60%, #000 100%)'
                }} 
              >
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="relative z-10 text-center">
                <div className="text-4xl font-black text-primary mb-1 drop-shadow-lg">+30</div>
                <div className="text-sm text-muted-foreground">{t('masteredTechnologies')}</div>
              </div>
            </div>
            <div className="relative overflow-hidden p-6 rounded-2xl border border-primary/30 bg-card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl group">
              {/* Dégradé de base avec vraie transition */}
              <div 
                className="absolute top-0 left-0 w-20 h-20 shadow-lg flex items-start justify-start pt-2 pl-2" 
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                  backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 30%, hsl(var(--primary) / 0.3) 60%, #000 100%)'
                }} 
              >
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="relative z-10 text-center">
                <div className="text-4xl font-black text-primary mb-1 drop-shadow-lg">6+</div>
                <div className="text-sm text-muted-foreground">{t('yearsExperience')}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
