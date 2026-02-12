"use client";

import { useState } from "react";
import { players, hof, trophies } from "@/lib/data";
import Hero from "@/components/Hero";
import PlayerCard from "@/components/PlayerCard";
import PlayerModal from "@/components/PlayerModal";
import { Award, Star, Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [cupPage, setCupPage] = useState(0);
  const cupsPerPage = 6;
  const sortedTrophies = [...trophies].sort((a, b) => b.cups - a.cups);
  const totalCupPages = Math.ceil(sortedTrophies.length / cupsPerPage);
  
  const nextCupPage = () => setCupPage(p => (p + 1) % totalCupPages);
  const prevCupPage = () => setCupPage(p => (p - 1 + totalCupPages) % totalCupPages);
  
  const currentTrophies = sortedTrophies.slice(cupPage * cupsPerPage, (cupPage + 1) * cupsPerPage);

  // Unify and sort main list by cups
  const unifiedPlayers = [...players].sort((a, b) => (b.cups || 0) - (a.cups || 0));

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#121214] via-[#1a1a1c] to-[#121214] pb-20 text-white selection:bg-emerald-500 selection:text-black">
      <div className="mx-auto max-w-4xl px-4 pt-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-emerald-500 rounded flex items-center justify-center shadow-[0_0_15px_rgba(74,222,128,0.2)]">
              <Star className="text-black fill-black h-5 w-5" />
            </div>
            <h1 className="text-xl font-black tracking-tighter italic uppercase">FOTBAL GPR</h1>
          </div>
          <div className="flex gap-4 text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase">
            <span>Sezonul 6</span>
            <span className="text-emerald-500">Live Dashboard</span>
          </div>
        </div>

        <Hero />

        {/* Unified Top Section: Hall of Fame & Paginated Highlight List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2 text-xs font-black italic uppercase tracking-wider text-neutral-400">
                <Trophy className="text-emerald-500 h-3.5 w-3.5" />
                Trophy Room
              </h2>
              <div className="flex items-center gap-2">
                <button onClick={prevCupPage} className="p-1 rounded bg-white/5 border border-white/10 text-emerald-500 hover:bg-emerald-500/10"><ChevronLeft size={12}/></button>
                <button onClick={nextCupPage} className="p-1 rounded bg-white/5 border border-white/10 text-emerald-500 hover:bg-emerald-500/10"><ChevronRight size={12}/></button>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.03] p-4 border border-white/10 backdrop-blur-md min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div key={cupPage} initial={{opacity:0, x:10}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-10}} className="space-y-2">
                  {currentTrophies.map((t, i) => (
                    <div key={t.name} className={`flex items-center justify-between p-2 rounded-lg border transition-all ${cupPage === 0 ? 'border-emerald-500/20 bg-emerald-500/[0.02]' : 'border-white/5 bg-white/[0.01]'}`}>
                      <span className="text-xs font-bold text-neutral-300">{t.name}</span>
                      <span className="font-mono text-xs font-black text-emerald-400">{t.cups} 🏆</span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xs font-black italic uppercase tracking-wider text-neutral-400">
              <Award className="text-emerald-500 h-3.5 w-3.5" />
              Hall of Fame
            </h2>
            <div className="rounded-xl bg-white/[0.03] p-4 border border-white/10 backdrop-blur-md min-h-[300px]">
              <div className="space-y-2">
                {hof.slice(0, 6).map((entry, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg border border-white/5 bg-white/[0.01]">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold text-neutral-500 uppercase">{entry.season}</span>
                      <span className="text-xs font-bold text-neutral-200">{entry.champion}</span>
                    </div>
                    <span className="text-[10px] font-black italic text-emerald-400">MVP: {entry.mvp}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Main Rankings List */}
        <div className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-black italic tracking-tight uppercase">
              <Star className="text-emerald-400 h-5 w-5 fill-emerald-400/20" />
              Player Rankings
            </h2>
            <span className="font-mono text-[10px] font-bold text-neutral-500">{unifiedPlayers.length} PROFILES</span>
          </div>
          
          <div className="grid gap-3">
            {unifiedPlayers.map((player, idx) => (
              <PlayerCard 
                key={player.name} 
                player={player} 
                index={idx} 
                onClick={() => setSelectedPlayer(player)}
              />
            ))}
          </div>
        </div>
      </div>

      <PlayerModal 
        player={selectedPlayer} 
        isOpen={!!selectedPlayer} 
        onClose={() => setSelectedPlayer(null)} 
      />
    </main>
  );
}
