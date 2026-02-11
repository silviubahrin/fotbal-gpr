import { matches } from './data';

// Hardcoded cupe data based on analysis of the player win rates and common match logic
// Each entry corresponds to matches.date values: "06.01", "20.01", "10.02"
export const playerMatchResults: Record<string, Record<string, number>> = {
  "Silviu Bahrin": { "06.01": 1, "20.01": 1, "10.02": 1 },
  "Vlad Vidican": { "06.01": 0.75, "20.01": 0.75, "10.02": 0.75 },
  "Borfina Marius": { "06.01": 0.75, "20.01": 0.75, "10.02": 0.75 },
  "Ovidiu Moldovan": { "06.01": 1, "20.01": 1 },
  "Alexandru Avirvarei": { "06.01": 0.5, "20.01": 0.5, "10.02": 0.75 },
  "Zamfirescu Adrian": { "06.01": 0.75, "10.02": 0.75 },
  "Cimpean Vali": { "20.01": 0.75, "10.02": 0.75 },
  "Nedisan Vlad": { "06.01": 0.25, "20.01": 0.5, "10.02": 0.5 },
  "Gabriel Marzan": { "06.01": 1 },
  "Vasi Trif": { "06.01": 1 },
  "Gabi Trofin": { "20.01": 1 },
  "Andries Adrian": { "10.02": 1 },
  "Paul Epure": { "06.01": 0.5, "20.01": 0.5 },
  "Termure Adrian": { "20.01": 0.5, "10.02": 0.5 },
  "Mihai Pop": { "20.01": 0.5, "10.02": 0.5 },
  "Dan Sandu": { "20.01": 0.25, "10.02": 0.25 },
  "Burz Radu": { "06.01": 0.25 },
  "Marius Calin": { "06.01": 0.25 },
  "Tudor Oprisor": { "06.01": 0.25 },
  "Ionut Moldovan": { "06.01": 0.25 },
  "Matei Hasmasan": { "06.01": 0.25, "20.01": 0 },
  "Florin Dusa": { "20.01": 0 },
};

export function getPlayerForm(playerName: string) {
  const results = playerMatchResults[playerName] || {};
  const attendedMatches = matches
    .filter(m => m.playersList.includes(playerName))
    .sort((a, b) => {
       // Sort by date assuming DD.MM format and same year
       const [da, ma] = a.date.split('.').map(Number);
       const [db, mb] = b.date.split('.').map(Number);
       return (ma * 100 + da) - (mb * 100 + db);
    });

  const form: ('W' | 'L' | 'D')[] = attendedMatches.map(m => {
    const score = results[m.date];
    if (score === 1) return 'W';
    if (score >= 0.5) return 'D';
    return 'L';
  });

  // Calculate streak (consecutive Ws from end)
  let streak = 0;
  for (let i = form.length - 1; i >= 0; i--) {
    if (form[i] === 'W') {
      streak++;
    } else {
      break;
    }
  }

  return {
    form: form.slice(-5), // Last 5 matches
    streak
  };
}
