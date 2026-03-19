'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#070D0A] z-100 flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        {/* Pulsing Outer Ring */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            borderWidth: ['2px', '4px', '2px'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full border border-feu-gold/50"
        />
        
        {/* Spinning Inner Geometry */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-4 border-2 border-t-feu-gold border-r-transparent border-b-feu-gold border-l-transparent rounded-full shadow-[0_0_15px_rgba(241,181,35,0.3)]"
        />

        {/* Central Core */}
        <motion.div
          animate={{
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-[35.5%] bg-feu-gold rounded-sm rotate-45"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-col items-center gap-2"
      >
        <span className="text-feu-gold text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">
          Synchronizing Roster
        </span>
        <div className="w-32 h-px bg-white/5 relative overflow-hidden">
          <motion.div
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-feu-gold/40"
          />
        </div>
      </motion.div>
    </div>
  );
}
