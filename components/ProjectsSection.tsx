'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import LightParticles from '@/components/ui/light-particles';
import { ArrowRight } from 'lucide-react';

const ProjectCarousel = dynamic(() => import('@/components/ui/project-carousel'), { ssr: false });

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demo: string | null;
  github: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="py-20 px-6 bg-background/80 relative">
      <LightParticles />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projets phares</h2>
          <p className="text-lg text-muted-foreground">Quelques réalisations techniques marquantes</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ProjectCarousel projects={projects} />
        </motion.div>
        
        <div className="flex justify-center mt-12">
          <Button size="lg" asChild>
            <Link href="/projets">
              Voir tous les projets
              <ArrowRight className="ml-2 h-4 w-4 text-white" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 