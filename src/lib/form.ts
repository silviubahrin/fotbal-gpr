// Hardcoded cupe data based on analysis of the player win rates and common match logic
// Each entry corresponds to matches.date values: "06.01", "20.01", "10.02"
export const playerMatchResults: Record<string, Record<string, number>> = {
  "Silviu Bahrin": { "06.01": 1, "20.01": 1, "10.02": 1 },
  "Vlad Vidican": { "06.01": 0.25, "20.01": 1, "10.02": 1 },
  "Borfina Marius": { "06.01": 0.25, "20.01": 1, "10.02": 1 },
  "Ovidiu Moldovan": { "06.01": 1, "20.01": 1 },
  "Alexandru Avirvarei": { "06.01": 0.25, "20.01": 0.5, "10.02": 1 },
  "Zamfirescu Adrian": { "06.01": 1, "10.02": 0.5 },
  "Cimpean Vali": { "20.01": 0.5, "10.02": 1 },
  "Nedisan Vlad": { "06.01": 0.25, "20.01": 0.5, "10.02": 0.5 },
  "Gabriel Marzan": { "06.01": 1 },
  "Vasi Trif": { "06.01": 1 },
  "Gabi Trofin": { "20.01": 1 },
  "Andries Adrian": { "10.02": 1 },
  "Paul Epure": { "06.01": 1 },
  "Termure Adrian": { "20.01": 0.5, "10.02": 0.5 },
  "Mihai Pop": { "20.01": 0.5, "10.02": 0.5 },
  "Dan Sandu": { "20.01": 0, "10.02": 0.5 },
  "Burz Radu": { "06.01": 0.25 },
  "Marius Calin": { "06.01": 0.25 },
  "Tudor Oprisor": { "06.01": 0.25 },
  "Ionut Moldovan": { "06.01": 0.25 },
  "Matei Hasmasan": { "06.01": 0.25 },
};

export function getPlayerForm(playerName: string) {
  const results = playerMatchResults[playerName] || {};
  const matchDates = ["06.01", "20.01", "10.02"];

  // Logic: 1.0 = W (Green), 0.1-0.9 = D (Yellow/Gray in UI, but we'll use 'D' for now), 0 = L (Red)
  const form: ('W' | 'L' | 'D')[] = matchDates.map(date => {
    const score = results[date];
    if (score === undefined) return null;
    if (score >= 1) return 'W';
    if (score > 0 && score < 1) return 'D';
    if (score === 0) return 'L';
    return null;
  }).filter(x => x !== null) as ('W' | 'L' | 'D')[];

  let streak = 0;
  for (let i = form.length - 1; i >= 0; i--) {
    if (form[i] === 'W') {
      streak++;
    } else {
      break;
    }
  }

  return {
    form,
    streak
  };
}
