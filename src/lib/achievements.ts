import { SUBJECTS, modules, subjectCount, type SubjectId } from "@/lib/caderno";
import { LEAGUES } from "@/lib/leagues";

export type ProgressSnap = {
  read: Record<string, string>;
  checks: Record<string, number[]>;
  correctIds: string[];
  streak: number;
  xp: number;
  claimedDaily: Record<string, string[]>;
  customized: boolean;
  challengeClears: number;
  bestAnswerStreak: number;
  dailySeconds: Record<string, number>;
  perfectQuizzes: number;
};

export type Achievement = {
  id: string;
  title: string;
  detail: string;
  test: (s: ProgressSnap) => boolean;
};

function checksOf(s: ProgressSnap) {
  return Object.values(s.checks).reduce((n, arr) => n + arr.length, 0);
}

function subjectClosed(s: ProgressSnap) {
  return SUBJECTS.some((id) => {
    const mine = modules.filter((m) => m.subject === id);
    return mine.length > 0 && mine.every((m) => s.read[m.slug]);
  });
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "primeiro",
    title: "Primeira página",
    detail: "Marque um módulo como lido.",
    test: (s) => Object.keys(s.read).length >= 1,
  },
  {
    id: "marca",
    title: "Marca-texto",
    detail: "Marque 8 seções como entendidas.",
    test: (s) => checksOf(s) >= 8,
  },
  {
    id: "dez",
    title: "Dez certezas",
    detail: "Acerte 10 perguntas diferentes.",
    test: (s) => s.correctIds.length >= 10,
  },
  {
    id: "cinquenta",
    title: "Caderno quente",
    detail: "Acerte 50 perguntas diferentes.",
    test: (s) => s.correctIds.length >= 50,
  },
  {
    id: "sem-errar",
    title: "Sem errar",
    detail: "Acerte 5 perguntas seguidas.",
    test: (s) => s.bestAnswerStreak >= 5,
  },
  {
    id: "tema",
    title: "Tema do dia",
    detail: "Cumpra um tema em destaque.",
    test: (s) => Object.values(s.claimedDaily).some((list) => list.length > 0),
  },
  {
    id: "tres",
    title: "Três dias",
    detail: "Estude 3 dias seguidos.",
    test: (s) => s.streak >= 3,
  },
  {
    id: "semana",
    title: "Semana firme",
    detail: "Estude 7 dias seguidos.",
    test: (s) => s.streak >= 7,
  },
  {
    id: "materia",
    title: "Matéria fechada",
    detail: "Leia todos os módulos de uma matéria.",
    test: subjectClosed,
  },
  {
    id: "caderno",
    title: "Caderno inteiro",
    detail: "Leia os 20 módulos.",
    test: (s) => Object.keys(s.read).length >= modules.length,
  },
  {
    id: "meia-hora",
    title: "Meia hora",
    detail: "Estude 30 minutos num mesmo dia.",
    test: (s) => Object.values(s.dailySeconds).some((n) => n >= 1800),
  },
  {
    id: "ouro",
    title: "Liga Ouro",
    detail: "Chegue à liga Ouro.",
    test: (s) => s.xp >= (LEAGUES.find((l) => l.id === "ouro")?.min ?? 160),
  },
  {
    id: "cromatico",
    title: "Cromático",
    detail: "Chegue à liga Cromático.",
    test: (s) => s.xp >= (LEAGUES.find((l) => l.id === "cromatico")?.min ?? 2600),
  },
  {
    id: "estilo",
    title: "Seu estilo",
    detail: "Personalize o personagem.",
    test: (s) => s.customized,
  },
  {
    id: "desafio",
    title: "Desafio fechado",
    detail: "Termine uma rodada do desafio.",
    test: (s) => s.challengeClears >= 1,
  },
  {
    id: "perfeito",
    title: "Sem falha",
    detail: "Feche um quiz de módulo sem errar.",
    test: (s) => s.perfectQuizzes >= 1,
  },
];

export function freshAchievements(s: ProgressSnap, have: string[]) {
  const known = new Set(have);
  return ACHIEVEMENTS.filter((a) => !known.has(a.id) && a.test(s));
}

export function subjectRead(read: Record<string, string>, id: SubjectId) {
  const mine = modules.filter((m) => m.subject === id);
  const n = mine.filter((m) => read[m.slug]).length;
  return { n, total: subjectCount(id) };
}
