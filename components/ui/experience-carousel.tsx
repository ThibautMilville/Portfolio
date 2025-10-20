'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Building, Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './dialog';
import { getGroupedExperiences } from '@/lib/data';
import Link from 'next/link';

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
  technologies: string[];
  achievements: string[];
  projectIds?: number[];
  relatedFormationIds?: number[];
  logoUrl?: string;
}

interface GroupedExperience {
  company: string;
  experiences: Experience[];
  totalDuration: string;
  logoUrl?: string;
}

interface ExperienceCarouselProps {
  experiences?: Experience[]; // Gardé pour compatibilité
}

const getCardsToShow = (totalGroups: number) => {
  if (typeof window === 'undefined') return 1;
  const width = window.innerWidth;
  let cards = 1;
  if (width >= 1024) cards = 3;
  else if (width >= 640) cards = 2;
  return Math.min(cards, totalGroups);
};

export default function ExperienceCarousel({ experiences }: ExperienceCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Utiliser les expériences groupées
  const groupedExperiences = getGroupedExperiences();

  React.useEffect(() => {
    setIsClient(true);
    setCardsToShow(getCardsToShow(groupedExperiences.length));
    setIsMobile(typeof window !== 'undefined' ? window.innerWidth < 640 : false);
  }, [groupedExperiences.length]);

  React.useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow(groupedExperiences.length));
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    setCardsToShow(getCardsToShow(groupedExperiences.length));
    return () => window.removeEventListener('resize', handleResize);
  }, [groupedExperiences.length]);

  const shouldUseInfinite = groupedExperiences.length > cardsToShow;
  
  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (shouldUseInfinite) {
      setStartIndex((prev) => (prev + 1) % groupedExperiences.length);
    } else {
      setStartIndex((prev) => Math.min(prev + 1, groupedExperiences.length - cardsToShow));
    }
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (shouldUseInfinite) {
      setStartIndex((prev) => (prev - 1 + groupedExperiences.length) % groupedExperiences.length);
    } else {
      setStartIndex((prev) => Math.max(prev - 1, 0));
    }
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Calcul de translation mathématiquement correct
  const translateX = `calc(-${startIndex} * ((100% - ${(cardsToShow - 1)}rem) / ${cardsToShow} + 1rem))`;

  if (!isClient) {
    return (
      <div className="relative max-w-4xl mx-auto flex items-center justify-center py-8">
        <div className="text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative flex items-center">
        <button
          onClick={prev}
          className="hidden sm:flex items-center justify-center absolute left-[-2.5rem] md:left-[-3.5rem] top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-background/90 border shadow-lg hover:bg-primary/10 transition-all duration-200"
          aria-label="Précédent"
          style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)' }}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="w-full">
          <div className="overflow-hidden py-2">
            <motion.div
              className="flex gap-4"
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
              {groupedExperiences.map((group, idx) => (
                <motion.div
                  key={group.company}
                  className="flex-shrink-0 w-full group"
                  style={{ width: `calc((100% - ${(cardsToShow - 1)}rem) / ${cardsToShow})` }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.3 }}
                >
                {isMobile ? (
                  <Link href={`/experiences#${group.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                    <Card className="relative h-full rounded-2xl shadow-xl border border-border bg-card/80 supports-[backdrop-filter]:backdrop-blur-md ring-1 ring-black/5 transition-all duration-300 group-hover:-translate-y-2 hover:shadow-2xl hover:ring-primary/30 overflow-hidden cursor-pointer">
                      <div className="p-6 pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {group.logoUrl ? (
                              <img 
                                src={group.logoUrl} 
                                alt={`Logo ${group.company}`}
                                className="h-12 w-12 rounded object-contain bg-white p-1"
                              />
                            ) : (
                              <div className="p-2 rounded-lg bg-blue-500/90 text-white">
                                <Building className="h-8 w-8" />
                              </div>
                            )}
                          </div>
                          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {group.experiences.length > 1 ? 'Multiples postes' : 'Expérience'}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {group.company}
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium mb-3">
                          {group.experiences[0].title}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {group.totalDuration}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {group.experiences[0].location}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="relative h-full rounded-2xl shadow-xl border border-border bg-card/80 supports-[backdrop-filter]:backdrop-blur-md ring-1 ring-black/5 transition-all duration-300 group-hover:-translate-y-2 hover:shadow-2xl hover:ring-primary/30 overflow-hidden cursor-pointer">
                      <div className="p-6 pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {group.logoUrl ? (
                              <img 
                                src={group.logoUrl} 
                                alt={`Logo ${group.company}`}
                                className="h-12 w-12 rounded object-contain bg-white p-1"
                              />
                            ) : (
                              <div className="p-2 rounded-lg bg-blue-500/90 text-white">
                                <Building className="h-8 w-8" />
                              </div>
                            )}
                          </div>
                          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {group.experiences.length > 1 ? 'Multiples postes' : 'Expérience'}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {group.company}
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium mb-3">
                          {group.experiences[0].title}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {group.totalDuration}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {group.experiences[0].location}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] sm:w-auto max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                    <DialogHeader>
                      <div className="flex items-center gap-4 mb-4">
                        {group.logoUrl ? (
                          <img 
                            src={group.logoUrl} 
                            alt={`Logo ${group.company}`}
                            className="h-16 w-16 rounded object-contain bg-white p-2"
                          />
                        ) : (
                          <div className="p-3 rounded-lg bg-blue-500/90 text-white">
                            <Building className="h-8 w-8" />
                          </div>
                        )}
                        <div>
                          <DialogTitle className="text-2xl">{group.company}</DialogTitle>
                          <DialogDescription className="text-lg font-medium text-foreground">
                            {group.experiences[0].title}
                          </DialogDescription>
                        </div>
                      </div>
                    </DialogHeader>

                    <div className="space-y-6">
                      {/* Informations principales */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex gap-2 text-sm items-start">
                          <Calendar className="h-4 w-4 text-primary mt-0.5" />
                          <div className="grid grid-cols-[auto,1fr] gap-x-2">
                            <span className="font-medium whitespace-nowrap">Durée :</span>
                            <span className="break-words">{group.totalDuration}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 text-sm items-start">
                          <MapPin className="h-4 w-4 text-primary mt-0.5" />
                          <div className="grid grid-cols-[auto,1fr] gap-x-2">
                            <span className="font-medium whitespace-nowrap">Lieu :</span>
                            <span className="break-words">{group.experiences[0].location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Détails des postes */}
                      <div className="space-y-4">
                        {group.experiences.map((exp, i) => (
                          <div key={i} className="p-4 rounded-xl border bg-card/60">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold">{exp.title}</h4>
                              <span className="text-xs text-muted-foreground">{exp.date}</span>
                            </div>
                            {exp.description ? (
                              <p className="text-sm text-muted-foreground mb-2">{exp.description}</p>
                            ) : null}
                            {exp.technologies && exp.technologies.length > 0 ? (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {exp.technologies.map((tech, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-muted rounded-full text-xs">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>

                      {/* Lien vers la page expériences */}
                      <div className="pt-4 border-t">
                        <a 
                          href={`/experiences#${group.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Voir sur la page expériences
                        </a>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                )}
                </motion.div>
              ))}
            </motion.div>
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
      {groupedExperiences.length > cardsToShow && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.ceil(groupedExperiences.length / cardsToShow) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setStartIndex(index * cardsToShow)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                Math.floor(startIndex / cardsToShow) === index
                  ? 'bg-primary scale-125' 
                  : 'bg-muted hover:bg-muted-foreground'
              }`}
              aria-label={`Aller à la page ${index + 1}`}
            />
          ))}
        </div>
      )}
      <div className="text-center mt-4 text-sm text-muted-foreground">
        {Math.floor(startIndex / cardsToShow) + 1} / {Math.ceil(groupedExperiences.length / cardsToShow)}
      </div>
    </div>
  );
} 