"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { matches } from "@/lib/data";

export default function Hero() {
  const lastMatch = matches.find(m => m.date === "10.02") || matches[matches.length - 1];
  const winners = lastMatch.winners;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-neutral-900/50 p-8 text-white shadow-2xl border border-neutral-800 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Câștigătorii Etapei - {lastMatch.date}
            </h1>
            <p className="text-neutral-400 font-medium uppercase tracking-widest text-sm mt-1">Group Performance Rankings</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
            < Trophy className="h-5 w-5 text-yellow-500" />
            <span className="text-yellow-500 font-bold">MATCH DAY WINNERS</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {winners.map((winner, index) => (
            <motion.div
              key={winner}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative flex items-center justify-between gap-3 rounded-xl bg-black/40 p-4 border border-white/5 backdrop-blur-sm group-hover:border-yellow-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold text-xs shadow-lg shadow-yellow-500/20">
                    {winner.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="font-bold text-neutral-200 group-hover:text-yellow-400 transition-colors">{winner}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Decorative background elements */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-yellow-500/10 blur-3xl opacity-50" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl opacity-30" />
    </div>
  );
}
