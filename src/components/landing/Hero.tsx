import { useEffect, useState } from 'react'
import { ShortcutKey } from '../ui/ShortcutKey'
import { DomainInput } from '../ui/DomainInput'

interface HeroProps {
  onTryWidget?: () => void
}

export function Hero({ onTryWidget: _onTryWidget }: HeroProps) {
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
                Building a universal gesture - <ShortcutKey size="sm" />
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.2rem,4.5vw,3.4rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[#0A0A0A] mb-3">
              Have you ever tried to report a broken experience -{' '}
              <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">and couldn't find the way?</span>
            </h1>

            {/* Stop guessing line */}
            <p className="text-[15px] font-semibold text-neutral-400 mb-4 tracking-tight">
              Don't let this happen to you.
            </p>

            {/* Sub */}
            <p className="text-[16.5px] text-neutral-500 leading-[1.75] mb-8 font-normal">
              We don't let you miss a single inconvenience of your users.
            </p>

            {/* CTA input */}
            <div className="w-full max-w-[480px] mb-4">
              <DomainInput btnLabel="Add →" />
            </div>

          </div>

          {/* RIGHT — product visual */}
          <div className="flex-1 w-full lg:max-w-[500px] shrink-0">
            <div className="relative">
              {/* Ambient glow */}
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-orange-300/20 to-amber-200/10 blur-3xl pointer-events-none" />

              {/* Browser shell */}
              <div className="relative rounded-2xl border border-neutral-200 bg-white shadow-[0_12px_60px_rgba(249,115,22,0.12),0_2px_16px_rgba(0,0,0,0.07)] overflow-hidden">

                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-100 bg-neutral-50">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-white border border-neutral-200 text-[11px] text-neutral-400 font-mono">
                    yourproduct.com/checkout
                  </div>
                </div>

                {/* Page content behind widget */}
                <div className="relative bg-neutral-50 p-5">
                  {/* Blurred page skeleton */}
                  <div className="blur-[2px] opacity-40 space-y-3 mb-4 pointer-events-none select-none">
                    <div className="h-5 bg-neutral-300 rounded w-1/2" />
                    <div className="h-3 bg-neutral-200 rounded w-3/4" />
                    <div className="h-3 bg-neutral-200 rounded w-2/3" />
                    <div className="flex gap-3 mt-4">
                      <div className="h-10 bg-neutral-200 rounded-lg flex-1" />
                      <div className="h-10 bg-orange-200 rounded-lg w-24" />
                    </div>
                    <div className="h-3 bg-neutral-200 rounded w-1/2 mt-2" />
                    <div className="h-3 bg-neutral-200 rounded w-2/5" />
                  </div>

                  {/* Widget — the star */}
                  <div className="relative mx-auto max-w-[300px] rounded-2xl border border-orange-200/80 bg-white shadow-[0_16px_48px_rgba(249,115,22,0.22),0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden">
                    {/* Widget header */}
                    <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100 flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1.5C6 1.5 3 4 3 6.5s3 4 3 4" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                          <path d="M6 1.5C6 1.5 9 4 9 6.5s-3 4-3 4" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                          <path d="M1.5 6.5h9" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-[12px] font-bold text-neutral-800 leading-tight">What went wrong?</div>
                        <div className="text-[10.5px] text-neutral-400 leading-tight">Help us fix it in seconds</div>
                      </div>
                    </div>

                    {/* Widget body */}
                    <div className="p-4 space-y-3">
                      {/* Type chips */}
                      <div className="flex gap-1.5 flex-wrap">
                        {[
                          { label: '🐛 Bug', active: true },
                          { label: '😕 Confusing', active: false },
                          { label: '💡 Idea', active: false },
                        ].map(chip => (
                          <span key={chip.label} className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                            chip.active
                              ? 'bg-orange-500 text-white border-orange-500'
                              : 'bg-white text-neutral-400 border-neutral-200'
                          }`}>
                            {chip.label}
                          </span>
                        ))}
                      </div>

                      {/* Text input */}
                      <div className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-[11.5px] text-neutral-800 bg-neutral-50 leading-relaxed">
                        Checkout keeps resetting my cart...
                        <span className="inline-block w-0.5 h-3.5 bg-orange-500 ml-0.5 align-middle animate-pulse" />
                      </div>

                      {/* URL row */}
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-50 border border-neutral-100">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-neutral-400 shrink-0">
                          <path d="M4.5 5.5a2.5 2.5 0 003.5 0l1-1a2.5 2.5 0 00-3.5-3.5L4.5 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                          <path d="M5.5 4.5a2.5 2.5 0 00-3.5 0l-1 1a2.5 2.5 0 003.5 3.5L5.5 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                        </svg>
                        <code className="text-[10px] text-neutral-400 font-mono">/checkout</code>
                      </div>

                      {/* Submit */}
                      <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[12px] font-bold shadow-md shadow-orange-500/30 text-center">
                        Send report →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom toast notification */}
                <div className="flex items-center gap-3 px-4 py-3 bg-white border-t border-neutral-100">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5.5l2 2 4-4" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[12px] font-semibold text-neutral-700">Feedback received</span>
                    <span className="text-[11px] text-neutral-400 ml-2">landed in your QuickFeed dashboard</span>
                  </div>
                  <span className="text-[10.5px] text-neutral-300 shrink-0">just now</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
