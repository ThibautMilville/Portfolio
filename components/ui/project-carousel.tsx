'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';
import { Button } from './button';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  date: string;
  status: string;
  github: string;
  demo?: string;
  category: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

const getCardsToShow = (totalProjects: number) => {
  if (typeof window === 'undefined') return Math.min(1, totalProjects);
  const width = window.innerWidth;
  let cards = 1;
  if (width >= 1024) cards = 3;
  else if (width >= 640) cards = 2;
  // Ne jamais afficher plus de cards qu'on en a
  return Math.min(cards, totalProjects);
};

const statusColors: Record<string, string> = {
  'Terminé': 'bg-green-500/90 text-white',
  'En cours': 'bg-yellow-500/90 text-white',
  'Annulé': 'bg-red-500/90 text-white',
};

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(getCardsToShow(projects.length));
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow(projects.length));
    };
    window.addEventListener('resize', handleResize);
    setCardsToShow(getCardsToShow(projects.length));
    return () => window.removeEventListener('resize', handleResize);
  }, [projects.length]);

  // Pour peu de projets, on ne fait pas d'infini
  const shouldUseInfinite = projects.length > cardsToShow;
  
  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (shouldUseInfinite) {
      setStartIndex((prev) => (prev + 1) % projects.length);
    } else {
      setStartIndex((prev) => Math.min(prev + 1, projects.length - cardsToShow));
    }
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (shouldUseInfinite) {
      setStartIndex((prev) => (prev - 1 + projects.length) % projects.length);
    } else {
      setStartIndex((prev) => Math.max(prev - 1, 0));
    }
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Si on a peu de projets, on n'utilise pas l'extension
  const displayProjects = shouldUseInfinite 
    ? [...projects, ...projects, ...projects]
    : projects;
    
  const translateX = shouldUseInfinite
    ? `calc(-${(startIndex + projects.length) * (100 / cardsToShow)}% - ${(startIndex + projects.length) * 1.5}rem)`
    : `calc(-${startIndex * (100 / cardsToShow)}% - ${startIndex * 1.5}rem)`;

  return (
    <div className="relative max-w-4xl mx-auto flex items-center">
      {/* Fade mask gauche */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-12 z-30" style={{ background: 'linear-gradient(to right, var(--background, #fff), transparent)' }} />
      {/* Fade mask droite */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 z-30" style={{ background: 'linear-gradient(to left, var(--background, #fff), transparent)' }} />
      
      {/* Flèches à l'extérieur */}
      <button
        onClick={prev}
        className="hidden sm:flex items-center justify-center absolute left-[-2.5rem] md:left-[-3.5rem] top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-background/90 border shadow-lg hover:bg-primary/10 transition-all duration-200"
        aria-label="Précédent"
        style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)' }}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <div className="w-full">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            initial={false}
            animate={{ 
              x: translateX
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 30,
              duration: 0.3
            }}
          >
            {displayProjects.map((project, idx) => (
              <motion.div
                key={project.id + '-' + idx}
                className="flex-1 min-w-0 max-w-xs rounded-3xl border border-border bg-gradient-to-br from-card/80 to-background/60 shadow-xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/60"
                style={{ flexBasis: `calc(100%/${cardsToShow} - 1.5rem)` }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image + overlay + badges */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    draggable={false}
                  />
                  {/* Overlay glassmorphism */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold shadow ${statusColors[project.status] || 'bg-muted text-foreground'}`}>{project.status}</span>
                    <span className="text-xs px-3 py-1 rounded-full bg-white/80 text-primary border border-primary/20 font-semibold shadow">{project.category}</span>
                  </div>
                </div>
                {/* Content glassmorphism */}
                <div className="flex-1 flex flex-col p-5 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-b-3xl">
                  <h3 className="text-xl font-bold mb-2 text-primary group-hover:underline transition-all">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 flex-1 line-clamp-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span key={tech + i} className="text-xs px-2 py-1 rounded-full font-medium bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20 shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Button variant="secondary" size="sm" asChild className="flex-1 flex items-center gap-2 font-semibold shadow hover:shadow-lg">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" /> Code
                      </a>
                    </Button>
                    {project.demo && (
                      <Button size="sm" asChild className="flex-1 flex items-center gap-2 font-semibold shadow hover:shadow-lg">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" /> Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* Dots indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: projects.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => setStartIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === startIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-muted hover:bg-muted-foreground'
              }`}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>
        {/* Slide counter */}
        <div className="text-center mt-4 text-sm text-muted-foreground">
          {startIndex + 1} / {projects.length}
        </div>
      </div>
      <button
        onClick={next}
        className="hidden sm:flex items-center justify-center absolute right-[-2.5rem] md:right-[-3.5rem] top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-background/90 border shadow-lg hover:bg-primary/10 transition-all duration-200"
        aria-label="Suivant"
        style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)' }}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
} 