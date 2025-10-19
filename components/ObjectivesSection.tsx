"use client";

import { motion } from "framer-motion";
import { Target, Users, Rocket, Eye } from "lucide-react";
import LightParticles from "@/components/ui/light-particles";

export default function ObjectivesSection() {
  return (
    <section className="py-6 md:py-8 px-6 bg-gradient-to-br from-background via-background/95 to-background/90 relative">
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
            Objectifs & Vision
          </h2>
          <p className="text-lg text-muted-foreground">
            Ma mission et mes ambitions professionnelles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 text-blue-500 mb-4">
              <Target className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Innovation Continue</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Rester à la pointe des technologies émergentes et contribuer à
              l'évolution du développement web moderne.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Impact Social</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Créer des solutions technologiques qui améliorent la vie des
              utilisateurs et contribuent au bien commun.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 text-purple-500 mb-4">
              <Rocket className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Excellence Technique</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Développer des applications performantes, scalables et
              maintenables selon les meilleures pratiques.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-4">
              <Eye className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Vision Long Terme</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Construire une carrière durable en tant qu'expert technique et
              leader dans l'écosystème tech français.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto p-8 rounded-2xl border bg-gradient-to-r from-primary/5 to-primary/10">
            <h3 className="text-2xl font-bold mb-4">Ma Philosophie</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              "La technologie doit servir l'humain. Mon objectif est de créer
              des expériences numériques qui non seulement fonctionnent
              parfaitement, mais qui enrichissent véritablement la vie de leurs
              utilisateurs."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
