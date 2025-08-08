'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects } from '@/lib/data';
import ProjectFilters, { ProjectFilterState } from '@/components/ProjectFilters';
import { useMemo, useState, useEffect } from 'react';
import LightParticles from '@/components/ui/light-particles';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// Récupérer les projets depuis le fichier de données partagé
const projets = getAllProjects();

export default function Projets() {
  const [filters, setFilters] = useState<ProjectFilterState>({
    search: '',
    organization: 'all',
    techs: [],
    years: [],
    status: 'all',
    category: 'all',
  });

  const organizations = useMemo(() => {
    // Dérive depuis experiences liées + mots-clés dans category
    const orgs = new Set<string>();
    projets.forEach((p) => {
      // Heuristique simple: mappe quelques IDs connus
      if (p.relatedExperienceId) {
        if ([1,2].includes(p.relatedExperienceId)) orgs.add('SNCF Voyageurs');
        if ([8].includes(p.relatedExperienceId)) orgs.add('Ultra Times');
      }
    });
    return Array.from(orgs);
  }, []);

  const technologies = useMemo(() => {
    const set = new Set<string>();
    projets.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const years = useMemo(() => {
    const set = new Set<string>();
    projets.forEach((p) => {
      const match = p.date.match(/\d{4}/g);
      if (match) match.forEach((y) => set.add(y));
    });
    return Array.from(set).sort().reverse();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projets.forEach((p) => set.add(p.category));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    return projets.filter((p) => {
      if (filters.search && !p.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.category !== 'all' && p.category !== filters.category) return false;
      if (filters.status !== 'all' && p.status !== filters.status) return false;
      if (filters.organization !== 'all') {
        const orgByExp = p.relatedExperienceId && ([1,2].includes(p.relatedExperienceId) ? 'SNCF Voyageurs' : [8].includes(p.relatedExperienceId) ? 'Ultra Times' : undefined);
        if (orgByExp !== filters.organization) return false;
      }
      if (filters.techs.length && !filters.techs.every((t) => p.technologies.includes(t))) return false;
      if (filters.years.length) {
        const inYears = filters.years.some((y) => p.date.includes(y));
        if (!inYears) return false;
      }
      return true;
    });
  }, [filters]);

  // Parse une date de début (commencement) à partir d'une chaîne libre en FR
  const getProjectStartTs = (dateStr: string): number => {
    const normalize = (s: string) =>
      s
        .toLowerCase()
        .normalize('NFD')
        // Retire les diacritiques sans utiliser les classes Unicode (compat ES5)
        .replace(/[\u0300-\u036f]/g, '');

    const monthMap: Record<string, number> = {
      jan: 1, janvier: 1,
      fev: 2, fevr: 2, fevrier: 2,
      mar: 3, mars: 3,
      avr: 4, avril: 4,
      mai: 5,
      jun: 6, juin: 6,
      jul: 7, juil: 7, juillet: 7,
      aou: 8, aout: 8,
      sep: 9, sept: 9, septembre: 9,
      oct: 10, octobre: 10,
      nov: 11, novembre: 11,
      dec: 12, decembre: 12,
    };

    const parts = dateStr.split(';').map((s) => s.trim());
    const startCandidates: number[] = [];

    for (const part of parts) {
      const normalized = normalize(part);
      // Cherche forme "mois année"
      const monthYearMatch = normalized.match(/(janvier|fevrier|fevr|fev|jan|fev|mar|mars|avr|avril|mai|jun|juin|jul|juil|juillet|aou|aout|sep|sept|septembre|oct|octobre|nov|novembre|dec|decembre)\s+(\d{4})/);
      if (monthYearMatch) {
        const mKey = monthYearMatch[1];
        const y = parseInt(monthYearMatch[2], 10);
        const m = monthMap[mKey] || 1;
        startCandidates.push(new Date(y, m - 1, 1).getTime());
        continue;
      }
      // Sinon, prend juste l'année
      const yearMatch = normalized.match(/(\d{4})/);
      if (yearMatch) {
        const y = parseInt(yearMatch[1], 10);
        startCandidates.push(new Date(y, 0, 1).getTime());
      }
    }

    if (!startCandidates.length) return 0;
    // Positionnement basé sur la PREMIÈRE période (la plus ancienne)
    return Math.min(...startCandidates);
  };

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => getProjectStartTs(b.date) - getProjectStartTs(a.date));
  }, [filtered]);

  const PER_PAGE = 18;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const startIndex = (currentPage - 1) * PER_PAGE;
  const pageItems = sorted.slice(startIndex, startIndex + PER_PAGE);

  return (
    <div className="py-20 px-6 relative">
      <LightParticles />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mes Projets</h1>
          
                     {/* Barre horizontale stylisée moderne et dynamique */}
           <motion.div 
             className="flex justify-center mb-6"
             initial={{ opacity: 0, scaleX: 0 }}
             animate={{ opacity: 1, scaleX: 1 }}
             transition={{ duration: 0.8, delay: 0.3 }}
           >
             <motion.div 
               className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full shadow-lg"
               style={{ width: 'min(80vw, 300px)' }}
               animate={{
                 width: ['min(80vw, 300px)', 'min(90vw, 400px)', 'min(80vw, 300px)'],
               }}
               transition={{
                 duration: 4,
                 repeat: Infinity,
                 ease: "easeInOut",
               }}
             />
           </motion.div>
          
          <p className="text-lg text-muted-foreground">
            Une sélection de mes réalisations techniques les plus significatives
          </p>
        </motion.div>

        <ProjectFilters
          value={filters}
          onChange={setFilters}
          organizations={organizations}
          technologies={technologies}
          years={years}
          categories={categories}
        />

        <div className="text-sm text-muted-foreground mb-4">
          {sorted.length > 0 ? (
            <span>
              Affichage {startIndex + 1}
              –{Math.min(startIndex + PER_PAGE, sorted.length)} sur {sorted.length} projets
            </span>
          ) : (
            <span>Aucun projet ne correspond à ces filtres.</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pageItems.map((projet, index) => (
            <motion.div
              key={projet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.06 }}
              id={projet.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
            >
              <Link href={`/projets/${projet.id}`}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={projet.image}
                      alt={projet.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant={projet.status === 'Terminé' ? 'default' : 'secondary'}>
                        {projet.status}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline">{projet.category}</Badge>
                    </div>
                    {/* Overlay avec icône */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <ArrowRight className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0" />
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">{projet.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4" />
                          {projet.date}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {projet.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Fonctionnalités clés :</h4>
                      <ul className="space-y-1">
                        {projet.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <Star className="h-3 w-3 mt-0.5 flex-shrink-0 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Technologies :</h4>
                      <div className="flex flex-wrap gap-1">
                        {projet.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(projet.github, '_blank');
                        }}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Button>
                      {projet.demo && (
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!projet.demo) return;
                            window.open(projet.demo, '_blank');
                          }}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {['Showcase','E-commerce','Corporate'].includes(projet.category) ? 'Voir le site' : 'Demo'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((p) => Math.max(1, p - 1));
                    }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === i + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                    }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Projets réalisés</div>
            </div>
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">20+</div>
              <div className="text-sm text-muted-foreground">Technologies maîtrisées</div>
            </div>
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">15+</div>
              <div className="text-sm text-muted-foreground">APIs développées</div>
            </div>
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Projets livrés</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}