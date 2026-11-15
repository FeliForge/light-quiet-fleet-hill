import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useRouter, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as useProgress, S as skinUnlocked, T as useHydratedProgress, _ as moduleBySlug, c as OUTFITS, g as leagueFor, s as LEAGUES, t as ACCESSORIES, v as modules, y as nextLeague } from "./store-BvdMBeBU.mjs";
import { a as Target, c as Menu, d as BookOpen, i as TriangleAlert, n as UserRound, o as Sun, r as Trophy, s as Moon, t as X, u as House } from "../_libs/lucide-react.mjs";
import { a as string, i as object, n as literal, o as union, r as number, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D4n5rGj1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function Mascot({ avatar, className = "size-28", label = "Personagem" }) {
	const uid = (0, import_react.useId)().replace(/:/g, "");
	const skin = `st-${Math.min(4, Math.max(0, avatar.skin))}`;
	const hair = `hc-${Math.min(5, Math.max(0, avatar.hairColor))}`;
	const outfit = `outfit-${Math.min(2, Math.max(0, avatar.outfit))}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 160 200",
		className,
		role: "img",
		"aria-label": label,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "80",
				cy: "190",
				rx: "34",
				ry: "6",
				fill: "var(--color-border)"
			}),
			avatar.accessory === 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "80",
				cy: "104",
				r: "78",
				fill: "none",
				stroke: "var(--color-primary)",
				strokeWidth: "3",
				strokeDasharray: "5 6"
			}) : null,
			avatar.outfit === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				className: outfit,
				d: "M36 146c-8 18-6 42 4 50h80c10-8 12-32 4-50-14 14-28 16-44 6-16 10-30 8-44-6z"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				className: outfit,
				x: "46",
				y: "128",
				width: "68",
				height: "58",
				rx: "26"
			}),
			avatar.outfit === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				className: outfit,
				x: "66",
				y: "118",
				width: "28",
				height: "22",
				rx: "10"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				className: skin,
				x: "68",
				y: "116",
				width: "24",
				height: "18",
				rx: "8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: skin,
				cx: "40",
				cy: "92",
				r: "8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: skin,
				cx: "120",
				cy: "92",
				r: "8"
			}),
			avatar.hair === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				className: hair,
				d: "M36 100c2-46 20-66 44-66s42 20 44 66v22c-8 12-18 6-24-4 2-14-4-22-20-22s-22 8-20 22c-6 10-16 16-24 4z"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: skin,
				cx: "80",
				cy: "90",
				r: "42"
			}),
			avatar.hair === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				className: hair,
				d: "M40 86c2-32 18-46 40-46s38 14 40 46c-10-14-24-20-40-20s-30 6-40 20z"
			}) : null,
			avatar.hair === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				className: hair,
				d: "M42 78c6-28 18-38 38-38s32 10 38 38c-12-8-24-12-38-12s-26 4-38 12z"
			}) : null,
			avatar.hair === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: hair,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M46 78l12-30 12 26z" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M66 70l12-34 14 30z" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M90 68l12-34 16 32z" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M40 86c4-24 16-36 40-36",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M42 84c4-26 18-40 38-40s34 12 38 36c-12-10-24-14-38-14s-26 4-38 18z" })
				]
			}) : null,
			avatar.hair === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: hair,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M42 84c4-30 18-42 38-42s34 12 38 42c-10-14-22-18-38-18s-28 4-38 18z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "80",
					cy: "40",
					r: "13"
				})]
			}) : null,
			avatar.hair === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				className: hair,
				d: "M40 92c2-36 16-52 40-52s38 16 40 52c-8-4-14 2-18 12-4-16-10-22-22-22s-18 6-22 22c-4-10-10-16-18-12z"
			}) : null,
			avatar.hair === 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "98",
				cy: "68",
				rx: "12",
				ry: "6",
				fill: "white",
				opacity: "0.35"
			}) : null,
			avatar.accessory === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "hc-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "80",
					cy: "52",
					rx: "40",
					ry: "16"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "42",
					y: "50",
					width: "76",
					height: "8",
					rx: "3"
				})]
			}) : null,
			avatar.accessory === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				className: "blush",
				d: "M112 58c10-12 22-8 22 2-10 6-16 4-22-2zm22 2c8-10 20-6 16 4-8 2-14 0-16-4z"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				className: "blush",
				cx: "52",
				cy: "104",
				rx: "7",
				ry: "3.5",
				opacity: "0.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				className: "blush",
				cx: "108",
				cy: "104",
				rx: "7",
				ry: "3.5",
				opacity: "0.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "ink",
				children: [
					avatar.face === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M54 78l14 5",
						fill: "none",
						stroke: "var(--color-ink)",
						strokeWidth: "2.2",
						strokeLinecap: "round"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M106 78l-14 5",
						fill: "none",
						stroke: "var(--color-ink)",
						strokeWidth: "2.2",
						strokeLinecap: "round"
					})] }) : null,
					avatar.face === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "64",
						cy: "98",
						r: "3.6"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M90 98h16",
						fill: "none",
						stroke: "var(--color-ink)",
						strokeWidth: "2.6",
						strokeLinecap: "round"
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "64",
						cy: "98",
						r: "3.8"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "98",
						cy: "98",
						r: "3.8"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "62",
						cy: "96",
						r: "1.2",
						fill: "white"
					}),
					avatar.face === 2 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "96",
						cy: "96",
						r: "1.2",
						fill: "white"
					}),
					avatar.face === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: "80",
						cy: "116",
						rx: "6",
						ry: "7",
						fill: "none",
						stroke: "var(--color-ink)",
						strokeWidth: "2.2"
					}) : avatar.face === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M68 114h24",
						fill: "none",
						stroke: "var(--color-ink)",
						strokeWidth: "2.4",
						strokeLinecap: "round"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M66 112c6 8 22 8 28 0",
						fill: "none",
						stroke: "var(--color-ink)",
						strokeWidth: "2.5",
						strokeLinecap: "round"
					})
				]
			}),
			avatar.accessory === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				id: `${uid}-glasses`,
				fill: "none",
				stroke: "var(--color-ink)",
				strokeWidth: "2.6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "64",
						cy: "98",
						r: "12"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "98",
						cy: "98",
						r: "12"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M76 98h10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M52 96h-6M110 96h6" })
				]
			}) : null,
			avatar.accessory === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M46 92c2-30 16-46 34-46s32 16 34 46",
					fill: "none",
					stroke: "var(--color-ink)",
					strokeWidth: "4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					className: "ink",
					x: "34",
					y: "86",
					width: "14",
					height: "20",
					rx: "5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					className: "ink",
					x: "112",
					y: "86",
					width: "14",
					height: "20",
					rx: "5"
				})
			] }) : null,
			avatar.accessory === 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				className: "fill-accent",
				points: "80,146 84,156 95,157 86,164 89,175 80,169 71,175 74,164 65,157 76,156"
			}) : null
		]
	});
}
var NAV = [
	{
		to: "/",
		label: "Início",
		icon: House
	},
	{
		to: "/modulos",
		label: "Módulos",
		icon: BookOpen
	},
	{
		to: "/desafio",
		label: "Desafio",
		icon: Target
	},
	{
		to: "/ligas",
		label: "Ligas",
		icon: Trophy
	},
	{
		to: "/perfil",
		label: "Perfil",
		icon: UserRound
	}
];
function safeAvatar(avatar, xp) {
	const outfitOk = OUTFITS.some((item) => item.id === avatar.outfit && xp >= (LEAGUES[item.league]?.min ?? 0));
	const accessoryOk = ACCESSORIES.some((item) => item.id === avatar.accessory && xp >= (LEAGUES[item.league]?.min ?? 0));
	return {
		...avatar,
		outfit: outfitOk ? avatar.outfit : 0,
		accessory: accessoryOk ? avatar.accessory : 0
	};
}
function Shell({ children }) {
	const path = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
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
	const pct = Math.max(0, Math.min(100, Math.round(into / span * 100)));
	const shownSkin = hydrated && skinUnlocked(skinId, xp) ? skinId : "caderno";
	const displayName = name.trim() || "Estudante";
	const readCount = Object.keys(read).length;
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		document.documentElement.dataset.theme = mode;
		document.documentElement.dataset.skin = shownSkin;
	}, [
		hydrated,
		mode,
		shownSkin
	]);
	(0, import_react.useEffect)(() => {
		if (!notice) return;
		const id = window.setTimeout(() => dismissNotice(), 2800);
		return () => window.clearTimeout(id);
	}, [notice, dismissNotice]);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [path]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-x-0 top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-surface px-4 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn-icon",
					"aria-label": "Abrir menu",
					onClick: () => setOpen(true),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-display text-lg font-semibold tracking-tight",
					children: "StudySphere"
				})]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Fechar menu",
				className: "fixed inset-0 z-40 bg-scrim lg:hidden",
				onClick: () => setOpen(false)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface px-3 py-5 transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center justify-between px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2 font-display text-xl font-semibold tracking-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-9 -rotate-6 place-items-center rounded-lg bg-primary font-display text-lg font-extrabold text-on-primary",
								children: "S"
							}), "StudySphere"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-icon lg:hidden",
							"aria-label": "Fechar",
							onClick: () => setOpen(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-col gap-1",
						children: NAV.map((item) => {
							const active = item.to === "/" ? path === "/" : path === item.to || path.startsWith(`${item.to}/`);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: "nav-link",
								"data-active": active ? "true" : "false",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto space-y-3 px-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/perfil",
								className: "flex items-center gap-3 rounded-xl border border-border p-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mascot, {
									avatar: safeAvatar(avatar, xp),
									className: "size-14 shrink-0",
									label: displayName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-bold",
									children: displayName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs font-semibold text-muted",
									children: league.name
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-semibold",
								children: [
									readCount,
									" de ",
									modules.length,
									" módulos lidos"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "subject-bar mt-2",
								"data-subject": "portugues",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${Math.round(readCount / modules.length * 100)}%` } })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "btn-ghost w-full justify-start",
								onClick: () => toggleMode(),
								children: [mode === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" }), mode === "dark" ? "Tema claro" : "Tema escuro"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto min-h-screen w-full max-w-5xl px-4 pt-20 pb-28 lg:pl-72 lg:pt-10",
				children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/ligas",
						className: "card flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-bold text-muted",
								children: ["Liga ", league.name]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-2xl font-extrabold",
								children: [xp, " XP"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: upcoming ? `Faltam ${upcoming.min - xp} XP para ${upcoming.name}` : "Liga máxima"
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "chroma-bar h-2 w-28 overflow-hidden rounded-full bg-surface-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block h-full rounded-full bg-primary",
								style: { width: `${pct}%` }
							})
						})]
					})
				})]
			}),
			notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				className: "fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-fg px-4 py-2 text-sm font-bold text-bg shadow-lg",
				children: notice.text
			}) : null,
			banner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 grid place-items-center bg-scrim p-4",
				role: "dialog",
				"aria-modal": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card w-full max-w-md space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold text-muted",
							children: "Nova liga"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl font-extrabold",
							children: leagueFor(xp).name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: banner.text }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "btn-primary",
								onClick: () => {
									equipSkin(banner.leagueId);
									dismissBanner();
								},
								children: ["Usar tema ", leagueFor(xp).theme]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn-ghost",
								onClick: () => dismissBanner(),
								children: "Agora não"
							})]
						})
					]
				})
			}) : null
		]
	});
}
var styles_default = "/assets/styles-ucqLESm8.css";
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "StudySphere" },
			{
				name: "description",
				content: "Estudo para a prova bimestral de Geografia, História, Português, Ciências e Matemática, com ligas e personagem."
			},
			{
				name: "theme-color",
				content: "#2340d8"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Figtree:ital,wght@0,400;0,600;0,700;1,400&display=swap"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$5 = () => import("./routes-V8gWagCG.mjs");
var Route$5 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "StudySphere" }] })
});
var $$splitComponentImporter$4 = () => import("./desafio-DWINR3YF.mjs");
var Route$4 = createFileRoute("/desafio")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "Desafio · StudySphere" }] })
});
var $$splitComponentImporter$3 = () => import("./ligas-BroAg9XE.mjs");
var Route$3 = createFileRoute("/ligas")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "Ligas · StudySphere" }] })
});
var $$splitComponentImporter$2 = () => import("./perfil-DCw20SXI.mjs");
var Route$2 = createFileRoute("/perfil")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: "Perfil · StudySphere" }] })
});
var $$splitComponentImporter$1 = () => import("./modulos-DWZINZDO.mjs");
var searchSchema = object({ materia: _enum([
	"geografia",
	"historia",
	"portugues",
	"ciencias",
	"matematica"
]).optional() });
var Route$1 = createFileRoute("/modulos/")({
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: "Módulos · StudySphere" }] })
});
var $$splitComponentImporter = () => import("../_slug-0fvI8nig.mjs");
var Route = createFileRoute("/modulos/$slug")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: ({ params }) => ({ meta: [{ title: `${moduleBySlug(params.slug)?.title ?? "Módulo"} · StudySphere` }] })
});
var IndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var DesafioRoute = Route$4.update({
	id: "/desafio",
	path: "/desafio",
	getParentRoute: () => Route$6
});
var LigasRoute = Route$3.update({
	id: "/ligas",
	path: "/ligas",
	getParentRoute: () => Route$6
});
var PerfilRoute = Route$2.update({
	id: "/perfil",
	path: "/perfil",
	getParentRoute: () => Route$6
});
var ModulosIndexRoute = Route$1.update({
	id: "/modulos/",
	path: "/modulos/",
	getParentRoute: () => Route$6
});
var rootRouteChildren = {
	IndexRoute,
	DesafioRoute,
	LigasRoute,
	PerfilRoute,
	ModulosSlugRoute: Route.update({
		id: "/modulos/$slug",
		path: "/modulos/$slug",
		getParentRoute: () => Route$6
	}),
	ModulosIndexRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Mascot as i, Route as n, Route$1 as r, router_exports as t };
