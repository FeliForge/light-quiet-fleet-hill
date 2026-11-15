import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { BASE_SKIN, LEAGUES, leagueFor, skinUnlocked } from "@/lib/leagues";
import { useProgress } from "@/lib/store";

export const Route = createFileRoute("/ligas")({
  component: LeaguesPage,
  head: () => ({ meta: [{ title: "Ligas · StudySphere" }] }),
});

const THEMES = [
  { id: BASE_SKIN, name: "Caderno", blurb: "O azul original do StudySphere. Sempre disponível.", min: 0 },
  ...LEAGUES.map((l) => ({ id: l.id, name: l.theme, blurb: l.blurb, min: l.min, league: l.name, reward: l.reward })),
];

function LeaguesPage() {
  const xp = useProgress((s) => s.xp);
  const skinId = useProgress((s) => s.skinId);
  const equipSkin = useProgress((s) => s.equipSkin);
  const current = leagueFor(xp);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-5xl font-extrabold">Ligas</h1>
        <p className="max-w-xl text-muted">
          Dez ligas, de Bronze a Cromático. O XP vem do caderno e, todo dia, dos temas em destaque. Cada
          liga abre um tema visual e uma peça do personagem.
        </p>
      </header>
      <section className="card" data-skin={current.id === "bronze" ? "bronze" : undefined}>
        <p className="text-sm font-bold text-muted">Você está em</p>
        <h2 className="font-display text-4xl font-extrabold">{current.name}</h2>
        <p className="text-sm">{xp} XP no total</p>
      </section>
      <ol className="grid gap-4">
        {LEAGUES.map((league, index) => {
          const unlocked = xp >= league.min;
          const active = current.id === league.id;
          const ahead = LEAGUES[index + 1];
          return (
            <li key={league.id} className="card space-y-3" data-skin={league.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-muted">
                    Liga {index + 1} de {LEAGUES.length}
                    {active ? " · atual" : ""}
                  </p>
                  <h3 className="font-display text-3xl font-extrabold">{league.name}</h3>
                </div>
                {unlocked ? null : <Lock className="size-5" aria-label="Bloqueada" />}
              </div>
              <p>{league.blurb}</p>
              <p className="text-sm font-semibold">
                Tema {league.theme} · peça: {league.reward}
              </p>
              <p className="text-sm text-muted">
                {unlocked
                  ? ahead
                    ? `Aberta desde ${league.min} XP`
                    : "Liga máxima"
                  : `Faltam ${league.min - xp} XP`}
              </p>
              <div className="subject-bar">
                <span
                  style={{
                    width: unlocked
                      ? "100%"
                      : `${Math.max(4, Math.round((xp / league.min) * 100))}%`,
                  }}
                />
              </div>
            </li>
          );
        })}
      </ol>
      <section className="space-y-3">
        <h2 className="font-display text-3xl font-extrabold">Temas do caderno</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {THEMES.map((theme) => {
            const open = skinUnlocked(theme.id, xp);
            const equipped = skinId === theme.id || (!open && skinId === theme.id);
            const using = skinId === theme.id;
            return (
              <div key={theme.id} className="card space-y-2" data-skin={theme.id === BASE_SKIN ? undefined : theme.id}>
                <h3 className="font-display text-2xl font-extrabold">{theme.name}</h3>
                <p className="text-sm">{theme.blurb}</p>
                {"league" in theme ? (
                  <p className="text-sm text-muted">Entra com a liga {theme.league}.</p>
                ) : null}
                <button
                  type="button"
                  className="btn-primary"
                  disabled={!open || using}
                  onClick={() => equipSkin(theme.id)}
                >
                  {!open ? `Bloqueado · ${theme.min} XP` : using ? "Em uso" : "Usar este tema"}
                </button>
                {equipped ? null : null}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
