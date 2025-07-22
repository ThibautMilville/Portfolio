'use client';

import { motion } from 'framer-motion';
import { Building, Calendar, MapPin, Users, Briefcase } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const experiences = [
  {
    id: 1,
    title: "Développeur Fullstack Senior",
    company: "TechFlow Solutions",
    location: "Paris, France",
    date: "2022 - Présent",
    duration: "2+ ans",
    description: "Lead technique sur plusieurs projets web complexes utilisant React/Next.js et NestJS. Encadrement d'une équipe de 4 développeurs junior.",
    achievements: [
      "Réduction de 40% des temps de chargement sur l'application principale",
      "Migration réussie vers Next.js 13 avec App Router",
      "Implémentation d'une architecture microservices avec NestJS",
      "Formation de 6 développeurs juniors aux bonnes pratiques"
    ],
    technologies: ["React", "Next.js", "NestJS", "PostgreSQL", "Docker", "AWS", "GraphQL"],
    type: "CDI"
  },
  {
    id: 2,
    title: "Développeur Fullstack",
    company: "Digital Innovations",
    location: "Lyon, France",
    date: "2020 - 2022",
    duration: "2 ans",
    description: "Développement d'applications web modernes en équipe agile. Participation active à l'architecture et aux décisions techniques.",
    achievements: [
      "Développement de 5 applications web from scratch",
      "Implémentation d'un système de SSO pour 10,000+ utilisateurs",
      "Optimisation des performances backend (+60% de vitesse)",
      "Mise en place des tests automatisés (couverture 95%)"
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Redis", "Jest", "Cypress"],
    type: "CDI"
  },
  {
    id: 3,
    title: "Développeur Frontend",
    company: "StartupLab",
    location: "Paris, France",
    date: "2019 - 2020",
    duration: "1 an",
    description: "Premier poste en startup, développement d'interfaces utilisateur innovantes et responsive design.",
    achievements: [
      "Refonte complète de l'interface utilisateur",
      "Implémentation du responsive design sur mobile",
      "Intégration de 15+ APIs RESTful",
      "Amélioration du taux de conversion (+25%)"
    ],
    technologies: ["React", "JavaScript", "Sass", "REST API", "Git", "Figma"],
    type: "CDI"
  },
  {
    id: 4,
    title: "Développeur Web Junior",
    company: "WebAgency Pro",
    location: "Paris, France",
    date: "2018 - 2019",
    duration: "1 an",
    description: "Stage puis premier emploi, développement de sites vitrine et e-commerce pour des PME.",
    achievements: [
      "Livraison de 20+ sites web clients",
      "Maîtrise des CMS WordPress et Shopify",
      "Optimisation SEO et performances web",
      "Support technique et maintenance"
    ],
    technologies: ["HTML/CSS", "JavaScript", "PHP", "WordPress", "MySQL", "SEO"],
    type: "Stage puis CDI"
  }
];

export default function Experiences() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Expériences</h1>
          <p className="text-lg text-muted-foreground">
            Mon parcours professionnel et mes réalisations principales
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                
                <Card className="ml-16 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Briefcase className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-2">{exp.title}</CardTitle>
                          <CardDescription className="text-base font-medium text-foreground">
                            {exp.company}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{exp.type}</Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exp.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {exp.duration}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                      {exp.description}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Réalisations clés :</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Technologies utilisées :</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Career Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">6+</div>
              <div className="text-sm text-muted-foreground">Années d'expérience</div>
            </div>
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Projets réalisés</div>
            </div>
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">4</div>
              <div className="text-sm text-muted-foreground">Entreprises</div>
            </div>
            <div className="text-center p-6 rounded-2xl border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">10+</div>
              <div className="text-sm text-muted-foreground">Développeurs formés</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}