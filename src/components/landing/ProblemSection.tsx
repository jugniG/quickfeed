import { useEffect, useRef, useState } from "react";

const problems = [
  {
    icon: "🔇",
    headline: "Most feedback never reaches you",
    stat: "96% of unhappy users leave without saying a word",
  },
  {
    icon: "🗺️",
    headline: "There's no obvious way to report",
    stat: "No convention. No flow. Users give up in seconds.",
  },
  {
    icon: "📂",
    headline: "What does get reported gets lost",
    stat: "Scattered across DMs, emails, Notion, Slack",
  },
];

export function ProblemSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 px-4 overflow-hidden bg-white"
    >
      {/* subtle bg grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #f97316 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.04,
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* heading */}
        <div
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
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
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            But collecting it? That's where everyone gets stuck.
          </p>
        </div>

        {/* tweet + problems — two-column */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* LEFT — tweet screenshot */}
          <div
            className="flex-1 flex justify-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-32px)",
              transition: "opacity 0.65s ease 0.15s, transform 0.65s ease 0.15s",
            }}
          >
            <a
              href="https://x.com/marclou/status/1998473229728625111?s=20"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-100 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1 max-w-sm">
                <img
                  src="/tweet-marclou.png"
                  alt="Tweet by @marclou about user feedback"
                  className="w-full h-auto block"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-amber-400/5 transition-all duration-300 pointer-events-none" />
              </div>
              <p className="text-center text-xs text-gray-400 mt-2 group-hover:text-orange-500 transition-colors">
                ↗ View on X
              </p>
            </a>
          </div>

          {/* RIGHT — problem cards */}
          <div className="flex-1 flex flex-col gap-5">
            {problems.map((p, i) => (
              <div
                key={i}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(32px)",
                  transition: `opacity 0.55s ease ${0.2 + i * 0.12}s, transform 0.55s ease ${0.2 + i * 0.12}s`,
                }}
                className="flex items-start gap-4 bg-gray-50 rounded-2xl px-5 py-4 border border-gray-100 hover:border-orange-200 hover:bg-orange-50/40 transition-all duration-200"
              >
                <span className="text-2xl mt-0.5 select-none">{p.icon}</span>
                <div>
                  <p className="font-bold text-gray-900 text-base leading-snug">
                    {p.headline}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">{p.stat}</p>
                </div>
              </div>
            ))}

            {/* connector line */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.6s ease 0.65s",
              }}
              className="mt-2 px-5 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 text-white"
            >
              <p className="font-bold text-sm leading-snug">
                One dashboard. Every report. Zero friction.
              </p>
              <p className="text-xs text-white/80 mt-0.5">
                QuickFeed surfaces real pain — the moment users feel it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
