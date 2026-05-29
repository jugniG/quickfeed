import { useState } from 'react'

type FeedbackStatus = 'unassigned' | 'pending' | 'inprogress' | 'completed' | 'rejected'

type Feedback = {
  id: number
  message: string
  submitterEmail: string | null
  url: string | null
  status: FeedbackStatus
  createdAt: Date
  images?: string[] | null
}

type Website = {
  id: string
  domain: string
  feedbackCount: number
}

const STATUS_CONFIG: Record<FeedbackStatus, { label: string; className: string; dot: string }> = {
  unassigned: {
    label: 'Unassigned',
    className: 'bg-neutral-100 text-neutral-500 border-neutral-200',
    dot: 'bg-neutral-400',
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-50 text-amber-600 border-amber-200',
    dot: 'bg-amber-500',
  },
  inprogress: {
    label: 'In Progress',
    className: 'bg-blue-50 text-blue-600 border-blue-200',
    dot: 'bg-blue-500',
  },
  completed: {
    label: 'Completed',
    className: 'bg-green-50 text-green-600 border-green-200',
    dot: 'bg-green-500',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-50 text-red-500 border-red-200',
    dot: 'bg-red-400',
  },
}

const STATUSES = Object.keys(STATUS_CONFIG) as FeedbackStatus[]

const MOCK_WEBSITES: Website[] = [
  { id: '1', domain: 'myapp.com', feedbackCount: 24 },
  { id: '2', domain: 'store.example.com', feedbackCount: 12 },
  { id: '3', domain: 'blog.dev.io', feedbackCount: 8 },
]

const INITIAL_FEEDBACKS: Feedback[] = [
  {
    id: 1,
    message: 'The checkout process keeps resetting my cart when I go back to add another item. This is really frustrating.',
    submitterEmail: 'sarah@example.com',
    url: 'https://myapp.com/checkout',
    status: 'unassigned',
    createdAt: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: 2,
    message: 'Love the new dashboard design! The charts are much easier to read now.',
    submitterEmail: 'mike@company.org',
    url: 'https://myapp.com/dashboard',
    status: 'inprogress',
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: 3,
    message: 'The mobile menu doesn\'t close when I tap outside of it. I have to use the X button.',
    submitterEmail: null,
    url: 'https://myapp.com/pricing',
    status: 'pending',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: 4,
    message: 'Would be great to have dark mode support. My eyes hurt at night.',
    submitterEmail: 'alex@startup.io',
    url: 'https://myapp.com/settings',
    status: 'completed',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 5,
    message: 'The search functionality is super slow when I have many results. Takes 5+ seconds to load.',
    submitterEmail: 'jordan@example.com',
    url: 'https://myapp.com/search',
    status: 'unassigned',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
]

function timeAgo(date: Date) {
  const diff = Date.now() - date.getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const day = Math.floor(h / 24)
  return `${day}d ago`
}

function getPathname(url: string) {
  try { return new URL(url).pathname || '/' } catch { return url }
}

function FeedbackCard({ feedback, onStatusChange }: { feedback: Feedback; onStatusChange: (id: number, status: FeedbackStatus) => void }) {
  const [open, setOpen] = useState(false)
  const cfg = STATUS_CONFIG[feedback.status]

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 hover:border-neutral-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200">
      {/* Top row: time + status */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11.5px] text-neutral-400">{timeAgo(feedback.createdAt)}</span>

        {/* Status dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => setOpen(v => !v)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11.5px] font-semibold transition-all ${cfg.className}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-60">
              <path d="M2.5 3.75L5 6.25l2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-1.5 w-[152px] bg-white rounded-xl border border-neutral-200 shadow-[0_8px_24px_rgba(0,0,0,0.1)] z-50 py-1 overflow-hidden">
              {STATUSES.map(s => {
                const c = STATUS_CONFIG[s]
                return (
                  <button
                    key={s}
                    onClick={() => {
                      onStatusChange(feedback.id, s)
                      setOpen(false)
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-[12px] font-medium transition-colors hover:bg-neutral-50 ${s === feedback.status ? 'opacity-50 pointer-events-none' : 'text-neutral-700'}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                    {c.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Message */}
      <p className="text-[14px] text-neutral-800 leading-[1.65] mb-4">
        "{feedback.message}"
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-neutral-400">
        <span className="flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M1.5 10.5c0-2.21 2.015-4 4.5-4s4.5 1.79 4.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          {feedback.submitterEmail || 'Anonymous'}
        </span>
        {feedback.url && (
          <span className="flex items-center gap-1">
            <code className="bg-neutral-100 text-neutral-500 text-[11px] px-1.5 py-0.5 rounded-md font-mono">
              {getPathname(feedback.url)}
            </code>
          </span>
        )}
      </div>
    </div>
  )
}

export function InteractiveDemo() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(INITIAL_FEEDBACKS)
  const [activeFilter, setActiveFilter] = useState<FeedbackStatus | 'all'>('all')

  const handleStatusChange = (id: number, newStatus: FeedbackStatus) => {
    setFeedbacks(prev => prev.map(f => f.id === id ? { ...f, status: newStatus } : f))
  }

  const filteredFeedbacks = activeFilter === 'all'
    ? feedbacks
    : feedbacks.filter(f => f.status === activeFilter)

  const filterCounts = STATUSES.reduce((acc, status) => {
    acc[status] = feedbacks.filter(f => f.status === status).length
    return acc
  }, {} as Record<FeedbackStatus, number>)

  const filters: { label: string; value: FeedbackStatus | 'all'; count: number }[] = [
    { label: 'All', value: 'all', count: feedbacks.length },
    { label: 'Unassigned', value: 'unassigned', count: filterCounts.unassigned },
    { label: 'Pending', value: 'pending', count: filterCounts.pending },
    { label: 'In Progress', value: 'inprogress', count: filterCounts.inprogress },
    { label: 'Completed', value: 'completed', count: filterCounts.completed },
    { label: 'Rejected', value: 'rejected', count: filterCounts.rejected },
  ]

  return (
    <section className="py-20 bg-[#FAFAFA]">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 text-[12px] font-semibold text-orange-600 mb-5">
            Interactive Preview
          </div>
          <h2 className="text-[38px] font-black tracking-[-0.04em] text-[#0A0A0A] leading-[1.1] mb-4">
            Your dashboard, <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">live.</span>
          </h2>
          <p className="text-[15px] text-neutral-500 leading-relaxed max-w-[500px] mx-auto">
            See how feedback flows into your dashboard. Click on status badges to update them.
          </p>
        </div>

        {/* Demo Browser Shell */}
        <div className="relative rounded-2xl border border-neutral-300 bg-white shadow-[0_12px_60px_rgba(0,0,0,0.1),0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_80px_rgba(0,0,0,0.14),0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-200 bg-gradient-to-r from-neutral-100 to-neutral-50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            </div>
            <div className="flex-1 mx-3 text-center">
              <span className="text-[11px] text-neutral-500 font-medium">quickfeed.live/dashboard</span>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="bg-[#FAFAFA] min-h-[500px]">
            {/* Mini topbar */}
            <div className="h-[52px] border-b border-neutral-200 bg-white flex items-center justify-between px-5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1.5 3h9M1.5 6h6M1.5 9h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-[13px] font-semibold text-neutral-700">QuickFeed</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-neutral-400">sarah@example.com</span>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white text-[11px] font-bold">
                  S
                </div>
              </div>
            </div>

            {/* Dashboard body */}
            <div className="p-5">
              {/* Breadcrumb + website info */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-neutral-400">Websites</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-neutral-300">
                    <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="flex items-center gap-1.5">
                    <img
                      src="https://icons.duckduckgo.com/ip3/myapp.com.ico"
                      alt=""
                      className="w-4 h-4 rounded"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                    <span className="text-[13px] font-semibold text-neutral-800">myapp.com</span>
                  </div>
                </div>
                <span className="text-[12px] text-neutral-400">{feedbacks.length} feedbacks</span>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-5">
                {filters.map(f => (
                  <button
                    key={f.value}
                    onClick={() => setActiveFilter(f.value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                      activeFilter === f.value
                        ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/25'
                        : 'bg-white text-neutral-500 border border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {f.label}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      activeFilter === f.value
                        ? 'bg-white/20 text-white'
                        : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {f.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Feedback list */}
              <div className="space-y-3">
                {filteredFeedbacks.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-neutral-400">
                        <path d="M4 6h12M4 10h8M4 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <p className="text-[13px] text-neutral-500">No feedback with this status.</p>
                  </div>
                ) : (
                  filteredFeedbacks.map(feedback => (
                    <FeedbackCard
                      key={feedback.id}
                      feedback={feedback}
                      onStatusChange={handleStatusChange}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hint text */}
        <p className="text-center text-[12px] text-neutral-400 mt-6">
          Click on any status badge to see the interactive status workflow
        </p>
      </div>
    </section>
  )
}
