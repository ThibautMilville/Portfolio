"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  ExternalLink,
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
import LightParticles from "@/components/ui/light-particles";
import { getAllFormations } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';

const formations = getAllFormations();

export default function Formations() {
  return (
    <div className="py-6 md:py-8 px-6 relative">
      <LightParticles />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Formations & Certifications
          </h1>

          {/* Barre horizontale stylisée moderne et dynamique */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full shadow-lg"
              style={{ width: "min(80vw, 500px)" }}
              animate={{
                width: [
                  "min(80vw, 500px)",
                  "min(90vw, 600px)",
                  "min(80vw, 500px)",
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
            Mon parcours académique et mes certifications professionnelles
          </p>
        </motion.div>

        {/* Section Diplômes avec Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Diplômes
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

            <div className="space-y-8">
              {formations
                .filter((f: any) => f.type === "Diplôme")
                .map((formation: any, index: number) => (
                  <motion.div
                    key={formation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    id={formation.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="hidden sm:block absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>

                    <Card className="sm:ml-16 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex items-start gap-4">
                            {formation.logoUrl ? (
                              <img
                                src={formation.logoUrl}
                                alt={`Logo ${formation.institution}`}
                                className="h-10 w-10 rounded object-contain bg-white p-1 flex-shrink-0"
                              />
                            ) : (
                              <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                                <GraduationCap className="h-6 w-6 text-primary" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-xl mb-2">
                                {formation.title}
                              </CardTitle>
                              <CardDescription className="text-base">
                                {formation.institution}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex justify-start sm:justify-end">
                            <Badge
                              variant="outline"
                              className="px-2 py-1 rounded-full bg-primary/10 text-primary text-sm"
                            >
                              {formation.type}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formation.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {formation.location}
                          </div>
                          {formation.mention && (
                            <div className="flex items-center gap-1">
                              <Award className="h-4 w-4" />
                              {formation.mention}
                            </div>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          {formation.description}
                        </p>

                        <div className="space-y-2">
                          <p className="text-sm font-medium">
                            Compétences acquises :
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {formation.skills.map((skill: string) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {formation.credentialUrl && (
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="sweep-light"
                            >
                              <a
                                href={formation.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Vérifier la certification
                              </a>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>

        {/* Section Certifications avec Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Certifications
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

            <div className="space-y-8">
              {formations
                .filter((f: any) => f.type === "Certification")
                .map((formation: any, index: number) => (
                  <motion.div
                    key={formation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    id={formation.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="hidden sm:block absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>

                    <Card className="sm:ml-16 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex items-start gap-4">
                            {formation.logoUrl ? (
                              <img
                                src={formation.logoUrl}
                                alt={`Logo ${formation.institution}`}
                                className="h-10 w-10 rounded object-contain bg-white p-1 flex-shrink-0"
                              />
                            ) : (
                              <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                                <GraduationCap className="h-6 w-6 text-primary" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-xl mb-2">
                                {formation.title}
                              </CardTitle>
                              <CardDescription className="text-base">
                                {formation.institution}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex justify-start sm:justify-end">
                            <Badge
                              variant="outline"
                              className="px-2 py-1 rounded-full bg-primary/10 text-primary text-sm"
                            >
                              {formation.type}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formation.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {formation.location}
                          </div>
                          {formation.mention && (
                            <div className="flex items-center gap-1">
                              <Award className="h-4 w-4" />
                              {formation.mention}
                            </div>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          {formation.description}
                        </p>

                        <div className="space-y-2">
                          <p className="text-sm font-medium">
                            Compétences acquises :
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {formation.skills.map((skill: string) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {formation.credentialUrl && (
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="sweep-light"
                            >
                              <a
                                href={formation.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Vérifier la certification
                              </a>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>

        {/* Section Badges de cours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Badges de cours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Carte cours: badge Cisco */}
            <CourseCard 
              title="Cisco – Introduction to Cybersecurity"
              imageSrc="/images/education/badge-cybersecurity.png"
              pdfHref="/documents/badge-cisco-certification.pdf"
              organization="Cisco"
              date="Octobre 2025"
            />
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
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
                <div className="text-4xl font-black text-primary mb-1 drop-shadow-lg">5+</div>
                <div className="text-sm text-muted-foreground">
                  Années d'études
                </div>
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
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="relative z-10 text-center">
                <div className="text-4xl font-black text-primary mb-1 drop-shadow-lg">
                  {formations.filter((f: any) => f.type === "Diplôme").length}
                </div>
                <div className="text-sm text-muted-foreground">Diplômes</div>
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
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="relative z-10 text-center">
                <div className="text-4xl font-black text-primary mb-1 drop-shadow-lg">
                  {formations.filter((f: any) => f.type === "Certification").length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Certifications
                </div>
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
                <div className="text-4xl font-black text-primary mb-1 drop-shadow-lg">1</div>
                <div className="text-sm text-muted-foreground">Badges</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Carte de cours avec tooltip + modale
function CourseCard({ title, imageSrc, pdfHref, organization, date }: { 
  title: string; 
  imageSrc: string; 
  pdfHref?: string;
  organization: string;
  date: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="relative h-full rounded-3xl shadow-xl bg-gradient-to-br from-zinc-900/95 via-zinc-800/90 to-zinc-900/95 dark:from-zinc-900/95 dark:via-zinc-800/90 dark:to-zinc-900/95 from-white/95 via-gray-50/90 to-white/95 backdrop-blur-md border-2 border-zinc-600/80 dark:border-zinc-600/80 border-gray-300/80 hover:border-primary/40 dark:hover:border-primary/40 hover:border-blue-400/50 hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-primary/20 transition-all duration-300 group-hover:-translate-y-2 overflow-hidden cursor-pointer ring-1 ring-zinc-800/50 dark:ring-zinc-800/50 ring-gray-200/50">
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src={imageSrc} alt={title} className="w-full h-full object-contain" />
              </div>
            </div>
            
            <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2 text-center">
              {title}
            </h3>
            
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">Organisme:</span>
                <span>{organization}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">Date:</span>
                <span>{date}</span>
              </div>
            </div>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:w-auto max-w-xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 pt-8">
        <DialogHeader className="pr-10 mb-4">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Cours suivi et justificatif</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="rounded-lg overflow-hidden bg-muted flex items-center justify-center p-4">
            <img src={imageSrc} alt={title} className="max-h-60 object-contain" />
          </div>
          <div className="text-sm text-muted-foreground">
            Date d'obtention: {date}
          </div>
          <div className="text-sm text-muted-foreground">
            Organisme: {organization}
          </div>
          {pdfHref ? (
            <div className="text-sm">
              <a
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                Consulter le document (PDF)
              </a>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
