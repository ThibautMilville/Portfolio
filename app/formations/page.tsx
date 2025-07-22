'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const formations = [
  {
    id: 1,
    title: "Master Informatique - Développement Web",
    institution: "Université de Technologie",
    location: "Paris, France",
    date: "2020 - 2022",
    description: "Spécialisation en développement web moderne, architectures distribuées et méthodologies agiles.",
    skills: ["React", "Node.js", "PostgreSQL", "Docker", "DevOps"],
    mention: "Mention Très Bien",
    type: "Diplôme"
  },
  {
    id: 2,
    title: "Licence Informatique",
    institution: "Université Paris-Saclay",
    location: "Saclay, France",
    date: "2017 - 2020",
    description: "Formation complète en informatique couvrant les bases algorithmiques, programmation orientée objet et bases de données.",
    skills: ["Java", "Python", "SQL", "Algorithmes", "Structures de données"],
    mention: "Mention Bien",
    type: "Diplôme"
  },
  {
    id: 3,
    title: "Certification AWS Solutions Architect",
    institution: "Amazon Web Services",
    location: "En ligne",
    date: "2023",
    description: "Certification officielle AWS pour la conception d'architectures cloud scalables et sécurisées.",
    skills: ["AWS", "Cloud Architecture", "Serverless", "Microservices"],
    mention: "Certifié",
    type: "Certification"
  },
  {
    id: 4,
    title: "Formation NestJS Avancée",
    institution: "Formation Continue",
    location: "En ligne",
    date: "2023",
    description: "Formation spécialisée sur NestJS, GraphQL, microservices et architectures hexagonales.",
    skills: ["NestJS", "GraphQL", "Microservices", "Testing", "Docker"],
    mention: "Complétée",
    type: "Formation"
  }
];

export default function Formations() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Formations</h1>
          <p className="text-lg text-muted-foreground">
            Mon parcours académique et mes certifications professionnelles
          </p>
        </motion.div>

        <div className="space-y-6">
          {formations.map((formation, index) => (
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
                      <div className="p-2 rounded-lg bg-primary/10">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
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
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      {formation.mention}
                    </div>
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
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

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
              <div className="text-2xl font-bold text-primary mb-1">2</div>
              <div className="text-sm text-muted-foreground">Diplômes</div>
            </div>
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">3</div>
              <div className="text-sm text-muted-foreground">Certifications</div>
            </div>
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">15+</div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}