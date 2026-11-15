import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { SUBJECTS, modules, questionsFor, subjects, type SubjectId } from "@/lib/caderno";
import { subjectRead } from "@/lib/achievements";
import { useProgress } from "@/lib/store";

const searchSchema = z.object({
  materia: z.enum(["geografia", "historia", "portugues", "ciencias", "matematica"]).optional(),
});

export const Route = createFileRoute("/modulos/")({
  validateSearch: searchSchema,
  component: ModulesPage,
  head: () => ({ meta: [{ title: "Módulos · StudySphere" }] }),
});

function ModulesPage() {
  const { materia } = Route.useSearch();
  const read = useProgress((s) => s.read);
  const visible = materia ? SUBJECTS.filter((id) => id === materia) : SUBJECTS;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-5xl font-extrabold">Módulos</h1>
        <p className="max-w-xl text-muted">
          {modules.length} módulos em cinco matérias. Marque cada um como lido para acompanhar o caderno.
        </p>
      </header>
      <div className="flex flex-wrap gap-2">
        <Link to="/modulos" className="pick" aria-pressed={!materia}>
          Todas
        </Link>
        {SUBJECTS.map((id) => (
          <Link
            key={id}
            to="/modulos"
            search={{ materia: id }}
            className="pick"
            aria-pressed={materia === id}
          >
            {subjects[id].label}
          </Link>
        ))}
      </div>
      {visible.map((id) => (
        <SubjectBlock key={id} id={id} read={read} />
      ))}
    </div>
  );
}

function SubjectBlock({ id, read }: { id: SubjectId; read: Record<string, string> }) {
  const { n, total } = subjectRead(read, id);
  const mine = modules.filter((m) => m.subject === id);
  return (
    <section className="space-y-3" data-subject={id}>
      <div>
        <h2 className="font-display text-3xl font-extrabold">{subjects[id].label}</h2>
        <p className="text-sm text-muted">
          {n} de {total} lidos · {subjects[id].blurb}
        </p>
      </div>
      <div className="grid gap-3">
        {mine.map((m) => (
          <Link key={m.slug} to="/modulos/$slug" params={{ slug: m.slug }} className="cover" data-subject={id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-muted">
                  {m.kicker} · {m.notebook}
                </p>
                <h3 className="font-display text-xl font-extrabold">{m.title}</h3>
              </div>
              <span className="cover-num text-4xl">{m.number}</span>
            </div>
            <p className="mt-2 text-sm text-muted">
              {questionsFor(m.slug).length} perguntas · {read[m.slug] ? "Lido" : "Ainda não lido"}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
