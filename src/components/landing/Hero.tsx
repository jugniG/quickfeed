interface HeroProps {
  onTryWidget: () => void
}

export function Hero({ onTryWidget }: HeroProps) {
  return (
    <section className="relative pt-[58px] min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center">

      {/* Subtle gradient blobs */}
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-amber-100/60 blur-[120px] pointer-events-none" />
      <div className="absolute top-[120px] right-[-100px] w-[400px] h-[400px] rounded-full bg-orange-100/40 blur-[100px] pointer-events-none" />
      <div className="absolute top-[200px] left-[-80px] w-[300px] h-[300px] rounded-full bg-amber-50/60 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 w-full pt-16 pb-0">

        {/* Badge */}
        <div className="flex justify-center mb-7">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-[12.5px] font-medium text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Now with Ctrl+F interception
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-50">
              <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Headline — centered, mixed weight */}
        <h1 className="text-center text-[clamp(2.6rem,5.5vw,4rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[#0A0A0A] mb-5 max-w-[820px] mx-auto">
          Capture every user frustration{' '}
          <span className="text-amber-500 font-bold">before they leave.</span>
        </h1>

        {/* Sub */}
        <p className="text-center text-[17px] text-neutral-500 leading-[1.7] mb-8 max-w-[520px] mx-auto font-normal">
          FeedbackHook intercepts{' '}
          <kbd className="px-1.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-600 font-mono text-[13px]">Ctrl+F</kbd>
          {' '}on your product — turning the universal "something is broken" signal into structured, actionable feedback.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <a
            href="/auth/signup"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A0A0A] text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors no-underline"
          >
            Start for free
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M7 2.5L11 6.5l-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <button
            onClick={onTryWidget}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-200 bg-white text-[14px] font-medium text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Try live demo
          </button>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-3 text-[13px] text-neutral-400 mb-14">
          <div className="flex -space-x-2">
            {['#f0a', '#a0f', '#0af', '#fa0', '#0fa'].map((c, i) => (
              <div key={i} style={{ background: `${c}22`, borderColor: 'white' }} className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-semibold text-neutral-600">
                {['F','J','A','M','R'][i]}
              </div>
            ))}
          </div>
          <span><span className="text-neutral-600 font-medium">500+</span> teams catching silent bugs</span>
        </div>

        {/* Product mockup — browser shell at bottom */}
        <div className="relative mx-auto max-w-[860px]">
          {/* shadow rim */}
          <div className="absolute -inset-px rounded-t-2xl bg-gradient-to-b from-neutral-200 to-transparent pointer-events-none" />

          <div className="rounded-t-2xl border border-b-0 border-neutral-200 bg-white shadow-[0_-4px_40px_rgba(0,0,0,0.08)] overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-100 bg-neutral-50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-neutral-200" />
                <div className="w-3 h-3 rounded-full bg-neutral-200" />
                <div className="w-3 h-3 rounded-full bg-neutral-200" />
              </div>
              <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-white border border-neutral-200 text-[11px] text-neutral-400 font-mono">
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
                <div className="px-3 py-2 rounded-lg bg-white border border-neutral-200 text-[11.5px] font-medium text-neutral-800 shadow-sm">Dashboard</div>
                {['Analytics', 'Users', 'Settings', 'Integrations'].map(item => (
                  <div key={item} className="px-3 py-2 rounded-lg text-[11.5px] text-neutral-400">{item}</div>
                ))}
                <div className="mt-auto px-3 py-2 rounded-lg bg-amber-50 border border-amber-100 text-[11px] text-amber-700 font-medium">
                  4 new reports
                </div>
              </div>

              {/* Main */}
              <div className="flex-1 p-5 bg-white relative">
                <div className="text-[13px] font-medium text-neutral-700 mb-3">Recent feedback</div>
                <div className="space-y-2">
                  {[
                    { icon: '⚠️', text: 'Checkout flow — Step 3 broken', time: '2m ago', color: 'bg-red-50 border-red-100 text-red-700' },
                    { icon: '💬', text: 'Can\'t find the export button', time: '5m ago', color: 'bg-amber-50 border-amber-100 text-amber-700' },
                    { icon: '🔍', text: 'Where is the billing settings?', time: '9m ago', color: 'bg-blue-50 border-blue-100 text-blue-600' },
                    { icon: '😤', text: 'Form resets on every submission', time: '14m ago', color: 'bg-orange-50 border-orange-100 text-orange-700' },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-[12px] ${item.color}`}>
                      <span className="text-[14px]">{item.icon}</span>
                      <span className="flex-1 font-normal">{item.text}</span>
                      <span className="text-[11px] opacity-60 shrink-0">{item.time}</span>
                    </div>
                  ))}
                </div>

                {/* Widget popup */}
                <div className="absolute bottom-4 right-4 w-[200px] rounded-xl border border-neutral-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.10)] overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-amber-50 border-b border-amber-100">
                    <span className="text-[13px]">🔍</span>
                    <span className="text-[11.5px] font-medium text-neutral-700">What were you looking for?</span>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="w-full px-2.5 py-2 rounded-lg border border-neutral-200 text-[11px] text-neutral-400 bg-neutral-50">
                      Describe the issue...
                    </div>
                    <div className="w-full py-1.5 rounded-lg bg-amber-500 text-white text-[11px] font-medium text-center">
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
