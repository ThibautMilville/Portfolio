'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, GraduationCap, Award, BookOpen } from 'lucide-react';
import { Card, CardContent } from './card';

interface Formation {
  id: number;
  title: string;
  institution: string;
  location: string;
  date: string;
  description: string;
  skills: string[];
  mention: string;
  type: "Diplôme" | "Certification" | "Formation";
  projectIds?: number[];
  relatedExperienceIds?: number[];
  credentialUrl?: string;
  logoUrl?: string;
}

interface FormationCarouselProps {
  formations: Formation[];
}

const getCardsToShow = (totalFormations: number) => {
  if (typeof window === 'undefined') return 1;
  const width = window.innerWidth;
  let cards = 1;
  if (width >= 1024) cards = 3;
  else if (width >= 640) cards = 2;
  // Ne jamais afficher plus de cards qu'on en a
  return Math.min(cards, totalFormations);
};

const typeColors: Record<string, string> = {
  'diplôme': 'bg-blue-500/90 text-white',
  'certification': 'bg-green-500/90 text-white',
  'formation': 'bg-purple-500/90 text-white',
};

export default function FormationCarousel({ formations }: FormationCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
    setCardsToShow(getCardsToShow(formations.length));
  }, [formations.length]);

  React.useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow(formations.length));
    };
    window.addEventListener('resize', handleResize);
    setCardsToShow(getCardsToShow(formations.length));
    return () => window.removeEventListener('resize', handleResize);
  }, [formations.length]);

  // Pour peu de formations, on ne fait pas d'infini
  const shouldUseInfinite = formations.length > cardsToShow;
  
  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (shouldUseInfinite) {
      setStartIndex((prev) => (prev + 1) % formations.length);
    } else {
      setStartIndex((prev) => Math.min(prev + 1, formations.length - cardsToShow));
    }
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (shouldUseInfinite) {
      setStartIndex((prev) => (prev - 1 + formations.length) % formations.length);
    } else {
      setStartIndex((prev) => Math.max(prev - 1, 0));
    }
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Simplification du carrousel
  const translateX = `-${startIndex * (100 / cardsToShow)}%`;

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'diplôme':
        return <GraduationCap className="h-8 w-8" />;
      case 'certification':
        return <Award className="h-8 w-8" />;
      default:
        return <BookOpen className="h-8 w-8" />;
    }
  };

  if (!isClient) {
    return (
      <div className="relative max-w-4xl mx-auto flex items-center justify-center py-8">
        <div className="text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto flex items-center">
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
            {formations.map((formation, idx) => (
                <motion.div
                  key={formation.id}
                  className="flex-shrink-0 w-full group"
                  style={{ width: `calc(100% / ${cardsToShow})` }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.3 }}
                >
                <Card className="relative h-full border border-border/50 rounded-2xl shadow-lg bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 group-hover:border-primary/30 overflow-hidden">
                  {/* Header avec badge unique */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {formation.logoUrl ? (
                          <img 
                            src={formation.logoUrl} 
                            alt={`Logo ${formation.institution}`}
                            className="h-12 w-12 rounded object-contain bg-white p-1"
                          />
                        ) : (
                          <div className={`p-2 rounded-lg ${typeColors[formation.type.toLowerCase()] || 'bg-muted text-foreground'}`}>
                            {getIcon(formation.type)}
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {formation.type}
                      </span>
                    </div>
                    
                    {/* Titre et institution */}
                    <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {formation.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium mb-3">
                      {formation.institution}
                    </p>
                    
                    {/* Date */}
                    <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-primary"></div>
                      {formation.date}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* Dots indicator */}
        {formations.length > cardsToShow && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(formations.length / cardsToShow) }).map((_, index) => (
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
        {/* Slide counter */}
        <div className="text-center mt-4 text-sm text-muted-foreground">
          {Math.floor(startIndex / cardsToShow) + 1} / {Math.ceil(formations.length / cardsToShow)}
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