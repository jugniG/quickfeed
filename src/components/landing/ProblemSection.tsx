import { useEffect, useRef, useState } from "react";
import { ShortcutKey } from "../ui/ShortcutKey";
import { Kbd } from "@heroui/react";

const steps = [
  {
    icon: "💬",
    headline: "Great founders listen.",
    body: "The best product decisions come from real user pain — not assumptions.",
  },
  {
    icon: "🚧",
    headline: "But there's no quick way to report.",
    body: "No feedback button. No obvious email. No Discord link. Users hit a broken flow, shrug, and leave. Forever.",
  },
  {
    icon: "😤",
    headline: "Even when they try — it's painful.",
    body: "Finding a form, writing context, attaching a screenshot — it's 5 steps too many. Most give up halfway.",
  },
  {
    icon: "📡",
    headline: "What does reach you — gets lost anyway.",
    body: "Scattered across DMs, Discord channels, Slack threads, Notion pages. No single source of truth.",
  },
];

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px] fill-current">
      <g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z" /></g>
    </svg>
  );
}

function RepostIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px] fill-current">
      <g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" /></g>
    </svg>
  );
}

function LikeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px] fill-current">
      <g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" /></g>
    </svg>
  );
}

function ViewsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px] fill-current">
      <g><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" /></g>
    </svg>
  );
}

export function ProblemSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="pitch" className="relative py-28 px-4 overflow-hidden bg-white">
      {/* subtle dot grid bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.035,
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Section label */}
        <div
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-3">
            The problem
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Great founders know how important{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#f97316,#f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              user feedback
            </span>{" "}
            is.
          </h2>
        </div>

        {/* Two-column: tweet LEFT, steps RIGHT */}
        <div className="flex flex-col lg:flex-row gap-14 items-start">

          {/* LEFT — handcrafted tweet card */}
          <div
            className="w-full lg:w-auto lg:flex-shrink-0 flex justify-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-28px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            <a
              href="https://x.com/marclou/status/1998473229728625111?s=20"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-sm no-underline cursor-pointer"
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-5 font-sans hover:shadow-xl hover:border-gray-300 transition-all duration-300">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://pbs.twimg.com/profile_images/1514863683574599681/9k7PqDTA_400x400.jpg"
                      alt="Marc Lou"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-gray-900 text-sm leading-none">Marc Lou</span>
                        {/* X blue verified badge */}
                        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#1d9bf0">
                          <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.26 3.91.8c.66 1.31 1.9 2.19 3.33 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
                        </svg>
                      </div>
                      <span className="text-gray-400 text-xs">@marclou · Dec 10, 2025</span>
                    </div>
                  </div>
                  {/* X logo */}
                  <svg className="w-5 h-5 text-gray-800 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                  </svg>
                </div>

                {/* Tweet body */}
                <p className="text-gray-900 text-[15px] leading-relaxed mb-4">
                  what should i build next for my micro startups acquisition market based on the{" "}
                  <strong>feedback</strong> below
                  <br />
                  <br />
                  be concise
                </p>

                {/* Engagement */}
                <div className="flex items-center gap-5 pt-3 border-t border-gray-100" onClick={e => e.preventDefault()}>
                  <span className="group flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer text-sm select-none">
                    <CommentIcon />
                    <span className="group-hover:text-blue-400 transition-colors duration-200">2</span>
                  </span>
                  <span className="group flex items-center gap-1.5 text-gray-400 hover:text-green-400 transition-colors duration-200 cursor-pointer text-sm select-none">
                    <RepostIcon />
                    <span className="group-hover:text-green-400 transition-colors duration-200">0</span>
                  </span>
                  <span className="group flex items-center gap-1.5 text-gray-400 hover:text-pink-500 transition-colors duration-200 cursor-pointer text-sm select-none">
                    <LikeIcon />
                    <span className="group-hover:text-pink-500 transition-colors duration-200">21</span>
                  </span>
                  <span className="group flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer text-sm select-none">
                    <ViewsIcon />
                    <span className="group-hover:text-blue-400 transition-colors duration-200">16K</span>
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* RIGHT — narrative steps + solution */}
          <div className="flex-1 flex flex-col gap-0">
            {/* Steps */}
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(28px)",
                  transition: `opacity 0.55s ease ${0.15 + i * 0.13}s, transform 0.55s ease ${0.15 + i * 0.13}s`,
                }}
                className="relative flex gap-4 pb-8 last:pb-0"
              >
                {/* Vertical connector */}
                {i < steps.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-0 w-px bg-gray-100" />
                )}
                {/* Icon bubble */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-lg z-10">
                  {step.icon}
                </div>
                <div className="pt-1.5">
                  <p className="font-bold text-gray-900 text-base leading-snug">{step.headline}</p>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}

            {/* Divider arrow */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.5s ease 0.58s",
              }}
              className="flex items-center gap-3 py-5 pl-1"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
              <span className="text-orange-400 font-bold text-lg">↓</span>
              <p className="text-sm font-semibold text-gray-700">So we're building a convention.</p>
              <div className="flex-1 h-px bg-gradient-to-l from-gray-200 to-transparent" />
            </div>

            {/* Cmd+K analogy */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.55s ease 0.65s, transform 0.55s ease 0.65s",
              }}
              className="rounded-2xl border border-orange-100 bg-orange-50/60 px-5 py-4 mb-4"
            >
              <p className="text-sm text-gray-700 leading-relaxed">
                On every docs site,{" "}
                <Kbd keys={["command"]} classNames={{ base: "bg-white border border-gray-300 shadow-sm text-gray-700 text-xs" }}>K</Kbd>{" "}
                triggers search. Now,{" "}
                <ShortcutKey size="sm" />{" "}
                should trigger a{" "}
                <span className="font-semibold text-orange-600">feedback input</span> — on every product.
              </p>
            </div>

            {/* Solution card */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.55s ease 0.78s, transform 0.55s ease 0.78s",
              }}
              className="rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-4 text-white shadow-md"
            >
              <p className="font-extrabold text-base leading-snug">
                Single source of input. Zero friction. One dashboard.
              </p>
              <p className="text-xs text-white/80 mt-1">
                Every report — captured. Nothing scattered. Nothing missed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
