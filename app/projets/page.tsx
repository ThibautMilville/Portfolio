'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const projets = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Plateforme e-commerce complète avec panier, paiements Stripe, gestion admin et tableau de bord analytique.",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Stripe", "Redis", "Docker"],
    date: "2023",
    status: "Terminé",
    features: [
      "Authentification JWT sécurisée",
      "Panier et checkout optimisé",
      "Dashboard admin complet",
      "Analytics en temps réel",
      "API REST documentée"
    ],
    github: "https://github.com/ThibautMilville",
    demo: "https://demo.example.com",
    category: "Fullstack"
  },
  {
    id: 2,
    title: "Task Management SaaS",
    description: "Application de gestion de tâches collaborative avec équipes, notifications temps réel et rapports.",
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Tailwind", "AWS"],
    date: "2023",
    status: "En cours",
    features: [
      "Collaboration en temps réel",
      "Notifications WebSocket",
      "Drag & drop intuitif",
      "Rapports et statistiques",
      "Multi-tenancy"
    ],
    github: "https://github.com/ThibautMilville",
    demo: "https://demo.example.com",
    category: "SaaS"
  },
  {
    id: 3,
    title: "API GraphQL Microservices",
    description: "Architecture microservices avec API GraphQL, Gateway et services indépendants.",
    image: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["NestJS", "GraphQL", "Docker", "Kubernetes", "PostgreSQL", "RabbitMQ"],
    date: "2022",
    status: "Terminé",
    features: [
      "Architecture hexagonale",
      "Event-driven architecture",
      "Auto-scaling Kubernetes",
      "Monitoring complet",
      "Tests automatisés"
    ],
    github: "https://github.com/ThibautMilville",
    category: "Backend"
  },
  {
    id: 4,
    title: "Dashboard Analytics",
    description: "Tableau de bord d'analyse de données avec graphiques interactifs et filtres avancés.",
    image: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React", "D3.js", "Express", "PostgreSQL", "Chart.js", "WebSockets"],
    date: "2022",
    status: "Terminé",
    features: [
      "Graphiques interactifs D3.js",
      "Filtres temps réel",
      "Export PDF/Excel",
      "Responsive design",
      "Caching intelligent"
    ],
    github: "https://github.com/ThibautMilville",
    demo: "https://demo.example.com",
    category: "Frontend"
  },
  {
    id: 5,
    title: "Mobile App React Native",
    description: "Application mobile cross-platform avec géolocalisation, notifications push et synchronisation offline.",
    image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React Native", "Expo", "Firebase", "AsyncStorage", "Maps API"],
    date: "2023",
    status: "En cours",
    features: [
      "Géolocalisation GPS",
      "Mode offline",
      "Push notifications",
      "Synchronisation cloud",
      "Interface native"
    ],
    github: "https://github.com/ThibautMilville",
    category: "Mobile"
  },
  {
    id: 6,
    title: "DevOps Pipeline",
    description: "Pipeline CI/CD complet avec tests automatisés, déploiement blue/green et monitoring.",
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["GitHub Actions", "Docker", "AWS ECS", "Terraform", "Prometheus", "Grafana"],
    date: "2023",
    status: "Terminé",
    features: [
      "CI/CD automatisé",
      "Tests multi-environnements",
      "Déploiement zero-downtime",
      "Monitoring métrics",
      "Infrastructure as Code"
    ],
    github: "https://github.com/ThibautMilville",
    category: "DevOps"
  }
];

export default function Projets() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mes Projets</h1>
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
              <Card className="h-full hover:shadow-xl transition-all duration-300 group">
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
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{projet.title}</CardTitle>
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
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={projet.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    {projet.demo && (
                      <Button size="sm" className="flex-1" asChild>
                        <a href={projet.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
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