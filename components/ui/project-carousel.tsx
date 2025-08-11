'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, ExternalLink, Calendar, Users } from 'lucide-react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Button } from './button';
import Link from 'next/link';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  date: string;
  status: string;
  github: string;
  demo: string | null;
  category: string;
  role?: string;
  duration?: string;
  teamSize?: number;
}

interface ProjectCarouselProps {
  projects: Project[];
  isFeatured?: boolean; // Pour distinguer les projets phares
}

const statusColors: Record<string, string> = {
  'Terminé': 'bg-green-500/90 text-white',
  'En cours': 'bg-yellow-500/90 text-white',
  'En pause': 'bg-orange-500/90 text-white',
  'Annulé': 'bg-red-500/90 text-white',
};

export default function ProjectCarousel({ projects, isFeatured = false }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculer combien de cartes afficher selon le type et la taille d'écran
  const getCardsToShow = () => {
    if (isFeatured) return 1; // Projets phares : 1 carte en pleine largeur
    if (typeof window === 'undefined') return 3;
    const width = window.innerWidth;
    if (width < 640) return 1; // mobile
    if (width < 1024) return 2; // tablet
    return 3; // desktop
  };

  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());

  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFeatured]);

  const maxIndex = Math.max(0, projects.length - cardsToShow);

  const next = () => {
    if (isAnimating || currentIndex >= maxIndex) return;
    setIsAnimating(true);
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prev = () => {
    if (isAnimating || currentIndex <= 0) return;
    setIsAnimating(true);
    setCurrentIndex(prev => Math.max(prev - 1, 0));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucun projet à afficher</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Conteneur principal */}
      <div className="relative overflow-hidden">
        {/* Container avec défilement horizontal */}
        <div 
          className="flex transition-transform duration-300 ease-in-out gap-6"
          style={{
            transform: `translateX(-${currentIndex * (isFeatured ? 100 : 100/cardsToShow)}%)`
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0"
              style={{ width: isFeatured ? 'calc(100% - 1.5rem)' : `calc(${100 / cardsToShow}% - 1.5rem)` }}
            >
              <Link href={`/projets/${project.id}`}>
                <Card className={`group cursor-pointer h-full overflow-hidden border-0 bg-gradient-to-br from-card/80 to-background/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isFeatured ? 'min-h-[600px]' : ''}`}>
                  {/* Image avec overlay */}
                  <div className={`relative w-full overflow-hidden ${isFeatured ? 'h-80' : 'h-48'}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      draggable={false}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className={`text-xs px-3 py-1 rounded-full font-semibold shadow ${statusColors[project.status] || 'bg-muted text-foreground'}`}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 z-10">
                      <Badge variant="secondary" className="text-xs px-3 py-1 rounded-full bg-white/90 text-primary border-0 font-semibold shadow">
                        {project.category}
                      </Badge>
                    </div>

                    {/* Icône de flèche sur hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <ChevronRight className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Contenu */}
                  <CardContent className={`flex flex-col h-full ${isFeatured ? 'p-8' : 'p-6'}`}>
                    <div className="flex-1 space-y-4">
                                              {/* Titre */}
                        <h3 className={`font-bold text-primary transition-all line-clamp-2 ${isFeatured ? 'text-3xl' : 'text-xl'}`}>
                          {project.title}
                        </h3>
                      
                      {/* Description */}
                      <p className={`text-muted-foreground leading-relaxed line-clamp-3 ${isFeatured ? 'text-lg' : 'text-sm'}`}>
                        {project.description}
                      </p>

                      {/* Métadonnées */}
                      <div className="space-y-2">
                        {project.date && (
                          <div className={`flex items-center gap-2 text-muted-foreground ${isFeatured ? 'text-sm' : 'text-xs'}`}>
                            <Calendar className={isFeatured ? "h-4 w-4" : "h-3 w-3"} />
                            <span>{project.date}</span>
                          </div>
                        )}
                        {project.role && (
                          <div className={`flex items-center gap-2 text-muted-foreground ${isFeatured ? 'text-sm' : 'text-xs'}`}>
                            <Users className={isFeatured ? "h-4 w-4" : "h-3 w-3"} />
                            <span>{project.role}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Technologies */}
                      <div>
                        <h4 className={`font-semibold text-foreground mb-2 ${isFeatured ? 'text-base' : 'text-xs'}`}>Technologies</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, isFeatured ? 6 : 3).map((tech, i) => (
                            <Badge
                              key={tech + i}
                              variant="outline"
                              className={`rounded-full font-medium bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-primary/20 ${isFeatured ? 'text-sm px-3 py-1' : 'text-xs px-2 py-1'}`}
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > (isFeatured ? 6 : 3) && (
                            <Badge variant="outline" className={`rounded-full text-muted-foreground ${isFeatured ? 'text-sm px-3 py-1' : 'text-xs px-2 py-1'}`}>
                              +{project.technologies.length - (isFeatured ? 6 : 3)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className={`flex gap-2 mt-6 pt-4 border-t border-border/50 ${isFeatured ? 'gap-3' : ''}`}>
                      <Button 
                        variant="outline" 
                        size={isFeatured ? "lg" : "sm"}
                        className="flex-1 flex items-center gap-1 font-semibold"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(project.github, '_blank');
                        }}
                      >
                        <Github className={isFeatured ? "h-4 w-4" : "h-3 w-3"} /> Code
                      </Button>
                      {project.demo && (
                        <Button 
                          size={isFeatured ? "lg" : "sm"}
                          className="flex-1 flex items-center gap-1 font-semibold"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!project.demo) return;
                            window.open(project.demo, '_blank');
                          }}
                        >
                          <ExternalLink className={isFeatured ? "h-4 w-4" : "h-3 w-3"} /> Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        {/* Boutons de navigation */}
        <div className="flex gap-3">
          <button
            onClick={prev}
            disabled={currentIndex === 0 || isAnimating}
            className="p-3 rounded-full bg-background/90 border shadow-lg hover:bg-primary/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Précédent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex || isAnimating}
            className="p-3 rounded-full bg-background/90 border shadow-lg hover:bg-primary/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Suivant"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Indicateurs */}
        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-muted hover:bg-muted-foreground'
              }`}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Compteur */}
        <div className="text-sm text-muted-foreground">
          {currentIndex + 1} / {maxIndex + 1}
        </div>
      </div>
    </div>
  );
} 