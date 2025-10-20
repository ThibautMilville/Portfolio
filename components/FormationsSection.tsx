"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";
import LightParticles from "@/components/ui/light-particles";
import { ArrowRight } from "lucide-react";

const FormationCarousel = dynamic(
  () => import("@/components/ui/formation-carousel"),
  {
    ssr: false,
    loading: () => (
      <div className="text-center py-8">Chargement des formations...</div>
    ),
  }
);

interface Formation {
  id: number;
  title: string;
  institution: string;
  location: string;
  date: string;
  description: string;
  skills: string[];
  mention: string;
  type: "Diplôme" | "Certification" | "Formation";
  projectIds?: number[];
  relatedExperienceIds?: number[];
  credentialUrl?: string;
  logoUrl?: string;
}

interface FormationsSectionProps {
  formations: Formation[];
}

export default function FormationsSection({
  formations,
}: FormationsSectionProps) {
  return (
    <section className="py-6 md:py-8 px-6 relative">
      <LightParticles />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Formations & Certifications
          </h2>
          <p className="text-lg text-muted-foreground">
            Un parcours académique et professionnel solide
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {formations && formations.length > 0 ? (
            <FormationCarousel formations={formations} />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Aucune formation disponible
            </div>
          )}
        </motion.div>

        {/* Section cours suivis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-12 text-center">Badges de cours</h3>
          <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto place-items-center">
            {/* Carte cours: badge Cisco */}
            <CourseCard 
              title="Cisco – Introduction to Cybersecurity"
              imageSrc="/images/education/badge-cybersecurity.png"
              pdfHref="/documents/badge-cisco-certification.pdf"
            />
          </div>
        </motion.div>

        <div className="flex justify-center mt-12">
          <Button size="lg" asChild className="sweep-light">
            <Link href="/formations">
              Voir toutes les formations
              <ArrowRight className="ml-2 h-4 w-4 text-white" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// Carte de cours avec tooltip + modale
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip } from '@/components/ui/tooltip';

function CourseCard({ title, imageSrc, pdfHref }: { title: string; imageSrc: string; pdfHref?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="group transition-all w-full flex items-center justify-center">
          <Tooltip content={title} position="top" distance={0} className="inline-block">
            <div className="w-[80px] h-[80px] sm:w-[80px] sm:h-[80px] flex items-center justify-center">
              <img src={imageSrc} alt={title} className="w-full h-full object-contain" />
            </div>
          </Tooltip>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:w-auto max-w-xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 pt-8">
        <DialogHeader className="pr-10 mb-4">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Cours suivi et justificatif</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="rounded-lg overflow-hidden bg-muted flex items-center justify-center p-4">
            <img src={imageSrc} alt={title} className="max-h-60 object-contain" />
          </div>
          <div className="text-sm text-muted-foreground">
            Date d'obtention: Octobre 2025
          </div>
          {pdfHref ? (
            <div className="text-sm">
              <a
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                Consulter le document (PDF)
              </a>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
