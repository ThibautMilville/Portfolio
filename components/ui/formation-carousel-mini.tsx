'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Formation } from '@/lib/data';

interface FormationCarouselMiniProps {
  formations: Formation[];
  itemsPerView?: number;
}

export default function FormationCarouselMini({ formations, itemsPerView = 2 }: FormationCarouselMiniProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = Math.ceil(formations.length / itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleFormations = formations.slice(
    currentIndex * itemsPerView,
    (currentIndex + 1) * itemsPerView
  );

  if (formations.length === 0) return null;

  return (
    <div className="relative">
      {/* Navigation arrows */}
      {totalPages > 1 && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-8 w-8 p-0 rounded-full bg-background border shadow-md hover:bg-background hover:scale-105 transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-8 w-8 p-0 rounded-full bg-background border shadow-md hover:bg-background hover:scale-105 transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Formations grid with padding for arrows */}
      <div className="px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <AnimatePresence mode="wait">
            {visibleFormations.map((formation, index) => (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/formations#${formation.id}`} className="group">
                  <div className="p-3 rounded-lg border hover:border-green-500/50 hover:bg-green-500/5 transition-all cursor-pointer h-full bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-1">
                        {formation.title}
                      </h5>
                      <Badge 
                        variant={formation.type === "Diplôme" ? "default" : formation.type === "Certification" ? "secondary" : "outline"}
                        className="text-xs flex-shrink-0"
                      >
                        {formation.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {formation.institution}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {formation.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {formation.skills.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
                          {skill}
                        </Badge>
                      ))}
                      {formation.skills.length > 2 && (
                        <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
                          +{formation.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Dots indicator */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-all hover:scale-110 ${
                i === currentIndex ? 'bg-green-500 shadow-md' : 'bg-muted hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 