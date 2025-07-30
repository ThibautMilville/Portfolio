'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from './button';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Galerie principale */}
      <div className="space-y-4">
        {/* Image principale */}
        <div className="relative group">
          <motion.img
            src={images[currentIndex]}
            alt={`${title} - Vue ${currentIndex + 1}`}
            className="w-full h-80 object-cover rounded-2xl cursor-pointer transition-transform duration-300 hover:scale-105 shadow-2xl"
            onClick={() => openModal(currentIndex)}
            whileHover={{ scale: 1.02 }}
          />
          <div 
            className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl cursor-pointer"
            onClick={() => openModal(currentIndex)}
          />

          {/* Flèches de navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Indicateurs */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>

              {/* Compteur */}
              <div className="absolute top-4 left-4 text-white bg-black/50 px-3 py-1 rounded-full text-sm z-10">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Miniatures */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.slice(1).map((image, index) => (
              <motion.div
                key={index + 1}
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => openModal(index + 1)}
              >
                <img
                  src={image}
                  alt={`${title} - Vue ${index + 2}`}
                  className="w-full h-24 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-lg" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div className="relative max-w-4xl max-h-full">
              {/* Bouton fermer */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Image principale */}
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`${title} - Vue ${currentIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />

              {/* Navigation */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>

                  {/* Indicateurs */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentIndex
                            ? 'bg-white scale-125'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Compteur */}
                  <div className="absolute top-4 left-4 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                    {currentIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 