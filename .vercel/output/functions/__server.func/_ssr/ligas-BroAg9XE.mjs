import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as useProgress, S as skinUnlocked, g as leagueFor, r as BASE_SKIN, s as LEAGUES } from "./store-BvdMBeBU.mjs";
import { l as Lock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ligas-BroAg9XE.js
var import_jsx_runtime = require_jsx_runtime();
var THEMES = [{
	id: BASE_SKIN,
	name: "Caderno",
	blurb: "O azul original do StudySphere. Sempre disponível.",
	min: 0
}, ...LEAGUES.map((l) => ({
	id: l.id,
	name: l.theme,
	blurb: l.blurb,
	min: l.min,
	league: l.name,
	reward: l.reward
}))];
function LeaguesPage() {
	const xp = useProgress((s) => s.xp);
	const skinId = useProgress((s) => s.skinId);
	const equipSkin = useProgress((s) => s.equipSkin);
	const current = leagueFor(xp);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-5xl font-extrabold",
					children: "Ligas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xl text-muted",
					children: "Dez ligas, de Bronze a Cromático. O XP vem do caderno e, todo dia, dos temas em destaque. Cada liga abre um tema visual e uma peça do personagem."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				"data-skin": current.id === "bronze" ? "bronze" : void 0,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold text-muted",
						children: "Você está em"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl font-extrabold",
						children: current.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [xp, " XP no total"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-4",
				children: LEAGUES.map((league, index) => {
					const unlocked = xp >= league.min;
					const active = current.id === league.id;
					const ahead = LEAGUES[index + 1];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card space-y-3",
						"data-skin": league.id,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-bold text-muted",
									children: [
										"Liga ",
										index + 1,
										" de ",
										LEAGUES.length,
										active ? " · atual" : ""
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-3xl font-extrabold",
									children: league.name
								})] }), unlocked ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
									className: "size-5",
									"aria-label": "Bloqueada"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: league.blurb }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-semibold",
								children: [
									"Tema ",
									league.theme,
									" · peça: ",
									league.reward
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: unlocked ? ahead ? `Aberta desde ${league.min} XP` : "Liga máxima" : `Faltam ${league.min - xp} XP`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "subject-bar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: unlocked ? "100%" : `${Math.max(4, Math.round(xp / league.min * 100))}%` } })
							})
						]
					}, league.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-extrabold",
					children: "Temas do caderno"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: THEMES.map((theme) => {
						const open = skinUnlocked(theme.id, xp);
						const equipped = skinId === theme.id || !open && skinId === theme.id;
						const using = skinId === theme.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card space-y-2",
							"data-skin": theme.id === "caderno" ? void 0 : theme.id,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl font-extrabold",
									children: theme.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: theme.blurb
								}),
								"league" in theme ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										"Entra com a liga ",
										theme.league,
										"."
									]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn-primary",
									disabled: !open || using,
									onClick: () => equipSkin(theme.id),
									children: !open ? `Bloqueado · ${theme.min} XP` : using ? "Em uso" : "Usar este tema"
								}),
								equipped ? null : null
							]
						}, theme.id);
					})
				})]
			})
		]
	});
}
//#endregion
export { LeaguesPage as component };
