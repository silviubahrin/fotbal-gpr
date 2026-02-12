"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import { trophies } from "@/lib/data";

const TrophyRoom = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 6;
  
  // Sort trophies by cup count (highest to lowest)
  const sortedTrophies = [...trophies].sort((a, b) => b.cups - a.cups);
  const totalItems = sortedTrophies.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, maxIndex]);

  return (
    <section className="mt-8 mb-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-black italic tracking-tight uppercase">
          <Trophy className="text-emerald-400 h-5 w-5 fill-emerald-400/20" />
          Trophy Room
        </h2>
        <div className="h-px flex-1 mx-4 bg-white/5" />
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="h-8 w-8 rounded-md bg-white/[0.05] border border-white/10 flex items-center justify-center transition-all hover:bg-emerald-500/10 hover:border-emerald-500/50"
          >
            <ChevronLeft className="h-4 w-4 text-emerald-400" />
          </button>
          <button
            onClick={next}
            className="h-8 w-8 rounded-md bg-white/[0.05] border border-white/10 flex items-center justify-center transition-all hover:bg-emerald-500/10 hover:border-emerald-500/50"
          >
            <ChevronRight className="h-4 w-4 text-emerald-400" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden px-1">
        <motion.div
          className="flex gap-3"
          animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 40 }}
          style={{ width: `${(totalItems / itemsPerView) * 100}%` }}
        >
          {sortedTrophies.map((t, i) => (
            <div
              key={t.name}
              style={{ width: `${100 / totalItems}%` }}
              className={`group relative rounded-xl bg-white/[0.03] p-2.5 border transition-all duration-300 ${
                i < 6 
                  ? "border-emerald-500/30 bg-emerald-500/[0.02] shadow-[0_0_20px_rgba(16,185,129,0.05)]" 
                  : "border-white/10 hover:border-emerald-500/20"
              }`}
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className={`h-7 w-7 rounded-lg flex items-center justify-center ${
                    i < 6 ? "bg-emerald-500/20 border border-emerald-500/30" : "bg-white/5 border border-white/10"
                  }`}>
                    <Trophy className={`h-3.5 w-3.5 ${i < 6 ? "text-emerald-400" : "text-neutral-500"}`} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-base font-black text-emerald-400 leading-none">{t.cups}</span>
                    <span className="text-[6px] font-bold text-neutral-500 uppercase tracking-tighter">Cups</span>
                  </div>
                </div>
                
                <div className="mt-0.5">
                  <h3 className="text-[11px] font-black uppercase tracking-tight text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                    {t.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-1">
                    <div className="h-0.5 flex-1 rounded-full bg-white/5 overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500/50" 
                        style={{ width: t.rate }}
                      />
                    </div>
                    <span className="font-mono text-[7px] font-bold text-neutral-500">{t.rate}</span>
                  </div>
                </div>
              </div>

              {/* Liquid Glass Highlight for first 6 */}
              {i < 6 && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrophyRoom;
