'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import playersData from '../../players.json';
import PlayerCard from '@/components/PlayerCard';

export default function Home() {
  const [focusedId, setFocusedId] = useState<string>(playersData[0].id);
  const [scrollProgress, setScrollProgress] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  const focusedPlayer = playersData.find(p => p.id === focusedId) ?? playersData[0];

  const focusPlayer = (id: string) => {
    if (id === focusedId) {
      const currentIndex = playersData.findIndex(p => p.id === id);
      const nextIndex = (currentIndex + 1) % playersData.length;
      const nextId = playersData[nextIndex].id;
      setFocusedId(nextId);
      const nextElement = document.querySelector(`[data-id="${nextId}"]`);
      if (nextElement) {
        nextElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
      return;
    }

    setFocusedId(id);
    const element = document.querySelector(`[data-id="${id}"]`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  };

  const navigate = (direction: 'next' | 'prev') => {
    const currentIndex = playersData.findIndex(p => p.id === focusedId);
    let targetIndex;
    
    if (direction === 'next') {
      targetIndex = (currentIndex + 1) % playersData.length;
    } else {
      targetIndex = (currentIndex - 1 + playersData.length) % playersData.length;
    }
    
    const targetId = playersData[targetIndex].id;
    focusPlayer(targetId);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let isScrollingLine: NodeJS.Timeout;

    const handleScroll = () => {
      window.clearTimeout(isScrollingLine);
      isScrollingLine = setTimeout(() => {
        if (!viewport) return;
        const viewportRect = viewport.getBoundingClientRect();
        const centerX = viewportRect.left + viewportRect.width / 2;
        const cards = viewport.querySelectorAll('.player-card-container');
        
        let closestId = focusedId;
        let minDistance = Infinity;

        // Use standard loop for better performance
        for (let i = 0; i < cards.length; i++) {
          const card = cards[i] as HTMLElement;
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const distance = Math.abs(centerX - cardCenter);
          
          if (distance < minDistance) {
            minDistance = distance;
            const id = card.getAttribute('data-id');
            if (id) closestId = id;
          }
          if (distance < 50) break; // Early exit if we found a very close one
        }

        if (closestId !== focusedId) {
          setFocusedId(closestId);
        }
      }, 100); // Increased debounce for smoother scroll performance
    };

    viewport.addEventListener('scroll', handleScroll);
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, [focusedId]);

  // Scroll Progress Bar
  useEffect(() => {
    const handleWindowScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  return (
    <div className="bg-[#070D0A] min-h-screen text-white selection:bg-feu-gold/30">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-white/5">
        <motion.div
          className="h-full bg-feu-gold origin-left shadow-[0_0_10px_rgba(241,181,35,0.8)] will-change-transform"
          style={{ scaleX: scrollProgress / 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
      {/* Premium Background Layering */}
      <div className="fixed inset-0 -z-10 bg-[#070D0A]">
        {/* Subtle Tech Grid */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #f1b523 1px, transparent 0)', backgroundSize: '40px 40px' }} 
        />
        
        {/* Larger Mesh Glow - Optimized opacity and blur for performance */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-feu-green/5 blur-[80px] rounded-full will-change-transform" />
        
        {/* Dynamic Watermark Layout */}
        <div className="absolute top-10 left-10 text-[15vw] font-black text-white/2 select-none leading-none">88</div>
        <div className="absolute bottom-10 right-10 text-[15vw] font-black text-feu-gold/2 select-none leading-none">TMRW</div>
        
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-black text-feu-green/5 pointer-events-none tracking-tighter select-none">
          FEU
        </div>
      </div>

      <main className="relative flex flex-col items-center pt-8 pb-12 overflow-x-hidden">
        {/* Header with Animation */}
        <motion.header 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="relative flex flex-col items-center mb-8 px-4 z-10"
        >
          {/* Season Badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: { opacity: 1, scale: 1 }
            }}
            className="mb-4 flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10"
          >
            <span className="flex h-2 w-2 rounded-full bg-feu-gold animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-feu-gold">UAAP Season 88 • 2026</span>
          </motion.div>

          {/* Main Title Group */}
          <div className="relative">
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-6xl md:text-8xl font-black italic uppercase leading-none text-center"
            >
              FEU <span className="inline-block pr-[0.1em] text-transparent bg-clip-text bg-linear-to-br from-feu-gold via-white/80 to-feu-gold bg-size-[200%_auto] animate-gradient-shift">TAMARAWS{"\u00A0"}</span>
            </motion.h1>
            
            {/* Athletic Flare Lines */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -bottom-2 left-0 right-0 h-[3px] bg-linear-to-r from-transparent via-feu-gold to-transparent opacity-50"
            />
          </div>

          {/* Subheader */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
            className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-6"
          >
            <p className="text-zinc-400 uppercase tracking-[0.4em] text-[10px] md:text-[12px] font-bold">
              Official Men's Volleyball
            </p>
            <span className="hidden md:block h-1 w-1 rounded-full bg-zinc-700"></span>
            <p className="text-feu-gold uppercase tracking-[0.4em] text-[10px] md:text-[12px] font-black italic">
              Elite Roster Database
            </p>
          </motion.div>
        </motion.header>

        {/* Roster Viewport with Arrows and 3D Perspective */}
        <div className="relative w-full group/controls perspective-container">
          {/* Navigation Arrows */}
          <button 
            onClick={() => navigate('prev')}
            aria-label="Previous Player"
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 hover:bg-feu-gold/20 border border-white/10 hover:border-feu-gold/50 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover/controls:opacity-100 hidden md:block outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-feu-gold"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={() => navigate('next')}
            aria-label="Next Player"
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 hover:bg-feu-gold/20 border border-white/10 hover:border-feu-gold/50 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover/controls:opacity-100 hidden md:block outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-feu-gold"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>

          <div 
            ref={viewportRef}
            className="w-full overflow-x-auto scroll-smooth py-16 no-scrollbar snap-x snap-mandatory perspective-container"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex gap-6 md:gap-10">
              <div className="viewport-spacer" />
              {playersData.map((player) => (
                <div 
                  key={player.id} 
                  className="player-card-container snap-center" 
                  data-id={player.id}
                  style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                >
                  <PlayerCard
                    player={player}
                    focused={focusedId === player.id}
                    onClick={() => focusPlayer(player.id)}
                  />
                </div>
              ))}
              <div className="viewport-spacer" />
            </div>
          </div>
        </div>


        {/* Dot Navigation */}
        <div className="flex items-center justify-center gap-2 mb-8" role="tablist" aria-label="Player Navigation">
          {playersData.map((player) => (
            <button
              key={player.id}
              role="tab"
              aria-selected={focusedId === player.id}
              aria-label={`Go to ${player.firstName} ${player.lastName}`}
              onClick={() => focusPlayer(player.id)}
              className={`transition-all duration-300 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-feu-gold ${
                focusedId === player.id
                  ? 'w-6 h-2 bg-feu-gold shadow-[0_0_8px_rgba(241,181,35,0.7)]'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* --- NEW SECTIONS WITH ENTRANCE ANIMATIONS --- */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl mt-32 px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Team Overview & Status */}
          <div className="space-y-8">
            <div className="border-l-4 border-feu-gold pl-6">
              <span className="text-feu-gold font-black uppercase tracking-[0.3em] text-[10px]">Division Identity</span>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter mt-1">Season 88 <span className="opacity-50">Report</span></h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Current Rank', val: '1st Place', color: 'text-feu-gold' },
                { label: 'Head Coach', val: 'Eddieson Orcullo', color: 'text-white' },
                { label: 'Main Sponsor', val: 'DN Steel', color: 'text-white' },
                { label: 'Home Venue', val: 'Araneta/Filoil', color: 'text-white' },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 p-4 rounded-xl border border-white/5"
                >
                  <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">{stat.label}</p>
                  <p className={`text-sm font-black italic uppercase ${stat.color}`}>{stat.val}</p>
                </motion.div>
              ))}
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-feu-green/10 border border-feu-green/20 p-6 rounded-2xl"
            >
              <h3 className="text-feu-green font-black uppercase text-xs tracking-widest mb-3">Recent Achievement</h3>
              <p className="text-zinc-200 text-sm leading-relaxed">
                FEU has been dominant in the early part of <span className="text-white font-bold italic">UAAP Season 88</span>, sweeping several opponents and establishing themselves as the team to beat.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-feu-green uppercase bg-feu-green/20 w-fit px-3 py-1 rounded-full">
                <span className="animate-pulse">●</span> Currently Undefeated
              </div>
            </motion.div>
          </div>

          {/* Strengths & Intel */}
          <div className="space-y-8">
            <div className="border-l-4 border-feu-gold pl-6">
              <span className="text-feu-gold font-black uppercase tracking-[0.3em] text-[10px]">Tactical Edge</span>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter mt-1">Key <span className="opacity-50">Strengths</span></h2>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Strategic Preparation', desc: 'The team completed an elite training camp in Osaka, Japan prior to the season kickoff.' },
                { title: 'Defensive Wall', desc: 'Elite serving pressure combined with the league-leading digging percentage.' },
                { title: 'Versatile Depth', desc: 'A deep bench allows for flexible rotations and sustained high-intensity play.' },
                { title: 'Team Chemistry', desc: 'High-level court communication and synchronized offensive plays.' }
              ].map((strength, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group hover:bg-white/5 p-4 rounded-xl transition-colors border border-transparent hover:border-white/10"
                >
                  <h4 className="text-white font-black italic uppercase text-sm mb-1 group-hover:text-feu-gold transition-colors">{strength.title}</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed">{strength.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Infinite Scrolling Ticker */}
        <div className="w-full bg-feu-gold py-2 text-black font-black italic uppercase text-[10px] tracking-[1em] overflow-hidden whitespace-nowrap z-20 hover:[&>div]:pause pointer-events-none md:pointer-events-auto">
          <div className="animate-ticker">
            BE BRAVE • BE BOLD • BE TAMARAWS • BE BRAVE • BE BOLD • BE TAMARAWS • BE BRAVE • BE BOLD • BE TAMARAWS • BE BRAVE • BE BOLD • BE TAMARAWS • 
          </div>
          <div className="animate-ticker">
            BE BRAVE • BE BOLD • BE TAMARAWS • BE BRAVE • BE BOLD • BE TAMARAWS • BE BRAVE • BE BOLD • BE TAMARAWS • BE BRAVE • BE BOLD • BE TAMARAWS • 
          </div>
        </div>

        {/* Professional Minimalist Footer */}
        <footer className="w-full max-w-6xl py-16 px-6 flex flex-col md:flex-row justify-between items-center gap-10 text-zinc-500 text-[10px] uppercase font-bold tracking-widest relative">
          <div className="text-center md:text-left space-y-3">
            <div>
              <p className="text-white uppercase">FEU TAMARAWS FAN PROJECT</p>
              <p className="mt-1 text-zinc-700 font-medium tracking-[0.2em]">Crafted by binsacedillo</p>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-6">
              <a href="https://github.com/binsacedillo" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-feu-gold transition-colors ease-out duration-300">GitHub</a>
              <a href="https://linkedin.com/in/binsacedillo" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-feu-gold transition-colors ease-out duration-300">LinkedIn</a>
              <a href="#" className="text-zinc-600 hover:text-feu-gold transition-colors ease-out duration-300">Portfolio</a>
            </div>
          </div>
          <div className="max-w-md text-center md:text-right space-y-4">
            <p className="text-zinc-500 leading-relaxed font-medium">
              <span className="text-feu-gold/40">DISCLAIMER:</span> This website is a conceptual prototype created for professional demonstration purposes. It is not affiliated with or endorsed by Far Eastern University or the UAAP.
            </p>
            <p className="text-[9px] text-zinc-700">
              © 2026 Season 88 Experience. All Rights Reserved.
            </p>
          </div>
        </footer>


      </main>
    </div>
  );
}
