import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as subjectRead, D as ymd, E as useProgress, b as questions, d as WEEKDAYS, f as dailyPicks, u as SUBJECTS, v as modules, w as subjects } from "./store-BvdMBeBU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-V8gWagCG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const read = useProgress((s) => s.read);
	const hits = useProgress((s) => s.hits);
	const asked = useProgress((s) => s.asked);
	const dailySeconds = useProgress((s) => s.dailySeconds);
	const lastSlug = useProgress((s) => s.lastSlug);
	const streak = useProgress((s) => s.streak);
	const [picks, setPicks] = (0, import_react.useState)(null);
	const [days, setDays] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setPicks(dailyPicks());
		const today = /* @__PURE__ */ new Date();
		const next = [];
		for (let i = 6; i >= 0; i--) {
			const d = new Date(today);
			d.setDate(today.getDate() - i);
			const key = ymd(d);
			next.push({
				label: WEEKDAYS[d.getDay()] ?? "",
				minutes: Math.round((dailySeconds[key] ?? 0) / 60)
			});
		}
		setDays(next);
	}, [dailySeconds]);
	const continueMod = lastSlug && modules.find((m) => m.slug === lastSlug && !read[m.slug]) || modules.find((m) => m.fresh && !read[m.slug]) || modules.find((m) => !read[m.slug]) || modules[0];
	const weekMinutes = days?.reduce((n, d) => n + d.minutes, 0) ?? 0;
	const maxMin = Math.max(1, ...days?.map((d) => d.minutes) ?? [1]);
	const accuracy = asked ? `${Math.round(hits / asked * 100)}%` : "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "max-w-3xl font-display text-5xl leading-[0.95] font-extrabold sm:text-6xl",
					children: "Estude o caderno inteiro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xl text-lg text-muted",
					children: "Prova bimestral de Geografia, História, Português, Ciências e Matemática. Cada matéria tem a sua cor de marca-texto. Os temas do dia valem XP de liga."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"data-subject": continueMod.subject,
				className: "relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-[var(--s-soft)] p-6 sm:flex-row sm:items-center sm:justify-between",
				style: { boxShadow: "4px 4px 0 var(--s)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "cover-num text-6xl sm:text-7xl",
						children: continueMod.number
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "chip",
							children: subjects[continueMod.subject].label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl leading-tight font-extrabold",
							children: continueMod.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [streak > 1 ? `Sequência de ${streak} dias. ` : "", "Continue de onde parou"]
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "btn-primary shrink-0",
					to: "/modulos/$slug",
					params: { slug: continueMod.slug },
					children: "Abrir módulo"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface lg:grid-cols-4 lg:divide-y-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: `${Object.keys(read).length}/${modules.length}`,
						label: "Módulos lidos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: accuracy,
						label: "Acertos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: String(weekMinutes),
						label: "Minutos na semana"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: String(asked),
						label: "Perguntas feitas"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-extrabold",
					children: "Temas de hoje"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Estudar estes módulos — lendo uma seção, marcando como lido ou acertando uma pergunta — soma o bônus de liga uma vez por dia."
				})] }), picks ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-3",
					children: picks.map((pick) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/modulos/$slug",
						params: { slug: pick.module.slug },
						className: "cover",
						"data-subject": pick.module.subject,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "chip",
									children: subjects[pick.module.subject].label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-extrabold",
									children: [
										"+",
										pick.bonus,
										" XP"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-display text-xl font-extrabold",
								children: pick.module.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [pick.featured ? "Em destaque" : "Tema do dia", read[pick.module.slug] ? " · já lido" : ""]
							})
						]
					}, pick.module.slug))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Separando os temas de hoje…"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-extrabold",
					children: "Por matéria"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: SUBJECTS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectCard, {
						id,
						read
					}, id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-extrabold",
					children: "Novos neste caderno"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: modules.filter((m) => m.fresh).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/modulos/$slug",
						params: { slug: m.slug },
						className: "cover",
						"data-subject": m.subject,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "cover-num text-4xl",
									children: m.number
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "chip",
									children: subjects[m.subject].label
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-lg leading-snug font-bold",
								children: m.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: read[m.slug] ? "Lido" : "Ainda não lido"
							})
						]
					}, m.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-extrabold",
					children: "Minutos de estudo nos últimos 7 dias"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-7 gap-2",
					children: (days ?? WEEKDAYS.slice(1).concat(WEEKDAYS[0]).map((label) => ({
						label,
						minutes: 0
					}))).map((day, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-28 w-full items-end rounded-lg bg-surface-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full rounded-lg bg-primary",
									style: { height: `${Math.round(day.minutes / maxMin * 100)}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-muted",
								children: day.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold",
								children: day.minutes
							})
						]
					}, `${day.label}-${i}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [questions.length, " perguntas no caderno. No desafio, até dez por rodada, sem repetir dentro da sessão."]
			})
		]
	});
}
function Stat({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-4xl font-extrabold tracking-tight",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: label
		})]
	});
}
function SubjectCard({ id, read }) {
	const { n, total } = subjectRead(read, id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/modulos",
		search: { materia: id },
		className: "cover",
		"data-subject": id,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl font-extrabold",
				children: subjects[id].label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: subjects[id].blurb
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm font-bold",
				children: [
					n,
					" de ",
					total,
					" lidos"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "subject-bar mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${total ? Math.round(n / total * 100) : 0}%` } })
			})
		]
	});
}
//#endregion
export { Home as component };
