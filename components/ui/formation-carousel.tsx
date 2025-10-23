'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, GraduationCap, Award, BookOpen, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './dialog';

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
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  React.useEffect(() => {
    setIsClient(true);
    setCardsToShow(getCardsToShow(formations.length));
    setIsMobile(typeof window !== 'undefined' ? window.innerWidth < 640 : false);
  }, [formations.length]);

  React.useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow(formations.length));
      setIsMobile(window.innerWidth < 640);
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

  // Gestion des événements tactiles pour le swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
  };

  // Empêcher le scroll vertical lors du swipe horizontal
  const onTouchMovePrevent = (e: React.TouchEvent) => {
    if (touchStart && touchEnd) {
      const distance = Math.abs(touchStart - touchEnd);
      if (distance > 10) {
        e.preventDefault();
      }
    }
    onTouchMove(e);
  };

  // Calcul de translation mathématiquement correct
  const translateX = `calc(-${startIndex} * ((100% - ${(cardsToShow - 1)}rem) / ${cardsToShow} + 1rem))`;

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
          <div 
            className="overflow-hidden py-2"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMovePrevent}
            onTouchEnd={onTouchEnd}
          >
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
            {formations.map((formation, idx) => (
                <motion.div
                  key={formation.id}
                  className="flex-shrink-0 w-full group"
                  style={{ width: `calc((100% - ${(cardsToShow - 1)}rem) / ${cardsToShow})` }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.3 }}
                >
                <Dialog>
                  <DialogTrigger asChild>
                    {isMobile ? (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedFormation(formation);
                        }}
                        className="relative h-full rounded-2xl shadow-xl border border-border bg-card/80 supports-[backdrop-filter]:backdrop-blur-md ring-1 ring-black/5 transition-all duration-300 group-hover:-translate-y-2 hover:shadow-2xl hover:ring-primary/30 overflow-hidden cursor-pointer"
                      >
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
                      </a>
                    ) : (
                      <Card className="relative h-full rounded-3xl shadow-xl bg-gradient-to-br from-zinc-900/95 via-zinc-800/90 to-zinc-900/95 dark:from-zinc-900/95 dark:via-zinc-800/90 dark:to-zinc-900/95 from-white/95 via-gray-50/90 to-white/95 backdrop-blur-md border-2 border-zinc-600/80 dark:border-zinc-600/80 border-gray-300/80 hover:border-primary/40 dark:hover:border-primary/40 hover:border-blue-400/50 hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-primary/20 transition-all duration-300 group-hover:-translate-y-2 overflow-hidden cursor-pointer ring-1 ring-zinc-800/50 dark:ring-zinc-800/50 ring-gray-200/50">
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
                    )}
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] sm:w-auto max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                    <DialogHeader>
                      <div className="flex items-center gap-4 mb-4">
                        {formation.logoUrl ? (
                          <img 
                            src={formation.logoUrl} 
                            alt={`Logo ${formation.institution}`}
                            className="h-16 w-16 rounded object-contain bg-white p-2"
                          />
                        ) : (
                          <div className={`p-3 rounded-lg ${typeColors[formation.type.toLowerCase()] || 'bg-muted text-foreground'}`}>
                            {getIcon(formation.type)}
                          </div>
                        )}
                        <div>
                          <DialogTitle className="text-2xl">{formation.title}</DialogTitle>
                          <DialogDescription className="text-lg font-medium text-foreground">
                            {formation.institution}
                          </DialogDescription>
                        </div>
                      </div>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* Informations principales */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="font-medium">Période :</span>
                          <span>{formation.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="font-medium">Lieu :</span>
                          <span>{formation.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Award className="h-4 w-4 text-primary" />
                          <span className="font-medium">Type :</span>
                          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                            {formation.type}
                          </span>
                        </div>
                        {formation.mention && (
                          <div className="flex items-center gap-2 text-sm">
                            <GraduationCap className="h-4 w-4 text-primary" />
                            <span className="font-medium">Mention :</span>
                            <span>{formation.mention}</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <div>
                        <h4 className="font-semibold mb-2">Description</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {formation.description}
                        </p>
                      </div>

                      {/* Compétences */}
                      {formation.skills && formation.skills.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3">Compétences acquises</h4>
                          <div className="flex flex-wrap gap-2">
                            {formation.skills.map((skill, index) => (
                              <span 
                                key={index}
                                className="px-3 py-1 bg-muted rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Lien vers le certificat */}
                      {formation.credentialUrl && (
                        <div className="pt-4 border-t">
                          <a 
                            href={formation.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Voir le certificat officiel
                          </a>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
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
      <div className="text-center mt-4 text-sm text-muted-foreground">
        {Math.floor(startIndex / cardsToShow) + 1} / {Math.ceil(formations.length / cardsToShow)}
      </div>
    </div>
  );
} 