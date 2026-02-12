"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, Calendar, Trophy, TrendingUp, Award, Zap, Star } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { hof, players } from "../lib/data";

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

  // Radar Chart Calibration logic
  const normalizedRating = player.rating * 20;
  // Wins and Attendance are already 0-100
  // Form: 100 if streak is high (3+ is usually perfect form in this context), or if recent form is all W
  // Silviu Bahrin has 100% winRate and attendance, and streak 3.
  const formValue = player.streak ? Math.min(player.streak * 33.4, 100) : 50;

  const chartData = [
    { subject: 'Rating', A: normalizedRating, fullMark: 100 },
    { subject: 'Wins', A: player.winRate, fullMark: 100 },
    { subject: 'Attendance', A: player.attendance, fullMark: 100 },
    { subject: 'Form', A: formValue, fullMark: 100 },
    { subject: 'GPR', A: 85, fullMark: 100 },
    { subject: 'Consistency', A: 75, fullMark: 100 },
  ];

  const evolutionData = player.history?.map((val: number, idx: number) => ({
    name: `S${idx + 1}`,
    rating: val
  })) || [];

  // Dynamic Titles Logic
  const getDynamicTitle = () => {
    // 0. Cea mai bună formă din totdeauna (Peak streak in S6 - 3 wins)
    if (player.streak === 3) {
      return { text: "Cea mai bună formă din totdeauna", icon: <Star className="h-4 w-4 text-emerald-500" /> };
    }

    // 1. Cel mai în formă (Highest current streak in league)
    const maxStreak = Math.max(...players.map(p => p.streak || 0));
    if (player.streak && player.streak === maxStreak && maxStreak > 0) {
      return { text: "Cel mai în formă", icon: <Zap className="h-4 w-4 text-emerald-500" /> };
    }

    // 2. Legendă Hall of Fame if in HoF
    const isInHoF = hof.some(h => h.champion === player.name || h.mvp === player.name);
    if (isInHoF) return { text: "Legendă Hall of Fame", icon: <Trophy className="h-4 w-4" /> };

    // 3. În Formă 🔥 if streak >= 2
    if (player.streak && player.streak >= 2) return { text: "În Formă 🔥", icon: <Flame className="h-4 w-4" /> };

    // 4. Rising Star 📈 if S6 > S5
    if (player.history && player.history.length >= 6) {
      const s5 = player.history[4];
      const s6 = player.history[5];
      if (s6 > s5) return { text: "Rising Star 📈", icon: <TrendingUp className="h-4 w-4" /> };
    }

    // 5. Veteran Sezonul 1 🎖️ if data exists in S1
    if (player.history && player.history[0] > 0) return { text: "Veteran Sezonul 1 🎖️", icon: <Award className="h-4 w-4" /> };

    return { text: "Competitor Activ", icon: null };
  };

  const titleInfo = getDynamicTitle();

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
               <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-emerald-600 to-emerald-600 text-4xl font-black italic shadow-lg shadow-emerald-500/20">
                {player.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl font-black text-white italic">{player.name}</h2>
                  {player.streak && player.streak >= 3 && <Flame className="h-6 w-6 text-emerald-500 animate-pulse" />}
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-tight">
                  {titleInfo.icon}
                  <span>{titleInfo.text}</span>
                </div>
                <div className="mt-2 flex gap-2">
                   {player.form?.map((f, i) => (
                     <span 
                       key={i} 
                       className={`w-3 h-3 rounded-full ${
                         f === 'W' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 
                         f === 'D' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]' : 
                         'bg-rose-500/80'
                       }`} 
                       title={f} 
                     />
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
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-2 ml-2 tracking-widest">Ranking Evolution</p>
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart data={evolutionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#666', fontSize: 10 }} />
                    <YAxis domain={[2, 5]} tick={{ fill: '#666', fontSize: 10 }} width={30} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }}
                      itemStyle={{ color: '#3b82f6' }}
                      formatter={(value: number) => [value.toFixed(3), 'Rating']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="rating" 
                      stroke="#3b82f6" 
                      strokeWidth={3} 
                      dot={{ fill: '#3b82f6', r: 4 }}
                      activeDot={{ r: 6, fill: '#fff' }}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p className="text-xs text-gray-500 uppercase">Season Rating</p>
                  <p className="text-2xl font-black text-white">{player.rating.toFixed(3)}</p>
               </div>
               <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p className="text-xs text-gray-500 uppercase">Win Rate</p>
                  <p className="text-2xl font-black text-green-400">{player.winRate}%</p>
               </div>
               <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p className="text-xs text-gray-500 uppercase">Attendance</p>
                  <p className="text-2xl font-black text-emerald-400">{player.attendance}%</p>
               </div>
               <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p className="text-xs text-gray-500 uppercase">Current Streak</p>
                  <p className={`text-2xl font-black ${player.streak && player.streak > 0 ? 'text-emerald-500' : 'text-gray-500'}`}>
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
