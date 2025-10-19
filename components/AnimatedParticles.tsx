'use client';

import { motion } from 'framer-motion';

export const AnimatedParticles = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    <motion.div
      className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-blue-400/25 to-purple-400/25 blur-sm"
      style={{ left: '5%', top: '10%' }}
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.25, 0.6, 0.25],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute w-7 h-7 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-sm"
      style={{ left: '90%', top: '15%' }}
      animate={{
        scale: [1, 1.6, 1],
        opacity: [0.2, 0.7, 0.2],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5
      }}
    />
    
    <motion.div
      className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-sm"
      style={{ left: '10%', top: '20%' }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-purple-400/40 to-pink-400/40 blur-sm"
      style={{ left: '85%', top: '30%' }}
      animate={{
        scale: [1, 1.8, 1],
        opacity: [0.4, 0.9, 0.4],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    />
    <motion.div
      className="absolute w-5 h-5 rounded-full bg-gradient-to-r from-teal-400/35 to-cyan-400/35 blur-sm"
      style={{ left: '20%', top: '70%' }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.35, 0.7, 0.35],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}
    />
    <motion.div
      className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400/30 to-green-400/30 blur-sm"
      style={{ left: '75%', top: '80%' }}
      animate={{
        scale: [1, 1.7, 1],
        opacity: [0.3, 0.75, 0.3],
      }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.7
      }}
    />
    
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400/50 to-blue-400/50"
      style={{ left: '75%', top: '15%' }}
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }}
    />
    <motion.div
      className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-400/45 to-rose-400/45"
      style={{ left: '15%', top: '60%' }}
      animate={{
        scale: [1, 1.6, 1],
        opacity: [0.45, 0.9, 0.45],
      }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5
      }}
    />
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400/55 to-green-400/55"
      style={{ left: '80%', top: '75%' }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.55, 1, 0.55],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2.5
      }}
    />
    <motion.div
      className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-400/50 to-emerald-400/50"
      style={{ left: '25%', top: '85%' }}
      animate={{
        scale: [1, 1.8, 1],
        opacity: [0.5, 0.95, 0.5],
      }}
      transition={{
        duration: 4.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.3
      }}
    />
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-violet-400/55 to-purple-400/55"
      style={{ left: '65%', top: '25%' }}
      animate={{
        scale: [1, 1.6, 1],
        opacity: [0.55, 1, 0.55],
      }}
      transition={{
        duration: 3.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.8
      }}
    />
    
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400/60 to-purple-400/60"
      style={{ left: '45%', top: '25%' }}
      animate={{
        scale: [1, 1.7, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.8
      }}
    />
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400/65 to-blue-400/65"
      style={{ left: '60%', top: '80%' }}
      animate={{
        scale: [1, 1.8, 1],
        opacity: [0.65, 1, 0.65],
      }}
      transition={{
        duration: 3.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.2
      }}
    />
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-400/50 to-emerald-400/50"
      style={{ left: '90%', top: '50%' }}
      animate={{
        scale: [1, 1.6, 1],
        opacity: [0.5, 0.95, 0.5],
      }}
      transition={{
        duration: 4.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.3
      }}
    />
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-rose-400/70 to-pink-400/70"
      style={{ left: '35%', top: '45%' }}
      animate={{
        scale: [1, 1.9, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.6
      }}
    />
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400/60 to-blue-400/60"
      style={{ left: '55%', top: '65%' }}
      animate={{
        scale: [1, 1.7, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 3.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.4
      }}
    />
    
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-blue-300/80 to-purple-300/80"
      style={{ left: '40%', top: '35%' }}
      animate={{
        scale: [1, 2, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-purple-300/75 to-pink-300/75"
      style={{ left: '70%', top: '55%' }}
      animate={{
        scale: [1, 1.8, 1],
        opacity: [0.75, 1, 0.75],
      }}
      transition={{
        duration: 2.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.9
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-teal-300/85 to-cyan-300/85"
      style={{ left: '85%', top: '65%' }}
      animate={{
        scale: [1, 2.2, 1],
        opacity: [0.85, 1, 0.85],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.6
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-emerald-300/80 to-green-300/80"
      style={{ left: '15%', top: '40%' }}
      animate={{
        scale: [1, 1.9, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2.1,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4
      }}
    />
    
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-blue-300/40 to-purple-300/40"
      style={{ left: '30%', top: '40%' }}
      animate={{
        y: [-10, 10, -10],
        x: [-5, 5, -5],
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-purple-300/50 to-pink-300/50"
      style={{ left: '70%', top: '35%' }}
      animate={{
        y: [10, -10, 10],
        x: [5, -5, 5],
        opacity: [0.5, 0.9, 0.5],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}
    />
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-300/45 to-blue-300/45"
      style={{ left: '50%', top: '75%' }}
      animate={{
        y: [-15, 15, -15],
        x: [-8, 8, -8],
        opacity: [0.45, 0.85, 0.45],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.3
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-rose-300/60 to-pink-300/60"
      style={{ left: '20%', top: '30%' }}
      animate={{
        y: [8, -8, 8],
        x: [3, -3, 3],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.7
      }}
    />
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-emerald-300/50 to-green-300/50"
      style={{ left: '80%', top: '45%' }}
      animate={{
        y: [-12, 12, -12],
        x: [-6, 6, -6],
        opacity: [0.5, 0.9, 0.5],
      }}
      transition={{
        duration: 11,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2.2
      }}
    />
    
    <motion.div
      className="absolute w-5 h-5 rounded-full bg-gradient-to-r from-indigo-400/35 to-purple-400/35 blur-sm"
      style={{ left: '50%', top: '10%' }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.35, 0.8, 0.35],
      }}
      transition={{
        duration: 6.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.8
      }}
    />
    <motion.div
      className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-rose-400/40 to-pink-400/40 blur-sm"
      style={{ left: '95%', top: '60%' }}
      animate={{
        scale: [1, 1.6, 1],
        opacity: [0.4, 0.85, 0.4],
      }}
      transition={{
        duration: 5.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.9
      }}
    />
    <motion.div
      className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-400/30 blur-sm"
      style={{ left: '0%', top: '50%' }}
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration: 7.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4
      }}
    />
    
    <motion.div
      className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-r from-teal-400/55 to-emerald-400/55"
      style={{ left: '45%', top: '85%' }}
      animate={{
        scale: [1, 1.7, 1],
        opacity: [0.55, 1, 0.55],
      }}
      transition={{
        duration: 4.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.1
      }}
    />
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-green-400/60 to-emerald-400/60"
      style={{ left: '95%', top: '25%' }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 3.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2.7
      }}
    />
    <motion.div
      className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-r from-violet-400/50 to-indigo-400/50"
      style={{ left: '5%', top: '75%' }}
      animate={{
        scale: [1, 1.8, 1],
        opacity: [0.5, 0.95, 0.5],
      }}
      transition={{
        duration: 4.1,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.6
      }}
    />
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400/65 to-green-400/65"
      style={{ left: '60%', top: '15%' }}
      animate={{
        scale: [1, 1.6, 1],
        opacity: [0.65, 1, 0.65],
      }}
      transition={{
        duration: 3.7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.7
      }}
    />
    
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400/70 to-indigo-400/70"
      style={{ left: '30%', top: '15%' }}
      animate={{
        scale: [1, 1.8, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2.9,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.9
      }}
    />
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-purple-400/75 to-violet-400/75"
      style={{ left: '85%', top: '40%' }}
      animate={{
        scale: [1, 1.9, 1],
        opacity: [0.75, 1, 0.75],
      }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5
      }}
    />
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-teal-400/65 to-cyan-400/65"
      style={{ left: '10%', top: '35%' }}
      animate={{
        scale: [1, 1.7, 1],
        opacity: [0.65, 1, 0.65],
      }}
      transition={{
        duration: 3.1,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2.1
      }}
    />
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-rose-400/80 to-pink-400/80"
      style={{ left: '75%', top: '55%' }}
      animate={{
        scale: [1, 2, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.7
      }}
    />
    
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-indigo-300/90 to-purple-300/90"
      style={{ left: '25%', top: '55%' }}
      animate={{
        scale: [1, 2.1, 1],
        opacity: [0.9, 1, 0.9],
      }}
      transition={{
        duration: 1.9,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.3
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-cyan-300/85 to-blue-300/85"
      style={{ left: '90%', top: '70%' }}
      animate={{
        scale: [1, 1.9, 1],
        opacity: [0.85, 1, 0.85],
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.8
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-green-300/88 to-emerald-300/88"
      style={{ left: '50%', top: '5%' }}
      animate={{
        scale: [1, 2.3, 1],
        opacity: [0.88, 1, 0.88],
      }}
      transition={{
        duration: 1.7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-emerald-300/82 to-green-300/82"
      style={{ left: '35%', top: '90%' }}
      animate={{
        scale: [1, 2, 1],
        opacity: [0.82, 1, 0.82],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.2
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-pink-300/87 to-rose-300/87"
      style={{ left: '65%', top: '90%' }}
      animate={{
        scale: [1, 1.8, 1],
        opacity: [0.87, 1, 0.87],
      }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.8
      }}
    />
    
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-indigo-300/55 to-purple-300/55"
      style={{ left: '45%', top: '50%' }}
      animate={{
        y: [-8, 8, -8],
        x: [-4, 4, -4],
        opacity: [0.55, 0.9, 0.55],
      }}
      transition={{
        duration: 7.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-teal-300/70 to-cyan-300/70"
      style={{ left: '25%', top: '20%' }}
      animate={{
        y: [6, -6, 6],
        x: [2, -2, 2],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 6.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.4
      }}
    />
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-300/45 to-green-300/45"
      style={{ left: '80%', top: '20%' }}
      animate={{
        y: [-14, 14, -14],
        x: [-7, 7, -7],
        opacity: [0.45, 0.8, 0.45],
      }}
      transition={{
        duration: 9.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2.5
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-green-300/65 to-emerald-300/65"
      style={{ left: '15%', top: '65%' }}
      animate={{
        y: [4, -4, 4],
        x: [1, -1, 1],
        opacity: [0.65, 0.95, 0.65],
      }}
      transition={{
        duration: 5.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.9
      }}
    />
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-violet-300/50 to-indigo-300/50"
      style={{ left: '70%', top: '10%' }}
      animate={{
        y: [-10, 10, -10],
        x: [-3, 3, -3],
        opacity: [0.5, 0.85, 0.5],
      }}
      transition={{
        duration: 8.7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.6
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-rose-300/75 to-pink-300/75"
      style={{ left: '55%', top: '95%' }}
      animate={{
        y: [12, -12, 12],
        x: [6, -6, 6],
        opacity: [0.75, 1, 0.75],
      }}
      transition={{
        duration: 10.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.6
      }}
    />
  </div>
); 