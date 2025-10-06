'use client';

import { motion } from 'framer-motion';

// Composant de particules légères pour les sections secondaires
const LightParticles = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {/* Points moyens */}
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400/40 to-purple-400/40"
      style={{ left: '15%', top: '20%' }}
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }}
    />
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-400/35 to-pink-400/35"
      style={{ left: '85%', top: '30%' }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.35, 0.7, 0.35],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.2
      }}
    />
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-teal-400/45 to-cyan-400/45"
      style={{ left: '75%', top: '70%' }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.45, 0.9, 0.45],
      }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.8
      }}
    />
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400/40 to-green-400/40"
      style={{ left: '5%', top: '50%' }}
      animate={{
        scale: [1, 1.6, 1],
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{
        duration: 6.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.6
      }}
    />
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-orange-400/35 to-yellow-400/35"
      style={{ left: '95%', top: '80%' }}
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.35, 0.75, 0.35],
      }}
      transition={{
        duration: 5.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.9
      }}
    />
    
    {/* Points petits */}
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-indigo-400/50 to-blue-400/50"
      style={{ left: '25%', top: '60%' }}
      animate={{
        scale: [1, 1.6, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 4.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.3
      }}
    />
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-emerald-400/55 to-green-400/55"
      style={{ left: '65%', top: '15%' }}
      animate={{
        scale: [1, 1.7, 1],
        opacity: [0.55, 1, 0.55],
      }}
      transition={{
        duration: 3.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5
      }}
    />
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-orange-400/45 to-yellow-400/45"
      style={{ left: '30%', top: '85%' }}
      animate={{
        scale: [1, 1.8, 1],
        opacity: [0.45, 0.9, 0.45],
      }}
      transition={{
        duration: 4.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.7
      }}
    />
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-violet-400/50 to-indigo-400/50"
      style={{ left: '35%', top: '10%' }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.5, 0.95, 0.5],
      }}
      transition={{
        duration: 3.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.1
      }}
    />
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-rose-400/55 to-pink-400/55"
      style={{ left: '65%', top: '75%' }}
      animate={{
        scale: [1, 1.9, 1],
        opacity: [0.55, 1, 0.55],
      }}
      transition={{
        duration: 4.1,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4
      }}
    />
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400/45 to-blue-400/45"
      style={{ left: '75%', top: '45%' }}
      animate={{
        scale: [1, 1.6, 1],
        opacity: [0.45, 0.85, 0.45],
      }}
      transition={{
        duration: 3.7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.8
      }}
    />
    
    {/* Points minuscules */}
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-violet-400/70 to-purple-400/70"
      style={{ left: '90%', top: '50%' }}
      animate={{
        scale: [1, 1.9, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 3.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.9
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-cyan-400/65 to-blue-400/65"
      style={{ left: '10%', top: '80%' }}
      animate={{
        scale: [1, 2, 1],
        opacity: [0.65, 1, 0.65],
      }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.1
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-rose-400/60 to-pink-400/60"
      style={{ left: '25%', top: '25%' }}
      animate={{
        scale: [1, 1.8, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-emerald-400/75 to-green-400/75"
      style={{ left: '20%', top: '35%' }}
      animate={{
        scale: [1, 2.1, 1],
        opacity: [0.75, 1, 0.75],
      }}
      transition={{
        duration: 2.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.6
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-indigo-400/65 to-purple-400/65"
      style={{ left: '70%', top: '90%' }}
      animate={{
        scale: [1, 1.7, 1],
        opacity: [0.65, 1, 0.65],
      }}
      transition={{
        duration: 3.9,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.3
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-teal-400/70 to-cyan-400/70"
      style={{ left: '60%', top: '5%' }}
      animate={{
        scale: [1, 2.2, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.8
      }}
    />
    
    {/* Particules flottantes */}
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-blue-300/50 to-purple-300/50"
      style={{ left: '35%', top: '40%' }}
      animate={{
        y: [-8, 8, -8],
        x: [-3, 3, -3],
        opacity: [0.5, 0.9, 0.5],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-teal-300/55 to-cyan-300/55"
      style={{ left: '80%', top: '60%' }}
      animate={{
        y: [6, -6, 6],
        x: [2, -2, 2],
        opacity: [0.55, 0.95, 0.55],
      }}
      transition={{
        duration: 9.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.8
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-orange-300/60 to-yellow-300/60"
      style={{ left: '15%', top: '70%' }}
      animate={{
        y: [-6, 6, -6],
        x: [-2, 2, -2],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 7.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.7
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-rose-300/45 to-pink-300/45"
      style={{ left: '80%', top: '20%' }}
      animate={{
        y: [4, -4, 4],
        x: [1, -1, 1],
        opacity: [0.45, 0.85, 0.45],
      }}
      transition={{
        duration: 10.1,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.4
      }}
    />
    
    {/* Particules supplémentaires à droite pour équilibrer */}
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400/40 to-purple-400/40"
      style={{ left: '88%', top: '15%' }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{
        duration: 6.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.6
      }}
    />
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-teal-400/50 to-cyan-400/50"
      style={{ left: '92%', top: '65%' }}
      animate={{
        scale: [1, 1.7, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.2
      }}
    />
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-emerald-400/55 to-green-400/55"
      style={{ left: '82%', top: '85%' }}
      animate={{
        scale: [1, 1.8, 1],
        opacity: [0.55, 1, 0.55],
      }}
      transition={{
        duration: 3.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.8
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-orange-400/70 to-yellow-400/70"
      style={{ left: '95%', top: '35%' }}
      animate={{
        scale: [1, 2, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2.7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.3
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-violet-400/65 to-indigo-400/65"
      style={{ left: '87%', top: '55%' }}
      animate={{
        scale: [1, 1.9, 1],
        opacity: [0.65, 1, 0.65],
      }}
      transition={{
        duration: 3.1,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.0
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-blue-300/60 to-purple-300/60"
      style={{ left: '93%', top: '75%' }}
      animate={{
        y: [-5, 5, -5],
        x: [-2, 2, -2],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 8.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-cyan-300/55 to-teal-300/55"
      style={{ left: '85%', top: '40%' }}
      animate={{
        y: [7, -7, 7],
        x: [3, -3, 3],
        opacity: [0.55, 0.95, 0.55],
      }}
      transition={{
        duration: 11.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.6
      }}
    />
    
    {/* Nouvelles particules supplémentaires (+40%) */}
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-pink-400/45 to-rose-400/45"
      style={{ left: '12%', top: '8%' }}
      animate={{
        scale: [1, 1.6, 1],
        opacity: [0.45, 0.9, 0.45],
      }}
      transition={{
        duration: 5.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4
      }}
    />
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-amber-400/60 to-orange-400/60"
      style={{ left: '78%', top: '8%' }}
      animate={{
        scale: [1, 1.8, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 4.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.3
      }}
    />
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-sky-400/55 to-blue-400/55"
      style={{ left: '8%', top: '75%' }}
      animate={{
        scale: [1, 1.7, 1],
        opacity: [0.55, 1, 0.55],
      }}
      transition={{
        duration: 3.9,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.8
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-lime-400/75 to-green-400/75"
      style={{ left: '45%', top: '12%' }}
      animate={{
        scale: [1, 2.3, 1],
        opacity: [0.75, 1, 0.75],
      }}
      transition={{
        duration: 2.9,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.6
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-fuchsia-400/65 to-purple-400/65"
      style={{ left: '55%', top: '88%' }}
      animate={{
        scale: [1, 1.8, 1],
        opacity: [0.65, 1, 0.65],
      }}
      transition={{
        duration: 3.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.1
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-cyan-300/50 to-blue-300/50"
      style={{ left: '18%', top: '45%' }}
      animate={{
        y: [-4, 4, -4],
        x: [-1, 1, -1],
        opacity: [0.5, 0.9, 0.5],
      }}
      transition={{
        duration: 7.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.3
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-emerald-300/55 to-teal-300/55"
      style={{ left: '72%', top: '35%' }}
      animate={{
        y: [5, -5, 5],
        x: [2, -2, 2],
        opacity: [0.55, 0.95, 0.55],
      }}
      transition={{
        duration: 9.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.7
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-orange-300/60 to-amber-300/60"
      style={{ left: '38%', top: '78%' }}
      animate={{
        y: [-3, 3, -3],
        x: [-1, 1, -1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 6.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.9
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-rose-300/50 to-pink-300/50"
      style={{ left: '68%', top: '92%' }}
      animate={{
        y: [6, -6, 6],
        x: [3, -3, 3],
        opacity: [0.5, 0.85, 0.5],
      }}
      transition={{
        duration: 10.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.4
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-indigo-300/65 to-violet-300/65"
      style={{ left: '42%', top: '22%' }}
      animate={{
        y: [-7, 7, -7],
        x: [-2, 2, -2],
        opacity: [0.65, 1, 0.65],
      }}
      transition={{
        duration: 8.7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.7
      }}
    />
    <motion.div
      className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r from-yellow-300/55 to-orange-300/55"
      style={{ left: '88%', top: '68%' }}
      animate={{
        y: [4, -4, 4],
        x: [1, -1, 1],
        opacity: [0.55, 0.9, 0.55],
      }}
      transition={{
        duration: 11.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.2
      }}
    />
  </div>
);

export default LightParticles; 