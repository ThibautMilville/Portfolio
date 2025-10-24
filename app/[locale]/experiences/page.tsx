"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Building,
  Calendar,
  MapPin,
  Users,
  Briefcase,
  ExternalLink,
  GraduationCap,
  ChevronDown,
  ChevronUp,
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
import {
  getAllExperiences,
  getProjectsByExperience,
  getFormationsByExperience,
  getGroupedExperiences,
} from "@/lib/data";
import Link from "next/link";
import ProjectCarouselMini from "@/components/ui/project-carousel-mini";
import FormationCarouselMini from "@/components/ui/formation-carousel-mini";
import LightParticles from "@/components/ui/light-particles";
import { useState, useEffect } from "react";
import { useTranslatedData } from "@/hooks/useTranslatedData";

const groupedExperiences = getGroupedExperiences();

export default function Experiences() {
  const t = useTranslations('Pages.experiences');
  const { getTranslatedExperience, getTranslatedProject, getTranslatedFormation } = useTranslatedData();
  // Initialiser avec toutes les entreprises qui ont plusieurs expériences
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(
    new Set(
      groupedExperiences
        .filter((group) => group.experiences.length > 1)
        .map((group) => group.company)
    )
  );

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

  const toggleCompany = (company: string) => {
    const newExpanded = new Set(expandedCompanies);
    if (newExpanded.has(company)) {
      newExpanded.delete(company);
    } else {
      newExpanded.add(company);
    }
    setExpandedCompanies(newExpanded);
  };

  return (
    <div className="py-6 md:py-8 px-6 relative">
      <LightParticles />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          {/* Particules supplémentaires pour le header */}
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-blue-400/50 to-purple-400/50"
            style={{ left: "10%", top: "20%" }}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-purple-400/45 to-pink-400/45"
            style={{ left: "90%", top: "15%" }}
            animate={{
              scale: [1, 1.7, 1],
              opacity: [0.45, 0.85, 0.45],
            }}
            transition={{
              duration: 6.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.1,
            }}
          />
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-teal-400/55 to-cyan-400/55"
            style={{ left: "20%", top: "10%" }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.55, 1, 0.55],
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
          />
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400/50 to-green-400/50"
            style={{ left: "80%", top: "25%" }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 5.9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.4,
            }}
          />
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-indigo-400/65 to-blue-400/65"
            style={{ left: "35%", top: "18%" }}
            animate={{
              scale: [1, 1.9, 1],
              opacity: [0.65, 1, 0.65],
            }}
            transition={{
              duration: 3.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.9,
            }}
          />
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-rose-400/60 to-pink-400/60"
            style={{ left: "75%", top: "8%" }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.6,
            }}
          />

          <div className="relative z-10">
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
                style={{ width: "min(80vw, 400px)" }}
                animate={{
                  width: [
                    "min(80vw, 400px)",
                    "min(90vw, 500px)",
                    "min(80vw, 400px)",
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
              Mon parcours professionnel et mes réalisations principales
            </p>
          </div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

          <div className="space-y-8">
            {groupedExperiences.map((group, index) => (
              <motion.div
                key={group.company}
                id={group.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="hidden sm:block absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>

                <Card className="sm:ml-16 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {group.logoUrl ? (
                          <img
                            src={group.logoUrl}
                            alt={`Logo ${group.company}`}
                            className="h-10 w-10 rounded object-contain bg-white p-1 flex-shrink-0"
                          />
                        ) : (
                          <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                            <Building className="h-6 w-6 text-primary" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl mb-2">
                            {group.company}
                          </CardTitle>
                          <CardDescription className="text-base font-medium text-foreground">
                            {group.experiences.length > 1
                              ? `${group.experiences.length} ${t('positions')}`
                              : group.experiences[0].title}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center justify-start sm:justify-end gap-2 flex-shrink-0">
                        {group.experiences.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCompany(group.company)}
                            className="p-1 sweep-light"
                          >
                            {expandedCompanies.has(group.company) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                        <Badge variant="outline" className="text-sm">
                          {group.experiences.length > 1
                            ? t('multiplePositions')
                            : group.experiences[0].title.includes("Freelance")
                            ? "Freelance"
                            : group.experiences[0].title.includes("Founder")
                            ? "Entrepreneur"
                            : group.experiences[0].title.includes(
                                "Apprenticeship"
                              )
                            ? "Alternance"
                            : "CDI"}
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
                            return firstExp.date;
                          } else {
                            const startDate = firstExp.date.split(' - ')[0];
                            const endDate = lastExp.date.includes('Présent') || lastExp.date.includes('Present') ? 
                              (t('multiplePositions').includes('Multiple') ? 'Present' : 'Présent') : 
                              lastExp.date.split(' - ')[1];
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
                        {group.experiences.length} {t('position')}
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
                              opacity: expandedCompanies.has(group.company)
                                ? 1
                                : 0,
                              height: expandedCompanies.has(group.company)
                                ? "auto"
                                : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className={`overflow-hidden border-l-2 border-primary/20 pl-4 ${
                              expIndex > 0 ? "pt-4" : ""
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-foreground">
                                {translatedExp.title}
                              </h4>
                              <span className="text-sm text-muted-foreground">
                                {translatedExp.date}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {translatedExp.description}
                            </p>

                            <div className="mb-3">
                              <h5 className="font-medium text-sm mb-2">
                                {t('achievements')}
                              </h5>
                              <ul className="space-y-1">
                                {translatedExp.achievements
                                  .slice(0, 3)
                                  .map((achievement: string, idx: number) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-2 text-xs text-muted-foreground"
                                    >
                                      <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                                      {achievement}
                                    </li>
                                  ))}
                              </ul>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {translatedExp.technologies.slice(0, 6).map((tech: string) => (
                                <Badge
                                  key={tech}
                                  variant="secondary"
                                  className="text-xs"
                                >
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
                    {group.experiences.length === 1 && (() => {
                      const translatedExp = getTranslatedExperience(group.experiences[0]);
                      return (
                      <>
                        <p className="text-muted-foreground">
                          {translatedExp.description}
                        </p>

                        <div>
                          <h4 className="font-semibold mb-3">
                            {t('keyAchievements')}
                          </h4>
                          <ul className="space-y-2">
                            {translatedExp.achievements.map(
                              (achievement: string, idx: number) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                  {achievement}
                                </li>
                              )
                            )}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">
                            {t('technologiesUsed')}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {translatedExp.technologies.map((tech: string) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="text-xs"
                              >
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
                      const allRelatedProjects = group.experiences.flatMap(
                        (exp) => getProjectsByExperience(exp.id)
                      );
                      const uniqueProjects = allRelatedProjects.filter(
                        (project, index, self) =>
                          index === self.findIndex((p) => p.id === project.id)
                      );
                      const translatedProjects = uniqueProjects.map(project => getTranslatedProject(project));

                      return uniqueProjects.length > 0 ? (
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            {t('relatedProjects')}
                          </h4>
                          <ProjectCarouselMini
                            projects={translatedProjects as any}
                            itemsPerView={2}
                          />
                        </div>
                      ) : null;
                    })()}

                    {/* Formations associées (toutes les formations de toutes les expériences du groupe) */}
                    {(() => {
                      const allRelatedFormations = group.experiences.flatMap(
                        (exp) => getFormationsByExperience(exp)
                      );
                      const uniqueFormations = allRelatedFormations.filter(
                        (formation, index, self) =>
                          index === self.findIndex((f) => f.id === formation.id)
                      );
                      const translatedFormations = uniqueFormations.map(formation => getTranslatedFormation(formation));

                      return uniqueFormations.length > 0 ? (
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            {t('relatedFormations')}
                          </h4>
                          <FormationCarouselMini
                            formations={translatedFormations as any}
                            itemsPerView={2}
                          />
                        </div>
                      ) : null;
                    })()}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Career Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
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
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="relative z-10 text-center">
                <div className="text-4xl font-black text-primary mb-1 drop-shadow-lg">6+</div>
                <div className="text-sm text-muted-foreground">Années d'expérience</div>
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
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="relative z-10 text-center">
                <div className="text-4xl font-black text-primary mb-1 drop-shadow-lg">{getAllExperiences().length}</div>
                <div className="text-sm text-muted-foreground">Expériences</div>
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
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 1h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="relative z-10 text-center">
                <div className="text-4xl font-black text-primary mb-1 drop-shadow-lg">{groupedExperiences.length}</div>
                <div className="text-sm text-muted-foreground">Entreprises</div>
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
                <div className="text-4xl font-black text-primary mb-1 drop-shadow-lg">
                  {getAllExperiences().reduce(
                    (acc: number, exp: any) => acc + exp.technologies.length,
                    0
                  )}+
                </div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
