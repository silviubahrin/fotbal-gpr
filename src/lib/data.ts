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
  form?: ('W' | 'L' | 'D')[];
  streak?: number;
  history?: number[];
}

const rawPlayers = [
  { name: "Termure Adrian", rating: 4.760, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 67, winRate: 50, history: [4.9, 4.84, 4.64, 4.63, 4.53, 4.729] },
  { name: "Gabriel Marzan", rating: 4.665, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 33, winRate: 100, history: [4.5, 4.3, 4.4, 4.55, 4.6, 4.665] },
  { name: "Florin Ispas", rating: 4.640, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, history: [4.2, 4.35, 4.45, 4.5, 4.58, 4.64] },
  { name: "Burz Radu", rating: 4.555, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 33, winRate: 25, history: [4.1, 4.25, 4.3, 4.42, 4.5, 4.555] },
  { name: "Silviu Bahrin", rating: 4.335, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 100, winRate: 100, history: [3.8, 3.95, 4.1, 4.2, 4.28, 4.335] },
  { name: "Paul Epure", rating: 4.255, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 67, winRate: 50, history: [3.9, 4.0, 4.1, 4.15, 4.2, 4.255] },
  { name: "Vlad Vidican", rating: 4.190, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 100, winRate: 75, history: [3.7, 3.85, 4.0, 4.05, 4.12, 4.19] },
  { name: "Matei Hasmasan", rating: 4.135, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 67, winRate: 13, history: [3.8, 3.9, 4.0, 4.05, 4.1, 4.135] },
  { name: "Cimpean Vali", rating: 3.985, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 67, winRate: 75, history: [3.6, 3.75, 3.85, 3.9, 3.95, 3.985] },
  { name: "Vali Borlea", rating: 3.905, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, history: [3.5, 3.65, 3.75, 3.82, 3.88, 3.905] },
  { name: "Codrin Aghirasimoaei", rating: 3.850, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, history: [3.4, 3.55, 3.7, 3.78, 3.82, 3.85] },
  { name: "Dan Sandu", rating: 3.785, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 67, winRate: 25, history: [3.3, 3.45, 3.6, 3.7, 3.75, 3.785] },
  { name: "Cristian Borlea", rating: 3.780, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, history: [3.4, 3.5, 3.65, 3.72, 3.76, 3.78] },
  { name: "Adrian Ispas", rating: 3.770, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, history: [3.3, 3.4, 3.55, 3.68, 3.72, 3.77] },
  { name: "Andries Adrian", rating: 3.740, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 33, winRate: 100, history: [3.2, 3.35, 3.5, 3.62, 3.7, 3.74] },
  { name: "Ovidiu Iancau", rating: 3.700, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, history: [3.1, 3.3, 3.45, 3.58, 3.65, 3.7] },
  { name: "Ionut Moldovan", rating: 4.700, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 33, winRate: 25, history: [4.2, 4.35, 4.5, 4.6, 4.65, 4.7] },
  { name: "Denis Antonie", rating: 3.610, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, history: [3.0, 3.2, 3.35, 3.48, 3.55, 3.61] },
  { name: "Balau George", rating: 3.255, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, history: [2.8, 2.95, 3.1, 3.18, 3.22, 3.255] },
  { name: "Gabi Trofin", rating: 3.150, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 33, winRate: 100, history: [2.7, 2.85, 3.0, 3.08, 3.12, 3.15] },
  { name: "Vasi Trif", rating: 2.867, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 33, winRate: 100, history: [2.5, 2.65, 2.75, 2.8, 2.84, 2.867] },
  { name: "Muresan Cosmin", rating: 2.580, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, history: [2.2, 2.35, 2.45, 2.52, 2.56, 2.58] },
  { name: "Alexandru Avirvarei", rating: 3.570, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 100, winRate: 58, history: [3.0, 3.2, 3.35, 3.45, 3.52, 3.57] },
  { name: "Zamfirescu Adrian", rating: 3.520, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 67, winRate: 75, history: [3.0, 3.15, 3.3, 3.4, 3.48, 3.52] },
  { name: "Hora Catalin", rating: 3.325, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, history: [2.8, 2.95, 3.1, 3.2, 3.28, 3.325] },
  { name: "Borfina Marius", rating: 3.305, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 100, winRate: 75, history: [2.8, 2.9, 3.05, 3.18, 3.25, 3.305] },
  { name: "Lazea Sorin", rating: 3.105, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, history: [2.6, 2.75, 2.9, 3.0, 3.05, 3.105] },
  { name: "Marius Calin", rating: 3.085, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 33, winRate: 25, history: [2.6, 2.7, 2.85, 2.95, 3.02, 3.085] },
  { name: "Nedisan Vlad", rating: 3.080, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 100, winRate: 42, history: [2.5, 2.65, 2.8, 2.92, 3.0, 3.08] },
  { name: "Ovidiu Moldovan", rating: 3.050, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 67, winRate: 100, history: [2.5, 2.6, 2.75, 2.9, 2.98, 3.05] },
  { name: "Mihai Pop", rating: 3.040, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 67, winRate: 50, history: [2.4, 2.55, 2.7, 2.85, 2.95, 3.04] },
  { name: "Florin Dusa", rating: 3.010, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 33, winRate: 0, history: [2.4, 2.5, 2.65, 2.8, 2.9, 3.01] },
  { name: "Tudor Oprisor", rating: 2.805, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 33, winRate: 25, history: [2.2, 2.35, 2.5, 2.65, 2.75, 2.805] },
  { name: "Andrei Moldovan", rating: 2.765, pace: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80, attendance: 0, winRate: 0, history: [2.1, 2.25, 2.4, 2.55, 2.68, 2.765] },
];

export const players: Player[] = rawPlayers.map(p => {
  return {
    ...p,
    ...getPlayerForm(p.name)
  };
});

export const matches = [
  { date: "06.01", score: "0 - 0", winners: ["TBD"], players: 15, playersList: ["Gabriel Marzan", "Burz Radu", "Silviu Bahrin", "Paul Epure", "Vlad Vidican", "Matei Hasmasan", "Alexandru Avirvarei", "Zamfirescu Adrian", "Borfina Marius", "Marius Calin", "Nedisan Vlad", "Ovidiu Moldovan", "Tudor Oprisor", "Ionut Moldovan", "Vasi Trif"] },
  { date: "20.01", score: "0 - 0", winners: ["TBD"], players: 14, playersList: ["Termure Adrian", "Silviu Bahrin", "Paul Epure", "Vlad Vidican", "Matei Hasmasan", "Cimpean Vali", "Dan Sandu", "Alexandru Avirvarei", "Borfina Marius", "Nedisan Vlad", "Mihai Pop", "Ovidiu Moldovan", "Florin Dusa", "Gabi Trofin"] },
  { date: "10.02", score: "0 - 0", winners: ["Silviu Bahrin", "Vlad Vidican", "Cimpean Vali", "Borfina Marius", "Nedisan Vlad", "Mihai Pop"], players: 11, playersList: ["Termure Adrian", "Silviu Bahrin", "Vlad Vidican", "Cimpean Vali", "Dan Sandu", "Andries Adrian", "Alexandru Avirvarei", "Zamfirescu Adrian", "Borfina Marius", "Nedisan Vlad", "Mihai Pop"] },
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

export const hallOfFame = [
  { name: "Alexandru Avirvarei", stars: 5, seasons: ["S1", "S2", "S3", "S4", "S5"] },
  { name: "Burz Radu", stars: 3, seasons: ["S1", "S2", "S4"] },
  { name: "Nedisan Vlad", stars: 3, seasons: ["S2", "S3", "S5"] },
  { name: "Cristian Borlea", stars: 2, seasons: ["S1", "S5"] },
  { name: "Ovidiu Iancau", stars: 2, seasons: ["S4", "S5"] },
  { name: "Ovidiu Moldovan", stars: 2, seasons: ["S3", "S5"] },
  { name: "Zamfirescu Adrian", stars: 2, seasons: ["S1", "S2"] },
  { name: "Denis Antonie", stars: 2, seasons: ["S2", "S4"] },
  { name: "Florin Dusa", stars: 2, seasons: ["S2", "S4"] },
  { name: "Gabriel Marzan", stars: 1, seasons: ["S1"] },
  { name: "Lazea Sorin", stars: 1, seasons: ["S1"] },
  { name: "Florin Ispas", stars: 1, seasons: ["S3"] },
  { name: "Tudor Oprisor", stars: 1, seasons: ["S3"] },
  { name: "Vali Borlea", stars: 1, seasons: ["S3"] },
  { name: "Gabi Trofin", stars: 1, seasons: ["S4"] },
  { name: "Termure Adrian", stars: 1, seasons: ["S5"] },
];

export const rankEvolution = [
  { name: "S1", Andrei: 4.2, Marius: 4.0, Cristi: 3.8, Dan: 3.5, Radu: 3.7 },
  { name: "S2", Andrei: 4.4, Marius: 4.2, Cristi: 4.0, Dan: 3.8, Radu: 3.9 },
  { name: "S3", Andrei: 4.5, Marius: 4.4, Cristi: 4.2, Dan: 4.1, Radu: 4.0 },
  { name: "S4", Andrei: 4.6, Marius: 4.5, Cristi: 4.4, Dan: 4.3, Radu: 4.2 },
  { name: "S5", Andrei: 4.7, Marius: 4.6, Cristi: 4.5, Dan: 4.5, Radu: 4.4 },
  { name: "S6", Andrei: 4.82, Marius: 4.76, Cristi: 4.71, Dan: 4.65, Radu: 4.58 },
];
