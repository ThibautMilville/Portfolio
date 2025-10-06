"use client";

import { motion } from "framer-motion";
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

const groupedExperiences = getGroupedExperiences();

export default function Experiences() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Expériences</h1>

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
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

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
                <div className="absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>

                <Card className="ml-16 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
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
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">
                            {group.company}
                          </CardTitle>
                          <CardDescription className="text-base font-medium text-foreground">
                            {group.experiences.length > 1
                              ? `${group.experiences.length} postes`
                              : group.experiences[0].title}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
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
                        <Badge variant="outline">
                          {group.experiences.length > 1
                            ? "Multiples postes"
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
                        {group.totalDuration}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {group.experiences[0].location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {group.experiences.length} poste
                        {group.experiences.length > 1 ? "s" : ""}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Affichage des postes individuels si plusieurs expériences */}
                    {group.experiences.length > 1 && (
                      <div className="space-y-4">
                        {group.experiences.map((exp, expIndex) => (
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
                                {exp.title}
                              </h4>
                              <span className="text-sm text-muted-foreground">
                                {exp.date}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {exp.description}
                            </p>

                            <div className="mb-3">
                              <h5 className="font-medium text-sm mb-2">
                                Réalisations :
                              </h5>
                              <ul className="space-y-1">
                                {exp.achievements
                                  .slice(0, 3)
                                  .map((achievement, idx) => (
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
                              {exp.technologies.slice(0, 6).map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tech}
                                </Badge>
                              ))}
                              {exp.technologies.length > 6 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{exp.technologies.length - 6}
                                </Badge>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Affichage pour une seule expérience */}
                    {group.experiences.length === 1 && (
                      <>
                        <p className="text-muted-foreground">
                          {group.experiences[0].description}
                        </p>

                        <div>
                          <h4 className="font-semibold mb-3">
                            Réalisations clés :
                          </h4>
                          <ul className="space-y-2">
                            {group.experiences[0].achievements.map(
                              (achievement, idx) => (
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
                            Technologies utilisées :
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {group.experiences[0].technologies.map((tech) => (
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
                    )}

                    {/* Projets associés (tous les projets de toutes les expériences du groupe) */}
                    {(() => {
                      const allRelatedProjects = group.experiences.flatMap(
                        (exp) => getProjectsByExperience(exp.id)
                      );
                      const uniqueProjects = allRelatedProjects.filter(
                        (project, index, self) =>
                          index === self.findIndex((p) => p.id === project.id)
                      );

                      return uniqueProjects.length > 0 ? (
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Projets associés
                          </h4>
                          <ProjectCarouselMini
                            projects={uniqueProjects}
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

                      return uniqueFormations.length > 0 ? (
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            Formations associées
                          </h4>
                          <FormationCarouselMini
                            formations={uniqueFormations}
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
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">6+</div>
              <div className="text-sm text-muted-foreground">
                Années d'expérience
              </div>
            </div>
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">
                {getAllExperiences().length}
              </div>
              <div className="text-sm text-muted-foreground">Expériences</div>
            </div>
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">
                {groupedExperiences.length}
              </div>
              <div className="text-sm text-muted-foreground">Entreprises</div>
            </div>
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">
                {getAllExperiences().reduce(
                  (acc, exp) => acc + exp.technologies.length,
                  0
                )}
                +
              </div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
