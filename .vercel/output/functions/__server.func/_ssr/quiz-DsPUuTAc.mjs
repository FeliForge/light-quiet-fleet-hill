import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as useProgress, m as isCorrect, p as difficulties } from "./store-BvdMBeBU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz-DsPUuTAc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Quiz({ questions, onDone }) {
	const recordAnswer = useProgress((s) => s.recordAnswer);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [choice, setChoice] = (0, import_react.useState)(null);
	const [order, setOrder] = (0, import_react.useState)([]);
	const [revealed, setRevealed] = (0, import_react.useState)(false);
	const [correct, setCorrect] = (0, import_react.useState)(false);
	const [hits, setHits] = (0, import_react.useState)(0);
	const [finished, setFinished] = (0, import_react.useState)(false);
	const q = questions[index];
	const key = questions.map((item) => item.id).join("|");
	(0, import_react.useEffect)(() => {
		setIndex(0);
		setChoice(null);
		setOrder([]);
		setRevealed(false);
		setHits(0);
		setFinished(false);
	}, [key]);
	if (!q) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Nenhuma pergunta neste filtro."
	});
	if (finished) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl font-extrabold",
				children: "Rodada fechada"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-lg",
				children: [
					hits,
					" de ",
					questions.length,
					" acertos",
					hits === questions.length ? " — sem falha." : "."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn-primary",
				onClick: () => {
					setIndex(0);
					setChoice(null);
					setOrder([]);
					setRevealed(false);
					setHits(0);
					setFinished(false);
				},
				children: "Estudar de novo"
			})
		]
	});
	const ordem = q.type === "ordem" || Array.isArray(q.answer);
	const submit = () => {
		const pick = ordem ? order : choice;
		if (pick == null || Array.isArray(pick) && pick.length !== q.options.length) return;
		const ok = isCorrect(q, pick);
		setCorrect(ok);
		setRevealed(true);
		if (ok) setHits((n) => n + 1);
		recordAnswer(q.id, q.subject, q.module, ok);
	};
	const next = () => {
		if (index + 1 >= questions.length) {
			setFinished(true);
			onDone?.({
				perfect: hits === questions.length && questions.length >= 4,
				hits,
				total: questions.length
			});
			return;
		}
		setIndex((n) => n + 1);
		setChoice(null);
		setOrder([]);
		setRevealed(false);
	};
	const optionState = (i) => {
		if (!revealed) {
			if (ordem) return order.includes(i) ? "picked" : void 0;
			return choice === i ? "picked" : void 0;
		}
		if (Array.isArray(q.answer)) return q.answer[order.indexOf(i)] === i && order.includes(i) ? "right" : order.includes(i) ? "wrong" : void 0;
		if (i === q.answer) return "right";
		if (i === choice) return "wrong";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-bold text-muted",
					children: [
						"Pergunta ",
						index + 1,
						" de ",
						questions.length
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "chip",
					"data-subject": q.subject,
					children: difficulties[q.difficulty] ?? q.difficulty
				})]
			}),
			q.context ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg bg-surface-2 px-3 py-2 text-sm",
				children: q.context
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl leading-snug font-extrabold",
				children: q.prompt
			}),
			ordem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Toque na ordem pedida. Toque de novo para desfazer o último."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: q.options.map((option, i) => {
					const pos = order.indexOf(i);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "option",
						"data-state": optionState(i),
						disabled: revealed,
						onClick: () => {
							if (ordem) setOrder((curr) => curr.includes(i) ? curr[curr.length - 1] === i ? curr.slice(0, -1) : curr : [...curr, i]);
							else setChoice(i);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mr-2 font-display",
							children: ordem && pos >= 0 ? `${pos + 1}.` : `${String.fromCharCode(65 + i)}.`
						}), option]
					}, option);
				})
			}),
			revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold",
						children: correct ? "Certo." : "Ainda não."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed",
						children: q.explanation
					}),
					ordem && Array.isArray(q.answer) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: ["Ordem: ", q.answer.map((i) => q.options[i]).join(" → ")]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-primary",
						onClick: next,
						children: index + 1 >= questions.length ? "Ver resultado" : "Próxima"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn-primary",
				disabled: ordem ? order.length !== q.options.length : choice == null,
				onClick: submit,
				children: "Responder"
			})
		]
	});
}
//#endregion
export { Quiz as t };
