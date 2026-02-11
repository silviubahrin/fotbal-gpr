"use client";

import { motion } from "framer-motion";
import { Trophy, Users, Calendar } from "lucide-react";
import { matches } from "@/lib/data";

export default function Hero() {
  const lastMatch = matches[0];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white shadow-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 text-4xl font-black italic tracking-tighter">FOTBAL GPR</h1>
        <p className="mb-8 text-blue-100">The Ultimate Group Performance Rankings</p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-md">
            <Calendar className="h-6 w-6 text-blue-300" />
            <div>
              <p className="text-xs uppercase tracking-wider text-blue-200">Last Match</p>
              <p className="font-bold">{lastMatch.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-md">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <div>
              <p className="text-xs uppercase tracking-wider text-blue-200">Result</p>
              <p className="font-bold">{lastMatch.score}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-md">
            <Users className="h-6 w-6 text-green-400" />
            <div>
              <p className="text-xs uppercase tracking-wider text-blue-200">Players</p>
              <p className="font-bold">{lastMatch.players} participants</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative background element */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
    </div>
  );
}
