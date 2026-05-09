interface HeroProps {
  onTryWidget: () => void
}

export function Hero({ onTryWidget }: HeroProps) {
  return (
    <section className="relative pt-[60px] min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center">

      {/* Gradient blobs */}
      <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-gradient-to-b from-orange-100/70 to-amber-50/40 blur-[130px] pointer-events-none" />
      <div className="absolute top-[150px] right-[-80px] w-[380px] h-[380px] rounded-full bg-orange-200/20 blur-[100px] pointer-events-none" />
      <div className="absolute top-[250px] left-[-60px] w-[280px] h-[280px] rounded-full bg-amber-100/40 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 w-full pt-16 pb-0">

        {/* Badge */}
        <div className="flex justify-center mb-7">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 text-[12.5px] font-semibold text-orange-600 shadow-sm shadow-orange-100">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
            Now with Ctrl+F interception
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-60">
              <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-center text-[clamp(2.6rem,5.5vw,4rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[#0A0A0A] mb-5 max-w-[820px] mx-auto">
          Capture every user frustration{' '}
          <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">before they leave.</span>
        </h1>

        {/* Sub */}
        <p className="text-center text-[17px] text-neutral-500 leading-[1.75] mb-8 max-w-[520px] mx-auto font-normal">
          FeedbackHook intercepts{' '}
          <kbd className="px-1.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-600 font-mono text-[13px] shadow-sm">Ctrl+F</kbd>
          {' '}on your product — turning the universal "something is broken" signal into structured, actionable feedback.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <a
            href="/auth/signup"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[14.5px] font-semibold hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/45 transition-all duration-200 no-underline"
          >
            Start for free
            <svg width="14" height="14" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M7 2.5L11 6.5l-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <button
            onClick={onTryWidget}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-200 bg-white text-[14.5px] font-semibold text-neutral-600 hover:border-orange-200 hover:bg-orange-50/50 hover:text-orange-600 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-400" />
            Try live demo
          </button>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-3 text-[13px] text-neutral-400 mb-14">
          <div className="flex -space-x-2">
            {['#f97316', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'].map((c, i) => (
              <div key={i} style={{ background: `${c}22`, borderColor: 'white', border: '2px solid white' }} className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-neutral-600 ring-1 ring-orange-100">
                {['F','J','A','M','R'][i]}
              </div>
            ))}
          </div>
          <span><span className="text-neutral-700 font-semibold">500+</span> teams catching silent bugs</span>
        </div>

        {/* Product mockup */}
        <div className="relative mx-auto max-w-[860px]">
          <div className="absolute -inset-1 rounded-t-2xl bg-gradient-to-b from-orange-200/40 to-transparent blur-sm pointer-events-none" />
          <div className="relative rounded-t-2xl border border-b-0 border-neutral-200 bg-white shadow-[0_-8px_50px_rgba(249,115,22,0.08),0_-4px_20px_rgba(0,0,0,0.06)] overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-100 bg-neutral-50/80 backdrop-blur-sm">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
              </div>
              <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-white border border-neutral-200 text-[11px] text-neutral-400 font-mono shadow-sm">
                app.yourproduct.com/dashboard
              </div>
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded bg-neutral-200" />
                <div className="w-4 h-4 rounded bg-neutral-200" />
              </div>
            </div>

            {/* App UI */}
            <div className="flex h-[320px]">
              {/* Sidebar */}
              <div className="w-[160px] border-r border-neutral-100 bg-neutral-50/80 p-3 flex flex-col gap-1 shrink-0">
                <div className="px-3 py-2 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/70 text-[11.5px] font-semibold text-orange-700 shadow-sm">Dashboard</div>
                {['Analytics', 'Users', 'Settings', 'Integrations'].map(item => (
                  <div key={item} className="px-3 py-2 rounded-lg text-[11.5px] text-neutral-400 hover:bg-white hover:text-neutral-600 cursor-default">{item}</div>
                ))}
                <div className="mt-auto px-3 py-2 rounded-lg bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-200/50 text-[11px] text-orange-700 font-semibold">
                  4 new reports
                </div>
              </div>

              {/* Main */}
              <div className="flex-1 p-5 bg-white relative">
                <div className="text-[13px] font-semibold text-neutral-700 mb-3">Recent feedback</div>
                <div className="space-y-2">
                  {[
                    { icon: '⚠️', text: 'Checkout flow — Step 3 broken', time: '2m ago', color: 'bg-red-50 border-red-100 text-red-700' },
                    { icon: '💬', text: "Can't find the export button", time: '5m ago', color: 'bg-amber-50 border-amber-100 text-amber-700' },
                    { icon: '🔍', text: 'Where is the billing settings?', time: '9m ago', color: 'bg-blue-50 border-blue-100 text-blue-600' },
                    { icon: '😤', text: 'Form resets on every submission', time: '14m ago', color: 'bg-orange-50 border-orange-100 text-orange-700' },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-[12px] ${item.color}`}>
                      <span className="text-[14px]">{item.icon}</span>
                      <span className="flex-1 font-medium">{item.text}</span>
                      <span className="text-[11px] opacity-60 shrink-0">{item.time}</span>
                    </div>
                  ))}
                </div>

                {/* Widget popup */}
                <div className="absolute bottom-4 right-4 w-[200px] rounded-xl border border-orange-200/60 bg-white shadow-[0_8px_32px_rgba(249,115,22,0.15)] overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
                    <span className="text-[13px]">🔍</span>
                    <span className="text-[11.5px] font-semibold text-neutral-700">What were you looking for?</span>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="w-full px-2.5 py-2 rounded-lg border border-neutral-200 text-[11px] text-neutral-400 bg-neutral-50">
                      Describe the issue...
                    </div>
                    <div className="w-full py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-semibold text-center shadow-sm shadow-orange-500/30">
                      Send feedback →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
