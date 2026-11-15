import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as useProgress, b as questions, u as SUBJECTS, w as subjects } from "./store-BvdMBeBU.mjs";
import { t as Quiz } from "./quiz-DsPUuTAc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desafio-DWINR3YF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function shuffle(list) {
	const copy = [...list];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const a = copy[i];
		const b = copy[j];
		copy[i] = b;
		copy[j] = a;
	}
	return copy;
}
function ChallengePage() {
	const [subject, setSubject] = (0, import_react.useState)("todas");
	const [round, setRound] = (0, import_react.useState)(0);
	const finishChallenge = useProgress((s) => s.finishChallenge);
	const pool = (0, import_react.useMemo)(() => {
		return shuffle(subject === "todas" ? questions : questions.filter((q) => q.subject === subject)).slice(0, 10);
	}, [subject, round]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-5xl font-extrabold",
					children: "Desafio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xl text-muted",
					children: "Até dez perguntas sorteadas, sem repetição na sessão. A explicação aparece logo depois da resposta. Acertos inéditos valem XP; nos temas do dia, repetir ainda soma um pouco."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "pick",
					"aria-pressed": subject === "todas",
					onClick: () => setSubject("todas"),
					children: "Todas"
				}), SUBJECTS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "pick",
					"aria-pressed": subject === id,
					onClick: () => setSubject(id),
					children: subjects[id].label
				}, id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quiz, {
				questions: pool,
				onDone: () => finishChallenge()
			}, `${subject}-${round}`),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn-ghost",
				onClick: () => setRound((n) => n + 1),
				children: "Sortear outra rodada"
			})
		]
	});
}
//#endregion
export { ChallengePage as component };
