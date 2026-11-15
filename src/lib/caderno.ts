import rawJson from "@/data/caderno.json";

export type SubjectId =
  | "geografia"
  | "historia"
  | "portugues"
  | "ciencias"
  | "matematica";

export type Section = { title: string; points: string[] };

export type Content = {
  intro: string;
  sections: Section[];
  contrasts?: { fala: string; norma: string; nota: string }[];
  glossary?: [string, string][];
  faq?: [string, string][];
  videos?: { title: string; url: string; source: string; note?: string }[];
  sources?: { title: string; url: string; source: string; note?: string }[];
  syllabus?: string[];
  table?: { caption: string; headers: string[]; rows: string[][] };
  widget?: string;
  wordBank?: [string, string][];
  formula?: { label: string; expr: string; note: string };
};

export type Module = {
  slug: string;
  subject: SubjectId;
  number: number | string;
  title: string;
  notebook: string;
  kicker: string;
  fresh?: boolean;
  content: Content;
};

export type Question = {
  id: string;
  subject: SubjectId;
  module: string;
  difficulty: "basica" | "intermediaria" | "avancada" | string;
  type: string;
  prompt: string;
  options: string[];
  answer: number | number[];
  explanation: string;
  context?: string;
};

type Raw = {
  subjects: Record<SubjectId, { label: string; blurb: string }>;
  difficulties: Record<string, string>;
  modules: Module[];
  questions: Question[];
};

const raw = rawJson as unknown as Raw;

export const SUBJECTS: SubjectId[] = [
  "geografia",
  "historia",
  "portugues",
  "ciencias",
  "matematica",
];

export const subjects = raw.subjects;
export const difficulties = raw.difficulties;
export const modules: Module[] = raw.modules;
export const questions: Question[] = raw.questions;

export function moduleBySlug(slug: string) {
  return modules.find((m) => m.slug === slug) ?? null;
}

export function questionsFor(slug: string) {
  return questions.filter((q) => q.module === slug);
}

export function subjectCount(id: SubjectId) {
  return modules.filter((m) => m.subject === id).length;
}

export function ymd(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function shiftYmd(day: string, delta: number) {
  const [y, m, d] = day.split("-").map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  dt.setDate(dt.getDate() + delta);
  return ymd(dt);
}

export type DailyPick = { module: Module; bonus: number; featured: boolean };

export function dailyPicks(day = ymd()): DailyPick[] {
  let x = 2166136261;
  for (const c of day) x = Math.imul(x ^ c.charCodeAt(0), 16777619);
  const idxs: number[] = [];
  while (idxs.length < 3) {
    x = (Math.imul(x, 1664525) + 1013904223) >>> 0;
    const i = x % modules.length;
    if (!idxs.includes(i)) idxs.push(i);
  }
  const bonuses = [40, 28, 28];
  return idxs.map((i, n) => ({
    module: modules[i]!,
    bonus: bonuses[n]!,
    featured: n === 0,
  }));
}

export function dailyBonusFor(slug: string, day = ymd()) {
  return dailyPicks(day).find((p) => p.module.slug === slug)?.bonus ?? 0;
}

export function isCorrect(q: Question, pick: number | number[]) {
  if (Array.isArray(q.answer)) {
    return (
      Array.isArray(pick) &&
      q.answer.length === pick.length &&
      q.answer.every((n, i) => n === pick[i])
    );
  }
  return pick === q.answer;
}

export const WEEKDAYS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"] as const;
