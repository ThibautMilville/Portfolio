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
