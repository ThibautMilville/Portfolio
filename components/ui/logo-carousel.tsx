import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './tooltip';

interface Logo {
  name: string;
  src: string;
  alt: string;
}

interface LogoCarouselProps {
  logos: Logo[];
  speed?: number; // duration in seconds
}

export default function LogoCarousel({ logos, speed = 60 }: LogoCarouselProps) {
  // Générer une liste vraiment infinie en répétant les logos suffisamment
  // pour couvrir plusieurs écrans et créer un flux continu
  const generateInfiniteLogos = (originalLogos: Logo[], repetitions: number = 10): Logo[] => {
    const infiniteLogos: Logo[] = [];
    for (let i = 0; i < repetitions; i++) {
      originalLogos.forEach((logo, index) => {
        infiniteLogos.push({
          ...logo,
          name: `${logo.name} (${i + 1})`,
          alt: `${logo.alt} - Partie ${i + 1}`
        });
      });
    }
    return infiniteLogos;
  };

  const infiniteLogos = generateInfiniteLogos(logos);

  return (
    <TooltipProvider>
      <div className="relative h-20 overflow-hidden">
        {/* Fade left */}
        <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
        {/* Fade right */}
        <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-background to-transparent z-10"></div>
        
        <motion.div
          className="absolute flex items-center z-50"
          animate={{ x: ['0%', '-100%'] }}
          transition={{
            ease: 'linear',
            duration: speed,
            repeat: Infinity,
            repeatType: 'loop'
          }}
        >
          {infiniteLogos.map((logo, index) => (
            <Tooltip key={`${logo.name}-${index}`}>
              <TooltipTrigger asChild>
                <motion.div 
                  className="flex-shrink-0 flex items-center justify-center mx-6 relative z-50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-12 w-auto grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-pointer hover:scale-110 relative z-50"
                  />
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs pointer-events-auto z-50">
                {logo.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </motion.div>
      </div>
    </TooltipProvider>
  );
} 