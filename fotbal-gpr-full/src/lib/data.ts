export const players = [
  { name: "Andrei", rating: 4.82, pace: 88, sho: 84, pas: 90, dri: 87, def: 82, phy: 85, attendance: 95, winRate: 72 },
  { name: "Marius", rating: 4.76, pace: 85, sho: 88, pas: 84, dri: 82, def: 78, phy: 80, attendance: 90, winRate: 68 },
  { name: "Cristi", rating: 4.71, pace: 82, sho: 80, pas: 88, dri: 85, def: 84, phy: 82, attendance: 88, winRate: 65 },
  { name: "Dan", rating: 4.65, pace: 80, sho: 82, pas: 85, dri: 80, def: 86, phy: 88, attendance: 85, winRate: 60 },
  { name: "Radu", rating: 4.58, pace: 86, sho: 78, pas: 82, dri: 88, def: 75, phy: 72, attendance: 82, winRate: 58 },
  { name: "Vlad", rating: 4.52, pace: 90, sho: 85, pas: 78, dri: 84, def: 70, phy: 75, attendance: 80, winRate: 55 },
  { name: "Ionut", rating: 4.45, pace: 78, sho: 75, pas: 80, dri: 78, def: 88, phy: 90, attendance: 78, winRate: 52 },
  { name: "Stefan", rating: 4.38, pace: 84, sho: 82, pas: 75, dri: 80, def: 72, phy: 78, attendance: 75, winRate: 50 },
];

export const matches = [
  { date: "10.02", score: "5 - 3", winners: ["Andrei", "Cristi", "Radu"], players: 12 },
  { date: "03.02", score: "4 - 4", winners: ["Draw"], players: 14 },
  { date: "27.01", score: "6 - 2", winners: ["Marius", "Dan", "Ionut"], players: 10 },
  { date: "20.01", score: "3 - 5", winners: ["Vlad", "Stefan", "Andrei"], players: 12 },
];

export const trophies = [
  { name: "Andrei", cups: 12, rate: "85%" },
  { name: "Marius", cups: 10, rate: "78%" },
  { name: "Cristi", cups: 9, rate: "72%" },
  { name: "Dan", cups: 8, rate: "68%" },
];

export const hof = [
  { season: "Season 5", champion: "Andrei", mvp: "Marius" },
  { season: "Season 4", champion: "Cristi", mvp: "Andrei" },
  { season: "Season 3", champion: "Dan", mvp: "Radu" },
  { season: "Season 2", champion: "Andrei", mvp: "Ionut" },
];

export const rankEvolution = [
  { name: "S1", Andrei: 4.2, Marius: 4.0, Cristi: 3.8, Dan: 3.5, Radu: 3.7 },
  { name: "S2", Andrei: 4.4, Marius: 4.2, Cristi: 4.0, Dan: 3.8, Radu: 3.9 },
  { name: "S3", Andrei: 4.5, Marius: 4.4, Cristi: 4.2, Dan: 4.1, Radu: 4.0 },
  { name: "S4", Andrei: 4.6, Marius: 4.5, Cristi: 4.4, Dan: 4.3, Radu: 4.2 },
  { name: "S5", Andrei: 4.7, Marius: 4.6, Cristi: 4.5, Dan: 4.5, Radu: 4.4 },
  { name: "S6", Andrei: 4.82, Marius: 4.76, Cristi: 4.71, Dan: 4.65, Radu: 4.58 },
];
