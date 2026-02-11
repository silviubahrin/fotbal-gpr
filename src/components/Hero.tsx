"use client";

import { motion } from "framer-motion";
import { Trophy, Calendar } from "lucide-react";

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
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white shadow-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 text-4xl font-black italic tracking-tighter">FOTBAL GPR</h1>
        <p className="mb-8 text-blue-100">Câștigătorii Etapei (10.02)</p>

        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-md w-fit">
            <Calendar className="h-6 w-6 text-blue-300" />
            <div>
              <p className="text-xs uppercase tracking-wider text-blue-200">Data Etapei</p>
              <p className="font-bold">10.02.2025</p>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
              <h2 className="text-lg font-bold uppercase tracking-wider text-blue-100">Campionii</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {WINNERS.map((name) => (
                <div 
                  key={name}
                  className="rounded-xl bg-white/5 p-3 backdrop-blur-sm border border-white/10 shadow-lg"
                >
                  <p className="text-sm font-semibold text-white/90">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative background element */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
    </div>
  );
}
