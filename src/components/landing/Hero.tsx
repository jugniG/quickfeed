import { useEffect, useState } from 'react'

interface HeroProps {
  onTryWidget: () => void
}

export function Hero({ onTryWidget }: HeroProps) {
  const [blobPos, setBlobPos] = useState({ x: 50, y: 40 })

  useEffect(() => {
    let t = 0
    const tick = () => {
      t += 0.003
      setBlobPos({
        x: 50 + Math.sin(t * 1.3) * 12,
        y: 38 + Math.cos(t * 0.9) * 10,
      })
    }
    const id = setInterval(tick, 40)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative pt-[60px] min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center">

      {/* Animated gradient blobs */}
      <div
        className="absolute w-[700px] h-[500px] rounded-full pointer-events-none transition-all duration-[2000ms] ease-in-out"
        style={{
          left: `${blobPos.x}%`,
          top: `${blobPos.y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(251,146,60,0.18) 0%, rgba(251,191,36,0.08) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none transition-all duration-[3000ms] ease-in-out"
        style={{
          left: `${100 - blobPos.x + 20}%`,
          top: `${blobPos.y + 15}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 w-full pt-16 pb-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* LEFT — text */}
          <div className="flex-1 min-w-0 lg:max-w-[520px]">

            {/* Tagline badge */}
            <div className="flex mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 text-[12.5px] font-semibold text-orange-600 shadow-sm shadow-orange-100">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 shrink-0" />
                We don't let you miss a single inconvenience of your users
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.2rem,4.5vw,3.4rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[#0A0A0A] mb-3">
              Have you ever tried to report a broken experience —{' '}
              <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">and couldn't find the way?</span>
            </h1>

            {/* Stop guessing line */}
            <p className="text-[15px] font-semibold text-neutral-400 mb-4 tracking-tight">
              Stop guessing what your users want. Start hearing it — the moment they feel it.
            </p>

            {/* Sub */}
            <p className="text-[16.5px] text-neutral-500 leading-[1.75] mb-8 font-normal">
              Unknown paths. No feedback button. No email. No Discord link. You gave up.{' '}
              <span className="text-neutral-700 font-medium">Your users are doing the same thing on your product — right now.</span>
              {' '}FeedbackHook gives them one universal gesture:{' '}
              <kbd className="px-1.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-700 font-mono text-[13px] shadow-sm">Ctrl+F</kbd>
              {'. '}Instant. Frictionless. Buttery smooth.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <a
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[14.5px] font-semibold hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/45 transition-all duration-200 no-underline cursor-pointer"
              >
                Get your embed code — it's free
                <svg width="14" height="14" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5h9M7 2.5L11 6.5l-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <button
                onClick={onTryWidget}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-200 bg-white text-[14.5px] font-semibold text-neutral-600 hover:border-orange-200 hover:bg-orange-50/50 hover:text-orange-600 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 shrink-0" />
                See how it works ↓
              </button>
            </div>
          </div>

          {/* RIGHT — product visual */}
          <div className="flex-1 w-full lg:max-w-[520px] shrink-0">
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-orange-200/30 to-amber-100/20 blur-2xl pointer-events-none" />

              <div className="relative rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_50px_rgba(249,115,22,0.10),0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-100 bg-neutral-50/80">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                    <div className="w-3 h-3 rounded-full bg-green-400/60" />
                  </div>
                  <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-white border border-neutral-200 text-[11px] text-neutral-400 font-mono shadow-sm">
                    app.yourproduct.com/dashboard
                  </div>
                </div>

                {/* App content */}
                <div className="flex h-[300px]">
                  {/* Sidebar */}
                  <div className="w-[140px] border-r border-neutral-100 bg-neutral-50/80 p-2.5 flex flex-col gap-1 shrink-0">
                    <div className="px-2.5 py-2 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/70 text-[11px] font-semibold text-orange-700">Dashboard</div>
                    {['Analytics', 'Users', 'Settings'].map(item => (
                      <div key={item} className="px-2.5 py-2 rounded-lg text-[11px] text-neutral-400">{item}</div>
                    ))}
                    <div className="mt-auto px-2.5 py-2 rounded-lg bg-orange-500/10 border border-orange-200/50 text-[10.5px] text-orange-700 font-semibold">
                      4 new reports
                    </div>
                  </div>

                  {/* Main */}
                  <div className="flex-1 p-4 bg-white relative">
                    <div className="text-[12px] font-semibold text-neutral-700 mb-2.5">Recent feedback</div>
                    <div className="space-y-1.5">
                      {[
                        { icon: '⚠️', text: 'Checkout flow — Step 3 broken', time: '2m ago', color: 'bg-red-50 border-red-100 text-red-700' },
                        { icon: '💬', text: "Can't find the export button", time: '5m ago', color: 'bg-amber-50 border-amber-100 text-amber-700' },
                        { icon: '🔍', text: 'Where is billing settings?', time: '9m ago', color: 'bg-blue-50 border-blue-100 text-blue-600' },
                        { icon: '😤', text: 'Form resets on submit', time: '14m ago', color: 'bg-orange-50 border-orange-100 text-orange-700' },
                      ].map((item, i) => (
                        <div key={i} className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg border text-[11px] ${item.color}`}>
                          <span className="text-[12px]">{item.icon}</span>
                          <span className="flex-1 font-medium truncate">{item.text}</span>
                          <span className="text-[10px] opacity-60 shrink-0">{item.time}</span>
                        </div>
                      ))}
                    </div>

                    {/* Widget popup */}
                    <div className="absolute bottom-3 right-3 w-[185px] rounded-xl border border-orange-200/70 bg-white shadow-[0_8px_32px_rgba(249,115,22,0.18)] overflow-hidden">
                      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
                        <span className="text-[12px]">🔍</span>
                        <span className="text-[11px] font-semibold text-neutral-700">What were you looking for?</span>
                      </div>
                      <div className="p-2.5 space-y-2">
                        <div className="w-full px-2 py-1.5 rounded-lg border border-neutral-200 text-[10.5px] text-neutral-400 bg-neutral-50">
                          Describe what you saw...
                        </div>
                        <div className="w-full py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10.5px] font-semibold text-center shadow-sm shadow-orange-500/25">
                          Send feedback →
                        </div>
                      </div>
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
