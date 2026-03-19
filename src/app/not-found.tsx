'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070D0A] flex flex-col items-center justify-center relative overflow-hidden text-white font-sans selection:bg-feu-gold/20">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-feu-green/5 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #f1b523 1px, transparent 0)', backgroundSize: '30px 30px' }}
        />
        <div className="absolute top-20 left-10 text-[20vw] font-black text-white/2 select-none leading-none">40</div>
        <div className="absolute bottom-20 right-10 text-[20vw] font-black text-feu-gold/2 select-none leading-none">04</div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center px-4"
      >
        <span className="bg-feu-gold/20 border border-feu-gold/30 text-feu-gold px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-6">
          Out of Bounds
        </span>

        <h1 className="text-7xl md:text-9xl font-black italic uppercase leading-none mb-4 tracking-tighter">
          Court <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-white/20">ERROR</span>
        </h1>

        <p className="max-w-md text-zinc-400 text-sm md:text-base leading-relaxed mb-10 font-medium">
          The scout report for this page doesn't exist. You might have wandered into the rival's training camp.
        </p>

        <Link href="/" className="group relative px-10 py-4 bg-white text-black font-black italic uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
          {/* Animated Background Flare */}
          <div className="absolute inset-0 bg-feu-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />

          <span className="relative z-10">Return to Roster</span>
        </Link>
      </motion.div>

      {/* Ticker for extra flair */}
      <div className="absolute bottom-0 w-full bg-white/5 py-3 border-t border-white/5 overflow-hidden whitespace-nowrap opacity-30 select-none">
        <div className="animate-ticker text-white text-[10px] font-black italic uppercase tracking-[1em]">
          BE BRAVE • BE BOLD • BE TAMARAWS • BE BRAVE • BE BOLD • BE TAMARAWS • BE BRAVE • BE BOLD • BE TAMARAWS • BE BRAVE • BE BOLD • BE TAMARAWS •
        </div>
      </div>
    </div>
  );
}
