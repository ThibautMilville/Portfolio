"use client"

import { motion } from "framer-motion"
import { ArrowDown, Download, Github, Linkedin, Mail, Code2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Typewriter } from "@/components/ui/typewriter"
import { AnimatedParticles } from "./AnimatedParticles"
import { LocalImage } from "@/components/ui/image"

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background to-background" />
      <AnimatedParticles />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Anneaux animés autour de l'image */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-85 blur-sm transition-all duration-500 animate-pulse"></div>
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/80 via-secondary/80 to-accent/80 opacity-70 transition-all duration-500">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-primary/80 via-secondary/80 to-accent/80 animate-spin-slow"></div>
              </div>
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-accent via-secondary to-primary opacity-50 transition-all duration-500">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-accent via-secondary to-primary animate-spin-reverse"></div>
              </div>

              {/* Particules flottantes */}
              <div className="absolute -inset-3 rounded-full">
                <motion.div
                  className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-white/60 to-primary/60"
                  style={{ left: "20%", top: "-12%" }}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0,
                  }}
                />
                <motion.div
                  className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-secondary/50 to-accent/50"
                  style={{ left: "112%", top: "20%" }}
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                <motion.div
                  className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-primary/45 to-secondary/45"
                  style={{ left: "80%", top: "112%" }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.45, 0.9, 0.45],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                />
                <motion.div
                  className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-accent/55 to-primary/55"
                  style={{ left: "-12%", top: "80%" }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.55, 1, 0.55],
                  }}
                  transition={{
                    duration: 4.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                <motion.div
                  className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-secondary/60 to-accent/60"
                  style={{ left: "90%", top: "-10%" }}
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3.8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1.5,
                  }}
                />
                <motion.div
                  className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary/50 to-secondary/50"
                  style={{ left: "10%", top: "112%" }}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 0.95, 0.5],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 2.5,
                  }}
                />
              </div>

              {/* Image de profil avec animation fluide */}
              <div className="relative w-48 h-48 lg:w-64 lg:h-64 overflow-hidden border-4 border-white/50 shadow-2xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm transition-all duration-500 animate-smooth-morph">
                <LocalImage
                  imageName="photo_profil.jpg"
                  alt="Thibaut Milville"
                  className="w-full h-full object-cover"
                />
                {/* Overlay subtil sans effet de hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-40"></div>

                {/* Particules internes */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-2 left-2 w-1 h-1 bg-white/60 rounded-full animate-float-particle"></div>
                  <div
                    className="absolute top-4 right-4 w-0.5 h-0.5 bg-primary/80 rounded-full animate-float-particle"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="absolute bottom-3 left-4 w-0.5 h-0.5 bg-secondary/80 rounded-full animate-float-particle"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute top-1/2 right-2 w-0.5 h-0.5 bg-accent/70 rounded-full animate-float-particle"
                    style={{ animationDelay: "1.5s" }}
                  ></div>
                  <div
                    className="absolute bottom-2 right-2 w-0.5 h-0.5 bg-primary/70 rounded-full animate-float-particle"
                    style={{ animationDelay: "2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="text-center lg:text-left flex-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Thibaut MILVILLE
              </h1>
              <div className="text-xl md:text-2xl text-muted-foreground mb-8 font-mono flex flex-col items-center lg:items-start gap-2">
                <Typewriter
                  words={["<Software Engineer />", "<Expert React & Next.js />", "<Passionné par l'innovation />"]}
                  typingSpeed={70}
                  deletingSpeed={40}
                  pause={1200}
                  className="min-h-[2.5rem]"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Passionné par la création d'expériences web modernes avec React, Next.js et NestJS. Je transforme vos
              idées en applications performantes et scalables.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <Button size="lg" asChild>
              <Link href="/projets">
                Voir mes projets
                <ArrowRight className="ml-2 h-4 w-4 text-white" />
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
            <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
              <a href="https://github.com/ThibautMilville" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
              <a href="https://fr.linkedin.com/in/thibaut-milville" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
              <Link href="/contact">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  )
}