import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, House, Menu, Moon, Sun, Target, Trophy, UserRound, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Mascot } from "@/components/mascot";
import { modules } from "@/lib/caderno";
import { ACCESSORIES, LEAGUES, leagueFor, nextLeague, OUTFITS, skinUnlocked } from "@/lib/leagues";
import { useHydratedProgress, useProgress, type Avatar } from "@/lib/store";

const NAV = [
  { to: "/", label: "Início", icon: House },
  { to: "/modulos", label: "Módulos", icon: BookOpen },
  { to: "/desafio", label: "Desafio", icon: Target },
  { to: "/ligas", label: "Ligas", icon: Trophy },
  { to: "/perfil", label: "Perfil", icon: UserRound },
] as const;

function safeAvatar(avatar: Avatar, xp: number): Avatar {
  const outfitOk = OUTFITS.some(
    (item) => item.id === avatar.outfit && xp >= (LEAGUES[item.league]?.min ?? 0),
  );
  const accessoryOk = ACCESSORIES.some(
    (item) => item.id === avatar.accessory && xp >= (LEAGUES[item.league]?.min ?? 0),
  );
  return {
    ...avatar,
    outfit: outfitOk ? avatar.outfit : 0,
    accessory: accessoryOk ? avatar.accessory : 0,
  };
}

export function Shell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const hydrated = useHydratedProgress();
  const name = useProgress((s) => s.name);
  const mode = useProgress((s) => s.mode);
  const skinId = useProgress((s) => s.skinId);
  const xp = useProgress((s) => s.xp);
  const read = useProgress((s) => s.read);
  const avatar = useProgress((s) => s.avatar);
  const toggleMode = useProgress((s) => s.toggleMode);
  const notice = useProgress((s) => s.notice);
  const banner = useProgress((s) => s.banner);
  const dismissNotice = useProgress((s) => s.dismissNotice);
  const dismissBanner = useProgress((s) => s.dismissBanner);
  const equipSkin = useProgress((s) => s.equipSkin);
  const league = leagueFor(xp);
  const upcoming = nextLeague(xp);
  const span = upcoming ? upcoming.min - league.min : 1;
  const into = upcoming ? xp - league.min : 1;
  const pct = Math.max(0, Math.min(100, Math.round((into / span) * 100)));
  const shownSkin = hydrated && skinUnlocked(skinId, xp) ? skinId : "caderno";
  const displayName = name.trim() || "Estudante";
  const readCount = Object.keys(read).length;

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.dataset.theme = mode;
    document.documentElement.dataset.skin = shownSkin;
  }, [hydrated, mode, shownSkin]);

  useEffect(() => {
    if (!notice) return;
    const id = window.setTimeout(() => dismissNotice(), 2800);
    return () => window.clearTimeout(id);
  }, [notice, dismissNotice]);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <div className="min-h-screen text-fg">
      <div className="fixed inset-x-0 top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-surface px-4 lg:hidden">
        <button type="button" className="btn-icon" aria-label="Abrir menu" onClick={() => setOpen(true)}>
          <Menu className="size-5" />
        </button>
        <Link to="/" className="font-display text-lg font-semibold tracking-tight">
          StudySphere
        </Link>
      </div>
      {open ? (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-scrim lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface px-3 py-5 transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-6 flex items-center justify-between px-2">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
            <span className="grid size-9 -rotate-6 place-items-center rounded-lg bg-primary font-display text-lg font-extrabold text-on-primary">
              S
            </span>
            StudySphere
          </Link>
          <button type="button" className="btn-icon lg:hidden" aria-label="Fechar" onClick={() => setOpen(false)}>
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => {
            const active = item.to === "/" ? path === "/" : path === item.to || path.startsWith(`${item.to}/`);
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className="nav-link" data-active={active ? "true" : "false"}>
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto space-y-3 px-2">
          <Link to="/perfil" className="flex items-center gap-3 rounded-xl border border-border p-2">
            <Mascot avatar={safeAvatar(avatar, xp)} className="size-14 shrink-0" label={displayName} />
            <span>
              <span className="block text-sm font-bold">{displayName}</span>
              <span className="block text-xs font-semibold text-muted">{league.name}</span>
            </span>
          </Link>
          <div>
            <p className="text-sm font-semibold">
              {readCount} de {modules.length} módulos lidos
            </p>
            <div className="subject-bar mt-2" data-subject="portugues">
              <span style={{ width: `${Math.round((readCount / modules.length) * 100)}%` }} />
            </div>
          </div>
          <button type="button" className="btn-ghost w-full justify-start" onClick={() => toggleMode()}>
            {mode === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            {mode === "dark" ? "Tema claro" : "Tema escuro"}
          </button>
        </div>
      </aside>
      <main className="mx-auto min-h-screen w-full max-w-5xl px-4 pt-20 pb-28 lg:pl-72 lg:pt-10">
        {children}
        <div className="mt-8">
          <Link to="/ligas" className="card flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-muted">Liga {league.name}</p>
              <p className="font-display text-2xl font-extrabold">{xp} XP</p>
              <p className="text-sm text-muted">
                {upcoming ? `Faltam ${upcoming.min - xp} XP para ${upcoming.name}` : "Liga máxima"}
              </p>
            </div>
            <div className="chroma-bar h-2 w-28 overflow-hidden rounded-full bg-surface-2">
              <span className="block h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
            </div>
          </Link>
        </div>
      </main>
      {notice ? (
        <p
          role="status"
          className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-fg px-4 py-2 text-sm font-bold text-bg shadow-lg"
        >
          {notice.text}
        </p>
      ) : null}
      {banner ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-scrim p-4" role="dialog" aria-modal="true">
          <div className="card w-full max-w-md space-y-3">
            <p className="text-sm font-bold text-muted">Nova liga</p>
            <h2 className="font-display text-4xl font-extrabold">{leagueFor(xp).name}</h2>
            <p>{banner.text}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  equipSkin(banner.leagueId);
                  dismissBanner();
                }}
              >
                Usar tema {leagueFor(xp).theme}
              </button>
              <button type="button" className="btn-ghost" onClick={() => dismissBanner()}>
                Agora não
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
