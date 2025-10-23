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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Objectifs & Vision
          </h2>
          <p className="text-lg text-muted-foreground">
            Ma mission et mes ambitions professionnelles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16 px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="group relative z-20"
          >
            <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-blue-50 via-blue-50/80 to-transparent dark:from-blue-950/20 dark:via-blue-950/10 dark:to-transparent border border-blue-200/50 dark:border-blue-800/30 hover:border-blue-300/70 dark:hover:border-blue-700/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
              
              {/* Icône avec effet de halo */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl group-hover:bg-blue-400/30 transition-all duration-500"></div>
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                  <Target className="h-8 w-8" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                Innovation Continue
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                Rester à la pointe des technologies émergentes et contribuer à
                l'évolution du développement web moderne.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="group relative z-20"
          >
            <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-emerald-50/80 to-transparent dark:from-emerald-950/20 dark:via-emerald-950/10 dark:to-transparent border border-emerald-200/50 dark:border-emerald-800/30 hover:border-emerald-300/70 dark:hover:border-emerald-700/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10">
              
              {/* Icône avec effet de halo */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-xl group-hover:bg-emerald-400/30 transition-all duration-500"></div>
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300">
                  <Users className="h-8 w-8" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-emerald-800 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
                Impact Social
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                Créer des solutions technologiques qui améliorent la vie des
                utilisateurs et contribuent au bien commun.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="group relative z-20"
          >
            <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-purple-50 via-purple-50/80 to-transparent dark:from-purple-950/20 dark:via-purple-950/10 dark:to-transparent border border-purple-200/50 dark:border-purple-800/30 hover:border-purple-300/70 dark:hover:border-purple-700/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10">
              
              {/* Icône avec effet de halo */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-xl group-hover:bg-purple-400/30 transition-all duration-500"></div>
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                  <Rocket className="h-8 w-8" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent">
                Excellence Technique
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                Développer des applications performantes, scalables et
                maintenables selon les meilleures pratiques.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="group relative z-20"
          >
            <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-amber-50 via-amber-50/80 to-transparent dark:from-amber-950/20 dark:via-amber-950/10 dark:to-transparent border border-amber-200/50 dark:border-amber-800/30 hover:border-amber-300/70 dark:hover:border-amber-700/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/10">
              
              {/* Icône avec effet de halo */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-amber-500/20 rounded-2xl blur-xl group-hover:bg-amber-400/30 transition-all duration-500"></div>
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg group-hover:shadow-amber-500/25 transition-all duration-300">
                  <Eye className="h-8 w-8" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent">
                Vision Long Terme
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                Construire une carrière durable en tant qu'expert technique et
                leader dans l'écosystème tech français.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative group">
            {/* Fond avec effet de profondeur */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-700"></div>
            
            {/* Conteneur principal */}
            <div className="relative max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-slate-50/80 via-white/60 to-slate-100/40 dark:from-slate-900/80 dark:via-slate-800/60 dark:to-slate-900/40 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              
              {/* Éléments décoratifs */}
              <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-lg"></div>
              
              {/* Icône philosophie */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl blur-2xl"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Titre avec effet de dégradé */}
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Ma Philosophie
              </h3>
              
              {/* Citation avec style moderne */}
              <div className="relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                <blockquote className="pl-8 text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium italic">
                  "La technologie doit servir l'humain. Mon objectif est de créer
                  des expériences numériques qui non seulement fonctionnent
                  parfaitement, mais qui enrichissent véritablement la vie de leurs
                  utilisateurs."
                </blockquote>
              </div>
              
              {/* Signature moderne */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                  <span>Thibaut - Développeur Full-Stack</span>
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
