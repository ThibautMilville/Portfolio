'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects } from '@/lib/data';
import LightParticles from '@/components/ui/light-particles';

// Récupérer les projets depuis le fichier de données partagé
const projets = getAllProjects();

export default function Projets() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projets.map((projet, index) => (
            <motion.div
              key={projet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
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
                            window.open(projet.demo, '_blank');
                          }}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

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