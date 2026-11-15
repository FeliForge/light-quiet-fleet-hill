import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as subjectRead, E as useProgress, u as SUBJECTS, v as modules, w as subjects, x as questionsFor } from "./store-BvdMBeBU.mjs";
import { r as Route$1 } from "./router-D4n5rGj1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/modulos-DWZINZDO.js
var import_jsx_runtime = require_jsx_runtime();
function ModulesPage() {
	const { materia } = Route$1.useSearch();
	const read = useProgress((s) => s.read);
	const visible = materia ? SUBJECTS.filter((id) => id === materia) : SUBJECTS;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-5xl font-extrabold",
					children: "Módulos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "max-w-xl text-muted",
					children: [modules.length, " módulos em cinco matérias. Marque cada um como lido para acompanhar o caderno."]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/modulos",
					className: "pick",
					"aria-pressed": !materia,
					children: "Todas"
				}), SUBJECTS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/modulos",
					search: { materia: id },
					className: "pick",
					"aria-pressed": materia === id,
					children: subjects[id].label
				}, id))]
			}),
			visible.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectBlock, {
				id,
				read
			}, id))
		]
	});
}
function SubjectBlock({ id, read }) {
	const { n, total } = subjectRead(read, id);
	const mine = modules.filter((m) => m.subject === id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3",
		"data-subject": id,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl font-extrabold",
			children: subjects[id].label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [
				n,
				" de ",
				total,
				" lidos · ",
				subjects[id].blurb
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: mine.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/modulos/$slug",
				params: { slug: m.slug },
				className: "cover",
				"data-subject": id,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-bold text-muted",
						children: [
							m.kicker,
							" · ",
							m.notebook
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl font-extrabold",
						children: m.title
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "cover-num text-4xl",
						children: m.number
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						questionsFor(m.slug).length,
						" perguntas · ",
						read[m.slug] ? "Lido" : "Ainda não lido"
					]
				})]
			}, m.slug))
		})]
	});
}
//#endregion
export { ModulesPage as component };
