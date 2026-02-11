"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Zap, Target, Flame } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

export default function PlayerModal({ player, isOpen, onClose }: { player: any, isOpen: boolean, onClose: () => void }) {
  if (!player) return null;

  const chartData = [
    { subject: 'PAC', A: player.pace, fullMark: 100 },
    { subject: 'SHO', A: player.sho, fullMark: 100 },
    { subject: 'PAS', A: player.pas, fullMark: 100 },
    { subject: 'DRI', A: player.dri, fullMark: 100 },
    { subject: 'DEF', A: player.def, fullMark: 100 },
    { subject: 'PHY', A: player.phy, fullMark: 100 },
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
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span>{player.attendance}% Attendance</span>
                  </div>
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
