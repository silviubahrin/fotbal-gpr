"use client";

import { motion } from "framer-motion";
import { Star, Calendar, Trophy } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
  cups?: number;
  form?: ("W" | "L" | "D")[];
  streak?: number;
  trophies?: number;
}

export default function PlayerCard({
  player,
  index,
  onClick,
}: {
  player: Player;
  index: number;
  onClick: () => void;
}) {
  const isTopTier = index < 6;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.005, backgroundColor: "rgba(16, 185, 129, 0.04)" }}
      whileTap={{ scale: 0.995 }}
      onClick={onClick}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-xl bg-white/[0.03] border transition-all backdrop-blur-md p-3 sm:p-4",
        isTopTier 
          ? "border-emerald-500/30 bg-emerald-500/[0.02] shadow-[0_0_20px_rgba(16,185,129,0.05)]" 
          : "border-white/10 hover:border-emerald-500/20"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left Section: Identity */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative">
            <div className={cn(
              "flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg text-lg font-black italic transition-all shadow-[0_0_10px_rgba(74,222,128,0.1)]",
              isTopTier
                ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black"
                : "bg-white/5 border border-white/10 text-neutral-400 group-hover:text-emerald-400"
            )}>
              {player.name[0]}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm sm:text-base font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors leading-none uppercase italic">
              {player.name}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              {player.form && player.form.length > 0 && (
                <div className="flex gap-1 items-center flex-wrap max-w-[120px] sm:max-w-none">
                  {player.form.slice(-10).map((res, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1 w-1 rounded-full shrink-0",
                        res === "W"
                          ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                          : res === "D"
                          ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]"
                          : "bg-rose-500/80"
                      )}
                    />
                  ))}
                </div>
              )}
              {player.streak && player.streak >= 2 && (
                <span className="text-[8px] font-black uppercase tracking-tighter text-emerald-400 bg-emerald-400/10 px-1 py-0.5 rounded border border-emerald-500/20">
                  {player.streak}S
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Core Stats */}
        <div className="flex items-center gap-4 sm:gap-8">
          <StatItem
            label="WIN%"
            value={`${player.winRate}%`}
            valueColor="text-emerald-400"
          />
          <div className="flex flex-col items-center sm:items-end justify-center">
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-0.5">
              CUPS
            </span>
            <div className="flex items-center gap-1.5">
              <Trophy className={cn(
                "h-3.5 w-3.5",
                (player.cups || 0) > 0 ? "text-emerald-400" : "text-neutral-700"
              )} />
              <span className="font-mono text-lg sm:text-xl font-black tracking-tighter text-white">
                {player.cups || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Liquid Glass Highlight for top tier */}
      {isTopTier && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" />
      )}
    </motion.div>
  );
}

function StatItem({
  label,
  value,
  valueColor = "text-white",
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="hidden xs:flex flex-col items-end justify-center">
      <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-0.5">
        {label}
      </span>
      <span className={cn("font-mono text-xs font-bold tracking-tight", valueColor)}>
        {value}
      </span>
    </div>
  );
}
