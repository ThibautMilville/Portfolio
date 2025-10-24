"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Star, Quote } from "lucide-react";
import LightParticles from "@/components/ui/light-particles";
import { LocalImage } from "@/components/ui/image";
import React from "react";

export default function TestimonialsSection() {
  const t = useTranslations('Home.testimonials');
  const locale = useLocale();
  const [testimonials, setTestimonials] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const testimonialsData = await import(`@/messages/${locale}/home/testimonials.json`);
        setTestimonials(testimonialsData.default.testimonials || []);
      } catch (error) {
        console.warn('Could not load testimonials:', error);
      }
    };
    
    loadTestimonials();
  }, [locale]);
  
  return (
    <section className="py-6 md:py-8 px-6 relative bg-gradient-to-b from-background via-background/95 to-background">
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
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.length === 0 ? (
            <div className="col-span-2 text-center py-8">
              <p className="text-muted-foreground">{t('loading')}</p>
            </div>
          ) : (
            testimonials.map((testimonial: any, index: number) => (
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

                {/* Author with enhanced styling */}
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 shadow-md">
                      <LocalImage
                        imageName={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-primary/80 font-medium">
                      {testimonial.role} {t('at')} {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Rating with enhanced stars */}
                <div className="flex items-center gap-1 mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                    />
                  ))}
                </div>

                {/* Content with better typography */}
                <p className="text-foreground/90 italic text-base leading-relaxed relative z-10 font-medium">
                  "{testimonial.content}"
                </p>
              </div>
            </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
