import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as kbd_default } from "../_libs/@heroui/kbd+[...].mjs";
import { Ot as string } from "../_libs/@better-auth/core+[...].mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B_pscxJO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShortcutKey({ size = "md", className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-1 ${size === "sm" ? "text-[11px]" : size === "lg" ? "text-[15px]" : "text-[12px]"} ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(kbd_default, {
				keys: ["ctrl"],
				classNames: { base: "bg-white border border-neutral-200 shadow-sm text-neutral-700" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-neutral-400 font-normal",
				children: "+"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(kbd_default, {
				classNames: { base: "bg-white border border-neutral-200 shadow-sm text-neutral-700 font-mono" },
				children: "Shift"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-neutral-400 font-normal",
				children: "+"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(kbd_default, {
				classNames: { base: "bg-white border border-neutral-200 shadow-sm text-neutral-700 font-mono" },
				children: "F"
			})
		]
	});
}
var navLinks = [
	{
		label: "Pitch",
		href: "#pitch"
	},
	{
		label: "Features",
		href: "#features"
	},
	{
		label: "Pricing",
		href: "#pricing"
	}
];
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
						className: "w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow duration-300",
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden md:flex items-center gap-1",
					children: navLinks.map(({ label, href }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href,
						className: "relative group px-3.5 py-1.5 text-[13.5px] text-neutral-500 hover:text-neutral-900 transition-colors duration-200 no-underline font-medium",
						children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 left-3.5 right-3.5 h-[1.5px] bg-gradient-to-r from-orange-500 to-amber-400 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200 ease-out rounded-full" })]
					}, label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/auth/signin",
						className: "text-[13.5px] text-neutral-600 hover:text-neutral-900 font-medium no-underline transition-all duration-200 px-3 py-1.5 rounded-lg hover:bg-neutral-100",
						children: "Sign in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/auth/signup",
						className: "relative flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13.5px] font-semibold shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow duration-300 no-underline overflow-hidden group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "relative",
								children: "Get started"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "relative",
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
							})
						]
					})]
				})
			]
		})
	});
}
var domainSchema = string().min(1, "Enter your website URL").transform((val) => {
	return val.replace(/^https?:\/\//, "").replace(/\/$/, "").trim();
}).pipe(string().min(3, "Enter a valid domain").regex(/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:[0-9]+)?(\/.*)?$/, "Enter a valid domain (e.g. yourapp.com)"));
function extractDomain(input) {
	return input.replace(/^https?:\/\//, "").replace(/\/$/, "").trim().split("/")[0];
}
function getFaviconUrl(domain) {
	return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
}
async function registerDomain(domain) {
	await new Promise((r) => setTimeout(r, 300));
	return { domain };
}
function DomainInput({ size = "default", btnLabel = "Add to your product →", onSuccess }) {
	const [raw, setRaw] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [faviconOk, setFaviconOk] = (0, import_react.useState)(false);
	const domain = raw ? extractDomain(raw) : "";
	(0, import_react.useEffect)(() => {
		setFaviconOk(false);
		if (!domain) return;
		const img = new Image();
		img.src = getFaviconUrl(domain);
		img.onload = () => setFaviconOk(true);
		img.onerror = () => setFaviconOk(false);
	}, [domain]);
	const mutation = useMutation({
		mutationFn: registerDomain,
		onSuccess: (data) => {
			if (onSuccess) onSuccess(data.domain);
			else window.location.href = `/login?domain=${encodeURIComponent(data.domain)}`;
		}
	});
	function validate(value) {
		const result = domainSchema.safeParse(value);
		if (!result.success) return result.error.errors[0].message;
		return null;
	}
	function handleSubmit(e) {
		e.preventDefault();
		if (!raw.trim()) {
			setError("Enter your website URL");
			return;
		}
		const err = validate(raw);
		if (err) {
			setError(err);
			return;
		}
		setError(null);
		mutation.mutate(domain);
	}
	function handleChange(e) {
		setRaw(e.target.value);
		if (error) setError(validate(e.target.value));
	}
	function handleBlur() {
		if (!raw.trim()) return;
		setError(validate(raw));
	}
	const isCompact = size === "compact";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
		onSubmit: handleSubmit,
		className: "w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex flex-col ${isCompact ? "gap-2" : "gap-3"} w-full`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex items-center gap-0 rounded-xl border ${error ? "border-red-300 bg-red-50/30 shadow-sm shadow-red-100" : "border-neutral-200 bg-white shadow-sm hover:border-orange-200 focus-within:border-orange-400 focus-within:shadow-md focus-within:shadow-orange-100"} transition-all duration-200 overflow-hidden`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex items-center justify-center shrink-0 ${isCompact ? "w-9 h-9 ml-2" : "w-10 h-10 ml-3"}`,
						children: domain && faviconOk ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: getFaviconUrl(domain),
							alt: "",
							className: "w-5 h-5 rounded-sm object-contain"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "18",
							height: "18",
							viewBox: "0 0 18 18",
							fill: "none",
							className: `transition-colors duration-200 ${domain ? "text-neutral-300" : "text-neutral-400"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "9",
									cy: "9",
									r: "7.5",
									stroke: "currentColor",
									strokeWidth: "1.2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M9 1.5C9 1.5 6.5 4.5 6.5 9s2.5 7.5 2.5 7.5",
									stroke: "currentColor",
									strokeWidth: "1.2",
									strokeLinecap: "round"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M9 1.5C9 1.5 11.5 4.5 11.5 9s-2.5 7.5-2.5 7.5",
									stroke: "currentColor",
									strokeWidth: "1.2",
									strokeLinecap: "round"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M1.5 9h15M2.5 5.5h13M2.5 12.5h13",
									stroke: "currentColor",
									strokeWidth: "1.2",
									strokeLinecap: "round"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: domain ? domain : raw,
						onChange: handleChange,
						onBlur: handleBlur,
						placeholder: "insightly.live",
						autoComplete: "off",
						spellCheck: false,
						className: `flex-1 bg-transparent outline-none border-none font-mono ${isCompact ? "text-[13px] px-2 py-2.5" : "text-[14px] px-3 py-3"} text-neutral-800 placeholder:text-neutral-400 placeholder:font-sans`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: mutation.isPending,
						className: `relative shrink-0 m-1.5 ${isCompact ? "px-4 py-2 text-[12.5px]" : "px-5 py-2.5 text-[13.5px]"} rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow duration-200 overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative",
							children: mutation.isPending ? "Setting up..." : btnLabel
						})]
					})
				]
			}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[12px] text-red-500 font-medium pl-1 flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "6",
						cy: "6",
						r: "5",
						stroke: "currentColor",
						strokeWidth: "1.2"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M6 3.5V6.5M6 8.5v.2",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinecap: "round"
					})]
				}), error]
			})]
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
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 shrink-0" }),
										"Building a universal gesture — ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutKey, { size: "sm" })
									]
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
								children: "Stop guessing what your users want."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[16.5px] text-neutral-500 leading-[1.75] mb-8 font-normal",
								children: "We don't let you miss a single inconvenience of your users."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full max-w-[480px] mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DomainInput, { btnLabel: "Start for free" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[12.5px] text-neutral-400 mb-10 font-normal",
								children: "No credit card required · 2 min setup"
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
		body: "No feedback button. No obvious email. No Discord link. Users hit a broken flow, shrug, and leave. Forever."
	},
	{
		icon: "😤",
		headline: "Even when they try — it's painful.",
		body: "Finding a form, writing context, attaching a screenshot — it's 5 steps too many. Most give up halfway."
	},
	{
		icon: "📡",
		headline: "What does reach you — gets lost anyway.",
		body: "Scattered across DMs, Discord channels, Slack threads, Notion pages. No single source of truth."
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
		id: "pitch",
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
												children: "0"
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(kbd_default, {
										keys: ["command"],
										classNames: { base: "bg-white border border-gray-300 shadow-sm text-gray-700 text-xs" },
										children: "K"
									}),
									" ",
									"triggers search. Now,",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutKey, { size: "sm" }),
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
			className: "pointer-events-auto w-[380px] rounded-2xl border-2 border-orange-200 bg-white shadow-[0_20px_60px_rgba(249,115,22,0.18),0_4px_20px_rgba(0,0,0,0.10)] overflow-hidden ring-1 ring-orange-100 hover:border-orange-300 hover:shadow-[0_24px_72px_rgba(249,115,22,0.24),0_4px_24px_rgba(0,0,0,0.12)] transition-all duration-300",
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
							children: "QuickFeed"
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
		accent: "from-orange-400 to-amber-300",
		iconBg: "bg-orange-50",
		iconBorder: "border-orange-100"
	},
	{
		icon: "📍",
		title: "Page-aware by default",
		desc: "Every report is automatically tagged with the exact URL. You know where on your product the friction lives.",
		accent: "from-amber-400 to-yellow-300",
		iconBg: "bg-amber-50",
		iconBorder: "border-amber-100"
	},
	{
		icon: "⚡",
		title: "Zero friction for users",
		desc: "No account. No Discord. No form hunt. Ctrl+Shift+F → type → send. Three seconds, no unknown paths.",
		accent: "from-orange-400 to-rose-300",
		iconBg: "bg-orange-50",
		iconBorder: "border-orange-100"
	},
	{
		icon: "🪪",
		title: "Identify who reported",
		desc: "Know exactly which user sent which feedback. Link reports to real people — name, email, session — so you can follow up, not just fix.",
		accent: "from-violet-400 to-purple-300",
		iconBg: "bg-violet-50",
		iconBorder: "border-violet-100"
	},
	{
		icon: "🌐",
		title: "Works on any stack",
		desc: "One <script> tag. React, Next.js, Webflow, WordPress, plain HTML — doesn't matter.",
		accent: "from-amber-400 to-orange-300",
		iconBg: "bg-amber-50",
		iconBorder: "border-amber-100"
	},
	{
		icon: "🎨",
		title: "Full visual customizer",
		desc: "Colors, blur, title, description, button — live preview as you tweak. Ships looking exactly like yours.",
		accent: "from-rose-400 to-orange-300",
		iconBg: "bg-rose-50",
		iconBorder: "border-rose-100"
	}
];
var comingSoon = {
	icon: "💌",
	title: "Thank-you cards",
	desc: "When you fix a user's reported issue, send them a personal card — right inside the product. A small gesture that turns a frustration into loyalty.",
	note: "Like Appwrite's bottom-left announcement cards — but for your users' resolved problems.",
	accent: "from-pink-400 to-rose-300",
	iconBg: "bg-pink-50",
	iconBorder: "border-pink-100"
};
function FeaturesGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "features",
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
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
				children: [features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group relative bg-white rounded-2xl border border-neutral-200 p-7 flex flex-col gap-4 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/[0.07] transition-all duration-300 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `w-11 h-11 rounded-xl ${f.iconBg} border ${f.iconBorder} flex items-center justify-center text-[22px] group-hover:scale-110 transition-transform duration-300`,
							children: f.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[15px] font-bold text-[#0A0A0A] mb-2",
							children: f.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13.5px] text-neutral-500 leading-[1.65] font-normal",
							children: f.desc
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${f.accent} opacity-0 group-hover:opacity-[0.06] rounded-tl-3xl transition-opacity duration-300` })
					]
				}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group relative bg-white rounded-2xl border border-dashed border-pink-200 p-7 flex flex-col gap-4 hover:border-pink-300 hover:shadow-xl hover:shadow-pink-500/[0.08] transition-all duration-300 overflow-hidden sm:col-span-2 lg:col-span-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-500 text-[10.5px] font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" }), "Coming soon"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${comingSoon.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `w-11 h-11 rounded-xl ${comingSoon.iconBg} border ${comingSoon.iconBorder} flex items-center justify-center text-[22px] group-hover:scale-110 transition-transform duration-300`,
							children: comingSoon.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[15px] font-bold text-[#0A0A0A] mb-2",
								children: comingSoon.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13.5px] text-neutral-500 leading-[1.65] font-normal mb-3",
								children: comingSoon.desc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-pink-100 bg-gradient-to-br from-pink-50 to-rose-50 p-3 flex items-start gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-7 h-7 rounded-lg bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white text-[13px] shrink-0 shadow-sm",
									children: "💌"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-semibold text-neutral-700 leading-snug",
									children: "Hey Alex — we fixed it! 🎉"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10.5px] text-neutral-400 mt-0.5",
									children: "The checkout bug you reported is resolved."
								})] })]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${comingSoon.accent} opacity-0 group-hover:opacity-[0.06] rounded-tl-3xl transition-opacity duration-300` })
					]
				})]
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
						className: "relative z-10 w-full max-w-[600px] flex flex-col items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.04em] text-[#0A0A0A] mb-4 max-w-[620px]",
								style: { fontFamily: "'Syne', sans-serif" },
								children: [
									"It's time to capture every report",
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
									"Give your users one gesture, one moment, one place to tell you everything."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full max-w-[460px] mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DomainInput, { btnLabel: "Add to your product →" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[12.5px] text-neutral-400 font-normal",
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
							className: "text-[13.5px] text-neutral-700",
							style: {
								fontFamily: "'Syne', sans-serif",
								fontWeight: 800
							},
							children: "QuickFeed"
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
							className: "text-[12.5px] text-neutral-400 hover:text-orange-500 no-underline transition-colors duration-200",
							children: link
						}, link))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[12.5px] text-neutral-400",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" QuickFeed"
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
			if (e.ctrlKey && e.shiftKey && e.key === "F") {
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutKey, { size: "sm" }),
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
