"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import { trophies } from "@/lib/data";

export default function TrophyRoom() {
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(trophies.length / itemsPerPage);

  const nextPage = () => setPage((p) => (p + 1) % totalPages);
  const prevPage = () => setPage((p) => (p - 1 + totalPages) % totalPages);

  const currentItems = trophies.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl p-6 mb-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2 text-xl font-black italic tracking-tight uppercase text-emerald-500">
          <Trophy className="h-5 w-5" />
          Trophy Room
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Page {page + 1} / {totalPages}
          </span>
          <div className="flex gap-1">
            <button 
              onClick={prevPage}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all text-emerald-500"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={nextPage}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all text-emerald-500"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2 min-h-[360px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-2"
          >
            {currentItems.map((t, i) => {
              const isFirstPage = page === 0;
              return (
                <div 
                  key={t.name}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    isFirstPage ? 'bg-emerald-500/5 border-emerald-500/30 shadow-[0_0_15px_rgba(74,222,128,0.05)]' : 'bg-white/[0.02] border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-gray-500 w-4">
                      {page * itemsPerPage + i + 1}
                    </span>
                    <p className={`font-bold text-sm ${isFirstPage ? 'text-emerald-400' : 'text-neutral-300'}`}>
                      {t.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                     <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                      {t.successRate}
                    </p>
                    <p className="font-mono font-black text-emerald-500 text-sm">
                      {t.cups} CUPS
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
