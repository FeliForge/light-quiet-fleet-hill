import { useEffect, useState } from "react";
import { difficulties, isCorrect, type Question } from "@/lib/caderno";
import { useProgress } from "@/lib/store";

export function Quiz({
  questions,
  onDone,
}: {
  questions: Question[];
  onDone?: (stats: { perfect: boolean; hits: number; total: number }) => void;
}) {
  const recordAnswer = useProgress((s) => s.recordAnswer);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [hits, setHits] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = questions[index];

  const key = questions.map((item) => item.id).join("|");

  useEffect(() => {
    setIndex(0);
    setChoice(null);
    setOrder([]);
    setRevealed(false);
    setHits(0);
    setFinished(false);
  }, [key]);

  if (!q) {
    return <p className="text-muted">Nenhuma pergunta neste filtro.</p>;
  }

  if (finished) {
    return (
      <div className="card space-y-3">
        <h3 className="font-display text-2xl font-extrabold">Rodada fechada</h3>
        <p className="text-lg">
          {hits} de {questions.length} acertos
          {hits === questions.length ? " — sem falha." : "."}
        </p>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            setIndex(0);
            setChoice(null);
            setOrder([]);
            setRevealed(false);
            setHits(0);
            setFinished(false);
          }}
        >
          Estudar de novo
        </button>
      </div>
    );
  }

  const ordem = q.type === "ordem" || Array.isArray(q.answer);
  const submit = () => {
    const pick = ordem ? order : choice;
    if (pick == null || (Array.isArray(pick) && pick.length !== q.options.length)) return;
    const ok = isCorrect(q, pick);
    setCorrect(ok);
    setRevealed(true);
    if (ok) setHits((n) => n + 1);
    recordAnswer(q.id, q.subject, q.module, ok);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      setFinished(true);
      onDone?.({
        perfect: hits === questions.length && questions.length >= 4,
        hits,
        total: questions.length,
      });
      return;
    }
    setIndex((n) => n + 1);
    setChoice(null);
    setOrder([]);
    setRevealed(false);
  };

  const optionState = (i: number) => {
    if (!revealed) {
      if (ordem) return order.includes(i) ? "picked" : undefined;
      return choice === i ? "picked" : undefined;
    }
    if (Array.isArray(q.answer)) {
      return q.answer[order.indexOf(i)] === i && order.includes(i) ? "right" : order.includes(i) ? "wrong" : undefined;
    }
    if (i === q.answer) return "right";
    if (i === choice) return "wrong";
    return undefined;
  };

  return (
    <div className="card space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-bold text-muted">
          Pergunta {index + 1} de {questions.length}
        </p>
        <p className="chip" data-subject={q.subject}>
          {difficulties[q.difficulty] ?? q.difficulty}
        </p>
      </div>
      {q.context ? (
        <p className="rounded-lg bg-surface-2 px-3 py-2 text-sm">{q.context}</p>
      ) : null}
      <h3 className="font-display text-xl leading-snug font-extrabold">{q.prompt}</h3>
      {ordem ? (
        <p className="text-sm text-muted">Toque na ordem pedida. Toque de novo para desfazer o último.</p>
      ) : null}
      <div className="space-y-2">
        {q.options.map((option, i) => {
          const pos = order.indexOf(i);
          return (
            <button
              key={option}
              type="button"
              className="option"
              data-state={optionState(i)}
              disabled={revealed}
              onClick={() => {
                if (ordem) {
                  setOrder((curr) =>
                    curr.includes(i) ? (curr[curr.length - 1] === i ? curr.slice(0, -1) : curr) : [...curr, i],
                  );
                } else {
                  setChoice(i);
                }
              }}
            >
              <span className="mr-2 font-display">
                {ordem && pos >= 0 ? `${pos + 1}.` : `${String.fromCharCode(65 + i)}.`}
              </span>
              {option}
            </button>
          );
        })}
      </div>
      {revealed ? (
        <div className="space-y-3">
          <p className="font-bold">{correct ? "Certo." : "Ainda não."}</p>
          <p className="text-sm leading-relaxed">{q.explanation}</p>
          {ordem && Array.isArray(q.answer) ? (
            <p className="text-sm text-muted">
              Ordem: {q.answer.map((i) => q.options[i]).join(" → ")}
            </p>
          ) : null}
          <button type="button" className="btn-primary" onClick={next}>
            {index + 1 >= questions.length ? "Ver resultado" : "Próxima"}
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="btn-primary"
          disabled={ordem ? order.length !== q.options.length : choice == null}
          onClick={submit}
        >
          Responder
        </button>
      )}
    </div>
  );
}
