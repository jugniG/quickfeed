export function FooterCTA() {
  return (
    <footer className="bg-[#0A0A0A]">
      <div className="max-w-[1100px] mx-auto px-6 pt-20 pb-10">
        <div className="relative rounded-2xl bg-[#141414] border border-white/[0.08] overflow-hidden px-10 py-16 flex flex-col items-center text-center mb-16">
          {/* Orange glow */}
          <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/15 blur-[90px] pointer-events-none" />
          <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-orange-600/10 blur-[70px] pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-[12px] font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              Free forever on Hobby plan
            </div>
            <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.04em] text-white mb-4 max-w-[620px]">
              Capture every frustration<br />
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">before users leave.</span>
            </h2>
            <p className="text-[16px] text-neutral-400 leading-[1.65] mb-8 max-w-[440px] font-normal">
              Give users one universal gesture to instantly report bugs, friction, and confusion while context is still fresh.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[15px] font-semibold hover:from-orange-600 hover:to-amber-600 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-200 no-underline"
              >
                Start Free
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7.5 2.5L12 7l-4.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="/auth/signin"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white text-[15px] font-semibold hover:bg-white/15 hover:border-white/25 transition-all duration-200 no-underline backdrop-blur-sm"
              >
                Sign in
              </a>
            </div>
            <p className="mt-5 text-[12.5px] text-neutral-600 font-normal">No credit card required · 2 min setup · Cancel anytime</p>
          </div>
        </div>

        {/* Footer nav */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/[0.06] pt-8">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-sm shadow-orange-500/40">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 3.5h9M1.5 6h6M1.5 8.5h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[13.5px] font-bold text-white/80">FeedbackHook</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            {['Features', 'Pricing', 'Docs', 'Blog', 'Privacy', 'Terms'].map(link => (
              <a key={link} href="#" className="text-[12.5px] text-white/30 hover:text-orange-400 no-underline transition-colors">
                {link}
              </a>
            ))}
          </div>

          <div className="text-[12.5px] text-white/25">
            © {new Date().getFullYear()} FeedbackHook
          </div>
        </div>
      </div>
    </footer>
  )
}
