import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface Player {
  id: string;
  number: string;
  firstName: string;
  lastName: string;
  position: string;
  height: string;
  stat?: string;
  portrait: string;
  action: string;
  isCaptain?: boolean;
}

interface PlayerCardProps {
  player: Player;
  focused: boolean;
  onClick: () => void;
}

export default function PlayerCard({ player, focused, onClick }: PlayerCardProps) {
  const [showAction, setShowAction] = useState(false);

  // Trigger the "Focus Reveal" glimpse when the card becomes focused
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (focused) {
      // Small delay for entrance polish
      timer = setTimeout(() => {
        setShowAction(true);
        // Display action shot for 1.8 seconds
        setTimeout(() => {
          setShowAction(false);
        }, 1800);
      }, 400);
    } else {
      setShowAction(false);
    }

    return () => clearTimeout(timer);
  }, [focused]);

  return (
    <motion.div
      layout
      role="button"
      aria-pressed={focused}
      aria-label={`Player profile: ${player.firstName} ${player.lastName}`}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      onClick={onClick}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={{
        scale: focused ? 1.1 : 0.85,
        rotateY: focused ? 0 : 5,
        filter: focused ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.4)',
        z: focused ? 50 : 0
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20,
        layout: { duration: 0.6 }
      }}
      className={`relative group flex-none w-[220px] md:w-[280px] h-[330px] md:h-[420px] rounded-[20px] overflow-hidden cursor-pointer border transition-all duration-700 outline-none focus-visible:ring-2 focus-visible:ring-feu-gold ${
        focused ? 'border-feu-gold z-20 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.7),0_0_20px_rgba(241,181,35,0.2)]' : 'border-white/5 z-0 grayscale'
      } bg-[#111] scroll-snap-align-center origin-center`}
    >
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          {/* Portrait Image */}
          <Image
            src={player.portrait}
            alt={`${player.firstName} ${player.lastName}`}
            fill
            sizes="(max-width: 640px) 220px, 280px"
            className={`object-cover transition-opacity duration-1000 ${
              (focused && (showAction)) ? 'opacity-0' : 'opacity-100'
            } group-hover:opacity-0`}
          />
          
          {/* Action Image (Glimpse + Hover) */}
          <Image
            src={player.action}
            alt={`${player.firstName} ${player.lastName} action`}
            fill
            sizes="(max-width: 640px) 220px, 280px"
            className={`object-cover transition-opacity duration-1000 ${
              (focused && showAction) ? 'opacity-100' : 'opacity-0'
            } group-hover:opacity-100`}
          />

          {/* Decorative Technical Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
          
          <AnimatePresence>
            {focused && showAction && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute top-4 left-4 z-30"
              >
                <span className="text-[8px] font-black uppercase tracking-[0.3em] bg-feu-gold text-black px-2 py-1 rounded-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                  Action Feed
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Captain Badge */}
      {player.isCaptain && (
        <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2 py-1 rounded-full border border-white/20 shadow-lg">
          <span className="text-feu-gold font-black text-[10px] uppercase tracking-widest">C</span>
        </div>
      )}

      <div
        className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/98 via-black/60 to-transparent transition-all duration-500 z-10 ${
          focused ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-50'
        }`}
      >
        <span className="text-[10px] font-black bg-feu-gold text-black px-2 py-0.5 rounded italic">
          #{player.number}
        </span>
        <h3 className="text-lg md:text-xl font-black italic uppercase mt-1 leading-tight">
          {player.firstName} <span className="opacity-50">{player.lastName}</span>
        </h3>
        
        <div 
          className={`flex justify-between mt-2.5 text-[8px] md:text-[10px] font-extrabold uppercase text-feu-gold transition-all duration-500 ${
            focused ? 'opacity-100 translate-y-0' : 'opacity-0'
          }`}
        >
          <span>{player.position}</span>
          <span>{player.height}</span>
          {player.stat && <span>{player.stat}</span>}
        </div>
      </div>
    </motion.div>
  );
}

