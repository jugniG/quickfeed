import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BBkyo0Na.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Navbar() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-neutral-200/80 shadow-[0_2px_20px_rgba(0,0,0,0.06)]" : "bg-white/60 backdrop-blur-sm border-b border-transparent"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[1100px] mx-auto px-6 h-[60px] flex items-center justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/",
					className: "flex items-center gap-2 no-underline group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow",
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
						className: "font-bold text-[15px] text-[#0A0A0A] tracking-tight",
						children: "FeedbackHook"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden md:flex items-center gap-1",
					children: [
						"Features",
						"How it works",
						"Pricing",
						"Docs"
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "px-3.5 py-1.5 text-[13.5px] text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-all duration-150 no-underline font-medium",
						children: item
					}, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/auth/signin",
						className: "text-[13.5px] text-neutral-600 hover:text-neutral-900 font-medium no-underline transition-colors px-3 py-1.5 rounded-lg hover:bg-neutral-100",
						children: "Sign in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/auth/signup",
						className: "flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13.5px] font-semibold hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 no-underline",
						children: ["Get started", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "12",
							height: "12",
							viewBox: "0 0 12 12",
							fill: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M2 6h8M6.5 2.5L10 6l-3.5 3.5",
								stroke: "white",
								strokeWidth: "1.5",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})]
					})]
				})
			]
		})
	});
}
function Hero({ onTryWidget }) {
	const [blobPos, setBlobPos] = (0, import_react.useState)({
		x: 50,
		y: 40
	});
	(0, import_react.useEffect)(() => {
		let t = 0;
		const tick = () => {
			t += .003;
			setBlobPos({
				x: 50 + Math.sin(t * 1.3) * 12,
				y: 38 + Math.cos(t * .9) * 10
			});
		};
		const id = setInterval(tick, 40);
		return () => clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative pt-[60px] min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute w-[700px] h-[500px] rounded-full pointer-events-none transition-all duration-[2000ms] ease-in-out",
				style: {
					left: `${blobPos.x}%`,
					top: `${blobPos.y}%`,
					transform: "translate(-50%, -50%)",
					background: "radial-gradient(ellipse, rgba(251,146,60,0.18) 0%, rgba(251,191,36,0.08) 50%, transparent 70%)",
					filter: "blur(60px)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute w-[400px] h-[400px] rounded-full pointer-events-none transition-all duration-[3000ms] ease-in-out",
				style: {
					left: `${100 - blobPos.x + 20}%`,
					top: `${blobPos.y + 15}%`,
					transform: "translate(-50%, -50%)",
					background: "radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 65%)",
					filter: "blur(50px)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 max-w-[1100px] mx-auto px-6 w-full pt-16 pb-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col lg:flex-row items-center gap-12 lg:gap-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0 lg:max-w-[520px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex mb-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 text-[12.5px] font-semibold text-orange-600 shadow-sm shadow-orange-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 shrink-0" }), "We don't let you miss a single inconvenience of your users"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-[clamp(2.2rem,4.5vw,3.4rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[#0A0A0A] mb-3",
								children: [
									"Have you ever tried to report a broken experience —",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent",
										children: "and couldn't find the way?"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[15px] font-semibold text-neutral-400 mb-4 tracking-tight",
								children: "Stop guessing what your users want. Start hearing it — the moment they feel it."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[16.5px] text-neutral-500 leading-[1.75] mb-8 font-normal",
								children: [
									"Unknown paths. No feedback button. No email. No Discord link. You gave up.",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-neutral-700 font-medium",
										children: "Your users are doing the same thing on your product — right now."
									}),
									" ",
									"FeedbackHook gives them one universal gesture:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
										className: "px-1.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-700 font-mono text-[13px] shadow-sm",
										children: "Ctrl+F"
									}),
									". ",
									"Instant. Frictionless. Buttery smooth."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3 mb-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "/auth/signup",
									className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[14.5px] font-semibold hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/45 transition-all duration-200 no-underline cursor-pointer",
									children: ["Get your embed code — it's free", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										width: "14",
										height: "14",
										viewBox: "0 0 13 13",
										fill: "none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M2 6.5h9M7 2.5L11 6.5l-4 4",
											stroke: "white",
											strokeWidth: "1.5",
											strokeLinecap: "round",
											strokeLinejoin: "round"
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: onTryWidget,
									className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-200 bg-white text-[14.5px] font-semibold text-neutral-600 hover:border-orange-200 hover:bg-orange-50/50 hover:text-orange-600 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 shrink-0" }), "See how it works ↓"]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 w-full lg:max-w-[520px] shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-4 rounded-3xl bg-gradient-to-br from-orange-200/30 to-amber-100/20 blur-2xl pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_50px_rgba(249,115,22,0.10),0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 px-4 py-3 border-b border-neutral-100 bg-neutral-50/80",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-red-400/60" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-amber-400/60" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-green-400/60" })
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1 mx-3 px-3 py-1 rounded-md bg-white border border-neutral-200 text-[11px] text-neutral-400 font-mono shadow-sm",
										children: "app.yourproduct.com/dashboard"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex h-[300px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "w-[140px] border-r border-neutral-100 bg-neutral-50/80 p-2.5 flex flex-col gap-1 shrink-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "px-2.5 py-2 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/70 text-[11px] font-semibold text-orange-700",
												children: "Dashboard"
											}),
											[
												"Analytics",
												"Users",
												"Settings"
											].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "px-2.5 py-2 rounded-lg text-[11px] text-neutral-400",
												children: item
											}, item)),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-auto px-2.5 py-2 rounded-lg bg-orange-500/10 border border-orange-200/50 text-[10.5px] text-orange-700 font-semibold",
												children: "4 new reports"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 p-4 bg-white relative",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[12px] font-semibold text-neutral-700 mb-2.5",
												children: "Recent feedback"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "space-y-1.5",
												children: [
													{
														icon: "⚠️",
														text: "Checkout flow — Step 3 broken",
														time: "2m ago",
														color: "bg-red-50 border-red-100 text-red-700"
													},
													{
														icon: "💬",
														text: "Can't find the export button",
														time: "5m ago",
														color: "bg-amber-50 border-amber-100 text-amber-700"
													},
													{
														icon: "🔍",
														text: "Where is billing settings?",
														time: "9m ago",
														color: "bg-blue-50 border-blue-100 text-blue-600"
													},
													{
														icon: "😤",
														text: "Form resets on submit",
														time: "14m ago",
														color: "bg-orange-50 border-orange-100 text-orange-700"
													}
												].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: `flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg border text-[11px] ${item.color}`,
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[12px]",
															children: item.icon
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "flex-1 font-medium truncate",
															children: item.text
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] opacity-60 shrink-0",
															children: item.time
														})
													]
												}, i))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute bottom-3 right-3 w-[185px] rounded-xl border border-orange-200/70 bg-white shadow-[0_8px_32px_rgba(249,115,22,0.18)] overflow-hidden",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[12px]",
														children: "🔍"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[11px] font-semibold text-neutral-700",
														children: "What were you looking for?"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "p-2.5 space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "w-full px-2 py-1.5 rounded-lg border border-neutral-200 text-[10.5px] text-neutral-400 bg-neutral-50",
														children: "Describe what you saw..."
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "w-full py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10.5px] font-semibold text-center shadow-sm shadow-orange-500/25",
														children: "Send feedback →"
													})]
												})]
											})
										]
									})]
								})]
							})]
						})
					})]
				})
			})
		]
	});
}
var steps = [
	{
		icon: "💬",
		headline: "Great founders listen.",
		body: "The best product decisions come from real user pain — not assumptions."
	},
	{
		icon: "🚧",
		headline: "But there's no quick way to report.",
		body: "No convention. Users hit a broken flow, shrug, and leave. Forever."
	},
	{
		icon: "📡",
		headline: "What does get said — gets lost.",
		body: "Scattered across DMs, Discord channels, Slack threads, Notion pages."
	}
];
function CommentIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		className: "w-[18px] h-[18px] fill-current",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z" }) })
	});
}
function RepostIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		className: "w-[18px] h-[18px] fill-current",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" }) })
	});
}
function LikeIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		className: "w-[18px] h-[18px] fill-current",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" }) })
	});
}
function ViewsIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		className: "w-[18px] h-[18px] fill-current",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" }) })
	});
}
function ProblemSection() {
	const [visible, setVisible] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setVisible(true);
		}, { threshold: .1 });
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		className: "relative py-28 px-4 overflow-hidden bg-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0",
			style: {
				backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)",
				backgroundSize: "40px 40px",
				opacity: .035
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative max-w-5xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-16",
				style: {
					opacity: visible ? 1 : 0,
					transform: visible ? "translateY(0)" : "translateY(20px)",
					transition: "opacity 0.5s ease, transform 0.5s ease"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold uppercase tracking-widest text-orange-500 mb-3",
					children: "The problem"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight",
					children: [
						"Great founders know how important",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								background: "linear-gradient(90deg,#f97316,#f59e0b)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent"
							},
							children: "user feedback"
						}),
						" ",
						"is."
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col lg:flex-row gap-14 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full lg:w-auto lg:flex-shrink-0 flex justify-center",
					style: {
						opacity: visible ? 1 : 0,
						transform: visible ? "translateX(0)" : "translateX(-28px)",
						transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://x.com/marclou/status/1998473229728625111?s=20",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "block w-full max-w-sm no-underline cursor-pointer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-2xl border border-gray-200 shadow-lg p-5 font-sans hover:shadow-xl hover:border-gray-300 transition-all duration-300",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: "https://pbs.twimg.com/profile_images/1514863683574599681/9k7PqDTA_400x400.jpg",
											alt: "Marc Lou",
											className: "w-10 h-10 rounded-full object-cover"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-gray-900 text-sm leading-none",
												children: "Marc Lou"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												className: "w-4 h-4 flex-shrink-0",
												viewBox: "0 0 24 24",
												fill: "#1d9bf0",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.26 3.91.8c.66 1.31 1.9 2.19 3.33 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" })
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gray-400 text-xs",
											children: "@marclou · Dec 10, 2025"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "w-5 h-5 text-gray-800 flex-shrink-0",
										viewBox: "0 0 24 24",
										fill: "currentColor",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-gray-900 text-[15px] leading-relaxed mb-4",
									children: [
										"what should i build next for my micro startups acquisition market based on the",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "feedback" }),
										" below",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"be concise"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-5 pt-3 border-t border-gray-100",
									onClick: (e) => e.preventDefault(),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "group flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer text-sm select-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommentIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "group-hover:text-blue-400 transition-colors duration-200",
												children: "2"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "group flex items-center gap-1.5 text-gray-400 hover:text-green-400 transition-colors duration-200 cursor-pointer text-sm select-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepostIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "group-hover:text-green-400 transition-colors duration-200",
												children: "—"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "group flex items-center gap-1.5 text-gray-400 hover:text-pink-500 transition-colors duration-200 cursor-pointer text-sm select-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LikeIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "group-hover:text-pink-500 transition-colors duration-200",
												children: "21"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "group flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer text-sm select-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewsIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "group-hover:text-blue-400 transition-colors duration-200",
												children: "16K"
											})]
										})
									]
								})
							]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 flex flex-col gap-0",
					children: [
						steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								opacity: visible ? 1 : 0,
								transform: visible ? "translateX(0)" : "translateX(28px)",
								transition: `opacity 0.55s ease ${.15 + i * .13}s, transform 0.55s ease ${.15 + i * .13}s`
							},
							className: "relative flex gap-4 pb-8 last:pb-0",
							children: [
								i < steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-5 top-10 bottom-0 w-px bg-gray-100" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-shrink-0 w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-lg z-10",
									children: step.icon
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-gray-900 text-base leading-snug",
										children: step.headline
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-gray-500 mt-1 leading-relaxed",
										children: step.body
									})]
								})
							]
						}, i)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								opacity: visible ? 1 : 0,
								transition: "opacity 0.5s ease 0.58s"
							},
							className: "flex items-center gap-3 py-5 pl-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-orange-400 font-bold text-lg",
									children: "↓"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-gray-700",
									children: "So we're building a convention."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-gradient-to-l from-gray-200 to-transparent" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								opacity: visible ? 1 : 0,
								transform: visible ? "translateY(0)" : "translateY(12px)",
								transition: "opacity 0.55s ease 0.65s, transform 0.55s ease 0.65s"
							},
							className: "rounded-2xl border border-orange-100 bg-orange-50/60 px-5 py-4 mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-gray-700 leading-relaxed",
								children: [
									"On every docs site,",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
										className: "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white border border-gray-300 text-gray-700 text-xs font-mono shadow-sm",
										children: "⌘ K"
									}),
									" ",
									"triggers search. Now,",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
										className: "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white border border-gray-300 text-gray-700 text-xs font-mono shadow-sm",
										children: "⌘ F"
									}),
									" ",
									"should trigger a",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-orange-600",
										children: "feedback input"
									}),
									" — on every product."
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								opacity: visible ? 1 : 0,
								transform: visible ? "translateY(0)" : "translateY(12px)",
								transition: "opacity 0.55s ease 0.78s, transform 0.55s ease 0.78s"
							},
							className: "rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-4 text-white shadow-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-extrabold text-base leading-snug",
								children: "Single source of input. Zero friction. One dashboard."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-white/80 mt-1",
								children: "Every report — captured. Nothing scattered. Nothing missed."
							})]
						})
					]
				})]
			})]
		})]
	});
}
function HowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-28 bg-white border-b border-neutral-100",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[1100px] mx-auto px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-[480px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5 mb-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-5 h-px bg-gradient-to-r from-orange-400 to-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[12px] font-semibold uppercase tracking-[0.12em] text-orange-500",
									children: "How it works"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-[clamp(1.9rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] leading-[1.15] text-[#0A0A0A]",
								children: "One script tag. A buttery smooth feedback flow."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-[15px] text-neutral-500 leading-[1.7]",
								children: "So easy your users will actually use it."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/docs",
						className: "flex items-center gap-1.5 text-[13.5px] font-semibold text-neutral-500 hover:text-orange-600 no-underline transition-colors group",
						children: ["Read the docs", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "12",
							height: "12",
							viewBox: "0 0 12 12",
							fill: "none",
							className: "group-hover:translate-x-0.5 transition-transform",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M2 6h8M6 2L10 6l-4 4",
								stroke: "currentColor",
								strokeWidth: "1.4",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-5",
					children: [
						{
							num: "1",
							title: "You: Paste one line",
							desc: "Drop one <script> tag on any page. Works on React, Next.js, Webflow, WordPress — anything. 30 seconds.",
							code: `<script\n  src="https://cdn.feedbackhook.com/v1.js"\n  data-key="YOUR_KEY">\n<\/script>`
						},
						{
							num: "2",
							title: "Your user: Ctrl+F",
							desc: "Instead of browser search, your branded overlay appears. They describe what's broken, paste a screenshot from clipboard, hit send. No signup. No redirect.",
							code: `// Auto-intercepts Ctrl+F\nFeedbackHook.config({\n  theme: 'light',\n  position: 'bottom-right',\n  accentColor: '#your-brand',\n})`
						},
						{
							num: "3",
							title: "You: See everything",
							desc: "The exact page URL. Their message. Their screenshot. Delivered to your dashboard the instant they hit send — while the frustration is still fresh.",
							code: `{\n  "user": "u_9xkf2",\n  "page": "/checkout/step-3",\n  "message": "Can't find promo",\n  "screenshot": "...",\n  "timestamp": "now"\n}`
						}
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/[0.07] transition-all duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative bg-[#0f0f0f] px-5 py-4 font-mono text-[11.5px] leading-[1.9] text-neutral-500 min-h-[120px] whitespace-pre",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute left-0 top-0 bottom-0 w-8 border-r border-white/5 flex flex-col pt-4 items-center gap-[6px]",
								children: s.code.split("\n").map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-white/15 leading-[1.9]",
									children: j + 1
								}, j))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pl-6",
								children: s.code.split("\n").map((line, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: j === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-orange-400/80",
									children: line
								}) : line.includes(":") || line.includes("\"") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-neutral-300",
									children: line
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: line }) }, j))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 flex-1 flex flex-col gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-[13px] font-bold text-white shadow-md shadow-orange-500/30 shrink-0",
									children: s.num
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-[14.5px] font-bold text-[#0A0A0A]",
									children: s.title
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13.5px] text-neutral-500 leading-[1.65] font-normal",
								children: s.desc
							})]
						})]
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-7 py-5 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/60 shadow-sm shadow-orange-100",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[22px]",
							children: "⚡"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[13.5px] font-bold text-neutral-800",
							children: "No code changes to your product"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[13px] text-neutral-500 font-normal",
							children: "Just a script tag. Works on any stack."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/auth/signup",
						className: "shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] font-semibold no-underline hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 cursor-pointer",
						children: "Get the snippet →"
					})]
				})
			]
		})
	});
}
function WidgetDemoSection({ onTryWidget }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-28 bg-white border-b border-neutral-100",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 mb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-5 h-px bg-neutral-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-400",
						children: "Live demo"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[clamp(1.9rem,3.5vw,2.6rem)] font-black tracking-[-0.035em] leading-[1.1] text-[#0A0A0A] mb-5",
					children: "See exactly what your users will see."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[16px] text-neutral-500 leading-[1.65] mb-8",
					children: [
						"Press ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "px-1.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-700 font-mono text-[13px]",
							children: "Ctrl+F"
						}),
						" right now — on this page — to trigger the widget and experience it yourself."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3 mb-10",
					children: [
						"Appears instantly, no page reload",
						"Captures page URL and browser context automatically",
						"Optional screenshot attachment",
						"Submits directly to your dashboard"
					].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-[14px] text-neutral-600",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-5 h-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "10",
								height: "10",
								viewBox: "0 0 10 10",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M2 5l2.5 2.5L8 3",
									stroke: "#F59E0B",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							})
						}), item]
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onTryWidget,
					className: "flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A0A0A] text-white text-[14px] font-semibold hover:bg-neutral-800 transition-colors",
					children: ["Open the widget", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "13",
						height: "13",
						viewBox: "0 0 13 13",
						fill: "none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M2 6.5h9M7 2.5L11 6.5l-4 4",
							stroke: "white",
							strokeWidth: "1.6",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-[380px] rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.10)] overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5 py-4 border-b border-neutral-100 bg-amber-50 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 16 16",
								fill: "none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "7",
									cy: "7",
									r: "5",
									stroke: "#F59E0B",
									strokeWidth: "1.5"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M11 11l3 3",
									stroke: "#F59E0B",
									strokeWidth: "1.5",
									strokeLinecap: "round"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[13px] font-bold text-neutral-800",
							children: "What were you looking for?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] text-neutral-500",
							children: "Help us improve this page"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[12px] font-semibold text-neutral-700 mb-1.5",
								children: "Describe the issue"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] text-neutral-400 min-h-[80px] flex items-start",
								children: "I couldn't find the export button anywhere..."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-neutral-200 bg-neutral-50 text-[12px] text-neutral-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "14",
									height: "14",
									viewBox: "0 0 14 14",
									fill: "none",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
											x: "1",
											y: "2",
											width: "12",
											height: "10",
											rx: "2",
											stroke: "#D1D5DB",
											strokeWidth: "1.2"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "4.5",
											cy: "5.5",
											r: "1",
											fill: "#D1D5DB"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M1 9l3.5-3 3 3 2-2 3.5 3",
											stroke: "#D1D5DB",
											strokeWidth: "1.2",
											strokeLinejoin: "round"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Attach a screenshot ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-neutral-300",
									children: "— optional"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-[11px] text-neutral-400 truncate",
									children: "/dashboard/settings"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-[11px] text-neutral-400",
									children: "Chrome 124"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "w-full py-2.5 rounded-xl bg-amber-500 text-white text-[13px] font-bold hover:bg-amber-600 transition-colors",
								children: "Send feedback →"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center text-[11px] text-neutral-400",
								children: ["Powered by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-neutral-500",
									children: "FeedbackHook"
								})]
							})
						]
					})]
				})
			})]
		})
	});
}
function WidgetOverlay({ isOpen, onClose }) {
	const [message, setMessage] = (0, import_react.useState)("");
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const handleSubmit = () => {
		if (!message.trim()) return;
		setSubmitted(true);
		setTimeout(() => {
			setSubmitted(false);
			setMessage("");
			onClose();
		}, 2e3);
	};
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] flex items-end justify-end p-6 pointer-events-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-auto w-[380px] rounded-2xl border border-neutral-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden",
			children: submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-8 flex flex-col items-center gap-3 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-2xl",
						children: "✓"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[15px] font-bold text-neutral-800",
						children: "Thanks for the feedback!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[13px] text-neutral-500",
						children: "Our team will look into this right away."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 py-4 border-b border-neutral-100 bg-amber-50 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							fill: "none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "7",
								cy: "7",
								r: "5",
								stroke: "#F59E0B",
								strokeWidth: "1.5"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M11 11l3 3",
								stroke: "#F59E0B",
								strokeWidth: "1.5",
								strokeLinecap: "round"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[13px] font-bold text-neutral-800",
						children: "What were you looking for?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] text-neutral-500",
						children: "Help us improve this page"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "w-7 h-7 rounded-lg hover:bg-amber-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "12",
						height: "12",
						viewBox: "0 0 12 12",
						fill: "none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M2 2l8 8M10 2l-8 8",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round"
						})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-[12px] font-semibold text-neutral-700 mb-1.5",
						children: "Describe the issue"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: message,
						onChange: (e) => setMessage(e.target.value),
						placeholder: "I couldn't find...",
						className: "w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] text-neutral-700 placeholder-neutral-400 min-h-[80px] resize-none focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition-all"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-[11px] text-neutral-400 truncate",
							children: typeof window !== "undefined" ? window.location.pathname : "/"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-[11px] text-neutral-400",
							children: "Chrome"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleSubmit,
						disabled: !message.trim(),
						className: "w-full py-2.5 rounded-xl bg-amber-500 text-white text-[13px] font-bold hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
						children: "Send feedback →"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center text-[11px] text-neutral-400",
						children: ["Powered by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-neutral-500",
							children: "FeedbackHook"
						})]
					})
				]
			})] })
		})
	});
}
var features = [
	{
		icon: "📋",
		title: "Screenshot paste",
		desc: "Ctrl+V drops a screenshot right into the widget. Users show you exactly what broke — no words needed.",
		accent: "from-orange-500 to-amber-400"
	},
	{
		icon: "📍",
		title: "Page-aware by default",
		desc: "Every report is automatically tagged with the exact URL. You know where on your product the friction lives.",
		accent: "from-amber-500 to-yellow-400"
	},
	{
		icon: "🚀",
		title: "Zero friction for users",
		desc: "No account. No Discord. No form hunt. Ctrl+F → type → send. Three seconds, no unknown paths.",
		accent: "from-orange-500 to-rose-400"
	},
	{
		icon: "🔐",
		title: "Anonymous or identified",
		desc: "Your call. Toggle whether to ask for email — per project, per widget. Users never feel surveilled.",
		accent: "from-amber-400 to-orange-400"
	},
	{
		icon: "🌐",
		title: "Works on any stack",
		desc: "One <script> tag. React, Next.js, Webflow, WordPress, plain HTML — doesn't matter.",
		accent: "from-orange-400 to-amber-500"
	},
	{
		icon: "🎨",
		title: "Full visual customizer",
		desc: "Colors, blur, title, description, button — live preview as you tweak. Ships looking exactly like yours.",
		accent: "from-rose-400 to-orange-400"
	}
];
function FeaturesGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-28 bg-[#FAFAFA] border-b border-neutral-100",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[1100px] mx-auto px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-[520px] mb-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 mb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-5 h-px bg-gradient-to-r from-orange-400 to-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[12px] font-semibold uppercase tracking-[0.12em] text-orange-500",
						children: "Features"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[clamp(1.9rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] leading-[1.15] text-[#0A0A0A]",
					children: "Everything that makes reporting feel effortless."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
				children: features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group relative bg-white rounded-2xl border border-neutral-200 p-7 flex flex-col gap-4 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/[0.07] transition-all duration-300 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `w-11 h-11 rounded-xl bg-gradient-to-br ${f.accent} flex items-center justify-center text-[20px] shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300`,
							children: f.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[15px] font-bold text-[#0A0A0A] mb-2",
							children: f.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13.5px] text-neutral-500 leading-[1.65] font-normal",
							children: f.desc
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${f.accent} opacity-0 group-hover:opacity-[0.04] rounded-tl-3xl transition-opacity duration-300` })
					]
				}, i))
			})]
		})
	});
}
function FooterCTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "bg-white border-t border-neutral-200",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[1100px] mx-auto px-6 pt-20 pb-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative rounded-2xl bg-gradient-to-br from-orange-50 via-amber-50 to-white border border-orange-200/70 overflow-hidden px-10 py-16 flex flex-col items-center text-center mb-16 shadow-xl shadow-orange-500/[0.08]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[-60px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-gradient-to-r from-orange-300/30 to-amber-300/20 blur-[80px] pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[-40px] right-[-60px] w-[300px] h-[200px] rounded-full bg-amber-300/20 blur-[60px] pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-300/60 bg-white/70 text-orange-600 text-[12px] font-semibold mb-6 shadow-sm backdrop-blur-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" }), "Free forever on Hobby plan"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.04em] text-[#0A0A0A] mb-4 max-w-[620px]",
								children: [
									"It's time to capture each report —",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent",
										children: "with a buttery smooth flow."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[16px] text-neutral-500 leading-[1.7] mb-8 max-w-[480px] font-normal",
								children: [
									"You've been on broken products that gave you nowhere to go. Don't be that product.",
									" ",
									"Give your users one gesture. One moment. One place to tell you everything."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "/auth/signup",
									className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[15px] font-semibold hover:from-orange-600 hover:to-amber-600 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-200 no-underline cursor-pointer",
									children: ["Get your embed code — it's free", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										width: "14",
										height: "14",
										viewBox: "0 0 14 14",
										fill: "none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M2 7h10M7.5 2.5L12 7l-4.5 4.5",
											stroke: "white",
											strokeWidth: "1.5",
											strokeLinecap: "round",
											strokeLinejoin: "round"
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "/auth/signin",
									className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white border border-neutral-300 text-neutral-700 text-[15px] font-semibold hover:border-orange-300 hover:text-orange-600 shadow-sm hover:shadow-md transition-all duration-200 no-underline cursor-pointer",
									children: "Sign in"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-[12.5px] text-neutral-400 font-normal",
								children: "No credit card required · 2 min setup · Cancel anytime"
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-neutral-100 pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-6 h-6 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-sm shadow-orange-500/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "12",
								height: "12",
								viewBox: "0 0 12 12",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M1.5 3.5h9M1.5 6h6M1.5 8.5h4",
									stroke: "white",
									strokeWidth: "1.5",
									strokeLinecap: "round"
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[13.5px] font-bold text-neutral-700",
							children: "FeedbackHook"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-x-7 gap-y-2",
						children: [
							"Features",
							"How it works",
							"Pricing",
							"Docs",
							"Privacy",
							"Terms"
						].map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "text-[12.5px] text-neutral-400 hover:text-orange-500 no-underline transition-colors",
							children: link
						}, link))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[12.5px] text-neutral-400",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" FeedbackHook"
						]
					})
				]
			})]
		})
	});
}
function Home() {
	const [widgetOpen, setWidgetOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const handler = (e) => {
			if (e.ctrlKey && e.key === "f") {
				e.preventDefault();
				setWidgetOpen(true);
			}
			if (e.key === "Escape") setWidgetOpen(false);
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAFAFA] text-[#0A0A0A]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { onTryWidget: () => setWidgetOpen(true) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProblemSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WidgetDemoSection, { onTryWidget: () => setWidgetOpen(true) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturesGrid, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCTA, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WidgetOverlay, {
				isOpen: widgetOpen,
				onClose: () => setWidgetOpen(false)
			}),
			!widgetOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 shadow-sm text-neutral-500 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" }),
						"Press",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-800 font-mono text-xs",
							children: "Ctrl+F"
						}),
						" ",
						"anywhere to try the widget"
					]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
