import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-F0UdXsOC.js
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
function ProblemSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-28 bg-[#FAFAFA] border-b border-neutral-100",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[1100px] mx-auto px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 mb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-5 h-px bg-gradient-to-r from-orange-400 to-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[12px] font-semibold uppercase tracking-[0.12em] text-orange-500",
						children: "The problem"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[clamp(1.9rem,3.5vw,2.6rem)] font-bold tracking-[-0.03em] leading-[1.15] text-[#0A0A0A] mb-4 max-w-[680px]",
							children: "The best founders build from feedback — not guesses."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[15.5px] text-neutral-500 leading-[1.75] max-w-[620px] font-normal",
							children: "Marc Lou — one of the most successful indie hackers — asks Grok to analyze user feedback before deciding what to build next. That's the move. Feedback is your roadmap. But only if you can actually collect it."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 inline-flex flex-col gap-3 bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 max-w-[480px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-bold text-[14px] shrink-0",
											children: "M"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[13.5px] font-bold text-[#0A0A0A]",
											children: "Marc Lou"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[12px] text-neutral-400",
											children: "@marclou · Dec 10, 2025"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "ml-auto",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												viewBox: "0 0 24 24",
												className: "w-4 h-4 fill-current text-neutral-300",
												"aria-hidden": "true",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[13.5px] text-neutral-700 leading-[1.65]",
									children: [
										"@grok tell me what's the juice?",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"what should i build next for my micro startups acquisition market based on the ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "feedback" }),
										" below",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"be concise"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-5 text-[12px] text-neutral-400 pt-1 border-t border-neutral-100",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "💬 2" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🔁 —" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "❤️ 21" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "👁 16K" })
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-5 mb-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group relative bg-white rounded-2xl border border-neutral-200 p-7 flex flex-col gap-4 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/[0.07] transition-all duration-300 overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-[20px] shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300",
									children: "🧱"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-2",
										children: "Problem 1"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-[16px] font-bold text-[#0A0A0A] mb-3 leading-[1.2]",
										children: "The path to report is broken"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[13.5px] text-neutral-500 leading-[1.7] font-normal",
										children: [
											"Your users hit a wall. They look for a \"Report issue\" button — it's not there. They search for a Discord invite link — buried in a footer. They give up at step 2. The friction is so high that ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-neutral-700",
												children: "91% of frustrated users never report anything"
											}),
											" — they just leave."
										]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-orange-400 to-amber-300 opacity-0 group-hover:opacity-[0.04] rounded-tl-3xl transition-opacity duration-300" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group relative bg-white rounded-2xl border border-neutral-200 p-7 flex flex-col gap-4 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-500/[0.07] transition-all duration-300 overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-[20px] shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300",
									children: "⌨️"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] font-bold uppercase tracking-widest text-amber-500 mb-2",
										children: "Problem 2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-[16px] font-bold text-[#0A0A0A] mb-3 leading-[1.2]",
										children: "No universal convention exists"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[13.5px] text-neutral-500 leading-[1.7] font-normal",
										children: [
											"Every docs site uses ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
												className: "px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-600 font-mono text-[12px]",
												children: "Ctrl+K"
											}),
											" for search. Every AI product uses ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
												className: "px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-600 font-mono text-[12px]",
												children: "Ctrl+I"
											}),
											" for the AI bot. There's no standard gesture for ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "feedback" }),
											" — so users have no muscle memory for it.",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold text-neutral-700",
												children: [
													" We want to make ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
														className: "px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-600 font-mono text-[12px]",
														children: "Ctrl+F"
													}),
													" the universal feedback shortcut"
												]
											}),
											" — the way ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
												className: "px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-600 font-mono text-[12px]",
												children: "Ctrl+K"
											}),
											" became search."
										]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-amber-400 to-yellow-300 opacity-0 group-hover:opacity-[0.04] rounded-tl-3xl transition-opacity duration-300" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group relative bg-white rounded-2xl border border-neutral-200 p-7 flex flex-col gap-4 hover:border-rose-200 hover:shadow-xl hover:shadow-rose-500/[0.07] transition-all duration-300 overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-11 h-11 rounded-xl bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center text-[20px] shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform duration-300",
									children: "🗂️"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] font-bold uppercase tracking-widest text-rose-500 mb-2",
										children: "Problem 3"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-[16px] font-bold text-[#0A0A0A] mb-3 leading-[1.2]",
										children: "Feedback is scattered everywhere"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[13.5px] text-neutral-500 leading-[1.7] font-normal",
										children: [
											"Important user queries get buried in your DMs. Discord threads go stale. Slack messages disappear. You're context-switching between 5 places trying to piece together what users actually want.",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-neutral-700",
												children: " One source. One dashboard."
											}),
											" That's what you need."
										]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-rose-400 to-orange-300 opacity-0 group-hover:opacity-[0.04] rounded-tl-3xl transition-opacity duration-300" })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden px-8 py-6 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/60 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-0 top-0 bottom-0 w-[200px] bg-gradient-to-l from-amber-100/50 to-transparent pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[15px] font-bold text-neutral-800 mb-1",
							children: "FeedbackHook: one source of truth for all your user feedback."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13.5px] text-neutral-500 font-normal",
							children: "Ctrl+F on any page → your widget → one dashboard. No more scattered DMs, Discord threads, or forgotten Slack messages."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/auth/signup",
							className: "shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] font-semibold no-underline hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 cursor-pointer whitespace-nowrap",
							children: "See how it works →"
						})]
					})]
				})
			]
		})
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
