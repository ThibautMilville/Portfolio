"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Pause,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import ProjectGallery from "@/components/ui/project-gallery";
import LightParticles from "@/components/ui/light-particles";
import ProjectTimeline from "@/components/ProjectTimeline";
import type { Project, Experience, Formation } from "@/lib/data";
import { useTranslations } from "next-intl";
import { useTranslatedData } from "@/hooks/useTranslatedData";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Terminé":
    case "Completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "En cours":
    case "In Progress":
      return <AlertCircle className="h-4 w-4 text-blue-500" />;
    case "En pause":
    case "Paused":
      return <Pause className="h-4 w-4 text-yellow-500" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Terminé":
    case "Completed":
      return "bg-green-500/20 text-green-800 dark:text-green-200 border-green-500/40 dark:border-green-400/40";
    case "En cours":
    case "In Progress":
      return "bg-blue-500/20 text-blue-800 dark:text-blue-200 border-blue-500/40 dark:border-blue-400/40";
    case "En pause":
    case "Paused":
      return "bg-yellow-500/20 text-yellow-800 dark:text-yellow-200 border-yellow-500/40 dark:border-yellow-400/40";
    default:
      return "bg-gray-500/20 text-gray-800 dark:text-gray-200 border-gray-500/40 dark:border-gray-400/40";
  }
};

export default function ClientProjectPage({
  project,
  relatedExperience,
  relatedFormations,
}: {
  project: Project;
  relatedExperience?: Experience;
  relatedFormations: Formation[];
}) {
  const t = useTranslations("Pages.projets");
  const {
    getTranslatedProject,
    getTranslatedExperience,
    getTranslatedFormation,
  } = useTranslatedData();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const translatedProject = getTranslatedProject(project);
  const translatedExperience = relatedExperience
    ? getTranslatedExperience(relatedExperience)
    : undefined;
  const translatedFormations = relatedFormations.map((formation) =>
    getTranslatedFormation(formation)
  );

  return (
    <div className="min-h-screen bg-background relative">
      <LightParticles />
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative z-10">
        <div className="container mx-auto px-6 py-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link
              href={`/projets${
                isClient && window.sessionStorage.getItem("projetsPage")
                  ? `?page=${window.sessionStorage.getItem("projetsPage")}`
                  : ""
              }`}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backToProjects")}
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                {translatedProject.screenshots &&
                translatedProject.screenshots.length > 0 ? (
                  <ProjectGallery
                    images={translatedProject.screenshots}
                    title={translatedProject.title}
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative overflow-hidden rounded-2xl shadow-2xl"
                  >
                    <img
                      src={translatedProject.image}
                      alt={translatedProject.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </motion.div>
                )}

                <div className="flex gap-4 mt-6">
                  <Button asChild className="flex-1">
                    <a
                      href={translatedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      {t("viewCode")}
                    </a>
                  </Button>
                  {translatedProject.demo && (
                    <Button
                      variant="outline"
                      asChild
                      className="flex-1 sweep-light"
                    >
                      <a
                        href={translatedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {translatedProject.title ===
                        "Ashes of Mankind - Empires"
                          ? t("viewGame")
                          : ["Showcase", "E-commerce", "Corporate"].includes(
                              translatedProject.category
                            )
                          ? t("viewSite")
                          : t("viewDemo")}
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Badge
                    variant="outline"
                    className="mb-3 dark:bg-black dark:text-white dark:border-white/20"
                  >
                    {translatedProject.category}
                  </Badge>
                  <h1 className="text-4xl font-bold mb-4">
                    {translatedProject.title}
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {translatedProject.longDescription}
                  </p>
                </div>

                {translatedProject.periods &&
                  translatedProject.periods.length > 1 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        {t("workPeriods")}
                      </h3>
                      <ProjectTimeline periods={translatedProject.periods} />
                    </div>
                  )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {translatedProject.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {translatedProject.duration}
                  </div>
                  {translatedProject.teamSize && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {translatedProject.teamSize}{" "}
                      {translatedProject.teamSize > 1
                        ? t("peoplePlural")
                        : t("people")}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    {getStatusIcon(translatedProject.status)}
                    <Badge
                      variant="outline"
                      className={getStatusColor(translatedProject.status)}
                    >
                      {translatedProject.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {t("technologiesUsed")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {translatedProject.technologies.map((tech: string) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    {t("features")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {translatedProject.features.map(
                      (feature: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                          {feature}
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-green-500" />
                    {t("challenges")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {translatedProject.challenges.map(
                      (challenge: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                          {challenge}
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                    {t("solutions")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {translatedProject.solutions.map(
                      (solution: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                          {solution}
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <Card>
              <CardHeader>
                <CardTitle>{t("myRole")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{translatedProject.role}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t("mainContribution")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {(relatedExperience || relatedFormations.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {translatedExperience && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                          <Calendar className="h-5 w-5 text-blue-500" />
                        </div>
                        {t("relatedExperience")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-lg">
                            {translatedExperience.title}
                          </h4>
                          <p className="text-primary font-medium">
                            {translatedExperience.company}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {translatedExperience.date}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {translatedExperience.description}
                        </p>
                        <div>
                          <h5 className="font-medium text-sm mb-2">
                            {t("technologiesUsedInExperience")}
                          </h5>
                          <div className="flex flex-wrap gap-1">
                            {translatedExperience.technologies.map(
                              (tech: string) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tech}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {translatedFormations.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-green-500/10">
                          <GraduationCap className="h-5 w-5 text-green-500" />
                        </div>
                        {t("relatedFormations")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {translatedFormations.map((formation) => (
                          <div
                            key={formation.id}
                            className="border-l-2 border-primary/20 pl-4"
                          >
                            <h4 className="font-semibold text-sm">
                              {formation.title}
                            </h4>
                            <p className="text-primary font-medium text-xs">
                              {formation.institution}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formation.date}
                            </p>
                            <div className="mt-2">
                              <div className="flex flex-wrap gap-1">
                                {formation.skills
                                  .slice(0, 3)
                                  .map((skill: string) => (
                                    <Badge
                                      key={skill}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
