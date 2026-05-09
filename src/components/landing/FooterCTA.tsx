export function FooterCTA() {
  return (
    <footer className="bg-[#0A0A0A]">
      {/* Dark CTA card — exactly like reference */}
      <div className="max-w-[1100px] mx-auto px-6 pt-20 pb-10">
        <div className="relative rounded-2xl bg-[#141414] border border-white/[0.08] overflow-hidden px-10 py-16 flex flex-col items-center text-center mb-16">
          {/* Soft glow */}
          <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-amber-500/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.04em] text-white mb-4 max-w-[620px]">
              Capture every frustration<br />
              <span className="text-amber-400">before users leave.</span>
            </h2>
            <p className="text-[16px] text-neutral-400 leading-[1.65] mb-8 max-w-[440px] font-normal">
              Give users one universal gesture to instantly report bugs, friction, and confusion while context is still fresh.
            </p>
            <a
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-[#0A0A0A] text-[14px] font-medium hover:bg-neutral-100 transition-colors no-underline"
            >
              Start Free
            </a>
          </div>
        </div>

        {/* Footer nav */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/[0.06] pt-8">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 3.5h9M1.5 6h6M1.5 8.5h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[13.5px] font-medium text-white/70">FeedbackHook</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            {['Features', 'Pricing', 'Docs', 'Blog', 'Privacy', 'Terms'].map(link => (
              <a key={link} href="#" className="text-[12.5px] text-white/30 hover:text-white/60 no-underline transition-colors">
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
