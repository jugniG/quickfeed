import { useEffect, useState } from 'react'
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
                7-day free trial · No credit card required
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.2rem,4.5vw,3.4rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[#0A0A0A] mb-3">
              Have you ever tried to report a broken experience -{' '}
              <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">and couldn't find the way?</span>
            </h1>

            {/* Stop guessing line */}
            <p className="text-[15px] font-semibold text-neutral-400 mb-4 tracking-tight">
              Don't let this happen to your product.
            </p>

            {/* Sub */}
            <p className="text-[16.5px] text-neutral-500 leading-[1.75] mb-8 font-normal">
              We don't let you miss a single inconvenience of your users.
            </p>

            {/* CTA input */}
            <div className="w-full max-w-[480px] mb-4">
              <DomainInput btnLabel="Add →" onSuccess={(domain)=>{
                // @ts-expect-error
                window?.insightly(domain)
              }}  />
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
                    yourproduct.com
                  </div>
                </div>

                {/* Page content with overlay */}
                <div className="relative bg-neutral-50 min-h-[420px]">
                  {/* Blurred page skeleton behind overlay */}
                  <div className="p-5 blur-[2px] opacity-40 space-y-3 pointer-events-none select-none">
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

                  {/* Overlay — matches data-position="center" with blur */}
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(5px)' }}>
                    {/* Widget panel — centered, compact */}
                    <div className="w-full max-w-[300px] bg-white rounded-[20px] shadow-2xl overflow-hidden mx-4" style={{ transform: 'translateY(0) scale(1)', opacity: 1 }}>
                      <div className="p-5">
                        {/* Title */}
                        <p className="text-[15px] font-bold mb-0.5" style={{ color: '#0a0a0a' }}>Share your feedback</p>
                        <p className="text-[12px] mb-3" style={{ color: '#737373' }}>We read every response.</p>

                        {/* Paste hint */}
                        <div className="flex items-center gap-1 text-[10px] text-neutral-400 mb-1">
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <rect x="1" y="3" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                            <path d="M3 3V2a1 1 0 011-1h5a1 1 0 011 1v7a1 1 0 01-1 1H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                          Paste an image with Ctrl+V
                        </div>

                        {/* Textarea */}
                        <textarea
                          placeholder="Give us feedback…"
                          className="w-full px-2.5 py-2 border text-[13px] bg-transparent leading-relaxed resize-vertical min-h-[70px] outline-none focus:border-orange-500 transition-colors"
                          style={{ borderColor: '#e5e5e5', borderRadius: '8px', fontFamily: 'inherit' }}
                          disabled
                        />

                        {/* Email input */}
                        <input
                          type="email"
                          placeholder="Email (optional)"
                          className="w-full px-2.5 py-2 border text-[13px] bg-transparent mt-1.5 outline-none focus:border-orange-500 transition-colors"
                          style={{ borderColor: '#e5e5e5', borderRadius: '8px', fontFamily: 'inherit' }}
                          disabled
                        />

                        {/* Buttons */}
                        <div className="flex gap-2 mt-3">
                          <button
                            className="flex-1 py-2 text-[13px] font-semibold transition-opacity hover:opacity-80"
                            style={{ background: '#f5f5f5', color: '#555555', border: 'none', borderRadius: '8px', fontFamily: 'inherit', cursor: 'pointer' }}
                          >
                            Cancel
                          </button>
                          <button
                            className="flex-[2] py-2 text-[13px] font-semibold transition-opacity hover:opacity-88"
                            style={{ background: '#f97316', color: '#ffffff', border: 'none', borderRadius: '8px', fontFamily: 'inherit', cursor: 'pointer' }}
                          >
                            Send feedback
                          </button>
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
