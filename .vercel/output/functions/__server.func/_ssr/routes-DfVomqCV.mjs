import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DfVomqCV.js
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative pt-[60px] min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[-60px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-gradient-to-b from-orange-100/70 to-amber-50/40 blur-[130px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[150px] right-[-80px] w-[380px] h-[380px] rounded-full bg-orange-200/20 blur-[100px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[250px] left-[-60px] w-[280px] h-[280px] rounded-full bg-amber-100/40 blur-[80px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 max-w-[1100px] mx-auto px-6 w-full pt-16 pb-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center mb-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 text-[12.5px] font-semibold text-orange-600 shadow-sm shadow-orange-100",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" }),
								"Now with Ctrl+F interception",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "12",
									height: "12",
									viewBox: "0 0 12 12",
									fill: "none",
									className: "opacity-60",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M2 6h8M6.5 2.5L10 6l-3.5 3.5",
										stroke: "currentColor",
										strokeWidth: "1.5",
										strokeLinecap: "round",
										strokeLinejoin: "round"
									})
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-center text-[clamp(2.6rem,5.5vw,4rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[#0A0A0A] mb-5 max-w-[820px] mx-auto",
						children: [
							"Capture every user frustration",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent",
								children: "before they leave."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-[17px] text-neutral-500 leading-[1.75] mb-8 max-w-[520px] mx-auto font-normal",
						children: [
							"FeedbackHook intercepts",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "px-1.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-600 font-mono text-[13px] shadow-sm",
								children: "Ctrl+F"
							}),
							" ",
							"on your product — turning the universal \"something is broken\" signal into structured, actionable feedback."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-center gap-3 mb-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/auth/signup",
							className: "flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[14.5px] font-semibold hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/45 transition-all duration-200 no-underline",
							children: ["Start for free", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
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
							className: "flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-200 bg-white text-[14.5px] font-semibold text-neutral-600 hover:border-orange-200 hover:bg-orange-50/50 hover:text-orange-600 shadow-sm hover:shadow-md transition-all duration-200",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-400" }), "Try live demo"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-3 text-[13px] text-neutral-400 mb-14",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex -space-x-2",
							children: [
								"#f97316",
								"#f59e0b",
								"#ec4899",
								"#8b5cf6",
								"#06b6d4"
							].map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									background: `${c}22`,
									borderColor: "white",
									border: "2px solid white"
								},
								className: "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-neutral-600 ring-1 ring-orange-100",
								children: [
									"F",
									"J",
									"A",
									"M",
									"R"
								][i]
							}, i))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-neutral-700 font-semibold",
							children: "500+"
						}), " teams catching silent bugs"] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto max-w-[860px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-1 rounded-t-2xl bg-gradient-to-b from-orange-200/40 to-transparent blur-sm pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative rounded-t-2xl border border-b-0 border-neutral-200 bg-white shadow-[0_-8px_50px_rgba(249,115,22,0.08),0_-4px_20px_rgba(0,0,0,0.06)] overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 px-4 py-3 border-b border-neutral-100 bg-neutral-50/80 backdrop-blur-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-red-400/60" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-amber-400/60" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-green-400/60" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1 mx-3 px-3 py-1 rounded-md bg-white border border-neutral-200 text-[11px] text-neutral-400 font-mono shadow-sm",
										children: "app.yourproduct.com/dashboard"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-4 h-4 rounded bg-neutral-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-4 h-4 rounded bg-neutral-200" })]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-[320px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-[160px] border-r border-neutral-100 bg-neutral-50/80 p-3 flex flex-col gap-1 shrink-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "px-3 py-2 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/70 text-[11.5px] font-semibold text-orange-700 shadow-sm",
											children: "Dashboard"
										}),
										[
											"Analytics",
											"Users",
											"Settings",
											"Integrations"
										].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "px-3 py-2 rounded-lg text-[11.5px] text-neutral-400 hover:bg-white hover:text-neutral-600 cursor-default",
											children: item
										}, item)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-auto px-3 py-2 rounded-lg bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-200/50 text-[11px] text-orange-700 font-semibold",
											children: "4 new reports"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 p-5 bg-white relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[13px] font-semibold text-neutral-700 mb-3",
											children: "Recent feedback"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-2",
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
													text: "Where is the billing settings?",
													time: "9m ago",
													color: "bg-blue-50 border-blue-100 text-blue-600"
												},
												{
													icon: "😤",
													text: "Form resets on every submission",
													time: "14m ago",
													color: "bg-orange-50 border-orange-100 text-orange-700"
												}
											].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: `flex items-center gap-3 px-3 py-2 rounded-lg border text-[12px] ${item.color}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[14px]",
														children: item.icon
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "flex-1 font-medium",
														children: item.text
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[11px] opacity-60 shrink-0",
														children: item.time
													})
												]
											}, i))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute bottom-4 right-4 w-[200px] rounded-xl border border-orange-200/60 bg-white shadow-[0_8px_32px_rgba(249,115,22,0.15)] overflow-hidden",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[13px]",
													children: "🔍"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11.5px] font-semibold text-neutral-700",
													children: "What were you looking for?"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-3 space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-full px-2.5 py-2 rounded-lg border border-neutral-200 text-[11px] text-neutral-400 bg-neutral-50",
													children: "Describe the issue..."
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-full py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-semibold text-center shadow-sm shadow-orange-500/30",
													children: "Send feedback →"
												})]
											})]
										})
									]
								})]
							})]
						})]
					})
				]
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
					className: "max-w-[560px] mb-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-5 h-px bg-gradient-to-r from-orange-400 to-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[12px] font-semibold uppercase tracking-[0.12em] text-orange-500",
								children: "The problem"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[clamp(1.9rem,3.5vw,2.6rem)] font-bold tracking-[-0.03em] leading-[1.15] text-[#0A0A0A] mb-4",
							children: "Your users are telling you what's broken. You just can't hear them."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[15.5px] text-neutral-500 leading-[1.7] font-normal",
							children: "Every product has a silent failure mode. Users encounter friction, instinctively press Ctrl+F to \"search\" for answers — and when nothing happens, they leave. Forever."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-5 mb-14",
					children: [
						{
							step: "01",
							title: "User hits a wall",
							desc: "They find a confusing UI, a broken flow, or can't find what they need. Frustration builds.",
							icon: "😤"
						},
						{
							step: "02",
							title: "They reach for Ctrl+F",
							desc: "It's instinct. When something feels wrong, people search. That's the signal you've been missing.",
							icon: "⌨️"
						},
						{
							step: "03",
							title: "FeedbackHook catches it",
							desc: "Instead of opening the browser search bar, your widget appears. They tell you exactly what's wrong.",
							icon: "🎯"
						}
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative group p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/[0.07] transition-all duration-300",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[26px] leading-none",
									children: s.icon
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold text-neutral-200 tracking-widest group-hover:text-orange-200 transition-colors",
									children: s.step
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[14.5px] font-bold text-[#0A0A0A] mb-2",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13.5px] text-neutral-500 leading-[1.65] font-normal",
								children: s.desc
							}),
							i < 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hidden md:block absolute top-1/2 -right-3 z-10 w-5 h-5 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 flex items-center justify-center shadow-sm shadow-orange-300/50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "8",
									height: "8",
									viewBox: "0 0 8 8",
									fill: "none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M1 4h6M4 1.5L6.5 4 4 6.5",
										stroke: "white",
										strokeWidth: "1.2",
										strokeLinecap: "round",
										strokeLinejoin: "round"
									})
								})
							})
						]
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 rounded-2xl overflow-hidden border border-neutral-200 shadow-sm",
					children: [
						{
							value: "96%",
							label: "of frustrated users never file a bug report"
						},
						{
							value: "7s",
							label: "average time before they close the tab and leave"
						},
						{
							value: "$0",
							label: "revenue recovered from silent rage-quits — until now"
						}
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group bg-white px-8 py-7 hover:bg-gradient-to-br hover:from-orange-50/50 hover:to-amber-50/30 transition-all duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[2.2rem] font-extrabold tracking-[-0.04em] bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent mb-1.5",
							children: s.value
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[13px] text-neutral-500 leading-[1.5] font-normal",
							children: s.label
						})]
					}, i))
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-5 h-px bg-gradient-to-r from-orange-400 to-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[12px] font-semibold uppercase tracking-[0.12em] text-orange-500",
								children: "How it works"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[clamp(1.9rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] leading-[1.15] text-[#0A0A0A]",
							children: "From install to first insight in under 5 minutes."
						})]
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
							title: "Install the snippet",
							desc: "One script tag. Two minutes. Works with React, Next.js, Vue, or plain HTML. No rebuilds required.",
							code: `<script src="https://cdn.feedbackhook.com/v1.js"\n  data-key="YOUR_KEY">\n<\/script>`
						},
						{
							num: "2",
							title: "Ctrl+F becomes your hotline",
							desc: "When users press Ctrl+F, your branded widget slides in. They describe the issue, attach a screenshot, and submit.",
							code: `// Auto-intercepts Ctrl+F\nFeedbackHook.config({\n  theme: 'light',\n  position: 'bottom-right',\n})`
						},
						{
							num: "3",
							title: "You get instant insight",
							desc: "Every submission lands in your dashboard with URL, browser, user ID and a replay of what they were doing.",
							code: `{\n  "user": "u_9xkf2",\n  "page": "/checkout/step-3",\n  "message": "Can't find promo",\n  "screenshot": "...",\n}`
						}
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group flex flex-col rounded-2xl border border-neutral-200 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/[0.07] transition-all duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-[#0f0f0f] px-5 py-5 font-mono text-[11.5px] leading-[1.9] text-neutral-400 min-h-[110px] whitespace-pre border-b border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-orange-400/70",
								children: s.code.split("\n")[0]
							}), s.code.split("\n").slice(1).map((line, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["\n", line] }, j))]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-[12px] font-bold text-white shadow-sm shadow-orange-500/30",
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
							className: "text-[20px]",
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
						className: "shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] font-semibold no-underline hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200",
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
					children: "Everything you need to stop losing users silently."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2 group rounded-2xl border border-neutral-200 bg-white p-7 flex flex-col justify-between min-h-[210px] hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/[0.06] transition-all duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-[18px] shadow-md shadow-orange-500/30",
								children: "⌨️"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-3 py-1 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 text-orange-600 text-[11px] font-semibold",
								children: "Core feature"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[16px] font-bold text-[#0A0A0A] mb-2",
							children: "Ctrl+F Interception"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13.5px] text-neutral-500 leading-[1.65] font-normal",
							children: "Intercepts the browser's native Ctrl+F shortcut and replaces it with your branded feedback widget — completely invisible to users, zero friction."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group rounded-2xl border border-neutral-200 bg-white p-7 flex flex-col justify-between min-h-[210px] hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/[0.06] transition-all duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-gradient-to-br group-hover:from-orange-50 group-hover:to-amber-50 border border-neutral-200 group-hover:border-orange-200 flex items-center justify-center text-[18px] mb-5 transition-all duration-300",
							children: "🎬"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[15px] font-bold text-[#0A0A0A] mb-2",
							children: "Session Replay"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13.5px] text-neutral-500 leading-[1.6] font-normal",
							children: "Every submission includes a 30-second replay of what the user was doing before they pressed Ctrl+F."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group rounded-2xl border border-neutral-200 bg-white p-7 flex flex-col justify-between min-h-[190px] hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/[0.06] transition-all duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-gradient-to-br group-hover:from-orange-50 group-hover:to-amber-50 border border-neutral-200 group-hover:border-orange-200 flex items-center justify-center text-[18px] mb-5 transition-all duration-300",
							children: "🧭"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[15px] font-bold text-[#0A0A0A] mb-2",
							children: "Smart Routing"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13.5px] text-neutral-500 leading-[1.6] font-normal",
							children: "Route feedback to the right team automatically — Slack, Linear, Jira, or email."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2 group rounded-2xl border border-neutral-200 bg-white p-7 flex flex-col justify-between min-h-[190px] hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/[0.06] transition-all duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-gradient-to-br group-hover:from-orange-50 group-hover:to-amber-50 border border-neutral-200 group-hover:border-orange-200 flex items-center justify-center text-[18px] mb-5 transition-all duration-300",
							children: "📊"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col md:flex-row md:items-end justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[15px] font-bold text-[#0A0A0A] mb-2",
								children: "Feedback Intelligence Dashboard"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13.5px] text-neutral-500 leading-[1.6] font-normal max-w-[380px]",
								children: "See which pages generate the most frustration, track trends, and prioritise what actually breaks."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1.5 shrink-0 flex-wrap",
								children: [
									"Page",
									"Browser",
									"User",
									"Date"
								].map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2.5 py-1 rounded-full bg-neutral-50 text-neutral-500 text-[11px] font-medium border border-neutral-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-default",
									children: tag
								}, tag))
							})]
						})]
					}),
					[
						{
							icon: "📸",
							title: "Auto Screenshot",
							desc: "Automatically captures the page at the moment feedback is submitted."
						},
						{
							icon: "🔗",
							title: "40+ Integrations",
							desc: "Slack, Linear, GitHub, Jira, Notion, Zapier — plug into your existing workflow."
						},
						{
							icon: "🎨",
							title: "Fully White-label",
							desc: "Custom colors, logo, copy. Users never know it's FeedbackHook."
						},
						{
							icon: "🔒",
							title: "Privacy First",
							desc: "GDPR compliant, EU data storage, zero PII without explicit consent."
						}
					].map(({ icon, title, desc }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group rounded-2xl border border-neutral-200 bg-white p-7 flex flex-col justify-between min-h-[190px] hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/[0.06] transition-all duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-gradient-to-br group-hover:from-orange-50 group-hover:to-amber-50 border border-neutral-200 group-hover:border-orange-200 flex items-center justify-center text-[18px] mb-5 transition-all duration-300",
							children: icon
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[15px] font-bold text-[#0A0A0A] mb-2",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13.5px] text-neutral-500 leading-[1.6] font-normal",
							children: desc
						})] })]
					}, title))
				]
			})]
		})
	});
}
function FooterCTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "bg-[#0A0A0A]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[1100px] mx-auto px-6 pt-20 pb-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative rounded-2xl bg-[#141414] border border-white/[0.08] overflow-hidden px-10 py-16 flex flex-col items-center text-center mb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[-40px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/15 blur-[90px] pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-orange-600/10 blur-[70px] pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-[12px] font-semibold mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-orange-400" }), "Free forever on Hobby plan"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.04em] text-white mb-4 max-w-[620px]",
								children: [
									"Capture every frustration",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent",
										children: "before users leave."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[16px] text-neutral-400 leading-[1.65] mb-8 max-w-[440px] font-normal",
								children: "Give users one universal gesture to instantly report bugs, friction, and confusion while context is still fresh."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "/auth/signup",
									className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[15px] font-semibold hover:from-orange-600 hover:to-amber-600 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-200 no-underline",
									children: ["Start Free", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
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
									className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white text-[15px] font-semibold hover:bg-white/15 hover:border-white/25 transition-all duration-200 no-underline backdrop-blur-sm",
									children: "Sign in"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-[12.5px] text-neutral-600 font-normal",
								children: "No credit card required · 2 min setup · Cancel anytime"
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/[0.06] pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-6 h-6 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-sm shadow-orange-500/40",
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
							className: "text-[13.5px] font-bold text-white/80",
							children: "FeedbackHook"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-x-7 gap-y-2",
						children: [
							"Features",
							"Pricing",
							"Docs",
							"Blog",
							"Privacy",
							"Terms"
						].map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "text-[12.5px] text-white/30 hover:text-orange-400 no-underline transition-colors",
							children: link
						}, link))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[12.5px] text-white/25",
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
