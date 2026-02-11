"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp, Award, Calendar, Trophy } from "lucide-react";
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
      whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-white/[0.03] border border-white/10 p-5 transition-all"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Section: Identity */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 via-emerald-500 to-pink-500 text-xl font-black italic text-white shadow-lg shadow-emerald-500/20">
              {player.name[0]}
            </div>
            {player.streak && player.streak >= 2 && (
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white ring-2 ring-black">
                🔥
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
              {player.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              {player.form && player.form.length > 0 && (
                <div className="flex gap-1.5 items-center bg-white/5 px-2 py-1 rounded-full border border-white/5">
                  {player.form.slice(-5).map((res, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        res === "W"
                          ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                          : res === "D"
                          ? "bg-emerald-400"
                          : "bg-rose-500"
                      )}
                    />
                  ))}
                </div>
              )}
              {player.streak && player.streak >= 2 && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                  {player.streak} Streak
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Stats Grid */}
        <div className="grid grid-cols-4 gap-4 sm:gap-8 border-t border-white/5 pt-4 sm:pt-0 sm:border-t-0">
          <StatItem
            label="Rating"
            value={player.rating.toString()}
            icon={<Star className="h-3 w-3 text-emerald-400" />}
          />
          <StatItem
            label="Win Rate"
            value={`${player.winRate}%`}
            valueColor="text-emerald-400"
          />
          <StatItem
            label="Attendance"
            value={`${player.attendance}%`}
            icon={<Calendar className="h-3 w-3 text-emerald-400" />}
          />
          <StatItem
            label="Trophies"
            value={(player.cups || 0).toString()}
            icon={<Trophy className="h-3 w-3 text-emerald-500 fill-emerald-500" />}
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
      <span className="text-[10px] font-medium uppercase tracking-widest text-gray-500 mb-1">
        {label}
      </span>
      <div className="flex items-center gap-1.5">
        {icon}
        <span className={cn("font-mono text-sm font-bold tracking-tight", valueColor)}>
          {value}
        </span>
      </div>
    </div>
  );
}
