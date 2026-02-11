"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, Calendar } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

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
  history?: number[];
}

export default function PlayerModal({ player, isOpen, onClose }: { player: Player | null, isOpen: boolean, onClose: () => void }) {
  if (!player) return null;

  const chartData = [
    { subject: 'Rating', A: player.rating * 20, fullMark: 100 },
    { subject: 'Wins', A: player.winRate, fullMark: 100 },
    { subject: 'Attendance', A: player.attendance, fullMark: 100 },
    { subject: 'Form', A: player.streak ? Math.min(player.streak * 20, 100) : 50, fullMark: 100 },
    { subject: 'GPR', A: 85, fullMark: 100 },
    { subject: 'Consistency', A: 75, fullMark: 100 },
  ];

  const evolutionData = player.history?.map((val: number, idx: number) => ({
    name: `S${idx + 1}`,
    rating: val
  })) || [];

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
            className="relative w-full max-w-lg overflow-y-auto max-h-[90vh] rounded-3xl bg-[#0a0a0c] border border-white/20 p-6 shadow-2xl custom-scrollbar"
          >
            <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white z-10">
              <X className="h-6 w-6" />
            </button>

            <div className="flex items-center gap-6 mb-8">
               <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-blue-600 to-purple-600 text-4xl font-black italic shadow-lg shadow-blue-500/20">
                {player.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl font-black text-white italic">{player.name}</h2>
                  {player.streak && player.streak >= 3 && <Flame className="h-6 w-6 text-orange-500 animate-pulse" />}
                </div>
                <p className="text-blue-400 font-bold">ELITE PERFORMER</p>
                <div className="mt-2 flex gap-2">
                   {player.form?.map((f, i) => (
                     <span key={i} className={`w-3 h-3 rounded-full ${f === 'W' ? 'bg-green-500' : f === 'L' ? 'bg-red-500' : 'bg-gray-500'}`} title={f} />
                   ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="h-48 w-full bg-white/5 rounded-2xl border border-white/5 p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10 }} />
                    <Radar
                      name={player.name}
                      dataKey="A"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.5}
                      isAnimationActive={false}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="h-48 w-full bg-white/5 rounded-2xl border border-white/5 p-2">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-2 ml-2">Ranking History</p>
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart data={evolutionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="name" hide />
                    <YAxis hide domain={['dataMin - 0.2', 'dataMax + 0.2']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }}
                      itemStyle={{ color: '#3b82f6' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="rating" 
                      stroke="#3b82f6" 
                      strokeWidth={3} 
                      dot={{ fill: '#3b82f6', r: 4 }}
                      activeDot={{ r: 6, fill: '#fff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p className="text-xs text-gray-500 uppercase">Season Rating</p>
                  <p className="text-2xl font-black text-white">{player.rating}</p>
               </div>
               <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p className="text-xs text-gray-500 uppercase">Win Rate</p>
                  <p className="text-2xl font-black text-green-400">{player.winRate}%</p>
               </div>
               <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p className="text-xs text-gray-500 uppercase">Attendance</p>
                  <p className="text-2xl font-black text-blue-400">{player.attendance}%</p>
               </div>
               <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p className="text-xs text-gray-500 uppercase">Current Streak</p>
                  <p className={`text-2xl font-black ${player.streak && player.streak > 0 ? 'text-orange-500' : 'text-gray-500'}`}>
                    {player.streak && player.streak > 0 ? `+${player.streak}` : (player.streak || 0)}
                  </p>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
