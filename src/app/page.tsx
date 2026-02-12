"use client";

import { useState } from "react";
import { players, hof, trophies } from "@/lib/data";
import Hero from "@/components/Hero";
import PlayerCard from "@/components/PlayerCard";
import PlayerModal from "@/components/PlayerModal";
import { Award, Star, History } from "lucide-react";

export default function Home() {
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="min-h-screen bg-[#050505] text-white">
        BUILD v1.2.1 - DARK RESTORED
      </div>
      
      <div className="min-h-screen bg-[#050505] text-white">
        <Hero />

        <div className="min-h-screen bg-[#050505] text-white">
          <div className="min-h-screen bg-[#050505] text-white">
            <h2 className="min-h-screen bg-[#050505] text-white">
              <Star className="min-h-screen bg-[#050505] text-white" />
              TOP PLAYERS
            </h2>
            <span className="min-h-screen bg-[#050505] text-white">
              {players.length} TOTAL
            </span>
          </div>
          
          <div className="min-h-screen bg-[#050505] text-white">
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

        <div className="min-h-screen bg-[#050505] text-white">
          <section>
             <h2 className="min-h-screen bg-[#050505] text-white">
              <Award className="min-h-screen bg-[#050505] text-white" />
              HALL OF FAME
            </h2>
            <div className="min-h-screen bg-[#050505] text-white">
              {hof.map((entry, i) => (
                <div key={i} className="min-h-screen bg-[#050505] text-white">
                  <div>
                    <p className="min-h-screen bg-[#050505] text-white">{entry.season}</p>
                    <p className="min-h-screen bg-[#050505] text-white">{entry.champion}</p>
                  </div>
                  <div className="min-h-screen bg-[#050505] text-white">
                     <p className="min-h-screen bg-[#050505] text-white">MVP</p>
                    <p className="min-h-screen bg-[#050505] text-white">{entry.mvp}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
             <h2 className="min-h-screen bg-[#050505] text-white">
              <History className="min-h-screen bg-[#050505] text-white" />
              TROPHY ROOM
            </h2>
            <div className="min-h-screen bg-[#050505] text-white">
              {trophies.map((t, i) => (
                <div key={i} className="min-h-screen bg-[#050505] text-white">
                  <div className="min-h-screen bg-[#050505] text-white">
                    <div className="min-h-screen bg-[#050505] text-white">
                      <Award className="min-h-screen bg-[#050505] text-white" />
                    </div>
                    <p className="min-h-screen bg-[#050505] text-white">{t.name}</p>
                  </div>
                  <div className="min-h-screen bg-[#050505] text-white">
                    <p className="min-h-screen bg-[#050505] text-white">{t.cups} Cups</p>
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
