"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { matches } from "@/lib/data";

export default function Hero() {
  const lastMatch = matches.find(m => m.date === "10.02") || matches[matches.length - 1];
  const winners = lastMatch.winners;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] p-6 text-white border border-white/10 backdrop-blur-xl mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(74,222,128,0.1)]">
              <Trophy className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white uppercase italic leading-none">Câștigătorii Etapei</h1>
              <p className="text-emerald-400/80 font-mono text-[10px] font-bold uppercase tracking-[0.2em] mt-1">{lastMatch.date} • Match Day Winners</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {winners.map((winner, index) => (
            <motion.div
              key={winner}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group justify-start"
            >
              <div className="flex-shrink-0 h-5 w-5 rounded bg-emerald-500 flex items-center justify-center text-[10px] font-black text-black group-hover:shadow-[0_0_12px_rgba(74,222,128,0.4)] transition-all">
                {winner.split(' ').map(n => n[0]).join('')}
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-neutral-300 group-hover:text-white transition-colors tracking-tight truncate">{winner}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-emerald-500/[0.03] blur-[100px] pointer-events-none" />
    </div>
  );
}
// Force build trigger: Thu Feb 12 10:50:01 UTC 2026
