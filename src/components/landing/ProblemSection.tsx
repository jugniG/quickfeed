import { useEffect, useRef, useState } from "react";

const steps = [
  {
    icon: "💬",
    headline: "Great founders listen.",
    body: "The best product decisions come from real user pain — not assumptions.",
  },
  {
    icon: "🚧",
    headline: "But there's no quick way to report.",
    body: "No convention. Users hit a broken flow, shrug, and leave. Forever.",
  },
  {
    icon: "📡",
    headline: "What does get said — gets lost.",
    body: "Scattered across DMs, Discord channels, Slack threads, Notion pages.",
  },
];

// Tweet engagement row
function EngagementItem({ icon, count }: { icon: string; count: string }) {
  return (
    <span className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer text-sm select-none">
      <span>{icon}</span>
      <span>{count}</span>
    </span>
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
    <section ref={ref} className="relative py-28 px-4 overflow-hidden bg-white">
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
            <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 shadow-lg p-5 font-sans">
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
                      <svg className="w-4 h-4 text-blue-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-400 text-xs">@marclou · Dec 10, 2025</span>
                  </div>
                </div>
                {/* X logo */}
                <svg className="w-5 h-5 text-gray-700 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
              </div>

              {/* Tweet body */}
              <p className="text-gray-900 text-sm leading-relaxed mb-4">
                what should i build next for my micro startups acquisition market based on the{" "}
                <strong>feedback</strong> below
                <br />
                <br />
                be concise
              </p>

              {/* Engagement */}
              <div className="flex items-center gap-5 pt-3 border-t border-gray-100">
                <EngagementItem icon="💬" count="2" />
                <EngagementItem icon="🔁" count="—" />
                <EngagementItem icon="❤️" count="21" />
                <EngagementItem icon="📊" count="16K" />
              </div>
            </div>

            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
            `}</style>
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

            {/* Ctrl+K analogy */}
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
                <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white border border-gray-300 text-gray-700 text-xs font-mono shadow-sm">
                  ⌘ K
                </kbd>{" "}
                triggers search. Now,{" "}
                <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white border border-gray-300 text-gray-700 text-xs font-mono shadow-sm">
                  ⌘ F
                </kbd>{" "}
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
