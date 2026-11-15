export type League = {
  id: string;
  name: string;
  min: number;
  theme: string;
  blurb: string;
  reward: string;
};

export const LEAGUES: League[] = [
  {
    id: "bronze",
    name: "Bronze",
    min: 0,
    theme: "Kraft",
    blurb: "Papel quente, como a primeira página do caderno.",
    reward: "Camiseta do caderno",
  },
  {
    id: "prata",
    name: "Prata",
    min: 60,
    theme: "Névoa",
    blurb: "Aço claro e margem fria.",
    reward: "Óculos",
  },
  {
    id: "ouro",
    name: "Ouro",
    min: 160,
    theme: "Âmbar",
    blurb: "Tinta dourada nas capas.",
    reward: "Fones",
  },
  {
    id: "platina",
    name: "Platina",
    min: 320,
    theme: "Gelo",
    blurb: "Caderno quase branco, tinta azul-gelo.",
    reward: "Gola alta",
  },
  {
    id: "esmeralda",
    name: "Esmeralda",
    min: 520,
    theme: "Clorofila",
    blurb: "O marca-texto verde toma a interface.",
    reward: "Boina",
  },
  {
    id: "rubi",
    name: "Rubi",
    min: 780,
    theme: "Carmim",
    blurb: "Capa vermelha de prova corrigida.",
    reward: "Laço",
  },
  {
    id: "safira",
    name: "Safira",
    min: 1100,
    theme: "Tinta",
    blurb: "Azul profundo de caneta esferográfica.",
    reward: "Estojo",
  },
  {
    id: "diamante",
    name: "Diamante",
    min: 1500,
    theme: "Vidro",
    blurb: "Superfície clara, aresta ciano.",
    reward: "Broche",
  },
  {
    id: "lendaria",
    name: "Lendária",
    min: 2000,
    theme: "Violeta",
    blurb: "A cor de quem fechou o caderno inteiro.",
    reward: "Capa",
  },
  {
    id: "cromatico",
    name: "Cromático",
    min: 2600,
    theme: "Cromático",
    blurb: "Os cinco marca-textos ao mesmo tempo.",
    reward: "Aura",
  },
];

export const BASE_SKIN = "caderno";

export function leagueFor(xp: number) {
  let current = LEAGUES[0]!;
  for (const league of LEAGUES) {
    if (xp >= league.min) current = league;
  }
  return current;
}

export function leagueIndex(xp: number) {
  return LEAGUES.findIndex((l) => l.id === leagueFor(xp).id);
}

export function nextLeague(xp: number) {
  return LEAGUES.find((l) => l.min > xp) ?? null;
}

export function skinUnlocked(id: string, xp: number) {
  if (id === BASE_SKIN) return true;
  const league = LEAGUES.find((l) => l.id === id);
  return !!league && xp >= league.min;
}

export const OUTFITS = [
  { id: 0, name: "Camiseta", league: 0 },
  { id: 1, name: "Gola alta", league: 3 },
  { id: 2, name: "Capa", league: 8 },
] as const;

export const ACCESSORIES = [
  { id: 0, name: "Nenhum", league: 0 },
  { id: 1, name: "Óculos", league: 1 },
  { id: 2, name: "Fones", league: 2 },
  { id: 3, name: "Boina", league: 4 },
  { id: 4, name: "Laço", league: 5 },
  { id: 5, name: "Broche", league: 7 },
  { id: 6, name: "Aura", league: 9 },
] as const;

export const HAIRS = ["Curto", "Chanel", "Espetado", "Coque", "Franja", "Careca"] as const;
export const HAIR_COLORS = ["Tinta", "Mel", "Castanho", "Preto", "Ruivo", "Rosa"] as const;
export const SKINS = ["Porcelana", "Pêssego", "Dourada", "Bronze", "Profunda"] as const;
export const FACES = ["Sorriso", "Foco", "Piscada", "Surpresa"] as const;

export function itemUnlocked(requiredLeague: number, xp: number) {
  return leagueIndex(xp) >= requiredLeague;
}
