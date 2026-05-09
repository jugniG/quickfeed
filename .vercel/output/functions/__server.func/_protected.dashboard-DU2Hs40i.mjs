import { n as require_jsx_runtime } from "./_libs/@heroui/kbd+[...].mjs";
import { t as authClient } from "./_ssr/auth-client-Dz0RMk6K.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_protected.dashboard-DU2Hs40i.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { data: session } = authClient.useSession();
	const user = session?.user;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAFAFA]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "h-[60px] border-b border-neutral-200 bg-white flex items-center justify-between px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "14",
						height: "14",
						viewBox: "0 0 14 14",
						fill: "none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M2 4h10M2 7h7M2 10h5",
							stroke: "white",
							strokeWidth: "1.8",
							strokeLinecap: "round"
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[15px] text-[#0A0A0A] tracking-tight",
					style: {
						fontFamily: "'Syne', sans-serif",
						fontWeight: 800
					},
					children: "QuickFeed"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[13px] text-neutral-500",
					children: user?.email
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => authClient.signOut({ fetchOptions: { onSuccess: () => {
						window.location.href = "/login";
					} } }),
					className: "px-3 py-1.5 rounded-lg border border-neutral-200 text-[13px] text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 transition-all",
					children: "Sign out"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "max-w-[1100px] mx-auto px-6 py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-[28px] font-bold tracking-[-0.03em] text-[#0A0A0A]",
					children: "Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[14px] text-neutral-500 mt-1",
					children: [
						"Welcome back",
						user?.name ? `, ${user.name}` : "",
						"."
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-dashed border-neutral-200 bg-white p-16 flex flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-2xl mb-5",
						children: "📭"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[17px] font-bold text-neutral-800 mb-2",
						children: "No reports yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[13.5px] text-neutral-400 max-w-[340px] leading-[1.6]",
						children: "Add QuickFeed to your product and reports will show up here the moment users submit them."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-[12.5px] font-mono text-neutral-500",
						children: "<script src=\"https://cdn.quickfeed.dev/widget.js\" />"
					})
				]
			})]
		})]
	});
}
//#endregion
export { Dashboard as component };
