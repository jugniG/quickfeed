const features = [
  {
    icon: '📋',
    title: 'Screenshot paste',
    desc: 'Ctrl+V drops a screenshot right into the widget. Users show you exactly what broke — no words needed.',
    accent: 'from-orange-400 to-amber-300',
    iconBg: 'bg-orange-50',
    iconBorder: 'border-orange-100',
  },
  {
    icon: '📍',
    title: 'Page-aware by default',
    desc: 'Every report is automatically tagged with the exact URL. You know where on your product the friction lives.',
    accent: 'from-amber-400 to-yellow-300',
    iconBg: 'bg-amber-50',
    iconBorder: 'border-amber-100',
  },
  {
    icon: '⚡',
    title: 'Zero friction for users',
    desc: 'No account. No Discord. No form hunt. Ctrl+Shift+F → type → send. Three seconds, no unknown paths.',
    accent: 'from-orange-400 to-rose-300',
    iconBg: 'bg-orange-50',
    iconBorder: 'border-orange-100',
  },
  {
    icon: '🪪',
    title: 'Identify who reported',
    desc: 'Know exactly which user sent which feedback. Link reports to real people — name, email, session — so you can follow up, not just fix.',
    accent: 'from-violet-400 to-purple-300',
    iconBg: 'bg-violet-50',
    iconBorder: 'border-violet-100',
  },
  {
    icon: '🌐',
    title: 'Works on any stack',
    desc: 'One <script> tag. React, Next.js, Webflow, WordPress, plain HTML — doesn\'t matter.',
    accent: 'from-amber-400 to-orange-300',
    iconBg: 'bg-amber-50',
    iconBorder: 'border-amber-100',
  },
  {
    icon: '🎨',
    title: 'Full visual customizer',
    desc: 'Colors, blur, title, description, button — live preview as you tweak. Ships looking exactly like yours.',
    accent: 'from-rose-400 to-orange-300',
    iconBg: 'bg-rose-50',
    iconBorder: 'border-rose-100',
  },
]

const comingSoon = {
  icon: '💌',
  title: 'Thank-you cards',
  desc: 'When you fix a user\'s reported issue, send them a personal card — right inside the product. A small gesture that turns a frustration into loyalty.',
  note: 'Like Appwrite\'s bottom-left announcement cards — but for your users\' resolved problems.',
  accent: 'from-pink-400 to-rose-300',
  iconBg: 'bg-pink-50',
  iconBorder: 'border-pink-100',
}

export function FeaturesGrid() {
  return (
    <section id="features" className="py-28 bg-[#FAFAFA] border-b border-neutral-100">
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

              {/* icon — light bg so emoji is legible */}
              <div className={`w-11 h-11 rounded-xl ${f.iconBg} border ${f.iconBorder} flex items-center justify-center text-[22px] group-hover:scale-110 transition-transform duration-300`}>
                {f.icon}
              </div>

              <div>
                <h3 className="text-[15px] font-bold text-[#0A0A0A] mb-2">{f.title}</h3>
                <p className="text-[13.5px] text-neutral-500 leading-[1.65] font-normal">{f.desc}</p>
              </div>

              {/* subtle corner gradient */}
              <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${f.accent} opacity-0 group-hover:opacity-[0.06] rounded-tl-3xl transition-opacity duration-300`} />
            </div>
          ))}

          {/* Coming soon card */}
          <div className="group relative bg-white rounded-2xl border border-dashed border-pink-200 p-7 flex flex-col gap-4 hover:border-pink-300 hover:shadow-xl hover:shadow-pink-500/[0.08] transition-all duration-300 overflow-hidden sm:col-span-2 lg:col-span-1">
            {/* Coming soon badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-500 text-[10.5px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              Coming soon
            </div>

            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${comingSoon.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            {/* icon */}
            <div className={`w-11 h-11 rounded-xl ${comingSoon.iconBg} border ${comingSoon.iconBorder} flex items-center justify-center text-[22px] group-hover:scale-110 transition-transform duration-300`}>
              {comingSoon.icon}
            </div>

            <div>
              <h3 className="text-[15px] font-bold text-[#0A0A0A] mb-2">{comingSoon.title}</h3>
              <p className="text-[13.5px] text-neutral-500 leading-[1.65] font-normal mb-3">{comingSoon.desc}</p>
              {/* Appwrite-style mini card preview */}
              <div className="rounded-xl border border-pink-100 bg-gradient-to-br from-pink-50 to-rose-50 p-3 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white text-[13px] shrink-0 shadow-sm">
                  💌
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-neutral-700 leading-snug">Hey Alex — we fixed it! 🎉</p>
                  <p className="text-[10.5px] text-neutral-400 mt-0.5">The checkout bug you reported is resolved.</p>
                </div>
              </div>
            </div>

            <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${comingSoon.accent} opacity-0 group-hover:opacity-[0.06] rounded-tl-3xl transition-opacity duration-300`} />
          </div>
        </div>

      </div>
    </section>
  )
}
