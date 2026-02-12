import { getPlayerForm } from './form';

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
  cups?: number;
  form?: ('W' | 'L' | 'D')[];
  streak?: number;
  history?: number[];
}

const rawPlayers = [
  { name: "Termure Adrian", rating: 4.760, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 67, winRate: 50, cups: 1, history: [4.9, 4.84, 4.64, 4.63, 4.53, 4.760] },
  { name: "Gabriel Marzan", rating: 4.665, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 33, winRate: 100, cups: 1, history: [4.53, 4.73, 4.64, 4.63, 4.635, 4.665] },
  { name: "Florin Ispas", rating: 4.640, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, cups: 0, history: [4.63, 4.66, 4.56, 4.65, 4.725, 4.640] },
  { name: "Burz Radu", rating: 4.555, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 33, winRate: 25, cups: 0.25, history: [4.85, 4.84, 4.68, 4.56, 4.565, 4.555] },
  { name: "Silviu Bahrin", rating: 4.335, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 100, winRate: 100, cups: 3, history: [0, 0, 0, 3.96, 4.06, 4.335] },
  { name: "Paul Epure", rating: 4.255, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 67, winRate: 50, cups: 1, history: [0, 0, 3.72, 4.08, 4.29, 4.255] },
  { name: "Vlad Vidican", rating: 4.190, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 100, winRate: 75, cups: 2.25, history: [0, 0, 0, 3.65, 3.786, 4.190] },
  { name: "Matei Hasmasan", rating: 4.135, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 67, winRate: 13, cups: 0.25, history: [0, 0, 3.61, 3.75, 4.04, 4.135] },
  { name: "Cimpean Vali", rating: 3.985, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 67, winRate: 75, cups: 1.5, history: [0, 0, 0, 0, 3.7, 3.985] },
  { name: "Vali Borlea", rating: 3.905, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, cups: 0, history: [0, 0, 4.08, 0, 3.73, 3.905] },
  { name: "Codrin Aghirasimoaei", rating: 3.850, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, cups: 0, history: [0, 4.4, 4.22, 4.08, 0, 3.850] },
  { name: "Dan Sandu", rating: 3.785, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 67, winRate: 25, cups: 0.5, history: [3.9, 3.84, 3.72, 3.75, 3.7, 3.785] },
  { name: "Cristian Borlea", rating: 3.780, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, cups: 0, history: [4.4, 4.15, 3.92, 3.9, 4.0, 3.780] },
  { name: "Adrian Ispas", rating: 3.770, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, cups: 0, history: [0, 0, 4.08, 3.9, 3.85, 3.770] },
  { name: "Andries Adrian", rating: 3.740, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 33, winRate: 100, cups: 1, history: [0, 0, 0, 0, 3.65, 3.740] },
  { name: "Ovidiu Iancau", rating: 3.700, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, cups: 0, history: [0, 0, 0, 3.8, 3.8, 3.700] },
  { name: "Alexandru Avirvarei", rating: 3.570, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 100, winRate: 58, cups: 1.75, history: [4.05, 3.72, 3.64, 3.62, 3.55, 3.570] },
  { name: "Zamfirescu Adrian", rating: 3.520, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 67, winRate: 75, cups: 1.5, history: [4.2, 3.9, 3.7, 3.5, 3.45, 3.520] },
  { name: "Hora Catalin", rating: 3.325, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, cups: 0, history: [0, 0, 3.48, 0, 3.42, 3.325] },
  { name: "Borfina Marius", rating: 3.305, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 100, winRate: 75, cups: 2.25, history: [0, 3.5, 3.25, 3.35, 3.35, 3.305] },
  { name: "Lazea Sorin", rating: 3.105, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, cups: 0, history: [3.9, 3.38, 3.4, 0, 0, 3.105] },
  { name: "Marius Calin", rating: 3.085, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 33, winRate: 25, cups: 0.25, history: [0, 0, 3.3, 3.25, 3.2, 3.085] },
  { name: "Nedisan Vlad", rating: 3.080, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 100, winRate: 42, cups: 1.25, history: [0, 3.64, 3.35, 3.25, 3.22, 3.080] },
  { name: "Ovidiu Moldovan", rating: 3.050, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 67, winRate: 100, cups: 2, history: [0, 0, 3.32, 3.15, 3.12, 3.050] },
  { name: "Mihai Pop", rating: 3.040, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 67, winRate: 50, cups: 1, history: [0, 0, 0, 3.25, 3.12, 3.040] },
  { name: "Florin Dusa", rating: 3.010, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 33, winRate: 0, cups: 0, history: [0, 3.65, 0, 3.3, 3.1, 3.010] },
  { name: "Tudor Oprisor", rating: 2.805, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 33, winRate: 25, cups: 0.25, history: [0, 0, 3.2, 3.1, 2.9, 2.805] },
  { name: "Andrei Moldovan", rating: 2.765, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, cups: 0, history: [3.8, 3.15, 3.1, 2.9, 2.85, 2.765] },
];

export const players: Player[] = rawPlayers
  .map(p => {
    return {
      ...p,
      ...getPlayerForm(p.name)
    };
  })
  .sort((a, b) => (b.cups || 0) - (a.cups || 0));

export const matches = [
  { date: "06.01", score: "0 - 0", winners: ["Silviu Bahrin", "Gabriel Marzan", "Ovidiu Moldovan", "Vasi Trif", "Zamfirescu Adrian", "Paul Epure"], players: 15, playersList: ["Gabriel Marzan", "Burz Radu", "Silviu Bahrin", "Paul Epure", "Vlad Vidican", "Matei Hasmasan", "Alexandru Avirvarei", "Zamfirescu Adrian", "Borfina Marius", "Marius Calin", "Nedisan Vlad", "Ovidiu Moldovan", "Tudor Oprisor", "Ionut Moldovan", "Vasi Trif"] },
  { date: "20.01", score: "0 - 0", winners: ["Silviu Bahrin", "Ovidiu Moldovan", "Gabi Trofin", "Vlad Vidican", "Borfina Marius"], players: 14, playersList: ["Termure Adrian", "Silviu Bahrin", "Paul Epure", "Vlad Vidican", "Matei Hasmasan", "Cimpean Vali", "Dan Sandu", "Alexandru Avirvarei", "Borfina Marius", "Alexandru Avirvarei", "Andries Adrian", "Ovidiu Moldovan", "Florin Dusa", "Gabi Trofin"] },
  { date: "10.02", score: "0 - 0", winners: ["Silviu Bahrin", "Cimpean Vali", "Vlad Vidican", "Alexandru Avirvarei", "Andries Adrian", "Borfina Marius"], players: 11, playersList: ["Termure Adrian", "Silviu Bahrin", "Vlad Vidican", "Cimpean Vali", "Dan Sandu", "Andries Adrian", "Alexandru Avirvarei", "Zamfirescu Adrian", "Borfina Marius", "Alexandru Avirvarei", "Andries Adrian"] },
];

export const trophies = [
  { name: "Silviu Bahrin", cups: 3, rate: "100%", successRate: "100%" },
  { name: "Vlad Vidican", cups: 2.25, rate: "75%", successRate: "75%" },
  { name: "Borfina Marius", cups: 2.25, rate: "75%", successRate: "75%" },
  { name: "Ovidiu Moldovan", cups: 2, rate: "100%", successRate: "100%" },
  { name: "Alexandru Avirvarei", cups: 1.75, rate: "58%", successRate: "58%" },
  { name: "Zamfirescu Adrian", cups: 1.5, rate: "75%", successRate: "75%" },
  { name: "Cimpean Vali", cups: 1.5, rate: "75%", successRate: "75%" },
  { name: "Nedisan Vlad", cups: 1.25, rate: "42%", successRate: "42%" },
  { name: "Gabriel Marzan", cups: 1, rate: "100%", successRate: "100%" },
  { name: "Vasi Trif", cups: 1, rate: "100%", successRate: "100%" },
  { name: "Gabi Trofin", cups: 1, rate: "100%", successRate: "100%" },
  { name: "Andries Adrian", cups: 1, rate: "100%", successRate: "100%" },
  { name: "Paul Epure", cups: 1, rate: "50%", successRate: "50%" },
  { name: "Termure Adrian", cups: 1, rate: "50%", successRate: "50%" },
  { name: "Mihai Pop", cups: 1, rate: "50%", successRate: "50%" },
  { name: "Dan Sandu", cups: 0.5, rate: "25%", successRate: "25%" },
  { name: "Burz Radu", cups: 0.25, rate: "25%", successRate: "25%" },
  { name: "Marius Calin", cups: 0.25, rate: "25%", successRate: "25%" },
  { name: "Tudor Oprisor", cups: 0.25, rate: "25%", successRate: "25%" },
  { name: "Ionut Moldovan", cups: 0.25, rate: "25%", successRate: "25%" },
  { name: "Matei Hasmasan", cups: 0.25, rate: "13%", successRate: "13%" },
  { name: "Florin Dusa", cups: 0, rate: "0%", successRate: "0%" },
];

export const hof = [
  { champion: "Termure Adrian", mvp: "Termure Adrian", season: "S6", year: "2026" },
  { champion: "Gabriel Marzan", mvp: "Gabriel Marzan", season: "S1", year: "2024" },
  { champion: "Florin Ispas", mvp: "Florin Ispas", season: "S3", year: "2025" },
];

export const rankEvolution = [
  { name: "S1", Andrei: 4.2, Marius: 4.0, Cristi: 3.8, Dan: 3.5, Radu: 3.7 },
  { name: "S2", Andrei: 4.4, Marius: 4.2, Cristi: 4.0, Dan: 3.8, Radu: 3.9 },
  { name: "S3", Andrei: 4.5, Marius: 4.4, Cristi: 4.2, Dan: 4.1, Radu: 4.0 },
  { name: "S4", Andrei: 4.6, Marius: 4.5, Cristi: 4.4, Dan: 4.3, Radu: 4.2 },
  { name: "S5", Andrei: 4.7, Marius: 4.6, Cristi: 4.5, Dan: 4.5, Radu: 4.4 },
  { name: "S6", Andrei: 4.82, Marius: 4.76, Cristi: 4.71, Dan: 4.65, Radu: 4.58 },
];