export function FeaturesGrid() {
  return (
    <section className="py-28 bg-[#FAFAFA] border-b border-neutral-100">
      <div className="max-w-[1100px] mx-auto px-6">

        <div className="max-w-[520px] mb-14">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-5 h-px bg-gradient-to-r from-orange-400 to-amber-400" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-orange-500">Features</span>
          </div>
          <h2 className="text-[clamp(1.9rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] leading-[1.15] text-[#0A0A0A]">
            Everything you need to stop losing users silently.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Large feature card */}
          <div className="lg:col-span-2 group rounded-2xl border border-neutral-200 bg-white p-7 flex flex-col justify-between min-h-[210px] hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/[0.06] transition-all duration-300">
            <div className="flex items-start justify-between mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-[18px] shadow-md shadow-orange-500/30">⌨️</div>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 text-orange-600 text-[11px] font-semibold">Core feature</span>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#0A0A0A] mb-2">Ctrl+F Interception</h3>
              <p className="text-[13.5px] text-neutral-500 leading-[1.65] font-normal">
                Intercepts the browser's native Ctrl+F shortcut and replaces it with your branded feedback widget — completely invisible to users, zero friction.
              </p>
            </div>
          </div>

          <div className="group rounded-2xl border border-neutral-200 bg-white p-7 flex flex-col justify-between min-h-[210px] hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/[0.06] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-gradient-to-br group-hover:from-orange-50 group-hover:to-amber-50 border border-neutral-200 group-hover:border-orange-200 flex items-center justify-center text-[18px] mb-5 transition-all duration-300">🎬</div>
            <div>
              <h3 className="text-[15px] font-bold text-[#0A0A0A] mb-2">Session Replay</h3>
              <p className="text-[13.5px] text-neutral-500 leading-[1.6] font-normal">
                Every submission includes a 30-second replay of what the user was doing before they pressed Ctrl+F.
              </p>
            </div>
          </div>

          <div className="group rounded-2xl border border-neutral-200 bg-white p-7 flex flex-col justify-between min-h-[190px] hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/[0.06] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-gradient-to-br group-hover:from-orange-50 group-hover:to-amber-50 border border-neutral-200 group-hover:border-orange-200 flex items-center justify-center text-[18px] mb-5 transition-all duration-300">🧭</div>
            <div>
              <h3 className="text-[15px] font-bold text-[#0A0A0A] mb-2">Smart Routing</h3>
              <p className="text-[13.5px] text-neutral-500 leading-[1.6] font-normal">
                Route feedback to the right team automatically — Slack, Linear, Jira, or email.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 group rounded-2xl border border-neutral-200 bg-white p-7 flex flex-col justify-between min-h-[190px] hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/[0.06] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-gradient-to-br group-hover:from-orange-50 group-hover:to-amber-50 border border-neutral-200 group-hover:border-orange-200 flex items-center justify-center text-[18px] mb-5 transition-all duration-300">📊</div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="text-[15px] font-bold text-[#0A0A0A] mb-2">Feedback Intelligence Dashboard</h3>
                <p className="text-[13.5px] text-neutral-500 leading-[1.6] font-normal max-w-[380px]">
                  See which pages generate the most frustration, track trends, and prioritise what actually breaks.
                </p>
              </div>
              <div className="flex gap-1.5 shrink-0 flex-wrap">
                {['Page', 'Browser', 'User', 'Date'].map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-neutral-50 text-neutral-500 text-[11px] font-medium border border-neutral-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-default">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {[
            { icon: '📸', title: 'Auto Screenshot', desc: 'Automatically captures the page at the moment feedback is submitted.' },
            { icon: '🔗', title: '40+ Integrations', desc: 'Slack, Linear, GitHub, Jira, Notion, Zapier — plug into your existing workflow.' },
            { icon: '🎨', title: 'Fully White-label', desc: "Custom colors, logo, copy. Users never know it's FeedbackHook." },
            { icon: '🔒', title: 'Privacy First', desc: 'GDPR compliant, EU data storage, zero PII without explicit consent.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="group rounded-2xl border border-neutral-200 bg-white p-7 flex flex-col justify-between min-h-[190px] hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/[0.06] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-gradient-to-br group-hover:from-orange-50 group-hover:to-amber-50 border border-neutral-200 group-hover:border-orange-200 flex items-center justify-center text-[18px] mb-5 transition-all duration-300">{icon}</div>
              <div>
                <h3 className="text-[15px] font-bold text-[#0A0A0A] mb-2">{title}</h3>
                <p className="text-[13.5px] text-neutral-500 leading-[1.6] font-normal">{desc}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}
