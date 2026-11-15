import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  WEEKDAYS,
  dailyPicks,
  modules,
  questions,
  subjects,
  ymd,
  type DailyPick,
  type SubjectId,
} from "@/lib/caderno";
import { SUBJECTS } from "@/lib/caderno";
import { subjectRead } from "@/lib/achievements";
import { useProgress } from "@/lib/store";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({ meta: [{ title: "StudySphere" }] }),
});

function Home() {
  const read = useProgress((s) => s.read);
  const hits = useProgress((s) => s.hits);
  const asked = useProgress((s) => s.asked);
  const dailySeconds = useProgress((s) => s.dailySeconds);
  const lastSlug = useProgress((s) => s.lastSlug);
  const streak = useProgress((s) => s.streak);
  const [picks, setPicks] = useState<DailyPick[] | null>(null);
  const [days, setDays] = useState<{ label: string; minutes: number }[] | null>(null);

  useEffect(() => {
    setPicks(dailyPicks());
    const today = new Date();
    const next = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = ymd(d);
      next.push({
        label: WEEKDAYS[d.getDay()] ?? "",
        minutes: Math.round((dailySeconds[key] ?? 0) / 60),
      });
    }
    setDays(next);
  }, [dailySeconds]);

  const continueMod =
    (lastSlug && modules.find((m) => m.slug === lastSlug && !read[m.slug])) ||
    modules.find((m) => m.fresh && !read[m.slug]) ||
    modules.find((m) => !read[m.slug]) ||
    modules[0]!;
  const weekMinutes = days?.reduce((n, d) => n + d.minutes, 0) ?? 0;
  const maxMin = Math.max(1, ...(days?.map((d) => d.minutes) ?? [1]));
  const accuracy = asked ? `${Math.round((hits / asked) * 100)}%` : "—";

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="max-w-3xl font-display text-5xl leading-[0.95] font-extrabold sm:text-6xl">
          Estude o caderno inteiro
        </h1>
        <p className="max-w-xl text-lg text-muted">
          Prova bimestral de Geografia, História, Português, Ciências e Matemática. Cada matéria tem a
          sua cor de marca-texto. Os temas do dia valem XP de liga.
        </p>
      </header>

      <section
        data-subject={continueMod.subject}
        className="relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-[var(--s-soft)] p-6 sm:flex-row sm:items-center sm:justify-between"
        style={{ boxShadow: "4px 4px 0 var(--s)" }}
      >
        <div className="flex items-center gap-5">
          <span className="cover-num text-6xl sm:text-7xl">{continueMod.number}</span>
          <div>
            <p className="chip">{subjects[continueMod.subject].label}</p>
            <h2 className="mt-2 font-display text-2xl leading-tight font-extrabold">{continueMod.title}</h2>
            <p className="text-sm text-muted">
              {streak > 1 ? `Sequência de ${streak} dias. ` : ""}Continue de onde parou
            </p>
          </div>
        </div>
        <Link className="btn-primary shrink-0" to="/modulos/$slug" params={{ slug: continueMod.slug }}>
          Abrir módulo
        </Link>
      </section>

      <section className="grid grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface lg:grid-cols-4 lg:divide-y-0">
        <Stat value={`${Object.keys(read).length}/${modules.length}`} label="Módulos lidos" />
        <Stat value={accuracy} label="Acertos" />
        <Stat value={String(weekMinutes)} label="Minutos na semana" />
        <Stat value={String(asked)} label="Perguntas feitas" />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="font-display text-3xl font-extrabold">Temas de hoje</h2>
          <p className="text-sm text-muted">
            Estudar estes módulos — lendo uma seção, marcando como lido ou acertando uma pergunta — soma o
            bônus de liga uma vez por dia.
          </p>
        </div>
        {picks ? (
          <div className="grid gap-4 md:grid-cols-3">
            {picks.map((pick) => (
              <Link
                key={pick.module.slug}
                to="/modulos/$slug"
                params={{ slug: pick.module.slug }}
                className="cover"
                data-subject={pick.module.subject}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="chip">{subjects[pick.module.subject].label}</span>
                  <span className="text-sm font-extrabold">+{pick.bonus} XP</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-extrabold">{pick.module.title}</h3>
                <p className="text-sm text-muted">
                  {pick.featured ? "Em destaque" : "Tema do dia"}
                  {read[pick.module.slug] ? " · já lido" : ""}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">Separando os temas de hoje…</p>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-3xl font-extrabold">Por matéria</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {SUBJECTS.map((id) => (
            <SubjectCard key={id} id={id} read={read} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-3xl font-extrabold">Novos neste caderno</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {modules
            .filter((m) => m.fresh)
            .map((m) => (
              <Link key={m.slug} to="/modulos/$slug" params={{ slug: m.slug }} className="cover" data-subject={m.subject}>
                <div className="flex items-center justify-between gap-3">
                  <span className="cover-num text-4xl">{m.number}</span>
                  <span className="chip">{subjects[m.subject].label}</span>
                </div>
                <h3 className="mt-2 text-lg leading-snug font-bold">{m.title}</h3>
                <p className="text-sm text-muted">{read[m.slug] ? "Lido" : "Ainda não lido"}</p>
              </Link>
            ))}
        </div>
      </section>

      <section className="card">
        <h2 className="font-display text-2xl font-extrabold">Minutos de estudo nos últimos 7 dias</h2>
        <div className="mt-4 grid grid-cols-7 gap-2">
          {(days ?? WEEKDAYS.slice(1).concat(WEEKDAYS[0]!).map((label) => ({ label, minutes: 0 }))).map(
            (day, i) => (
              <div key={`${day.label}-${i}`} className="flex flex-col items-center gap-1.5">
                <div className="flex h-28 w-full items-end rounded-lg bg-surface-2">
                  <div
                    className="w-full rounded-lg bg-primary"
                    style={{ height: `${Math.round((day.minutes / maxMin) * 100)}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-muted">{day.label}</span>
                <span className="text-xs font-bold">{day.minutes}</span>
              </div>
            ),
          )}
        </div>
      </section>
      <p className="text-sm text-muted">
        {questions.length} perguntas no caderno. No desafio, até dez por rodada, sem repetir dentro da sessão.
      </p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-5">
      <p className="font-display text-4xl font-extrabold tracking-tight">{value}</p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

function SubjectCard({ id, read }: { id: SubjectId; read: Record<string, string> }) {
  const { n, total } = subjectRead(read, id);
  return (
    <Link to="/modulos" search={{ materia: id }} className="cover" data-subject={id}>
      <h3 className="font-display text-2xl font-extrabold">{subjects[id].label}</h3>
      <p className="text-sm text-muted">{subjects[id].blurb}</p>
      <p className="mt-4 text-sm font-bold">
        {n} de {total} lidos
      </p>
      <div className="subject-bar mt-2">
        <span style={{ width: `${total ? Math.round((n / total) * 100) : 0}%` }} />
      </div>
    </Link>
  );
}
