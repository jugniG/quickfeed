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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        scrolled ? 'border-b border-neutral-200 shadow-[0_1px_3px_rgba(0,0,0,0.06)]' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-6 h-[58px] flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 no-underline">
          <div className="w-7 h-7 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 4h10M2 7h7M2 10h5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-semibold text-[15px] text-[#0A0A0A] tracking-tight">FeedbackHook</span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {['Features', 'How it works', 'Pricing', 'Docs'].map(item => (
            <a
              key={item}
              href="#"
              className="px-3.5 py-1.5 text-[13.5px] text-neutral-500 hover:text-neutral-900 rounded-md hover:bg-neutral-100 transition-colors no-underline font-medium"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2.5">
          <a href="/auth/signin" className="text-[13.5px] text-neutral-600 hover:text-neutral-900 font-medium no-underline transition-colors">
            Sign in
          </a>
          <a
            href="/auth/signup"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0A0A0A] text-white text-[13.5px] font-semibold hover:bg-neutral-800 transition-colors no-underline"
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
