export function ProblemSection() {
  return (
    <section className="py-28 bg-[#FAFAFA] border-b border-neutral-100">
      <div className="max-w-[1100px] mx-auto px-6">

        {/* Section label */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-5 h-px bg-gradient-to-r from-orange-400 to-amber-400" />
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-orange-500">The problem</span>
        </div>

        {/* ── BEAT 1: Why feedback matters ── */}
        <div className="mb-16">
          <h2 className="text-[clamp(1.9rem,3.5vw,2.6rem)] font-bold tracking-[-0.03em] leading-[1.15] text-[#0A0A0A] mb-4 max-w-[680px]">
            The best founders build from feedback — not guesses.
          </h2>
          <p className="text-[15.5px] text-neutral-500 leading-[1.75] max-w-[620px] font-normal">
            Marc Lou — one of the most successful indie hackers — asks Grok to analyze user feedback before deciding what to build next.
            That's the move. Feedback is your roadmap. But only if you can actually collect it.
          </p>

          {/* Tweet card */}
          <div className="mt-7 inline-flex flex-col gap-3 bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 max-w-[480px]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-bold text-[14px] shrink-0">M</div>
              <div>
                <div className="text-[13.5px] font-bold text-[#0A0A0A]">Marc Lou</div>
                <div className="text-[12px] text-neutral-400">@marclou · Dec 10, 2025</div>
              </div>
              <div className="ml-auto">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-neutral-300" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
            </div>
            <p className="text-[13.5px] text-neutral-700 leading-[1.65]">
              @grok tell me what's the juice?<br /><br />
              what should i build next for my micro startups acquisition market based on the <strong>feedback</strong> below<br /><br />
              be concise
            </p>
            <div className="flex items-center gap-5 text-[12px] text-neutral-400 pt-1 border-t border-neutral-100">
              <span>💬 2</span>
              <span>🔁 —</span>
              <span>❤️ 21</span>
              <span>👁 16K</span>
            </div>
          </div>
        </div>

        {/* ── BEAT 2–4: The 3 problems ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

          {/* Problem 2: path to report is broken */}
          <div className="group relative bg-white rounded-2xl border border-neutral-200 p-7 flex flex-col gap-4 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/[0.07] transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-[20px] shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300">
              🧱
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-2">Problem 1</div>
              <h3 className="text-[16px] font-bold text-[#0A0A0A] mb-3 leading-[1.2]">The path to report is broken</h3>
              <p className="text-[13.5px] text-neutral-500 leading-[1.7] font-normal">
                Your users hit a wall. They look for a "Report issue" button — it's not there.
                They search for a Discord invite link — buried in a footer. They give up at step 2.
                The friction is so high that <span className="font-semibold text-neutral-700">91% of frustrated users never report anything</span> — they just leave.
              </p>
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-orange-400 to-amber-300 opacity-0 group-hover:opacity-[0.04] rounded-tl-3xl transition-opacity duration-300" />
          </div>

          {/* Problem 3: no convention */}
          <div className="group relative bg-white rounded-2xl border border-neutral-200 p-7 flex flex-col gap-4 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-500/[0.07] transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-[20px] shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
              ⌨️
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-amber-500 mb-2">Problem 2</div>
              <h3 className="text-[16px] font-bold text-[#0A0A0A] mb-3 leading-[1.2]">No universal convention exists</h3>
              <p className="text-[13.5px] text-neutral-500 leading-[1.7] font-normal">
                Every docs site uses <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-600 font-mono text-[12px]">Ctrl+K</kbd> for search.
                Every AI product uses <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-600 font-mono text-[12px]">Ctrl+I</kbd> for the AI bot.
                There's no standard gesture for <em>feedback</em> — so users have no muscle memory for it.
                <span className="font-semibold text-neutral-700"> We want to make <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-600 font-mono text-[12px]">Ctrl+F</kbd> the universal feedback shortcut</span> — the way <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-600 font-mono text-[12px]">Ctrl+K</kbd> became search.
              </p>
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-amber-400 to-yellow-300 opacity-0 group-hover:opacity-[0.04] rounded-tl-3xl transition-opacity duration-300" />
          </div>

          {/* Problem 4: scattered feedback, no single source */}
          <div className="group relative bg-white rounded-2xl border border-neutral-200 p-7 flex flex-col gap-4 hover:border-rose-200 hover:shadow-xl hover:shadow-rose-500/[0.07] transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center text-[20px] shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform duration-300">
              🗂️
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-rose-500 mb-2">Problem 3</div>
              <h3 className="text-[16px] font-bold text-[#0A0A0A] mb-3 leading-[1.2]">Feedback is scattered everywhere</h3>
              <p className="text-[13.5px] text-neutral-500 leading-[1.7] font-normal">
                Important user queries get buried in your DMs. Discord threads go stale. Slack messages disappear.
                You're context-switching between 5 places trying to piece together what users actually want.
                <span className="font-semibold text-neutral-700"> One source. One dashboard.</span> That's what you need.
              </p>
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-rose-400 to-orange-300 opacity-0 group-hover:opacity-[0.04] rounded-tl-3xl transition-opacity duration-300" />
          </div>

        </div>

        {/* Solution callout */}
        <div className="relative overflow-hidden px-8 py-6 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/60 shadow-sm">
          <div className="absolute right-0 top-0 bottom-0 w-[200px] bg-gradient-to-l from-amber-100/50 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-[15px] font-bold text-neutral-800 mb-1">
                FeedbackHook: one source of truth for all your user feedback.
              </div>
              <p className="text-[13.5px] text-neutral-500 font-normal">
                Ctrl+F on any page → your widget → one dashboard. No more scattered DMs, Discord threads, or forgotten Slack messages.
              </p>
            </div>
            <a
              href="/auth/signup"
              className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] font-semibold no-underline hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              See how it works →
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
