const features = [
  {
    icon: '📋',
    title: 'Screenshot paste',
    desc: 'Ctrl+V drops a screenshot right into the widget. Users show you exactly what broke — no words needed.',
    accent: 'from-orange-500 to-amber-400',
  },
  {
    icon: '📍',
    title: 'Page-aware by default',
    desc: 'Every report is automatically tagged with the exact URL. You know where on your product the friction lives.',
    accent: 'from-amber-500 to-yellow-400',
  },
  {
    icon: '🚀',
    title: 'Zero friction for users',
    desc: 'No account. No Discord. No form hunt. Ctrl+F → type → send. Three seconds, no unknown paths.',
    accent: 'from-orange-500 to-rose-400',
  },
  {
    icon: '🔐',
    title: 'Anonymous or identified',
    desc: 'Your call. Toggle whether to ask for email — per project, per widget. Users never feel surveilled.',
    accent: 'from-amber-400 to-orange-400',
  },
  {
    icon: '🌐',
    title: 'Works on any stack',
    desc: 'One <script> tag. React, Next.js, Webflow, WordPress, plain HTML — doesn\'t matter.',
    accent: 'from-orange-400 to-amber-500',
  },
  {
    icon: '🎨',
    title: 'Full visual customizer',
    desc: 'Colors, blur, title, description, button — live preview as you tweak. Ships looking exactly like yours.',
    accent: 'from-rose-400 to-orange-400',
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-28 bg-[#FAFAFA] border-b border-neutral-100">
      <div className="max-w-[1100px] mx-auto px-6">

        <div className="max-w-[520px] mb-14">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-5 h-px bg-gradient-to-r from-orange-400 to-amber-400" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-orange-500">Features</span>
          </div>
          <h2 className="text-[clamp(1.9rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] leading-[1.15] text-[#0A0A0A]">
            Everything that makes reporting feel effortless.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl border border-neutral-200 p-7 flex flex-col gap-4 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/[0.07] transition-all duration-300 overflow-hidden"
            >
              {/* hover top bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* icon */}
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.accent} flex items-center justify-center text-[20px] shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300`}>
                {f.icon}
              </div>

              <div>
                <h3 className="text-[15px] font-bold text-[#0A0A0A] mb-2">{f.title}</h3>
                <p className="text-[13.5px] text-neutral-500 leading-[1.65] font-normal">{f.desc}</p>
              </div>

              {/* subtle corner gradient */}
              <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${f.accent} opacity-0 group-hover:opacity-[0.04] rounded-tl-3xl transition-opacity duration-300`} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
