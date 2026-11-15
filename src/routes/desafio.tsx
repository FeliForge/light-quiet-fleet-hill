import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Quiz } from "@/components/quiz";
import { SUBJECTS, questions, subjects, type Question, type SubjectId } from "@/lib/caderno";
import { useProgress } from "@/lib/store";

export const Route = createFileRoute("/desafio")({
  component: ChallengePage,
  head: () => ({ meta: [{ title: "Desafio · StudySphere" }] }),
});

function shuffle(list: Question[]) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = copy[i]!;
    const b = copy[j]!;
    copy[i] = b;
    copy[j] = a;
  }
  return copy;
}

function ChallengePage() {
  const [subject, setSubject] = useState<SubjectId | "todas">("todas");
  const [round, setRound] = useState(0);
  const finishChallenge = useProgress((s) => s.finishChallenge);
  const pool = useMemo(() => {
    const source = subject === "todas" ? questions : questions.filter((q) => q.subject === subject);
    return shuffle(source).slice(0, 10);
  }, [subject, round]);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-5xl font-extrabold">Desafio</h1>
        <p className="max-w-xl text-muted">
          Até dez perguntas sorteadas, sem repetição na sessão. A explicação aparece logo depois da
          resposta. Acertos inéditos valem XP; nos temas do dia, repetir ainda soma um pouco.
        </p>
      </header>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="pick" aria-pressed={subject === "todas"} onClick={() => setSubject("todas")}>
          Todas
        </button>
        {SUBJECTS.map((id) => (
          <button
            key={id}
            type="button"
            className="pick"
            aria-pressed={subject === id}
            onClick={() => setSubject(id)}
          >
            {subjects[id].label}
          </button>
        ))}
      </div>
      <Quiz
        key={`${subject}-${round}`}
        questions={pool}
        onDone={() => finishChallenge()}
      />
      <button type="button" className="btn-ghost" onClick={() => setRound((n) => n + 1)}>
        Sortear outra rodada
      </button>
    </div>
  );
}
