"use client";

import { useState } from "react";
import { players, hof, trophies } from "@/lib/data";
import Hero from "@/components/Hero";
import PlayerCard from "@/components/PlayerCard";
import PlayerModal from "@/components/PlayerModal";
import { Award, Star, History } from "lucide-react";

export default function Home() {
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  // Force Rebuild - Modal Fixes v2
  return (
    <main className="min-h-screen bg-[#050505] pb-20 text-white">
      <div className="mx-auto max-w-4xl px-4 pt-8">
        <Hero />

        <div className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-2xl font-bold italic tracking-tight">
              <Star className="text-yellow-500" />
              TOP PLAYERS
            </h2>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-gray-400">
              {players.length} TOTAL
            </span>
          </div>
          
          <div className="grid gap-4">
            {players.map((player, idx) => (
              <PlayerCard 
                key={player.name} 
                player={player} 
                index={idx} 
                onClick={() => setSelectedPlayer(player)}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <section>
             <h2 className="mb-6 flex items-center gap-2 text-xl font-bold italic">
              <Award className="text-blue-500" />
              HALL OF FAME
            </h2>
            <div className="rounded-3xl bg-white/5 p-6 border border-white/10">
              {hof.map((entry, i) => (
                <div key={i} className="mb-4 flex items-center justify-between border-b border-white/5 pb-4 last:mb-0 last:border-0 last:pb-0">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">{entry.season}</p>
                    <p className="font-bold">{entry.champion}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-xs text-gray-500 uppercase">MVP</p>
                    <p className="font-bold text-blue-400">{entry.mvp}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
             <h2 className="mb-6 flex items-center gap-2 text-xl font-bold italic">
              <History className="text-purple-500" />
              TROPHY ROOM
            </h2>
            <div className="rounded-3xl bg-white/5 p-6 border border-white/10">
              {trophies.map((t, i) => (
                <div key={i} className="mb-4 flex items-center justify-between border-b border-white/5 pb-4 last:mb-0 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500/20 text-yellow-500">
                      <Award className="h-4 w-4" />
                    </div>
                    <p className="font-bold">{t.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold">{t.cups} Cups</p>
                  </div>
                </div>
              ))}
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
