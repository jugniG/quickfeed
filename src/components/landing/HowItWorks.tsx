export function HowItWorks() {
  const steps = [
    {
      num: '1',
      title: 'Install the snippet',
      desc: 'One script tag. Two minutes. Works with React, Next.js, Vue, or plain HTML. No rebuilds required.',
      code: `<script src="https://cdn.feedbackhook.com/v1.js"\n  data-key="YOUR_KEY">\n</script>`,
    },
    {
      num: '2',
      title: 'Ctrl+F becomes your hotline',
      desc: 'When users press Ctrl+F, your branded widget slides in. They describe the issue, attach a screenshot, and submit.',
      code: `// Auto-intercepts Ctrl+F\nFeedbackHook.config({\n  theme: 'light',\n  position: 'bottom-right',\n})`,
    },
    {
      num: '3',
      title: 'You get instant insight',
      desc: 'Every submission lands in your dashboard with URL, browser, user ID and a replay of what they were doing.',
      code: `{\n  "user": "u_9xkf2",\n  "page": "/checkout/step-3",\n  "message": "Can't find promo",\n  "screenshot": "...",\n}`,
    },
  ]

  return (
    <section className="py-28 bg-white border-b border-neutral-100">
      <div className="max-w-[1100px] mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-[480px]">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-5 h-px bg-neutral-300" />
              <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-neutral-400">How it works</span>
            </div>
            <h2 className="text-[clamp(1.9rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] leading-[1.15] text-[#0A0A0A]">
              From install to first insight in under 5 minutes.
            </h2>
          </div>
          <a href="/docs" className="flex items-center gap-1.5 text-[13.5px] font-medium text-neutral-500 hover:text-neutral-800 no-underline transition-colors">
            Read the docs
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2L10 6l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col rounded-2xl border border-neutral-200 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="bg-[#111] px-5 py-5 font-mono text-[11.5px] leading-[1.9] text-neutral-400 min-h-[110px] whitespace-pre">
                {s.code}
              </div>
              <div className="p-6 flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[12px] font-semibold text-amber-600">
                    {s.num}
                  </div>
                  <h3 className="text-[14.5px] font-semibold text-[#0A0A0A]">{s.title}</h3>
                </div>
                <p className="text-[13.5px] text-neutral-500 leading-[1.65] font-normal">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-7 py-5 rounded-2xl bg-amber-50 border border-amber-100">
          <div className="flex items-center gap-3">
            <span className="text-[20px]">⚡</span>
            <div>
              <div className="text-[13.5px] font-semibold text-neutral-800">No code changes to your product</div>
              <div className="text-[13px] text-neutral-500 font-normal">Just a script tag. Works on any stack.</div>
            </div>
          </div>
          <a href="/auth/signup" className="shrink-0 px-5 py-2 rounded-full bg-[#0A0A0A] text-white text-[13px] font-medium no-underline hover:bg-neutral-800 transition-colors">
            Get the snippet →
          </a>
        </div>

      </div>
    </section>
  )
}
