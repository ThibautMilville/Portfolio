'use client'

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from './Tooltip';

interface Logo {
  name: string;
  src: string;
  alt: string;
  linkedinUrl?: string;
}

interface LogoCarouselProps {
  logos: Logo[];
  speed?: number;
}

export default function LogoCarousel({ logos, speed = 30 }: LogoCarouselProps) {
  const generateInfiniteLogos = (originalLogos: Logo[], repetitions: number = 8): Logo[] => {
    const infiniteLogos: Logo[] = [];
    for (let i = 0; i < repetitions; i++) {
      originalLogos.forEach((logo) => {
        infiniteLogos.push({
          ...logo,
          name: logo.name,
          alt: logo.alt
        });
      });
    }
    return infiniteLogos;
  };

  const rowLogos = useMemo(() => logos, [logos]);
  const firstInfinite = useMemo(() => generateInfiniteLogos(rowLogos), [rowLogos]);
  const secondInfinite = useMemo(() => generateInfiniteLogos(rowLogos), [rowLogos]);

  const renderRow = (
    rowInfinite: Logo[],
    direction: 'left' | 'right',
    duration: number
  ) => {
    const horizontalStep = rowInfinite.length * 112;
    const animationX = direction === 'left' ? [0, -horizontalStep / 2] : [-horizontalStep / 2, 0];

    return (
      <div className="relative w-full h-24 overflow-hidden bg-transparent">
        <motion.div
          className="flex items-center h-full w-max"
          animate={{ x: animationX }}
          transition={{
            ease: 'linear',
            duration,
            repeat: Infinity,
            repeatType: 'loop'
          }}
          style={{ willChange: 'transform' }}
        >
          {rowInfinite.map((logo, index) => (
            <Tooltip key={`${direction}-${logo.name}-${index}`} content={logo.name} hasUpwardAnimation={true}>
              <motion.div
                className="flex-shrink-0 flex items-center justify-center mx-7"
                initial={{ opacity: 0, scale: 0.9, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: (index % rowLogos.length) * 0.06,
                  ease: 'easeOut'
                }}
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  transition: {
                    duration: 0.2,
                    type: 'spring',
                    stiffness: 260
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
                      className="h-16 md:h-20 w-auto opacity-90 hover:opacity-100 transition-all duration-300 cursor-pointer filter drop-shadow-md"
                      whileHover={{
                        filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.22))"
                      }}
                    />
                  </a>
                ) : (
                  <motion.img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-16 md:h-20 w-auto opacity-90 hover:opacity-100 transition-all duration-300 cursor-pointer filter drop-shadow-md"
                    whileHover={{
                      filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.22))"
                    }}
                  />
                )}
              </motion.div>
            </Tooltip>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="relative w-full overflow-visible">
      <div className="pointer-events-none absolute left-0 top-0 w-12 md:w-16 h-full bg-gradient-to-r from-background via-background/80 to-transparent z-20"></div>
      <div className="pointer-events-none absolute right-0 top-0 w-12 md:w-16 h-full bg-gradient-to-l from-background via-background/80 to-transparent z-20"></div>
      <div className="relative z-10 flex flex-col gap-4 py-2 w-full">
        {renderRow(firstInfinite, 'left', speed)}
        {renderRow(secondInfinite, 'right', speed * 1.1)}
      </div>
    </div>
  );
}
