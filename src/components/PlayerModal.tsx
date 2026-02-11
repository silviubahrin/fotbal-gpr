"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Zap, Target, Flame, Calendar } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

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
  form?: ('W' | 'L' | 'D')[];
  streak?: number;
}

export default function PlayerModal({ player, isOpen, onClose }: { player: Player | null, isOpen: boolean, onClose: () => void }) {
  if (!player) return null;

  // Use rating for stats if they are at default (80) or missing, to fill the chart better
  const statsMultiplier = 20;
  const displayPace = player.pace === 80 ? Math.round(player.rating * statsMultiplier) : player.pace;
  const displaySho = player.sho === 80 ? Math.round(player.rating * statsMultiplier) : player.sho;
  const displayPas = player.pas === 80 ? Math.round(player.rating * statsMultiplier) : player.pas;
  const displayDri = player.dri === 80 ? Math.round(player.rating * statsMultiplier) : player.dri;
  const displayDef = player.def === 80 ? Math.round(player.rating * statsMultiplier) : player.def;
  const displayPhy = player.phy === 80 ? Math.round(player.rating * statsMultiplier) : player.phy;

  const chartData = [
    { subject: 'PAC', A: displayPace, fullMark: 100 },
    { subject: 'SHO', A: displaySho, fullMark: 100 },
    { subject: 'PAS', A: displayPas, fullMark: 100 },
    { subject: 'DRI', A: displayDri, fullMark: 100 },
    { subject: 'DEF', A: displayDef, fullMark: 100 },
    { subject: 'PHY', A: displayPhy, fullMark: 100 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#0a0a0c] border border-white/20 p-6 shadow-2xl"
          >
            <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>

            <div className="flex items-center gap-6 mb-8">
               <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-blue-600 to-purple-600 text-4xl font-black italic shadow-lg shadow-blue-500/20">
                {player.name[0]}
              </div>
              <div>
                <h2 className="text-3xl font-black text-white italic">{player.name}</h2>
                <p className="text-blue-400 font-bold">ELITE PERFORMER</p>
                <div className="mt-2 flex gap-4">
                   <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span>{player.attendance}% Attendance</span>
                  </div>
                  {player.streak && player.streak >= 2 && (
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span>{player.streak} Win Streak</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#999', fontSize: 12 }} />
                  <Radar
                    name={player.name}
                    dataKey="A"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    isAnimationActive={false}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
               <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p className="text-xs text-gray-500 uppercase">Season Rating</p>
                  <p className="text-2xl font-black text-white">{player.rating}</p>
               </div>
               <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p className="text-xs text-gray-500 uppercase">Win Rate</p>
                  <p className="text-2xl font-black text-green-400">{player.winRate}%</p>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
