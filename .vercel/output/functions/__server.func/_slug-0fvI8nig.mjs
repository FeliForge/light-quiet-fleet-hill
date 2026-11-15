import { i as __toESM } from "./_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { E as useProgress, _ as moduleBySlug, f as dailyPicks, w as subjects, x as questionsFor } from "./_ssr/store-BvdMBeBU.mjs";
import { f as ArrowLeft } from "./_libs/lucide-react.mjs";
import { n as Route } from "./_ssr/router-D4n5rGj1.mjs";
import { t as Quiz } from "./_ssr/quiz-DsPUuTAc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-0fvI8nig.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GENO = [
	"FF",
	"Ff",
	"ff"
];
var LABELS = {
	FF: "Sem o alelo",
	Ff: "Portador",
	ff: "Afetado"
};
function child(a, b) {
	const joined = [a, b].sort().join("");
	const genotype = joined === "fF" ? "Ff" : joined;
	return {
		genotype,
		label: LABELS[genotype] ?? genotype
	};
}
function Punnett() {
	const [left, setLeft] = (0, import_react.useState)("Ff");
	const [right, setRight] = (0, import_react.useState)("Ff");
	const flat = (0, import_react.useMemo)(() => {
		const a = [left[0], left[1]];
		const b = [right[0], right[1]];
		return a.map((x) => b.map((y) => child(x, y)));
	}, [left, right]).flat();
	const affected = flat.filter((c) => c.genotype === "ff").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl font-extrabold",
				children: "Quadro de Punnett"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Escolha os genótipos dos pais. ff é a pessoa afetada numa doença recessiva."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-3",
				children: [[
					"Mãe / pai A",
					left,
					setLeft
				], [
					"Mãe / pai B",
					right,
					setRight
				]].map(([label, value, set]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold",
					children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "mt-1 block min-h-11 rounded-lg border border-border bg-surface px-3",
						value,
						onChange: (e) => set(e.target.value),
						children: GENO.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: g,
							children: g
						}, g))
					})]
				}, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid max-w-xs grid-cols-2 gap-2",
				children: flat.map((cell, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-surface-2 px-3 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-extrabold",
						children: cell.genotype
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: cell.label
					})]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm font-semibold",
				children: [affected, " de 4 com a condição manifesta."]
			})
		]
	});
}
function LightWidget() {
	const [km, setKm] = (0, import_react.useState)("150000000");
	const n = Number(km.replace(",", "."));
	const seconds = Number.isFinite(n) && n > 0 ? n / 3e5 : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl font-extrabold",
				children: "Quanto tempo a luz leva"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Velocidade usada na prova: 300.000 km/s. Δt = distância ÷ velocidade."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm font-semibold",
				children: ["Distância em km", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					inputMode: "decimal",
					className: "mt-1 w-full min-h-11 rounded-lg border border-border bg-surface px-3",
					value: km,
					onChange: (e) => setKm(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl font-extrabold",
				children: seconds == null ? "—" : seconds >= 60 ? `${(seconds / 60).toFixed(1)} min` : `${seconds.toFixed(1)} s`
			})
		]
	});
}
function PhWidget() {
	const [ph, setPh] = (0, import_react.useState)(4.5);
	const band = ph < 7 ? "Ácido" : ph > 7 ? "Básico" : "Neutro";
	const note = ph <= 5.6 ? "Nesta faixa a chuva já é considerada ácida." : ph === 7 ? "Neutro, como a água pura em condições ideais." : ph > 7 ? "Acima de 7 a solução é básica." : "Ainda ácido, mas acima do limite clássico da chuva ácida.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl font-extrabold",
				children: "Escala de pH"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "range",
				min: 0,
				max: 14,
				step: .1,
				value: ph,
				onChange: (e) => setPh(Number(e.target.value)),
				className: "w-full accent-primary",
				"aria-label": "Valor de pH"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-3xl font-extrabold",
				children: [
					ph.toFixed(1),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg text-muted",
						children: band
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: note
			})
		]
	});
}
function StudyWidget({ kind }) {
	if (kind === "punnett") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Punnett, {});
	if (kind === "luz") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LightWidget, {});
	if (kind === "ph") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhWidget, {});
	return null;
}
var EMPTY_CHECKS = [];
function ModulePage() {
	const { slug } = Route.useParams();
	const mod = moduleBySlug(slug);
	const read = useProgress((s) => s.read);
	const checked = useProgress((s) => s.checks[slug]) ?? EMPTY_CHECKS;
	const toggleRead = useProgress((s) => s.toggleRead);
	const toggleCheck = useProgress((s) => s.toggleCheck);
	const addSeconds = useProgress((s) => s.addSeconds);
	const setLastSlug = useProgress((s) => s.setLastSlug);
	const notePerfect = useProgress((s) => s.notePerfect);
	const [practice, setPractice] = (0, import_react.useState)(false);
	const [daily, setDaily] = (0, import_react.useState)(null);
	const bank = (0, import_react.useMemo)(() => mod ? questionsFor(mod.slug) : [], [mod]);
	(0, import_react.useEffect)(() => {
		if (!mod) return;
		setLastSlug(mod.slug);
		setDaily(dailyPicks().find((p) => p.module.slug === mod.slug) ?? null);
		const id = window.setInterval(() => {
			if (document.visibilityState === "visible") addSeconds(mod.slug, 20);
		}, 2e4);
		return () => window.clearInterval(id);
	}, [
		mod,
		addSeconds,
		setLastSlug
	]);
	if (!mod) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl font-extrabold",
			children: "Módulo não encontrado"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/modulos",
			className: "btn-primary",
			children: "Voltar aos módulos"
		})]
	});
	const content = mod.content;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-8",
		"data-subject": mod.subject,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/modulos",
				className: "inline-flex items-center gap-2 text-sm font-bold text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Módulos"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "chip",
						children: subjects[mod.subject].label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-bold text-muted",
						children: [
							mod.kicker,
							" · ",
							mod.notebook
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl leading-tight font-extrabold sm:text-5xl",
						children: mod.title
					}),
					daily ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-bold",
						children: [
							"Tema de hoje · +",
							daily.bonus,
							" XP na primeira leitura, seção ou acerto do dia",
							daily.featured ? " · em destaque" : ""
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-3xl text-lg leading-relaxed",
						children: content.intro
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "O tempo só conta com a página visível."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-primary",
						onClick: () => toggleRead(mod.slug),
						children: read[mod.slug] ? "Lido · desmarcar" : "Marcar módulo como lido"
					})
				]
			}),
			content.syllabus ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-extrabold",
					children: "No roteiro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 list-disc space-y-1 pl-5 text-sm",
					children: content.syllabus.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: content.sections.map((section, index) => {
					const on = checked.includes(index);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-extrabold",
								children: section.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "list-disc space-y-2 pl-5 leading-relaxed",
								children: section.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: point }, point))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn-ghost",
								onClick: () => toggleCheck(mod.slug, index),
								children: on ? "Seção entendida" : "Marcar seção como entendida"
							})
						]
					}, section.title);
				})
			}),
			content.formula ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-extrabold",
						children: content.formula.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-2xl font-extrabold",
						children: content.formula.expr
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: content.formula.note
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyWidget, { kind: content.widget }),
			content.contrasts ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-extrabold",
					children: "Fala e norma"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: content.contrasts.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card grid gap-2 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs font-bold text-muted",
								children: "Fala"
							}), row.fala] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs font-bold text-muted",
								children: "Norma"
							}), row.norma] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted sm:col-span-2",
								children: row.nota
							})
						]
					}, row.fala))
				})]
			}) : null,
			content.table ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-extrabold",
					children: content.table.caption
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-xl border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[32rem] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-surface-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: content.table.headers.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-bold",
								children: h
							}, h || "c")) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: content.table.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-t border-border",
							children: row.map((cell, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 align-top",
								children: cell
							}, i))
						}, row.join("|"))) })]
					})
				})]
			}) : null,
			content.wordBank ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-extrabold",
					children: "Banco de palavras"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: content.wordBank.map(([term, def]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold",
							children: term
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: def
						})]
					}, term))
				})]
			}) : null,
			content.glossary ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-extrabold",
					children: "Glossário"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "space-y-3",
					children: content.glossary.map(([term, def]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "font-bold",
						children: term
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-sm text-muted",
						children: def
					})] }, term))
				})]
			}) : null,
			content.faq ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-extrabold",
					children: "Perguntas frequentes"
				}), content.faq.map(([q, a]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
						className: "cursor-pointer font-bold",
						children: q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed",
						children: a
					})]
				}, q))]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-2xl font-extrabold",
						children: [
							"Praticar ",
							bank.length,
							" perguntas"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-primary",
						onClick: () => setPractice((v) => !v),
						children: practice ? "Fechar prática" : "Começar"
					})]
				}), practice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quiz, {
					questions: bank,
					onDone: ({ perfect }) => {
						if (perfect) notePerfect();
					}
				}) : null]
			}),
			content.videos?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-extrabold",
					children: "Para ver"
				}), content.videos.map((video) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "cover",
					href: video.url,
					target: "_blank",
					rel: "noreferrer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold",
							children: video.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: video.source
						}),
						video.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: video.note
						}) : null
					]
				}, video.url))]
			}) : null,
			content.sources?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-extrabold",
					children: "Fontes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm",
					children: content.sources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "font-bold underline",
							href: source.url,
							target: "_blank",
							rel: "noreferrer",
							children: source.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [" · ", source.source]
						}),
						source.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-muted",
							children: source.note
						}) : null
					] }, source.url))
				})]
			}) : null
		]
	});
}
//#endregion
export { ModulePage as component };
