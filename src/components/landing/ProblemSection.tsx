export function ProblemSection() {
  const cards = [
    {
      stat: '25 of 26',
      color: 'from-red-500 to-rose-400',
      shadow: 'shadow-red-500/10',
      border: 'hover:border-red-200',
      icon: '👻',
      title: 'leave silently',
      desc: 'For every user who reports a bug, 25 others just close the tab. Not because they don\'t care — because there was no obvious way to say something.',
    },
    {
      stat: '91%',
      color: 'from-orange-500 to-amber-400',
      shadow: 'shadow-orange-500/10',
      border: 'hover:border-orange-200',
      icon: '🤐',
      title: 'never report friction',
      desc: 'They didn\'t fill a form. They didn\'t email support. They experienced something broken, shrugged, and left. You never knew.',
    },
    {
      stat: '∞ steps',
      color: 'from-amber-500 to-yellow-400',
      shadow: 'shadow-amber-500/10',
      border: 'hover:border-amber-200',
      icon: '🧩',
      title: 'to report a bug the old way',
      desc: 'Find the Discord. Get an invite. Locate the right channel. Describe what you saw. Most users quit this process before they even start.',
    },
    {
      stat: '< 5min',
      color: 'from-rose-500 to-pink-400',
      shadow: 'shadow-rose-500/10',
      border: 'hover:border-rose-200',
      icon: '⏳',
      title: 'before context evaporates',
      desc: 'By the time your user finds a way to report, they\'ve forgotten the exact page, the exact state, the exact moment. The bug report you get is useless.',
    },
  ]

  return (
    <section className="py-28 bg-[#FAFAFA] border-b border-neutral-100">
      <div className="max-w-[1100px] mx-auto px-6">

        <div className="max-w-[580px] mb-14">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-5 h-px bg-gradient-to-r from-orange-400 to-amber-400" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-orange-500">The problem</span>
          </div>
          <h2 className="text-[clamp(1.9rem,3.5vw,2.6rem)] font-bold tracking-[-0.03em] leading-[1.15] text-[#0A0A0A] mb-4">
            Your users are frustrated. And they have nowhere to go.
          </h2>
          <p className="text-[15.5px] text-neutral-500 leading-[1.7] font-normal">
            Right now, on your product, someone is stuck. They want to tell you. But the path is invisible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl bg-white border border-neutral-200 p-6 flex flex-col gap-4 hover:shadow-xl ${c.shadow} ${c.border} transition-all duration-300 overflow-hidden`}
            >
              {/* subtle top gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${c.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="flex items-start justify-between">
                <span className="text-[28px] leading-none">{c.icon}</span>
                <span className={`text-[11px] font-bold tracking-wide px-2.5 py-1 rounded-full bg-gradient-to-r ${c.color} bg-clip-text text-transparent border border-current opacity-60 group-hover:opacity-100 transition-opacity`}>
                  {c.stat}
                </span>
              </div>

              <div>
                <div className={`text-[1.6rem] font-extrabold tracking-[-0.04em] bg-gradient-to-r ${c.color} bg-clip-text text-transparent mb-1`}>
                  {c.stat}
                </div>
                <h3 className="text-[14px] font-bold text-[#0A0A0A] mb-2">{c.title}</h3>
                <p className="text-[13px] text-neutral-500 leading-[1.65] font-normal">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Below stats callout */}
        <div className="mt-8 px-7 py-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
          <p className="text-[14px] text-neutral-600 leading-[1.7] font-normal text-center">
            Traditional feedback tools only capture{' '}
            <span className="font-bold text-neutral-800">the 1 in 26</span>{' '}
            who were already going to tell you.{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent font-bold">FeedbackHook catches the other 25.</span>
          </p>
        </div>

      </div>
    </section>
  )
}
