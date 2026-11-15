import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { freshAchievements, type ProgressSnap } from "@/lib/achievements";
import {
  dailyBonusFor,
  shiftYmd,
  ymd,
  type SubjectId,
} from "@/lib/caderno";
import { leagueFor, skinUnlocked } from "@/lib/leagues";

export type Avatar = {
  skin: number;
  hair: number;
  hairColor: number;
  outfit: number;
  accessory: number;
  face: number;
};

export type SubjectStat = { asked: number; hits: number };

export type ProgressData = {
  name: string;
  mode: "light" | "dark";
  skinId: string;
  read: Record<string, string>;
  checks: Record<string, number[]>;
  awardedRead: string[];
  awardedChecks: Record<string, number[]>;
  dailySeconds: Record<string, number>;
  correctIds: string[];
  streak: number;
  lastStudy: string | null;
  xp: number;
  claimedDaily: Record<string, string[]>;
  achievements: string[];
  avatar: Avatar;
  customized: boolean;
  challengeClears: number;
  answerStreak: number;
  bestAnswerStreak: number;
  asked: number;
  hits: number;
  bySubject: Record<SubjectId, SubjectStat>;
  perfectQuizzes: number;
  repeatXp: number;
  repeatDate: string;
  timedXp: number;
  timedDate: string;
  lastSlug: string | null;
};

type Notice = { id: number; text: string } | null;
type Banner = { id: number; leagueId: string; text: string } | null;

type Store = ProgressData & {
  notice: Notice;
  banner: Banner;
  setName: (name: string) => void;
  setMode: (mode: "light" | "dark") => void;
  toggleMode: () => void;
  equipSkin: (id: string) => void;
  setAvatar: (patch: Partial<Avatar>) => void;
  toggleRead: (slug: string) => void;
  toggleCheck: (slug: string, index: number) => void;
  addSeconds: (slug: string, seconds: number) => void;
  recordAnswer: (id: string, subject: SubjectId, moduleSlug: string, correct: boolean) => void;
  finishChallenge: () => void;
  notePerfect: () => void;
  setLastSlug: (slug: string) => void;
  dismissNotice: () => void;
  dismissBanner: () => void;
  reset: () => void;
};

const emptySubjects = (): Record<SubjectId, SubjectStat> => ({
  geografia: { asked: 0, hits: 0 },
  historia: { asked: 0, hits: 0 },
  portugues: { asked: 0, hits: 0 },
  ciencias: { asked: 0, hits: 0 },
  matematica: { asked: 0, hits: 0 },
});

export const defaultAvatar: Avatar = {
  skin: 1,
  hair: 0,
  hairColor: 2,
  outfit: 0,
  accessory: 0,
  face: 0,
};

const initial: ProgressData = {
  name: "",
  mode: "light",
  skinId: "caderno",
  read: {},
  checks: {},
  awardedRead: [],
  awardedChecks: {},
  dailySeconds: {},
  correctIds: [],
  streak: 0,
  lastStudy: null,
  xp: 0,
  claimedDaily: {},
  achievements: [],
  avatar: defaultAvatar,
  customized: false,
  challengeClears: 0,
  answerStreak: 0,
  bestAnswerStreak: 0,
  asked: 0,
  hits: 0,
  bySubject: emptySubjects(),
  perfectQuizzes: 0,
  repeatXp: 0,
  repeatDate: "",
  timedXp: 0,
  timedDate: "",
  lastSlug: null,
};

function snap(d: ProgressData): ProgressSnap {
  return {
    read: d.read,
    checks: d.checks,
    correctIds: d.correctIds,
    streak: d.streak,
    xp: d.xp,
    claimedDaily: d.claimedDaily,
    customized: d.customized,
    challengeClears: d.challengeClears,
    bestAnswerStreak: d.bestAnswerStreak,
    dailySeconds: d.dailySeconds,
    perfectQuizzes: d.perfectQuizzes,
  };
}

function touchStreak(d: ProgressData, today: string): ProgressData {
  if (d.lastStudy === today) return d;
  const streak = d.lastStudy === shiftYmd(today, -1) ? d.streak + 1 : 1;
  return { ...d, streak, lastStudy: today };
}

let noticeSeq = 1;

function applyGain(
  prev: ProgressData,
  next: ProgressData,
  total: number,
  quiet: boolean,
  claimed: boolean,
): ProgressData & { notice?: Notice; banner?: Banner } {
  const found = freshAchievements(snap(next), prev.achievements);
  const achievements = [...next.achievements, ...found.map((a) => a.id)];
  const merged: ProgressData = { ...next, achievements };
  const before = leagueFor(prev.xp).id;
  const after = leagueFor(merged.xp).id;
  const parts: string[] = [];
  if (total > 0 && (!quiet || claimed)) {
    parts.push(claimed ? `+${total} XP · tema do dia` : `+${total} XP`);
  }
  if (found[0]) parts.push(`Conquista: ${found[0].title}`);
  const text = parts.join(" · ");
  const leagueChanged = before !== after && merged.xp > prev.xp;
  if (leagueChanged) {
    return {
      ...merged,
      banner: {
        id: ++noticeSeq,
        leagueId: after,
        text: text || "Um tema novo entrou no caderno.",
      },
    };
  }
  if (text) return { ...merged, notice: { id: ++noticeSeq, text } };
  return merged;
}

export const useProgress = create<Store>()(
  persist(
    (set, get) => ({
      ...initial,
      notice: null,
      banner: null,
      dismissNotice: () => set({ notice: null }),
      dismissBanner: () => set({ banner: null }),
      setName: (name) => set({ name: name.slice(0, 40) }),
      setMode: (mode) => set({ mode }),
      toggleMode: () => set({ mode: get().mode === "dark" ? "light" : "dark" }),
      equipSkin: (id) => {
        if (id !== "caderno" && !skinUnlocked(id, get().xp)) return;
        set({ skinId: id });
      },
      setAvatar: (patch) => {
        const prev = get();
        const avatar = { ...prev.avatar, ...patch };
        const base: ProgressData = { ...prev, avatar, customized: true };
        const gained = applyGain(prev, base, 0, true, false);
        set({ ...gained, avatar, customized: true });
      },
      setLastSlug: (slug) => {
        if (get().lastSlug === slug) return;
        set({ lastSlug: slug });
      },
      toggleRead: (slug) => {
        const prev = get();
        const today = ymd();
        const read = { ...prev.read };
        if (read[slug]) {
          delete read[slug];
          set({ read });
          return;
        }
        read[slug] = new Date().toISOString();
        let next: ProgressData = touchStreak({ ...prev, read, lastSlug: slug }, today);
        let total = 0;
        let claimed = false;
        if (!prev.awardedRead.includes(slug)) {
          total += 20;
          next = { ...next, awardedRead: [...prev.awardedRead, slug] };
          const bonus = dailyBonusFor(slug, today);
          const have = next.claimedDaily[today] ?? [];
          if (bonus && !have.includes(slug)) {
            total += bonus;
            claimed = true;
            next = {
              ...next,
              claimedDaily: { ...next.claimedDaily, [today]: [...have, slug] },
            };
          }
        }
        next = { ...next, xp: prev.xp + total };
        set(applyGain(prev, next, total, false, claimed));
      },
      toggleCheck: (slug, index) => {
        const prev = get();
        const today = ymd();
        const current = prev.checks[slug] ?? [];
        const on = current.includes(index);
        const checks = {
          ...prev.checks,
          [slug]: on ? current.filter((n) => n !== index) : [...current, index],
        };
        if (on) {
          set({ checks });
          return;
        }
        const awarded = prev.awardedChecks[slug] ?? [];
        let next: ProgressData = touchStreak(
          { ...prev, checks, lastSlug: slug },
          today,
        );
        let total = 0;
        let claimed = false;
        if (!awarded.includes(index)) {
          total += 5;
          next = {
            ...next,
            awardedChecks: { ...prev.awardedChecks, [slug]: [...awarded, index] },
          };
          const bonus = dailyBonusFor(slug, today);
          const have = next.claimedDaily[today] ?? [];
          if (bonus && !have.includes(slug)) {
            total += bonus;
            claimed = true;
            next = {
              ...next,
              claimedDaily: { ...next.claimedDaily, [today]: [...have, slug] },
            };
          }
        }
        next = { ...next, xp: prev.xp + total };
        set(applyGain(prev, next, total, false, claimed));
      },
      addSeconds: (slug, seconds) => {
        if (seconds <= 0) return;
        const prev = get();
        const today = ymd();
        const dailySeconds = {
          ...prev.dailySeconds,
          [today]: (prev.dailySeconds[today] ?? 0) + seconds,
        };
        let next = touchStreak({ ...prev, dailySeconds, lastSlug: slug }, today);
        let total = 0;
        const bonus = dailyBonusFor(slug, today);
        if (bonus) {
          const sameDay = prev.timedDate === today;
          const used = sameDay ? prev.timedXp : 0;
          const room = Math.max(0, 24 - used);
          const chunk = Math.min(room, Math.max(1, Math.round(seconds / 20)));
          if (room > 0) {
            total = chunk;
            next = { ...next, timedXp: used + chunk, timedDate: today, xp: prev.xp + chunk };
          }
        }
        if (total === 0 && next.streak === prev.streak && next.lastStudy === prev.lastStudy) {
          set({ dailySeconds, lastSlug: slug });
          return;
        }
        if (total === 0) next = { ...next, xp: prev.xp };
        set(applyGain(prev, next, total, true, false));
      },
      recordAnswer: (id, subject, moduleSlug, correct) => {
        const prev = get();
        const today = ymd();
        const asked = prev.asked + 1;
        const hits = prev.hits + (correct ? 1 : 0);
        const stat = prev.bySubject[subject];
        const bySubject = {
          ...prev.bySubject,
          [subject]: {
            asked: stat.asked + 1,
            hits: stat.hits + (correct ? 1 : 0),
          },
        };
        const answerStreak = correct ? prev.answerStreak + 1 : 0;
        const bestAnswerStreak = Math.max(prev.bestAnswerStreak, answerStreak);
        let correctIds = prev.correctIds;
        let total = 0;
        let claimed = false;
        const first = correct && !correctIds.includes(id);
        if (first) {
          correctIds = [...correctIds, id];
          total += 10;
        } else if (correct && dailyBonusFor(moduleSlug, today)) {
          const same = prev.repeatDate === today;
          const used = same ? prev.repeatXp : 0;
          if (used < 24) {
            total += 3;
          }
        }
        let next: ProgressData = touchStreak(
          {
            ...prev,
            asked,
            hits,
            bySubject,
            answerStreak,
            bestAnswerStreak,
            correctIds,
            lastSlug: moduleSlug,
          },
          today,
        );
        if (!first && correct && total > 0) {
          const same = prev.repeatDate === today;
          next = {
            ...next,
            repeatDate: today,
            repeatXp: (same ? prev.repeatXp : 0) + total,
          };
        }
        if (total > 0) {
          const bonus = first ? dailyBonusFor(moduleSlug, today) : 0;
          const have = next.claimedDaily[today] ?? [];
          if (bonus && !have.includes(moduleSlug)) {
            total += bonus;
            claimed = true;
            next = {
              ...next,
              claimedDaily: { ...next.claimedDaily, [today]: [...have, moduleSlug] },
            };
          }
        }
        next = { ...next, xp: prev.xp + total };
        set(applyGain(prev, next, total, false, claimed));
      },
      finishChallenge: () => {
        const prev = get();
        const next = touchStreak(
          { ...prev, challengeClears: prev.challengeClears + 1 },
          ymd(),
        );
        set(applyGain(prev, next, 0, true, false));
      },
      notePerfect: () => {
        const prev = get();
        const next = { ...prev, perfectQuizzes: prev.perfectQuizzes + 1 };
        set(applyGain(prev, next, 0, true, false));
      },
      reset: () =>
        set({
          ...initial,
          bySubject: emptySubjects(),
          avatar: defaultAvatar,
          mode: get().mode,
          notice: { id: ++noticeSeq, text: "Progresso apagado neste navegador." },
          banner: null,
        }),
    }),
    {
      name: "studysphere-liga-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({
        name: s.name,
        mode: s.mode,
        skinId: s.skinId,
        read: s.read,
        checks: s.checks,
        awardedRead: s.awardedRead,
        awardedChecks: s.awardedChecks,
        dailySeconds: s.dailySeconds,
        correctIds: s.correctIds,
        streak: s.streak,
        lastStudy: s.lastStudy,
        xp: s.xp,
        claimedDaily: s.claimedDaily,
        achievements: s.achievements,
        avatar: s.avatar,
        customized: s.customized,
        challengeClears: s.challengeClears,
        answerStreak: s.answerStreak,
        bestAnswerStreak: s.bestAnswerStreak,
        asked: s.asked,
        hits: s.hits,
        bySubject: s.bySubject,
        perfectQuizzes: s.perfectQuizzes,
        repeatXp: s.repeatXp,
        repeatDate: s.repeatDate,
        timedXp: s.timedXp,
        timedDate: s.timedDate,
        lastSlug: s.lastSlug,
      }),
    },
  ),
);

export function useHydratedProgress() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const finish = () => setHydrated(true);
    if (useProgress.persist.hasHydrated()) finish();
    const unsub = useProgress.persist.onFinishHydration(finish);
    void useProgress.persist.rehydrate();
    return unsub;
  }, []);
  return hydrated;
}

