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
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.005, backgroundColor: "rgba(255, 255, 255, 0.02)" }}
      whileTap={{ scale: 0.995 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-white/[0.02] border border-white/5 p-4 transition-all hover:border-emerald-500/20 backdrop-blur-sm"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Section: Identity */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-lg font-black italic text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all shadow-[0_0_10px_rgba(74,222,128,0.1)]">
              {player.name[0]}
            </div>
          </div>
          <div>
            <h3 className="text-base font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors leading-none uppercase italic">
              {player.name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              {player.form && player.form.length > 0 && (
                <div className="flex gap-1 items-center">
                  {player.form.slice(-5).map((res, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        res === "W"
                          ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                          : res === "D"
                          ? "bg-neutral-600"
                          : "bg-rose-500/80"
                      )}
                    />
                  ))}
                </div>
              )}
              {player.streak && player.streak >= 2 && (
                <span className="text-[9px] font-black uppercase tracking-tighter text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {player.streak} STREAK
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Stats Grid */}
        <div className="grid grid-cols-4 gap-6 sm:gap-8 border-t border-white/5 pt-3 sm:pt-0 sm:border-t-0">
          <StatItem
            label="RTG"
            value={player.rating.toFixed(3)}
            icon={<Star className="h-2.5 w-2.5 text-emerald-400 fill-emerald-400/20" />}
          />
          <StatItem
            label="WIN%"
            value={`${player.winRate}%`}
            valueColor="text-emerald-400"
          />
          <StatItem
            label="ATT"
            value={`${player.attendance}%`}
            icon={<Calendar className="h-2.5 w-2.5 text-neutral-500" />}
          />
          <StatItem
            label="CUPS"
            value={(player.cups || 0).toString()}
            icon={<Trophy className="h-2.5 w-2.5 text-emerald-400" />}
          />
        </div>
      </div>
    </motion.div>
  );
}

function StatItem({
  label,
  value,
  icon,
  valueColor = "text-white",
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  valueColor?: string;
}) {
  return (
    <div className="flex flex-col items-center sm:items-end justify-center">
      <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
        {label}
      </span>
      <div className="flex items-center gap-1">
        {icon}
        <span className={cn("font-mono text-xs font-bold tracking-tight", valueColor)}>
          {value}
        </span>
      </div>
    </div>
  );
}
