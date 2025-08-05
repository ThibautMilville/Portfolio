'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './tooltip';

interface Logo {
  name: string;
  src: string;
  alt: string;
  linkedinUrl?: string;
}

interface LogoCarouselProps {
  logos: Logo[];
  speed?: number; // durée en secondes pour un cycle complet
}

export default function LogoCarousel({ logos, speed = 30 }: LogoCarouselProps) {
  // Générer une liste infinie en répétant les logos suffisamment
  // pour couvrir plusieurs écrans et créer un flux continu
  const generateInfiniteLogos = (originalLogos: Logo[], repetitions: number = 8): Logo[] => {
    const infiniteLogos: Logo[] = [];
    for (let i = 0; i < repetitions; i++) {
      originalLogos.forEach((logo, index) => {
        infiniteLogos.push({
          ...logo,
          name: logo.name,
          alt: logo.alt
        });
      });
    }
    return infiniteLogos;
  };

  const infiniteLogos = generateInfiniteLogos(logos);

  return (
    <div className="relative h-44 overflow-visible w-full max-w-6xl mx-auto">
      <TooltipProvider>
        {/* Fade gauche - plus prononcé avec couleur primaire */}
        <div className="pointer-events-none absolute left-0 top-0 w-32 h-36 bg-gradient-to-r from-background via-background/90 to-transparent z-10"></div>
        
        {/* Fade droite - plus prononcé avec couleur primaire */}
        <div className="pointer-events-none absolute right-0 top-0 w-32 h-36 bg-gradient-to-l from-background via-background/90 to-transparent z-10"></div>
        
        {/* Slider infini */}
        <div className="relative w-full h-44 overflow-hidden">
          <motion.div
            className="flex items-center h-full w-max"
            animate={{ 
              x: [0, -(infiniteLogos.length * 120) / 2] 
            }}
            transition={{
              ease: 'linear',
              duration: speed,
              repeat: Infinity,
              repeatType: 'loop'
            }}
            style={{ willChange: 'transform' }}
          >
            {infiniteLogos.map((logo, index) => (
                             <Tooltip key={`${logo.name}-${index}`} delayDuration={0}>
                 <TooltipTrigger asChild>
                  <motion.div
                    className="flex-shrink-0 flex items-center justify-center mx-8 relative"
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: (index % logos.length) * 0.1,
                      ease: 'easeOut'
                    }}
                    whileHover={{
                      scale: 1.4,
                      y: -8,
                      zIndex: 40,
                      transition: { 
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300
                      }
                    }}
                  >
                    {logo.linkedinUrl ? (
                      <a
                        href={logo.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <motion.img
                          src={logo.src}
                          alt={logo.alt}
                          className="h-20 w-auto grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-pointer filter drop-shadow-lg hover:drop-shadow-2xl"
                          whileHover={{
                            filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.25))"
                          }}
                        />
                      </a>
                    ) : (
                      <motion.img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-20 w-auto grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-pointer filter drop-shadow-lg hover:drop-shadow-2xl"
                        whileHover={{
                          filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.25))"
                        }}
                      />
                    )}
                  </motion.div>
                </TooltipTrigger>
                                                 <TooltipContent side="top" className="text-xs bg-background/95 backdrop-blur-sm border-2 border-primary/20 shadow-xl z-[9999]">
                  {logo.name}
                </TooltipContent>
              </Tooltip>
            ))}
          </motion.div>
        </div>


      </TooltipProvider>
    </div>
  );
} 