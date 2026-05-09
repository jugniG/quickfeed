import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { authClient } from '#/lib/auth-client'
import { orpc } from '#/orpc/client'
import { FeedbackCard } from '#/components/dashboard/FeedbackCard'
import { DashboardTopbar } from '#/components/dashboard/DashboardTopbar'
import { useState } from 'react'
import type { FeedbackStatus } from '#/orpc/router/feedbacks'

export const Route = createFileRoute('/_protected/dashboard/$websiteId')({
  component: WebsiteDetail,
})

const FILTER_OPTIONS: { label: string; value: 'all' | FeedbackStatus }[] = [
  { label: 'All', value: 'all' },
  { label: 'Unassigned', value: 'unassigned' },
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'inprogress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Rejected', value: 'rejected' },
]

function WebsiteDetail() {
  const { websiteId } = Route.useParams()
  const id = Number(websiteId)
  const navigate = useNavigate()
  const { data: session } = authClient.useSession()
  const user = session?.user
  const [filter, setFilter] = useState<'all' | FeedbackStatus>('all')

  // Get website info from the websites list
  const { data: websites = [] } = useQuery(orpc.websites.list.queryOptions())
  const site = websites.find(w => w.id === id)

  const { data: feedbacks = [], isLoading } = useQuery(
    orpc.feedbacks.list.queryOptions({ websiteId: id })
  )

  const filtered = filter === 'all'
    ? feedbacks
    : feedbacks.filter(f => f.status === filter)

  // Count by status
  const counts = feedbacks.reduce<Record<string, number>>((acc, f) => {
    acc[f.status] = (acc[f.status] || 0) + 1
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <DashboardTopbar user={user} />

      <main className="max-w-[820px] mx-auto px-6 py-10">
        {/* Back + title */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate({ to: '/dashboard' })}
            className="flex items-center gap-1.5 text-[13px] text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2.5L4.5 7 9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Websites
          </button>
          <span className="text-neutral-200">/</span>
          <div className="flex items-center gap-2">
            {site && (
              <img
                src={`https://icons.duckduckgo.com/ip3/${site.domain}.ico`}
                alt=""
                className="w-4 h-4 object-contain"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            )}
            <h1 className="text-[18px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
              {site?.domain ?? `Website #${id}`}
            </h1>
          </div>
          <span className="ml-auto text-[13px] text-neutral-400">
            {feedbacks.length} {feedbacks.length === 1 ? 'feedback' : 'feedbacks'}
          </span>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {FILTER_OPTIONS.map(opt => {
            const count = opt.value === 'all' ? feedbacks.length : (counts[opt.value] || 0)
            const active = filter === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] font-medium border transition-all duration-150 ${
                  active
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-200'
                    : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300 hover:text-neutral-700'
                }`}
              >
                {opt.label}
                {count > 0 && (
                  <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${
                    active ? 'bg-white/25 text-white' : 'bg-neutral-100 text-neutral-500'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-5 animate-pulse">
                <div className="h-4 bg-neutral-100 rounded w-3/4 mb-4" />
                <div className="h-3 bg-neutral-100 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && feedbacks.length === 0 && (
          <div className="rounded-2xl border border-dashed border-neutral-200 bg-white p-16 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-orange-400">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-[16px] font-bold text-neutral-800 mb-2">No feedback yet</h2>
            <p className="text-[13.5px] text-neutral-400 max-w-[300px] leading-[1.6]">
              Embed the QuickFeed widget on your site to start capturing feedback.
            </p>
          </div>
        )}

        {/* Filtered empty state */}
        {!isLoading && feedbacks.length > 0 && filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-neutral-200 bg-white p-12 flex flex-col items-center text-center">
            <p className="text-[14px] text-neutral-400">No feedback with this status.</p>
          </div>
        )}

        {/* Feedback list */}
        {!isLoading && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map(fb => (
              <FeedbackCard key={fb.id} feedback={fb} websiteId={id} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
