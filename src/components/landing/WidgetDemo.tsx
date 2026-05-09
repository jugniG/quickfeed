import { useState } from 'react'

interface WidgetDemoProps {
  onTryWidget: () => void
}

export function WidgetDemoSection({ onTryWidget }: WidgetDemoProps) {
  return (
    <section className="py-28 bg-white border-b border-neutral-100">
      <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left — text */}
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-5 h-px bg-neutral-300" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-400">Live demo</span>
          </div>
          <h2 className="text-[clamp(1.9rem,3.5vw,2.6rem)] font-black tracking-[-0.035em] leading-[1.1] text-[#0A0A0A] mb-5">
            See exactly what your users will see.
          </h2>
          <p className="text-[16px] text-neutral-500 leading-[1.65] mb-8">
            Press <kbd className="px-1.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-700 font-mono text-[13px]">Ctrl+F</kbd> right now — on this page — to trigger the widget and experience it yourself.
          </p>

          <div className="space-y-3 mb-10">
            {[
              'Appears instantly, no page reload',
              'Captures page URL and browser context automatically',
              'Optional screenshot attachment',
              'Submits directly to your dashboard',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-[14px] text-neutral-600">
                <div className="w-5 h-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {item}
              </div>
            ))}
          </div>

          <button
            onClick={onTryWidget}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A0A0A] text-white text-[14px] font-semibold hover:bg-neutral-800 transition-colors"
          >
            Open the widget
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M7 2.5L11 6.5l-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Right — inline widget mock */}
        <div className="relative flex justify-center">
          <div className="w-full max-w-[380px] rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.10)] overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-neutral-100 bg-amber-50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5" stroke="#F59E0B" strokeWidth="1.5"/>
                  <path d="M11 11l3 3" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="text-[13px] font-bold text-neutral-800">What were you looking for?</div>
                <div className="text-[11px] text-neutral-500">Help us improve this page</div>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-3">
              <div>
                <label className="block text-[12px] font-semibold text-neutral-700 mb-1.5">Describe the issue</label>
                <div className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] text-neutral-400 min-h-[80px] flex items-start">
                  I couldn't find the export button anywhere...
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-neutral-200 bg-neutral-50 text-[12px] text-neutral-400">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="2" width="12" height="10" rx="2" stroke="#D1D5DB" strokeWidth="1.2"/>
                  <circle cx="4.5" cy="5.5" r="1" fill="#D1D5DB"/>
                  <path d="M1 9l3.5-3 3 3 2-2 3.5 3" stroke="#D1D5DB" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
                <span>Attach a screenshot <span className="text-neutral-300">— optional</span></span>
              </div>

              {/* Context row */}
              <div className="flex gap-2">
                <div className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-[11px] text-neutral-400 truncate">
                  /dashboard/settings
                </div>
                <div className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-[11px] text-neutral-400">
                  Chrome 124
                </div>
              </div>

              <button className="w-full py-2.5 rounded-xl bg-amber-500 text-white text-[13px] font-bold hover:bg-amber-600 transition-colors">
                Send feedback →
              </button>

              <div className="text-center text-[11px] text-neutral-400">
                Powered by <span className="font-semibold text-neutral-500">FeedbackHook</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

interface WidgetOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function WidgetOverlay({ isOpen, onClose }: WidgetOverlayProps) {
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!message.trim()) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setMessage('')
      onClose()
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-end p-6 pointer-events-none">
      <div className="pointer-events-auto w-[380px] rounded-2xl border border-neutral-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden">
        {submitted ? (
          <div className="p-8 flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-2xl">✓</div>
            <div className="text-[15px] font-bold text-neutral-800">Thanks for the feedback!</div>
            <div className="text-[13px] text-neutral-500">Our team will look into this right away.</div>
          </div>
        ) : (
          <>
            <div className="px-5 py-4 border-b border-neutral-100 bg-amber-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="7" cy="7" r="5" stroke="#F59E0B" strokeWidth="1.5"/>
                    <path d="M11 11l3 3" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] font-bold text-neutral-800">What were you looking for?</div>
                  <div className="text-[11px] text-neutral-500">Help us improve this page</div>
                </div>
              </div>
              <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-amber-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <label className="block text-[12px] font-semibold text-neutral-700 mb-1.5">Describe the issue</label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="I couldn't find..."
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] text-neutral-700 placeholder-neutral-400 min-h-[80px] resize-none focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition-all"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-[11px] text-neutral-400 truncate">
                  {typeof window !== 'undefined' ? window.location.pathname : '/'}
                </div>
                <div className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-[11px] text-neutral-400">
                  Chrome
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!message.trim()}
                className="w-full py-2.5 rounded-xl bg-amber-500 text-white text-[13px] font-bold hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send feedback →
              </button>

              <div className="text-center text-[11px] text-neutral-400">
                Powered by <span className="font-semibold text-neutral-500">FeedbackHook</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
