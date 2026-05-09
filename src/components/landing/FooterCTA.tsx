import { DomainInput } from '../ui/DomainInput'

export function FooterCTA() {
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="max-w-[1100px] mx-auto px-6 pt-20 pb-10">

        {/* CTA card */}
        <div className="relative rounded-2xl bg-gradient-to-br from-orange-50 via-amber-50 to-white border border-orange-200/70 overflow-hidden px-10 py-16 flex flex-col items-center text-center mb-16 shadow-xl shadow-orange-500/[0.08]">
          {/* Glow blobs */}
          <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-gradient-to-r from-orange-300/30 to-amber-300/20 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-[-40px] right-[-60px] w-[300px] h-[200px] rounded-full bg-amber-300/20 blur-[60px] pointer-events-none" />

          <div className="relative z-10 w-full max-w-[600px] flex flex-col items-center">
            <h2
              className="text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.04em] text-[#0A0A0A] mb-4 max-w-[620px]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              It's time to capture every report{' '}
              <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">with a buttery smooth flow.</span>
            </h2>
            <p className="text-[16px] text-neutral-500 leading-[1.7] mb-8 max-w-[480px] font-normal">
              Give your users one gesture, one moment, one place to tell you everything.
            </p>

            <div className="w-full max-w-[460px] mb-4">
              <DomainInput btnLabel="Add to your product →" />
            </div>

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
            <span className="text-[13.5px] text-neutral-700" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>QuickFeed</span>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-2">
            {['Features', 'How it works', 'Pricing', 'Docs', 'Privacy', 'Terms'].map(link => (
              <a key={link} href="#" className="text-[12.5px] text-neutral-400 hover:text-orange-500 no-underline transition-colors duration-200">
                {link}
              </a>
            ))}
          </div>

          <div className="text-[12.5px] text-neutral-400">
            &copy; {new Date().getFullYear()} QuickFeed
          </div>
        </div>
      </div>
    </footer>
  )
}
