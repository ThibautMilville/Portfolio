'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, Code2, Database, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Typewriter } from '@/components/ui/typewriter';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

// Importer les projets et formations/certifications (copie locale pour la home)
const projets = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Plateforme e-commerce complète avec panier, paiements Stripe, gestion admin et tableau de bord analytique.",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Stripe", "Redis", "Docker"],
    date: "2023",
    status: "Terminé",
    github: "https://github.com/thibaut-milville",
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
    github: "https://github.com/thibaut-milville",
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
    github: "https://github.com/thibaut-milville",
    demo: null,
    category: "Backend"
  }
];

const formations = [
  {
    id: 1,
    title: "Master Informatique - Développement Web",
    institution: "Université de Technologie",
    date: "2020 - 2022",
    mention: "Mention Très Bien",
    type: "Diplôme"
  },
  {
    id: 2,
    title: "Certification AWS Solutions Architect",
    institution: "Amazon Web Services",
    date: "2023",
    mention: "Certifié",
    type: "Certification"
  },
  {
    id: 3,
    title: "Formation NestJS Avancée",
    institution: "Formation Continue",
    date: "2023",
    mention: "Complétée",
    type: "Formation"
  }
];

// Logos entreprises (SNCF + random)
const companyLogos = [
  {
    name: 'SNCF',
    src: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Logo_SNCF_2011.svg',
    alt: 'SNCF',
  },
  {
    name: 'Slack',
    src: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png',
    alt: 'Slack',
  },
  {
    name: 'Spotify',
    src: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
    alt: 'Spotify',
  },
  {
    name: 'Airbnb',
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg',
    alt: 'Airbnb',
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-teal-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background to-background" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Thibaut MILVILLE
            </h1>
            <div className="text-xl md:text-2xl text-muted-foreground mb-8 font-mono flex flex-col items-center gap-2">
              <Typewriter
                words={["<Développeur Fullstack />", "<Expert React & Next.js />", "<Passionné par l'innovation />"]}
                typingSpeed={70}
                deletingSpeed={40}
                pause={1200}
                className="min-h-[2.5rem]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Passionné par la création d'expériences web modernes avec React, Next.js et NestJS. 
              Je transforme vos idées en applications performantes et scalables.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <Button size="lg" asChild>
              <Link href="/projets">
                Voir mes projets
                <Code2 className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Télécharger CV
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-6 justify-center"
          >
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
              <Link href="/contact">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground animate-bounce" />
        </motion.div>
      </section>

      {/* Section Projets en avant */}
      <section className="py-16 px-6 bg-background/80">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projets phares</h2>
            <p className="text-lg text-muted-foreground">Quelques réalisations techniques marquantes</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projets.map((projet, idx) => (
              <motion.div
                key={projet.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col h-full">
                  <img src={projet.image} alt={projet.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{projet.status}</span>
                      <span className="text-xs px-2 py-1 rounded-full border text-muted-foreground">{projet.category}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{projet.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 flex-1">{projet.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {projet.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs bg-muted px-2 py-0.5 rounded-full">{tech}</span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <Button variant="outline" size="sm" asChild>
                        <a href={projet.github} target="_blank" rel="noopener noreferrer">Code</a>
                      </Button>
                      {projet.demo && (
                        <Button size="sm" asChild>
                          <a href={projet.demo} target="_blank" rel="noopener noreferrer">Demo</a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button size="lg" asChild>
              <Link href="/projets">Voir tous les projets</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section logos entreprises partenaires */}
      <section className="py-10 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-center text-lg font-semibold mb-6 text-muted-foreground">Ils m'ont fait confiance</h3>
          <TooltipProvider>
            <div className="relative">
              <div
                className="flex gap-12 animate-scroll-logos items-center"
                style={{ minWidth: '100%', width: 'max-content' }}
              >
                {companyLogos.concat(companyLogos).map((logo, idx) => (
                  <Tooltip key={logo.name + idx}>
                    <TooltipTrigger asChild>
                      <span tabIndex={0} className="inline-block">
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className="h-12 w-auto grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-pointer"
                          style={{ flex: '0 0 auto' }}
                        />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs pointer-events-auto">
                      {logo.name}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </TooltipProvider>
        </div>
      </section>

      {/* Section Diplômes/Certifications */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Diplômes & Certifications</h2>
            <p className="text-lg text-muted-foreground">Un parcours académique et professionnel solide</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {formations.map((formation, idx) => (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="rounded-2xl border bg-card hover:shadow-lg transition-shadow p-5 h-full flex flex-col justify-between">
                  <div>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary mr-2">{formation.type}</span>
                    <span className="text-xs px-2 py-1 rounded-full border text-muted-foreground">{formation.mention}</span>
                  </div>
                  <h3 className="text-lg font-semibold mt-2 mb-1">{formation.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{formation.institution}</p>
                  <div className="text-xs text-muted-foreground mb-2">{formation.date}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button size="lg" asChild>
              <Link href="/formations">Voir toutes les formations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stack Technique</h2>
            <p className="text-lg text-muted-foreground">
              Technologies que je maîtrise pour créer des applications modernes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow"
            >
              <Code2 className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Frontend</h3>
              <p className="text-muted-foreground mb-4">Interfaces utilisateur modernes et réactives</p>
              <div className="space-y-2">
                <span className="inline-block bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-sm mr-2 mb-2">React</span>
                <span className="inline-block bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-sm mr-2 mb-2">Next.js</span>
                <span className="inline-block bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-sm mr-2 mb-2">TypeScript</span>
                <span className="inline-block bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-sm mr-2 mb-2">Tailwind CSS</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow"
            >
              <Server className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">Backend</h3>
              <p className="text-muted-foreground mb-4">APIs robustes et scalables</p>
              <div className="space-y-2">
                <span className="inline-block bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm mr-2 mb-2">Node.js</span>
                <span className="inline-block bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm mr-2 mb-2">NestJS</span>
                <span className="inline-block bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm mr-2 mb-2">Express</span>
                <span className="inline-block bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm mr-2 mb-2">GraphQL</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow"
            >
              <Database className="h-12 w-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-xl font-semibold mb-2">Base de données</h3>
              <p className="text-muted-foreground mb-4">Gestion et optimisation des données</p>
              <div className="space-y-2">
                <span className="inline-block bg-purple-500/10 text-purple-500 px-3 py-1 rounded-full text-sm mr-2 mb-2">PostgreSQL</span>
                <span className="inline-block bg-purple-500/10 text-purple-500 px-3 py-1 rounded-full text-sm mr-2 mb-2">MongoDB</span>
                <span className="inline-block bg-purple-500/10 text-purple-500 px-3 py-1 rounded-full text-sm mr-2 mb-2">Prisma</span>
                <span className="inline-block bg-purple-500/10 text-purple-500 px-3 py-1 rounded-full text-sm mr-2 mb-2">Redis</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}