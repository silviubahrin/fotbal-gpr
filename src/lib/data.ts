export interface Player {
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
}

export interface Match {
  date: string;
  score: string;
  winners: string[];
  players: number;
}

export interface Trophy {
  name: string;
  cups: number;
  rate: string;
}

export interface HOF {
  season: string;
  champion: string;
  mvp: string;
  stars?: number;
}

export interface RankEvolution {
  name: string;
  [key: string]: string | number;
}

export const players: Player[] = [
  { name: "Termure Adrian", rating: 4.76, pace: 85, sho: 80, pas: 85, dri: 82, def: 88, phy: 84, attendance: 90, winRate: 75 },
  { name: "Gabriel Marzan", rating: 4.665, pace: 88, sho: 84, pas: 82, dri: 86, def: 80, phy: 82, attendance: 95, winRate: 70 },
  { name: "Florin Ispas", rating: 4.64, pace: 82, sho: 88, pas: 80, dri: 84, def: 82, phy: 86, attendance: 85, winRate: 65 },
  { name: "Silviu Bahrin", rating: 4.56, pace: 84, sho: 78, pas: 90, dri: 82, def: 75, phy: 78, attendance: 100, winRate: 85 },
  { name: "Alexandru Avirvarei", rating: 4.54, pace: 86, sho: 85, pas: 78, dri: 88, def: 72, phy: 80, attendance: 88, winRate: 72 },
  { name: "Razvan Bucur", rating: 4.51, pace: 78, sho: 75, pas: 84, dri: 80, def: 85, phy: 90, attendance: 82, winRate: 60 },
  { name: "Iulian Caloian", rating: 4.47, pace: 82, sho: 80, pas: 75, dri: 78, def: 82, phy: 84, attendance: 80, winRate: 58 },
  { name: "Andrei Tanase", rating: 4.44, pace: 80, sho: 82, pas: 80, dri: 75, def: 88, phy: 85, attendance: 78, winRate: 55 },
  { name: "Cristi Gherasim", rating: 4.42, pace: 85, sho: 78, pas: 82, dri: 84, def: 78, phy: 80, attendance: 85, winRate: 62 }
].sort((a, b) => b.rating - a.rating);

export const matches: Match[] = [
  { date: "10.02", score: "5 - 3", winners: ["Termure Adrian", "Silviu Bahrin", "Gabriel Marzan"], players: 12 },
  { date: "20.01", score: "4 - 4", winners: ["Draw"], players: 14 }
];

export const trophies: Trophy[] = [
  { name: "Silviu Bahrin", cups: 3, rate: "100%" },
  { name: "Gabriel Marzan", cups: 2, rate: "85%" },
  { name: "Termure Adrian", cups: 2, rate: "80%" },
  { name: "Florin Ispas", cups: 1, rate: "75%" }
];

export const hof: HOF[] = [
  { season: "Hall of Fame", champion: "Alexandru Avirvarei", mvp: "Alexandru Avirvarei", stars: 5 },
  { season: "Hall of Fame", champion: "Silviu Bahrin", mvp: "Silviu Bahrin", stars: 4 },
  { season: "Hall of Fame", champion: "Termure Adrian", mvp: "Termure Adrian", stars: 3 },
  { season: "Season 5", champion: "Silviu Bahrin", mvp: "Termure Adrian" }
];

export const rankEvolution: RankEvolution[] = [
  { name: "S1", "Termure Adrian": 4.20, "Gabriel Marzan": 4.10, "Florin Ispas": 4.00, "Silviu Bahrin": 4.15 },
  { name: "S2", "Termure Adrian": 4.35, "Gabriel Marzan": 4.25, "Florin Ispas": 4.15, "Silviu Bahrin": 4.25 },
  { name: "S3", "Termure Adrian": 4.45, "Gabriel Marzan": 4.35, "Florin Ispas": 4.30, "Silviu Bahrin": 4.35 },
  { name: "S4", "Termure Adrian": 4.55, "Gabriel Marzan": 4.45, "Florin Ispas": 4.45, "Silviu Bahrin": 4.45 },
  { name: "S5", "Termure Adrian": 4.65, "Gabriel Marzan": 4.55, "Florin Ispas": 4.55, "Silviu Bahrin": 4.50 },
  { name: "S6", "Termure Adrian": 4.76, "Gabriel Marzan": 4.665, "Florin Ispas": 4.64, "Silviu Bahrin": 4.56 }
];
