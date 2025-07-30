'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LightParticles from '@/components/ui/light-particles';
import { getAllFormations } from '@/lib/data';

const formations = getAllFormations();

export default function Formations() {
  return (
    <div className="py-20 px-6 relative">
      <LightParticles />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Formations & Certifications</h1>
          <p className="text-lg text-muted-foreground">
            Mon parcours académique et mes certifications professionnelles
          </p>
        </motion.div>

        {/* Section Diplômes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Diplômes</h2>
          <div className="space-y-6">
            {formations.filter(f => f.type === 'Diplôme').map((formation, index) => (
            <motion.div
              key={formation.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              id={formation.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {formation.logoUrl ? (
                        <img 
                          src={formation.logoUrl} 
                          alt={`Logo ${formation.institution}`}
                          className="h-10 w-10 rounded object-contain bg-white p-1"
                        />
                      ) : (
                        <div className="p-2 rounded-lg bg-primary/10">
                          <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-xl mb-2">{formation.title}</CardTitle>
                        <CardDescription className="text-base">
                          {formation.institution}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge 
                      variant={formation.type === 'Diplôme' ? 'default' : 'secondary'}
                      className="ml-4"
                    >
                      {formation.type}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formation.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {formation.location}
                    </div>
                    {formation.mention && (
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        {formation.mention}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {formation.description}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Compétences acquises :</p>
                    <div className="flex flex-wrap gap-2">
                      {formation.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {formation.credentialUrl && (
                    <div className="mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <a href={formation.credentialUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Vérifier la certification
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
          </div>
        </motion.div>

        {/* Section Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Certifications</h2>
          <div className="space-y-6">
            {formations.filter(f => f.type === 'Certification').map((formation, index) => (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                id={formation.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        {formation.logoUrl ? (
                          <img 
                            src={formation.logoUrl} 
                            alt={`Logo ${formation.institution}`}
                            className="h-10 w-10 rounded object-contain bg-white p-1"
                          />
                        ) : (
                          <div className="p-2 rounded-lg bg-primary/10">
                            <GraduationCap className="h-6 w-6 text-primary" />
                          </div>
                        )}
                        <div>
                          <CardTitle className="text-xl mb-2">{formation.title}</CardTitle>
                          <CardDescription className="text-base">
                            {formation.institution}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge 
                        variant={formation.type === 'Diplôme' ? 'default' : 'secondary'}
                        className="ml-4"
                      >
                        {formation.type}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formation.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {formation.location}
                      </div>
                      {formation.mention && (
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          {formation.mention}
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {formation.description}
                    </p>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Compétences acquises :</p>
                      <div className="flex flex-wrap gap-2">
                        {formation.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {formation.credentialUrl && (
                      <div className="mt-4">
                        <Button variant="outline" size="sm" asChild>
                          <a href={formation.credentialUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Vérifier la certification
                          </a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">5+</div>
              <div className="text-sm text-muted-foreground">Années d'études</div>
            </div>
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">{formations.filter(f => f.type === 'Diplôme').length}</div>
              <div className="text-sm text-muted-foreground">Diplômes</div>
            </div>
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">{formations.filter(f => f.type === 'Certification').length}</div>
              <div className="text-sm text-muted-foreground">Certifications</div>
            </div>
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">{formations.reduce((acc, f) => acc + f.skills.length, 0)}+</div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}