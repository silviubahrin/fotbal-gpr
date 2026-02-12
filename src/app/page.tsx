"use client";

import { useState } from "react";
import { players, hof, trophies } from "@/lib/data";
import Hero from "@/components/Hero";
import PlayerCard from "@/components/PlayerCard";
import PlayerModal from "@/components/PlayerModal";
import { Award, Star, History, Zap, Trophy, ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sort trophies by cup count (highest to lowest)
  const sortedTrophies = [...trophies].sort((a, b) => b.cups - a.cups);
  
  const totalPages = Math.ceil(sortedTrophies.length / itemsPerPage);
  const paginatedTrophies = sortedTrophies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#121214] via-[#1a1a1c] to-[#121214] pb-20 text-white selection:bg-emerald-500 selection:text-black">
      <div className="mx-auto max-w-4xl px-4 pt-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-emerald-500 rounded flex items-center justify-center shadow-[0_0_15px_rgba(74,222,128,0.2)]">
              <Zap className="h-5 w-5 text-black fill-black" />
            </div>
            <h1 className="text-xl font-black tracking-tighter italic uppercase">FOTBAL GPR</h1>
          </div>
          <div className="flex gap-4 text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase">
            <span>Live Stats</span>
            <span className="text-emerald-500">System Active</span>
          </div>
        </div>

        <Hero />

        <div className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-black italic tracking-tight uppercase">
              <Star className="text-emerald-400 h-5 w-5 fill-emerald-400/20" />
              Player Rankings
            </h2>
            <div className="h-px flex-1 mx-4 bg-white/5" />
            <span className="font-mono text-[10px] font-bold text-neutral-500">
              {players.length} PROFILES
            </span>
          </div>
          
          <div className="grid gap-3">
            {players.sort((a, b) => b.rating - a.rating).map((player, idx) => (
              <PlayerCard 
                key={player.name} 
                player={player} 
                index={idx} 
                onClick={() => setSelectedPlayer(player)}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <section>
             <h2 className="mb-4 flex items-center gap-2 text-xs font-black italic uppercase tracking-wider text-neutral-400">
              <Award className="text-emerald-500 h-3.5 w-3.5" />
              Hall of Fame
            </h2>
            <div className="rounded-xl bg-white/[0.03] p-4 border border-white/10 backdrop-blur-md shadow-2xl h-[480px] overflow-hidden">
              <div className="grid gap-2">
                {hof.map((entry, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-white/[0.02] p-3 border border-white/5 transition-colors hover:border-emerald-500/20">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{entry.season}</span>
                      <span className="text-sm font-bold text-white">{entry.champion}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/60">MVP</span>
                      <span className="text-sm font-black italic tracking-tighter text-emerald-400">{entry.mvp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
             <h2 className="mb-4 flex items-center gap-2 text-xs font-black italic uppercase tracking-wider text-neutral-400">
              <History className="text-emerald-500 h-3.5 w-3.5" />
              Trophy Room
            </h2>
            <div className="rounded-xl bg-white/[0.03] p-4 border border-white/10 backdrop-blur-md shadow-2xl flex flex-col h-[480px]">
              <div className="grid gap-2 flex-1">
                {paginatedTrophies.map((t, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-white/[0.02] p-2.5 border border-white/5 transition-colors hover:border-emerald-500/20">
                    <div className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <Trophy className="h-3.5 w-3.5 text-emerald-400" />
                      </div>
                      <span className="text-[13px] font-bold text-white leading-tight">{t.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-sm font-black text-emerald-400">{t.cups}</span>
                      <span className="text-[8px] font-bold text-neutral-500 uppercase">Cups</span>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className="h-8 w-8 rounded-md bg-white/[0.05] border border-white/10 flex items-center justify-center transition-all hover:bg-emerald-500/10 hover:border-emerald-500/50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-white/10"
                    >
                      <ChevronLeft className="h-4 w-4 text-emerald-400" />
                    </button>
                    <button 
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 rounded-md bg-white/[0.05] border border-white/10 flex items-center justify-center transition-all hover:bg-emerald-500/10 hover:border-emerald-500/50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-white/10"
                    >
                      <ChevronRight className="h-4 w-4 text-emerald-400" />
                    </button>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              )}
            </div>
          </section>
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
