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
    <section className="py-20 px-6 relative bg-gradient-to-b from-background via-background/95 to-background">
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
            Témoignages Clients
          </h2>
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
              className="relative group"
            >
              <div className="p-8 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-card/80 hover:bg-gradient-to-br hover:from-card hover:via-primary/5 hover:to-card hover:border-primary/40 transition-all duration-500 h-full shadow-lg hover:shadow-2xl hover:shadow-primary/10 backdrop-blur-sm relative overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Quote icon with enhanced styling */}
                <div className="absolute top-6 right-6 text-primary/30 group-hover:text-primary/50 transition-colors duration-300">
                  <Quote className="h-10 w-10" />
                </div>
                
                {/* Rating with enhanced stars */}
                <div className="flex items-center gap-1 mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                  ))}
                </div>
                
                {/* Content with better typography */}
                <p className="text-foreground/90 mb-8 italic text-base leading-relaxed relative z-10 font-medium">
                  "{testimonial.content}"
                </p>
                
                {/* Author with enhanced styling */}
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="font-bold text-foreground text-lg">{testimonial.name}</p>
                    <p className="text-sm text-primary/80 font-medium">
                      {testimonial.role} chez {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center p-8 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
            <div className="text-3xl font-bold text-primary mb-2">{testimonials.length}</div>
            <div className="text-sm text-muted-foreground font-medium">Témoignages</div>
          </div>
          <div className="text-center p-8 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground font-medium">Satisfaction</div>
          </div>
          <div className="text-center p-8 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
            <div className="text-3xl font-bold text-primary mb-2">5★</div>
            <div className="text-sm text-muted-foreground font-medium">Note moyenne</div>
          </div>
          <div className="text-center p-8 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground font-medium">Projets réalisés</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 