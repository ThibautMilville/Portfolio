'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar, Users, Clock, CheckCircle, AlertCircle, Pause, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { getProjectById, getRelatedExperience, getRelatedFormations } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProjectGallery from '@/components/ui/project-gallery';
import LightParticles from '@/components/ui/light-particles';
import ProjectTimeline from '@/components/ProjectTimeline';
import { useParams } from 'next/navigation';

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Terminé':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'En cours':
      return <AlertCircle className="h-4 w-4 text-blue-500" />;
    case 'En pause':
      return <Pause className="h-4 w-4 text-yellow-500" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Terminé':
      return 'bg-green-500/10 text-green-700 border-green-500/20';
    case 'En cours':
      return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
    case 'En pause':
      return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
    default:
      return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
  }
};

export default function ProjectPage() {
  const params = useParams<{ id: string }>();
  const projectId = params?.id ? parseInt(params.id) : NaN;
  const project = getProjectById(projectId);
  
  if (!project) {
    notFound();
  }

  const relatedExperience = getRelatedExperience(project);
  const relatedFormations = getRelatedFormations(project);

  return (
    <div className="min-h-screen bg-background relative">
      <LightParticles />
      {/* Header avec navigation */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative z-10">
        <div className="container mx-auto px-6 py-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link href={`/projets${(typeof window !== 'undefined' && window.sessionStorage.getItem('projetsPage')) ? `?page=${window.sessionStorage.getItem('projetsPage')}` : ''}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux projets
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
          {/* Hero Section avec Galerie */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Galerie et actions */}
              <div>
                {project.screenshots && project.screenshots.length > 0 ? (
                  <ProjectGallery images={project.screenshots} title={project.title} />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative overflow-hidden rounded-2xl shadow-2xl"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </motion.div>
                )}

                {/* Actions */}
                <div className="flex gap-4 mt-6">
                  <Button asChild className="flex-1">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Voir le code
                    </a>
                  </Button>
                  {project.demo && (
                    <Button variant="outline" asChild className="flex-1">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {['Showcase','E-commerce','Corporate'].includes(project.category) ? 'Voir le site' : 'Voir la démo'}
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Informations du projet */}
              <div className="space-y-6">
                <div>
                  <Badge variant="outline" className="mb-3">
                    {project.category}
                  </Badge>
                  <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>

                {/* Périodes de travail (timeline) */}
                {project.periods && project.periods.length > 1 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Périodes de travail</h3>
                    <ProjectTimeline periods={project.periods} />
                  </div>
                )}

                {/* Métadonnées */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {project.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {project.duration}
                  </div>
                  {project.teamSize && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {project.teamSize} personne{project.teamSize > 1 ? 's' : ''}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    {getStatusIcon(project.status)}
                    <Badge variant="outline" className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Technologies utilisées</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu détaillé */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Fonctionnalités */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Fonctionnalités
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Défis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    Défis rencontrés
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                    Solutions apportées
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Rôle et contribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <Card>
              <CardHeader>
                <CardTitle>Mon rôle dans ce projet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{project.role}</h4>
                    <p className="text-muted-foreground text-sm">
                      Contribution principale au développement et à l'architecture du projet
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Expérience et Formations associées */}
          {(relatedExperience || relatedFormations.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Expérience associée */}
                {relatedExperience && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                          <Calendar className="h-5 w-5 text-blue-500" />
                        </div>
                        Expérience associée
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-lg">{relatedExperience.title}</h4>
                          <p className="text-primary font-medium">{relatedExperience.company}</p>
                          <p className="text-sm text-muted-foreground">{relatedExperience.date}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{relatedExperience.description}</p>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Technologies utilisées :</h5>
                          <div className="flex flex-wrap gap-1">
                            {relatedExperience.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Formations associées */}
                {relatedFormations.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-green-500/10">
                          <GraduationCap className="h-5 w-5 text-green-500" />
                        </div>
                        Formations associées
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {relatedFormations.map((formation) => (
                          <div key={formation.id} className="border-l-2 border-primary/20 pl-4">
                            <h4 className="font-semibold text-sm">{formation.title}</h4>
                            <p className="text-primary font-medium text-xs">{formation.institution}</p>
                            <p className="text-xs text-muted-foreground">{formation.date}</p>
                            <div className="mt-2">
                              <div className="flex flex-wrap gap-1">
                                {formation.skills.slice(0, 3).map((skill) => (
                                  <Badge key={skill} variant="secondary" className="text-xs">
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