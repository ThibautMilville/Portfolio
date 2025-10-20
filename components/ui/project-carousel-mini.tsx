'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Project } from '@/lib/data';
import { getProjectSlug } from '@/lib/data';

interface ProjectCarouselMiniProps {
  projects: Project[];
  itemsPerView?: number;
}

export default function ProjectCarouselMini({ projects, itemsPerView = 2 }: ProjectCarouselMiniProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = Math.ceil(projects.length / itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleProjects = projects.slice(
    currentIndex * itemsPerView,
    (currentIndex + 1) * itemsPerView
  );

  if (projects.length === 0) return null;

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

      {/* Projects grid with padding for arrows */}
      <div className="px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <AnimatePresence mode="wait">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/projets/${getProjectSlug(project)}`} className="group">
                  <div className="p-3 rounded-lg border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer h-full">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                      </h5>
                      <Badge 
                        variant={project.status === "Terminé" ? "default" : project.status === "En cours" ? "secondary" : "outline"}
                        className="text-xs flex-shrink-0"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 2).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 2}
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
                i === currentIndex ? 'bg-primary shadow-md' : 'bg-muted hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 