import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { orpc } from '#/orpc/client'
import { AddWebsiteModal } from '#/components/dashboard/AddWebsiteModal'

export const Route = createFileRoute('/_protected/dashboard/')({
  component: Dashboard,
})

function Dashboard() {


  const queryClient = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)

  const { data: websites = [], isLoading } = useQuery(
    orpc.websites.list.queryOptions(),
  )

  const addMutation = useMutation(
    orpc.websites.add.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.websites.list.queryOptions())
      },
    }),
  )

  async function handleAddWebsite(domain: string) {
    await addMutation.mutateAsync({ domain })
  }

  return (
    <>


      {/* Main */}
      <main className="max-w-[1100px] mx-auto px-6 py-10">

        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[26px] font-bold tracking-[-0.03em] text-[#0A0A0A]">Websites</h1>
            <p className="text-[13.5px] text-neutral-500 mt-0.5">Manage your sites and view feedback.</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13.5px] font-semibold shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow duration-200 overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
            <svg className="relative" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span className="relative">Add website</span>
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-5 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 bg-neutral-100 rounded w-2/3" />
                    <div className="h-3 bg-neutral-100 rounded w-1/3" />
                  </div>
                </div>
                <div className="h-6 bg-neutral-100 rounded w-1/4" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && websites.length === 0 && (
          <div className="rounded-2xl border border-dashed border-neutral-200 bg-white p-16 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-orange-400">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 3C12 3 9 7 9 12s3 9 3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 3C12 3 15 7 15 12s-3 9-3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M3 12h18M4 7.5h16M4 16.5h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="text-[16px] font-bold text-neutral-800 mb-2">No websites yet</h2>
            <p className="text-[13.5px] text-neutral-400 max-w-[300px] leading-[1.6] mb-6">
              Add your first website to start collecting feedback from your users.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13.5px] font-semibold shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow duration-200 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
              <svg className="relative" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <span className="relative">Add website</span>
            </button>
          </div>
        )}

        {/* Website cards */}
        {!isLoading && websites.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {websites.map((site) => (
              <WebsiteCard key={site.id} id={site.id} domain={site.domain} feedbackCount={(site as any).feedbackCount} />
            ))}
          </div>
        )}
      </main>

      <AddWebsiteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddWebsite}
      />
    </>
  )
}

function WebsiteCard({ id, domain, feedbackCount }: { id: string; domain: string; feedbackCount?: number }) {
  const faviconUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`

  return (
    <Link
      to="/dashboard/$websiteId"
      params={{ websiteId: String(id) }}
      className="block bg-white rounded-2xl border border-neutral-200 p-5 hover:border-orange-200 hover:shadow-[0_4px_20px_rgba(251,146,60,0.1)] transition-all duration-200 no-underline group"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl border border-neutral-100 bg-neutral-50 flex items-center justify-center shrink-0 overflow-hidden">
          <img
            src={faviconUrl}
            alt={domain}
            className="w-6 h-6 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.parentElement!.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" class="text-neutral-300"><circle cx="9" cy="9" r="7.5" stroke="currentColor" stroke-width="1.2"/><path d="M9 1.5C9 1.5 6.5 4.5 6.5 9s2.5 7.5 2.5 7.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M9 1.5C9 1.5 11.5 4.5 11.5 9s-2.5 7.5-2.5 7.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M1.5 9h15M2.5 5.5h13M2.5 12.5h13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-semibold text-neutral-800 truncate">{domain}</div>
          <div className="text-[12px] text-neutral-400 mt-0.5">
            <a
              href={`https://${domain}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="hover:text-orange-400 transition-colors"
            >
              {domain}
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3.5 border-t border-neutral-100">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-[11.5px] font-semibold text-orange-500">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 7.5V8.5H2L7.5 3 6.5 2 1 7.5Z" fill="currentColor"/>
            <circle cx="8" cy="2" r="1.2" fill="currentColor"/>
          </svg>
          {feedbackCount ?? 0} {(feedbackCount ?? 0) === 1 ? 'response' : 'responses'}
        </span>
        <span className="text-[12px] font-semibold text-neutral-400 group-hover:text-orange-500 transition-colors flex items-center gap-1">
          View feedback
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </Link>
  )
}
