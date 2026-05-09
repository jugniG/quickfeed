import { useEffect, useState } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-neutral-200/80 shadow-[0_2px_20px_rgba(0,0,0,0.06)]'
          : 'bg-white/60 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 no-underline group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 4h10M2 7h7M2 10h5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-bold text-[15px] text-[#0A0A0A] tracking-tight">FeedbackHook</span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {['Features', 'How it works', 'Pricing', 'Docs'].map(item => (
            <a
              key={item}
              href="#"
              className="px-3.5 py-1.5 text-[13.5px] text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-all duration-150 no-underline font-medium"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2.5">
          <a
            href="/auth/signin"
            className="text-[13.5px] text-neutral-600 hover:text-neutral-900 font-medium no-underline transition-colors px-3 py-1.5 rounded-lg hover:bg-neutral-100"
          >
            Sign in
          </a>
          <a
            href="/auth/signup"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13.5px] font-semibold hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 no-underline"
          >
            Get started
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  )
}
