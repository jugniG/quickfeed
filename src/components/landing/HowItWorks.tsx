export function HowItWorks() {
  const steps = [
    {
      num: '1',
      title: 'You: Paste one line',
      desc: 'Drop one <script> tag on any page. Works on React, Next.js, Webflow, WordPress — anything. 30 seconds.',
      code: `<script\n  src="https://cdn.quickfeed.com/v1.js"\n  data-key="YOUR_KEY">\n</script>`,
    },
    {
      num: '2',
      title: 'Your user: Cmd+Shift+F',
      desc: 'Instead of browser search, your branded overlay appears. They describe what\'s broken, paste a screenshot from clipboard, hit send. No signup. No redirect.',
      code: `// Auto-intercepts Cmd+Shift+F\nQuickFeed.config({\n  theme: 'light',\n  position: 'bottom-right',\n  accentColor: '#your-brand',\n})`,
    },
    {
      num: '3',
      title: 'You: See everything',
      desc: 'The exact page URL. Their message. Their screenshot. Delivered to your dashboard the instant they hit send — while the frustration is still fresh.',
      code: `{\n  "user": "u_9xkf2",\n  "page": "/checkout/step-3",\n  "message": "Can't find promo",\n  "screenshot": "...",\n  "timestamp": "now"\n}`,
    },
  ]

  return (
    <section className="py-28 bg-white border-b border-neutral-100">
      <div className="max-w-[1100px] mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-[480px]">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-5 h-px bg-gradient-to-r from-orange-400 to-amber-400" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-orange-500">How it works</span>
            </div>
            <h2 className="text-[clamp(1.9rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] leading-[1.15] text-[#0A0A0A]">
              One script tag. A buttery smooth feedback flow.
            </h2>
            <p className="mt-3 text-[15px] text-neutral-500 leading-[1.7]">So easy your users will actually use it.</p>
          </div>
          <a href="/docs" className="flex items-center gap-1.5 text-[13.5px] font-semibold text-neutral-500 hover:text-orange-600 no-underline transition-colors group">
            Read the docs
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M2 6h8M6 2L10 6l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div key={i} className="group flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/[0.07] transition-all duration-300">
              {/* Code block */}
              <div className="relative bg-[#0f0f0f] px-5 py-4 font-mono text-[11.5px] leading-[1.9] text-neutral-500 min-h-[120px] whitespace-pre">
                {/* line number gutter */}
                <div className="absolute left-0 top-0 bottom-0 w-8 border-r border-white/5 flex flex-col pt-4 items-center gap-[6px]">
                  {s.code.split('\n').map((_, j) => (
                    <span key={j} className="text-[10px] text-white/15 leading-[1.9]">{j + 1}</span>
                  ))}
                </div>
                <div className="pl-6">
                  {s.code.split('\n').map((line, j) => (
                    <div key={j}>
                      {j === 0
                        ? <span className="text-orange-400/80">{line}</span>
                        : line.includes(':') || line.includes('"')
                          ? <span className="text-neutral-300">{line}</span>
                          : <span>{line}</span>
                      }
                    </div>
                  ))}
                </div>
              </div>
              {/* Content */}
              <div className="p-6 flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-[13px] font-bold text-white shadow-md shadow-orange-500/30 shrink-0">
                    {s.num}
                  </div>
                  <h3 className="text-[14.5px] font-bold text-[#0A0A0A]">{s.title}</h3>
                </div>
                <p className="text-[13.5px] text-neutral-500 leading-[1.65] font-normal">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-7 py-5 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/60 shadow-sm shadow-orange-100">
          <div className="flex items-center gap-3">
            <span className="text-[22px]">⚡</span>
            <div>
              <div className="text-[13.5px] font-bold text-neutral-800">No code changes to your product</div>
              <div className="text-[13px] text-neutral-500 font-normal">Just a script tag. Works on any stack.</div>
            </div>
          </div>
          <a
            href="/auth/signup"
            className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] font-semibold no-underline hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 cursor-pointer"
          >
            Get the snippet →
          </a>
        </div>

      </div>
    </section>
  )
}
