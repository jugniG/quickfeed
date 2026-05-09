export function FooterCTA() {
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="max-w-[1100px] mx-auto px-6 pt-20 pb-10">

        {/* CTA card */}
        <div className="relative rounded-2xl bg-gradient-to-br from-orange-50 via-amber-50 to-white border border-orange-200/70 overflow-hidden px-10 py-16 flex flex-col items-center text-center mb-16 shadow-xl shadow-orange-500/[0.08]">
          {/* Glow blobs */}
          <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-gradient-to-r from-orange-300/30 to-amber-300/20 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-[-40px] right-[-60px] w-[300px] h-[200px] rounded-full bg-amber-300/20 blur-[60px] pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-300/60 bg-white/70 text-orange-600 text-[12px] font-semibold mb-6 shadow-sm backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
              Free forever on Hobby plan
            </div>
            <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.04em] text-[#0A0A0A] mb-4 max-w-[620px]">
              It's time to capture each report —{' '}
              <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">with a buttery smooth flow.</span>
            </h2>
            <p className="text-[16px] text-neutral-500 leading-[1.7] mb-8 max-w-[480px] font-normal">
              You've been on broken products that gave you nowhere to go. Don't be that product.{' '}
              Give your users one gesture. One moment. One place to tell you everything.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/auth/signup"
                className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[15px] font-semibold shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-shadow duration-300 no-underline cursor-pointer overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <span className="relative">Get your embed code — it's free</span>
                <svg className="relative" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7.5 2.5L12 7l-4.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="/auth/signin"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white border border-neutral-300 text-neutral-700 text-[15px] font-semibold hover:border-orange-300 hover:text-orange-600 shadow-sm hover:shadow-md transition-all duration-300 no-underline cursor-pointer"
              >
                Sign in
              </a>
            </div>
            <p className="mt-5 text-[12.5px] text-neutral-400 font-normal">No credit card required · 2 min setup · Cancel anytime</p>
          </div>
        </div>

        {/* Footer nav */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-neutral-100 pt-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-sm shadow-orange-500/30">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 3.5h9M1.5 6h6M1.5 8.5h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[13.5px] font-bold text-neutral-700">QuickFeed</span>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-2">
            {['Features', 'How it works', 'Pricing', 'Docs', 'Privacy', 'Terms'].map(link => (
              <a key={link} href="#" className="text-[12.5px] text-neutral-400 hover:text-orange-500 no-underline transition-colors duration-200">
                {link}
              </a>
            ))}
          </div>

          <div className="text-[12.5px] text-neutral-400">
            © {new Date().getFullYear()} QuickFeed
          </div>
        </div>
      </div>
    </footer>
  )
}
