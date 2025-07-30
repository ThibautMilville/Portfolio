'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Building, Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from './card';
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

  // Utiliser les expériences groupées
  const groupedExperiences = getGroupedExperiences();

  React.useEffect(() => {
    setIsClient(true);
    setCardsToShow(getCardsToShow(groupedExperiences.length));
  }, [groupedExperiences.length]);

  React.useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow(groupedExperiences.length));
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

  // Simplification du carrousel
  const translateX = `-${startIndex * (100 / cardsToShow)}%`;

  if (!isClient) {
    return (
      <div className="relative max-w-4xl mx-auto flex items-center justify-center py-8">
        <div className="text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto flex items-center">
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
            {groupedExperiences.map((group, idx) => (
              <motion.div
                key={group.company}
                className="flex-shrink-0 w-full group"
                style={{ width: `calc(100% / ${cardsToShow})` }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/experiences#${group.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                  <Card className="relative h-full border border-border/50 rounded-2xl shadow-lg bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 group-hover:border-primary/30 overflow-hidden cursor-pointer">
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
                      {group.experiences.length > 1 ? group.experiences[0].title : group.experiences[0].title}
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
              </motion.div>
            ))}
          </motion.div>
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