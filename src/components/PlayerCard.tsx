"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp, Award, Calendar, Trophy } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Player {
  name: string;
  rating: number;
  pace: number;
  sho: number;
  pas: number;
  dri: number;
  def: number;
  phy: number;
  attendance: number;
  winRate: number;
  cups?: number;
  form?: ('W' | 'L' | 'D')[];
  streak?: number;
}

export default function PlayerCard({ player, index, onClick }: { player: Player, index: number, onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-4 transition-all hover:bg-white/10"
    >
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-xl font-black italic">
            {player.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">{player.name}</h3>
              {player.streak && player.streak >= 2 && (
                <span className="flex items-center gap-0.5 text-orange-500 text-xs font-bold animate-pulse">
                  🔥 {player.streak}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span>{player.rating} Rating</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Calendar className="h-3 w-3 text-blue-400" />
                <span>{player.attendance}% Att.</span>
              </div>
              {player.cups !== undefined && player.cups > 0 && (
                <div className="flex items-center gap-1 text-sm text-yellow-500 font-bold bg-yellow-500/10 px-1.5 py-0.5 rounded-md border border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.1)]">
                  <Trophy className="h-3 w-3 fill-yellow-500" />
                  <span>{player.cups}</span>
                </div>
              )}
              {player.form && player.form.length > 0 && (
                <div className="flex gap-1">
                  {player.form.map((res, i) => (
                    <div 
                      key={i}
                      className={cn(
                        "h-2 w-2 rounded-full",
                        res === 'W' ? "bg-green-500" : res === 'D' ? "bg-yellow-500" : "bg-red-500"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase text-gray-500">Win Rate</p>
          <p className="font-mono text-xl font-bold text-green-400">{player.winRate}%</p>
        </div>
      </div>
    </motion.div>
  );
}
