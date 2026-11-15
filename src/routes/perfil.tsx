import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mascot } from "@/components/mascot";
import { ACHIEVEMENTS, subjectRead } from "@/lib/achievements";
import { SUBJECTS, subjects } from "@/lib/caderno";
import {
  ACCESSORIES,
  FACES,
  HAIRS,
  HAIR_COLORS,
  LEAGUES,
  OUTFITS,
  SKINS,
  itemUnlocked,
  leagueFor,
} from "@/lib/leagues";
import { useProgress, type Avatar } from "@/lib/store";

export const Route = createFileRoute("/perfil")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "Perfil · StudySphere" }] }),
});

function ProfilePage() {
  const name = useProgress((s) => s.name);
  const setName = useProgress((s) => s.setName);
  const avatar = useProgress((s) => s.avatar);
  const setAvatar = useProgress((s) => s.setAvatar);
  const xp = useProgress((s) => s.xp);
  const read = useProgress((s) => s.read);
  const achievements = useProgress((s) => s.achievements);
  const asked = useProgress((s) => s.asked);
  const hits = useProgress((s) => s.hits);
  const streak = useProgress((s) => s.streak);
  const bySubject = useProgress((s) => s.bySubject);
  const reset = useProgress((s) => s.reset);
  const [armed, setArmed] = useState(false);
  const league = leagueFor(xp);
  const display = name.trim() || "Estudante";

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="font-display text-5xl font-extrabold">Perfil</h1>
        <p className="max-w-xl text-muted">
          Tudo fica neste navegador. Não há conta nem cópia na nuvem. O personagem e as ligas acompanham o
          caderno.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[16rem_1fr] lg:items-center">
        <div className="card grid place-items-center">
          <Mascot avatar={visibleAvatar(avatar, xp)} className="size-52" label={display} />
          <p className="font-display text-2xl font-extrabold">{display}</p>
          <p className="text-sm font-bold text-muted">
            Liga {league.name} · {xp} XP
          </p>
        </div>
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-bold">Seu nome</span>
            <input
              className="mt-1 w-full min-h-11 rounded-lg border border-border bg-surface px-3"
              maxLength={40}
              value={name}
              placeholder="Estudante"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <div className="grid grid-cols-3 gap-3">
            <Mini label="Sequência" value={streak ? `${streak}d` : "—"} />
            <Mini label="Acertos" value={asked ? `${Math.round((hits / asked) * 100)}%` : "—"} />
            <Mini label="Conquistas" value={`${achievements.length}/${ACHIEVEMENTS.length}`} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-3xl font-extrabold">Personagem</h2>
        <Picker
          label="Pele"
          options={SKINS.map((label, id) => ({ id, label }))}
          value={avatar.skin}
          onPick={(id) => setAvatar({ skin: id })}
        />
        <Picker
          label="Cabelo"
          options={HAIRS.map((label, id) => ({ id, label }))}
          value={avatar.hair}
          onPick={(id) => setAvatar({ hair: id })}
        />
        <Picker
          label="Cor do cabelo"
          options={HAIR_COLORS.map((label, id) => ({ id, label }))}
          value={avatar.hairColor}
          onPick={(id) => setAvatar({ hairColor: id })}
        />
        <Picker
          label="Rosto"
          options={FACES.map((label, id) => ({ id, label }))}
          value={avatar.face}
          onPick={(id) => setAvatar({ face: id })}
        />
        <Picker
          label="Roupa"
          options={OUTFITS.map((item) => ({
            id: item.id,
            label: itemUnlocked(item.league, xp) ? item.name : `${item.name} · ${LEAGUES[item.league]?.name}`,
            disabled: !itemUnlocked(item.league, xp),
          }))}
          value={avatar.outfit}
          onPick={(id) => setAvatar({ outfit: id })}
        />
        <Picker
          label="Acessório"
          options={ACCESSORIES.map((item) => ({
            id: item.id,
            label: itemUnlocked(item.league, xp)
              ? item.name
              : `${item.name} · ${LEAGUES[item.league]?.name}`,
            disabled: !itemUnlocked(item.league, xp),
          }))}
          value={avatar.accessory}
          onPick={(id) => setAvatar({ accessory: id })}
        />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-3xl font-extrabold">Conquistas</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ACHIEVEMENTS.map((item) => {
            const on = achievements.includes(item.id);
            return (
              <article key={item.id} className="card" data-state={on ? "on" : "off"}>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-muted">{item.detail}</p>
                <p className="mt-2 text-sm font-bold">{on ? "Conquistada" : "Bloqueada"}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-3xl font-extrabold">Por matéria</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {SUBJECTS.map((id) => {
            const progress = subjectRead(read, id);
            const stat = bySubject[id];
            return (
              <article key={id} className="cover" data-subject={id}>
                <h3 className="font-display text-2xl font-extrabold">{subjects[id].label}</h3>
                <p className="text-sm font-bold">
                  {progress.n} de {progress.total} módulos lidos
                </p>
                <p className="text-sm text-muted">
                  {stat.asked ? `${stat.hits} acertos em ${stat.asked}` : "Sem respostas ainda"}
                </p>
                <div className="subject-bar mt-3">
                  <span
                    style={{
                      width: `${progress.total ? Math.round((progress.n / progress.total) * 100) : 0}%`,
                    }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="card space-y-3">
        <h2 className="font-display text-2xl font-extrabold">Apagar progresso</h2>
        <p className="text-sm text-muted">
          Remove nome, leituras, tempo, respostas, pontos, ligas, conquistas e o personagem deste
          navegador. O modo claro ou escuro fica.
        </p>
        {armed ? (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                reset();
                setArmed(false);
              }}
            >
              Confirmar exclusão
            </button>
            <button type="button" className="btn-ghost" onClick={() => setArmed(false)}>
              Cancelar
            </button>
          </div>
        ) : (
          <button type="button" className="btn-ghost" onClick={() => setArmed(true)}>
            Apagar progresso
          </button>
        )}
      </section>
    </div>
  );
}

function visibleAvatar(avatar: Avatar, xp: number): Avatar {
  return {
    ...avatar,
    outfit: itemUnlocked(OUTFITS.find((o) => o.id === avatar.outfit)?.league ?? 0, xp) ? avatar.outfit : 0,
    accessory: itemUnlocked(ACCESSORIES.find((a) => a.id === avatar.accessory)?.league ?? 0, xp)
      ? avatar.accessory
      : 0,
  };
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <p className="font-display text-2xl font-extrabold">{value}</p>
      <p className="text-xs font-semibold text-muted">{label}</p>
    </div>
  );
}

function Picker({
  label,
  options,
  value,
  onPick,
}: {
  label: string;
  options: { id: number; label: string; disabled?: boolean }[];
  value: number;
  onPick: (id: number) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-bold">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className="pick"
            aria-pressed={value === option.id}
            disabled={option.disabled}
            onClick={() => onPick(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
