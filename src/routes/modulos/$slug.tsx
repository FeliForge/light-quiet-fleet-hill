import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Quiz } from "@/components/quiz";
import { StudyWidget } from "@/components/widgets";
import {
  dailyPicks,
  moduleBySlug,
  questionsFor,
  subjects,
  type DailyPick,
} from "@/lib/caderno";
import { useProgress } from "@/lib/store";

const EMPTY_CHECKS: number[] = [];

export const Route = createFileRoute("/modulos/$slug")({
  component: ModulePage,
  head: ({ params }) => ({
    meta: [{ title: `${moduleBySlug(params.slug)?.title ?? "Módulo"} · StudySphere` }],
  }),
});

function ModulePage() {
  const { slug } = Route.useParams();
  const mod = moduleBySlug(slug);
  const read = useProgress((s) => s.read);
  const checks = useProgress((s) => s.checks[slug]);
  const checked = checks ?? EMPTY_CHECKS;
  const toggleRead = useProgress((s) => s.toggleRead);
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const addSeconds = useProgress((s) => s.addSeconds);
  const setLastSlug = useProgress((s) => s.setLastSlug);
  const notePerfect = useProgress((s) => s.notePerfect);
  const [practice, setPractice] = useState(false);
  const [daily, setDaily] = useState<DailyPick | null>(null);
  const bank = useMemo(() => (mod ? questionsFor(mod.slug) : []), [mod]);

  useEffect(() => {
    if (!mod) return;
    setLastSlug(mod.slug);
    setDaily(dailyPicks().find((p) => p.module.slug === mod.slug) ?? null);
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") addSeconds(mod.slug, 20);
    }, 20000);
    return () => window.clearInterval(id);
  }, [mod, addSeconds, setLastSlug]);

  if (!mod) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-4xl font-extrabold">Módulo não encontrado</h1>
        <Link to="/modulos" className="btn-primary">
          Voltar aos módulos
        </Link>
      </div>
    );
  }

  const content = mod.content;

  return (
    <article className="space-y-8" data-subject={mod.subject}>
      <Link to="/modulos" className="inline-flex items-center gap-2 text-sm font-bold text-muted">
        <ArrowLeft className="size-4" /> Módulos
      </Link>
      <header className="space-y-3">
        <p className="chip">{subjects[mod.subject].label}</p>
        <p className="text-sm font-bold text-muted">
          {mod.kicker} · {mod.notebook}
        </p>
        <h1 className="font-display text-4xl leading-tight font-extrabold sm:text-5xl">{mod.title}</h1>
        {daily ? (
          <p className="text-sm font-bold">
            Tema de hoje · +{daily.bonus} XP na primeira leitura, seção ou acerto do dia
            {daily.featured ? " · em destaque" : ""}
          </p>
        ) : null}
        <p className="max-w-3xl text-lg leading-relaxed">{content.intro}</p>
        <p className="text-sm text-muted">O tempo só conta com a página visível.</p>
        <button type="button" className="btn-primary" onClick={() => toggleRead(mod.slug)}>
          {read[mod.slug] ? "Lido · desmarcar" : "Marcar módulo como lido"}
        </button>
      </header>

      {content.syllabus ? (
        <section className="card">
          <h2 className="font-display text-2xl font-extrabold">No roteiro</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            {content.syllabus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="space-y-4">
        {content.sections.map((section, index) => {
          const on = checked.includes(index);
          return (
            <section key={section.title} className="card space-y-3">
              <h2 className="font-display text-2xl font-extrabold">{section.title}</h2>
              <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <button type="button" className="btn-ghost" onClick={() => toggleCheck(mod.slug, index)}>
                {on ? "Seção entendida" : "Marcar seção como entendida"}
              </button>
            </section>
          );
        })}
      </div>

      {content.formula ? (
        <section className="card">
          <h2 className="font-display text-2xl font-extrabold">{content.formula.label}</h2>
          <p className="mt-2 font-display text-2xl font-extrabold">{content.formula.expr}</p>
          <p className="mt-2 text-sm text-muted">{content.formula.note}</p>
        </section>
      ) : null}

      <StudyWidget kind={content.widget} />

      {content.contrasts ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl font-extrabold">Fala e norma</h2>
          <div className="grid gap-3">
            {content.contrasts.map((row) => (
              <div key={row.fala} className="card grid gap-2 sm:grid-cols-2">
                <p>
                  <span className="block text-xs font-bold text-muted">Fala</span>
                  {row.fala}
                </p>
                <p>
                  <span className="block text-xs font-bold text-muted">Norma</span>
                  {row.norma}
                </p>
                <p className="text-sm text-muted sm:col-span-2">{row.nota}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {content.table ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl font-extrabold">{content.table.caption}</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="bg-surface-2">
                <tr>
                  {content.table.headers.map((h) => (
                    <th key={h || "c"} className="px-3 py-2 font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.table.rows.map((row) => (
                  <tr key={row.join("|")} className="border-t border-border">
                    {row.map((cell, i) => (
                      <td key={i} className="px-3 py-2 align-top">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {content.wordBank ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl font-extrabold">Banco de palavras</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {content.wordBank.map(([term, def]) => (
              <div key={term} className="card">
                <h3 className="font-bold">{term}</h3>
                <p className="text-sm text-muted">{def}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {content.glossary ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl font-extrabold">Glossário</h2>
          <dl className="space-y-3">
            {content.glossary.map(([term, def]) => (
              <div key={term}>
                <dt className="font-bold">{term}</dt>
                <dd className="text-sm text-muted">{def}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {content.faq ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl font-extrabold">Perguntas frequentes</h2>
          {content.faq.map(([q, a]) => (
            <details key={q} className="card">
              <summary className="cursor-pointer font-bold">{q}</summary>
              <p className="mt-2 text-sm leading-relaxed">{a}</p>
            </details>
          ))}
        </section>
      ) : null}

      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-extrabold">Praticar {bank.length} perguntas</h2>
          <button type="button" className="btn-primary" onClick={() => setPractice((v) => !v)}>
            {practice ? "Fechar prática" : "Começar"}
          </button>
        </div>
        {practice ? (
          <Quiz
            questions={bank}
            onDone={({ perfect }) => {
              if (perfect) notePerfect();
            }}
          />
        ) : null}
      </section>

      {content.videos?.length ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl font-extrabold">Para ver</h2>
          {content.videos.map((video) => (
            <a key={video.url} className="cover" href={video.url} target="_blank" rel="noreferrer">
              <h3 className="font-bold">{video.title}</h3>
              <p className="text-sm text-muted">{video.source}</p>
              {video.note ? <p className="mt-2 text-sm">{video.note}</p> : null}
            </a>
          ))}
        </section>
      ) : null}

      {content.sources?.length ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl font-extrabold">Fontes</h2>
          <ul className="space-y-2 text-sm">
            {content.sources.map((source) => (
              <li key={source.url}>
                <a className="font-bold underline" href={source.url} target="_blank" rel="noreferrer">
                  {source.title}
                </a>
                <span className="text-muted"> · {source.source}</span>
                {source.note ? <span className="block text-muted">{source.note}</span> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
