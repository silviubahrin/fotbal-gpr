"use client";

import { useState } from "react";
import { players, hof } from "@/lib/data";
import Hero from "@/components/Hero";
import PlayerCard from "@/components/PlayerCard";
import PlayerModal from "@/components/PlayerModal";
import { Award, Star, Zap } from "lucide-react";

export default function Home() {
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  // Sorting strictly by CUPS (descending)
  const sortedPlayers = [...players].sort((a, b) => (b.cups || 0) - (a.cups || 0));

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

        {/* Layout Middle: Hall of Fame (Grid) */}
        <div className="mt-12">
          <section className="max-w-md mx-auto">
             <h2 className="mb-4 flex items-center gap-2 text-xs font-black italic uppercase tracking-wider text-neutral-400">
              <Award className="text-emerald-500 h-3.5 w-3.5" />
              Hall of Fame
            </h2>
            <div className="rounded-xl bg-white/[0.03] p-4 border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden">
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
        </div>

        {/* Layout Bottom: Player Rankings (Sorted by Cups) */}
        <div className="mt-16">
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
            {sortedPlayers.map((player, idx) => (
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
