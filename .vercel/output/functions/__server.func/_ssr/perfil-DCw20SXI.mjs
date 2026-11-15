import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as subjectRead, E as useProgress, a as HAIRS, c as OUTFITS, g as leagueFor, h as itemUnlocked, i as FACES, l as SKINS, n as ACHIEVEMENTS, o as HAIR_COLORS, s as LEAGUES, t as ACCESSORIES, u as SUBJECTS, w as subjects } from "./store-BvdMBeBU.mjs";
import { i as Mascot } from "./router-D4n5rGj1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/perfil-DCw20SXI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	const [armed, setArmed] = (0, import_react.useState)(false);
	const league = leagueFor(xp);
	const display = name.trim() || "Estudante";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-5xl font-extrabold",
					children: "Perfil"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xl text-muted",
					children: "Tudo fica neste navegador. Não há conta nem cópia na nuvem. O personagem e as ligas acompanham o caderno."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-6 lg:grid-cols-[16rem_1fr] lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card grid place-items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mascot, {
							avatar: visibleAvatar(avatar, xp),
							className: "size-52",
							label: display
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl font-extrabold",
							children: display
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-bold text-muted",
							children: [
								"Liga ",
								league.name,
								" · ",
								xp,
								" XP"
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-bold",
							children: "Seu nome"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "mt-1 w-full min-h-11 rounded-lg border border-border bg-surface px-3",
							maxLength: 40,
							value: name,
							placeholder: "Estudante",
							onChange: (e) => setName(e.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
								label: "Sequência",
								value: streak ? `${streak}d` : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
								label: "Acertos",
								value: asked ? `${Math.round(hits / asked * 100)}%` : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
								label: "Conquistas",
								value: `${achievements.length}/${ACHIEVEMENTS.length}`
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-extrabold",
						children: "Personagem"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Picker, {
						label: "Pele",
						options: SKINS.map((label, id) => ({
							id,
							label
						})),
						value: avatar.skin,
						onPick: (id) => setAvatar({ skin: id })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Picker, {
						label: "Cabelo",
						options: HAIRS.map((label, id) => ({
							id,
							label
						})),
						value: avatar.hair,
						onPick: (id) => setAvatar({ hair: id })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Picker, {
						label: "Cor do cabelo",
						options: HAIR_COLORS.map((label, id) => ({
							id,
							label
						})),
						value: avatar.hairColor,
						onPick: (id) => setAvatar({ hairColor: id })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Picker, {
						label: "Rosto",
						options: FACES.map((label, id) => ({
							id,
							label
						})),
						value: avatar.face,
						onPick: (id) => setAvatar({ face: id })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Picker, {
						label: "Roupa",
						options: OUTFITS.map((item) => ({
							id: item.id,
							label: itemUnlocked(item.league, xp) ? item.name : `${item.name} · ${LEAGUES[item.league]?.name}`,
							disabled: !itemUnlocked(item.league, xp)
						})),
						value: avatar.outfit,
						onPick: (id) => setAvatar({ outfit: id })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Picker, {
						label: "Acessório",
						options: ACCESSORIES.map((item) => ({
							id: item.id,
							label: itemUnlocked(item.league, xp) ? item.name : `${item.name} · ${LEAGUES[item.league]?.name}`,
							disabled: !itemUnlocked(item.league, xp)
						})),
						value: avatar.accessory,
						onPick: (id) => setAvatar({ accessory: id })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-extrabold",
					children: "Conquistas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: ACHIEVEMENTS.map((item) => {
						const on = achievements.includes(item.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "card",
							"data-state": on ? "on" : "off",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: item.detail
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm font-bold",
									children: on ? "Conquistada" : "Bloqueada"
								})
							]
						}, item.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-extrabold",
					children: "Por matéria"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: SUBJECTS.map((id) => {
						const progress = subjectRead(read, id);
						const stat = bySubject[id];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "cover",
							"data-subject": id,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl font-extrabold",
									children: subjects[id].label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-bold",
									children: [
										progress.n,
										" de ",
										progress.total,
										" módulos lidos"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: stat.asked ? `${stat.hits} acertos em ${stat.asked}` : "Sem respostas ainda"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "subject-bar mt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${progress.total ? Math.round(progress.n / progress.total * 100) : 0}%` } })
								})
							]
						}, id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-extrabold",
						children: "Apagar progresso"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Remove nome, leituras, tempo, respostas, pontos, ligas, conquistas e o personagem deste navegador. O modo claro ou escuro fica."
					}),
					armed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-primary",
							onClick: () => {
								reset();
								setArmed(false);
							},
							children: "Confirmar exclusão"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-ghost",
							onClick: () => setArmed(false),
							children: "Cancelar"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-ghost",
						onClick: () => setArmed(true),
						children: "Apagar progresso"
					})
				]
			})
		]
	});
}
function visibleAvatar(avatar, xp) {
	return {
		...avatar,
		outfit: itemUnlocked(OUTFITS.find((o) => o.id === avatar.outfit)?.league ?? 0, xp) ? avatar.outfit : 0,
		accessory: itemUnlocked(ACCESSORIES.find((a) => a.id === avatar.accessory)?.league ?? 0, xp) ? avatar.accessory : 0
	};
}
function Mini({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl font-extrabold",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold text-muted",
			children: label
		})]
	});
}
function Picker({ label, options, value, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
		className: "mb-2 text-sm font-bold",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "pick",
			"aria-pressed": value === option.id,
			disabled: option.disabled,
			onClick: () => onPick(option.id),
			children: option.label
		}, option.id))
	})] });
}
//#endregion
export { ProfilePage as component };
