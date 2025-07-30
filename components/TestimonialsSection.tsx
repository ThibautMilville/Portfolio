'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import LightParticles from '@/components/ui/light-particles';

const testimonials = [
  {
    name: "Jean Dupont",
    role: "Directeur Technique",
    company: "TechCorp",
    content: "Thibaut a une excellente maîtrise des technologies modernes et une capacité d'apprentissage remarquable. Ses solutions sont toujours innovantes et bien structurées.",
    rating: 5
  },
  {
    name: "Marie Martin",
    role: "Product Manager",
    company: "InnovSoft",
    content: "Travailler avec Thibaut a été un plaisir. Il comprend rapidement les besoins et propose des solutions techniques de qualité. Très professionnel et fiable.",
    rating: 5
  },
  {
    name: "Pierre Durand",
    role: "Lead Developer",
    company: "WebSolutions",
    content: "Thibaut excelle dans le développement React et Next.js. Son code est propre, maintenable et ses performances sont excellentes. Un développeur de talent.",
    rating: 5
  },
  {
    name: "Sophie Bernard",
    role: "CEO",
    company: "StartupXYZ",
    content: "Thibaut a transformé notre vision en réalité. Son expertise technique et sa créativité ont été essentielles pour le succès de notre projet.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-6 relative">
      <LightParticles />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Témoignages Clients</h2>
          <p className="text-lg text-muted-foreground">Ce que disent mes clients de mon travail</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="p-6 rounded-lg border border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-300 h-full">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 text-primary/20">
                  <Quote className="h-8 w-8" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-muted-foreground mb-6 italic text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} chez {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center p-6 rounded-2xl border bg-card">
            <div className="text-2xl font-bold text-primary mb-1">{testimonials.length}</div>
            <div className="text-sm text-muted-foreground">Témoignages</div>
          </div>
          <div className="text-center p-6 rounded-2xl border bg-card">
            <div className="text-2xl font-bold text-primary mb-1">100%</div>
            <div className="text-sm text-muted-foreground">Satisfaction</div>
          </div>
          <div className="text-center p-6 rounded-2xl border bg-card">
            <div className="text-2xl font-bold text-primary mb-1">5★</div>
            <div className="text-sm text-muted-foreground">Note moyenne</div>
          </div>
          <div className="text-center p-6 rounded-2xl border bg-card">
            <div className="text-2xl font-bold text-primary mb-1">50+</div>
            <div className="text-sm text-muted-foreground">Projets réalisés</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 