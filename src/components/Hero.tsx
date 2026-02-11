"use client";

import { motion } from "framer-motion";
import { Trophy, Users } from "lucide-react";

const WINNERS = [
  "Silviu Bahrin",
  "Vlad Vidican",
  "Borfina Marius",
  "Alexandru Avirvarei",
  "Cimpean Vali",
  "Andries Adrian"
];

export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-8 text-white shadow-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter text-zinc-100 mb-1">FOTBAL GPR</h1>
            <p className="text-zinc-400 font-medium">Câștigătorii Etapei (10.02)</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 px-4 py-1.5 backdrop-blur-md">
            <Users className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">18 Jucători</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <Trophy className="h-5 w-5 text-yellow-500" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">Echipa Campioană</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {WINNERS.map((name) => (
                <motion.div 
                  key={name}
                  whileHover={{ scale: 1.02 }}
                  className="group relative overflow-hidden rounded-xl bg-zinc-800/30 p-4 border border-zinc-700/50 transition-colors hover:bg-zinc-800/50 hover:border-zinc-600"
                >
                  <div className="relative z-10">
                    <p className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors">
                      {name}
                    </p>
                    <p className="text-[10px] uppercase tracking-tighter text-zinc-500 font-black mt-1">Winner</p>
                  </div>
                  {/* Subtle highlight effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Subtle glass ornaments */}
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/5 blur-[100px]" />
      <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-yellow-500/5 blur-[100px]" />
    </div>
  );
}
