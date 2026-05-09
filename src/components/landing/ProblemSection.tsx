export function ProblemSection() {
  const stats = [
    { value: '96%', label: 'of frustrated users never file a bug report' },
    { value: '7s', label: 'average time before they close the tab and leave' },
    { value: '$0', label: 'revenue recovered from silent rage-quits — until now' },
  ]

  const steps = [
    {
      step: '01',
      title: 'User hits a wall',
      desc: "They find a confusing UI, a broken flow, or can't find what they need. Frustration builds.",
      icon: '😤',
    },
    {
      step: '02',
      title: 'They reach for Ctrl+F',
      desc: "It's instinct. When something feels wrong, people search. That's the signal you've been missing.",
      icon: '⌨️',
    },
    {
      step: '03',
      title: 'FeedbackHook catches it',
      desc: "Instead of opening the browser search bar, your widget appears. They tell you exactly what's wrong.",
      icon: '🎯',
    },
  ]

  return (
    <section className="py-28 bg-[#FAFAFA] border-b border-neutral-100">
      <div className="max-w-[1100px] mx-auto px-6">

        <div className="max-w-[560px] mb-16">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-5 h-px bg-gradient-to-r from-orange-400 to-amber-400" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-orange-500">The problem</span>
          </div>
          <h2 className="text-[clamp(1.9rem,3.5vw,2.6rem)] font-bold tracking-[-0.03em] leading-[1.15] text-[#0A0A0A] mb-4">
            Your users are telling you what's broken. You just can't hear them.
          </h2>
          <p className="text-[15.5px] text-neutral-500 leading-[1.7] font-normal">
            Every product has a silent failure mode. Users encounter friction, instinctively press Ctrl+F to "search" for answers — and when nothing happens, they leave. Forever.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {steps.map((s, i) => (
            <div key={i} className="relative group p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/[0.07] transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <span className="text-[26px] leading-none">{s.icon}</span>
                <span className="text-[11px] font-bold text-neutral-200 tracking-widest group-hover:text-orange-200 transition-colors">{s.step}</span>
              </div>
              <h3 className="text-[14.5px] font-bold text-[#0A0A0A] mb-2">{s.title}</h3>
              <p className="text-[13.5px] text-neutral-500 leading-[1.65] font-normal">{s.desc}</p>
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-3 z-10 w-5 h-5 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 flex items-center justify-center shadow-sm shadow-orange-300/50">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 4h6M4 1.5L6.5 4 4 6.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
          {stats.map((s, i) => (
            <div key={i} className="group bg-white px-8 py-7 hover:bg-gradient-to-br hover:from-orange-50/50 hover:to-amber-50/30 transition-all duration-300">
              <div className="text-[2.2rem] font-extrabold tracking-[-0.04em] bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent mb-1.5">{s.value}</div>
              <div className="text-[13px] text-neutral-500 leading-[1.5] font-normal">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
