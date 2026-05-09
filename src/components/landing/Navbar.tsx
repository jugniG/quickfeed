import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Pitch', href: '#pitch' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
]

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
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow duration-300">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 4h10M2 7h7M2 10h5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-[15px] text-[#0A0A0A] tracking-tight" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>QuickFeed</span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="relative group px-3.5 py-1.5 text-[13.5px] text-neutral-500 hover:text-neutral-900 transition-colors duration-200 no-underline font-medium"
            >
              {label}
              {/* underline left→right on hover */}
              <span className="absolute bottom-0 left-3.5 right-3.5 h-[1.5px] bg-gradient-to-r from-orange-500 to-amber-400 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200 ease-out rounded-full" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2.5">
          <a
            href="/auth/signin"
            className="text-[13.5px] text-neutral-600 hover:text-neutral-900 font-medium no-underline transition-all duration-200 px-3 py-1.5 rounded-lg hover:bg-neutral-100"
          >
            Sign in
          </a>
          <a
            href="/auth/signup"
            className="relative flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13.5px] font-semibold shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow duration-300 no-underline overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <span className="relative">Get started</span>
            <svg className="relative" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  )
}
