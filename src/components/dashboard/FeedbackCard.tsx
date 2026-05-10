import { useState, useRef, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orpc } from '#/orpc/client'
import type { FeedbackStatus } from '#/orpc/router/feedbacks'

type Feedback = {
  id: number
  message: string
  submitterEmail: string | null
  submitterName: string | null
  url: string | null
  status: string
  createdAt: Date | string
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

function timeAgo(date: Date | string) {
  const d = new Date(date)
  const diff = Date.now() - d.getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const day = Math.floor(h / 24)
  return `${day}d ago`
}

export function FeedbackCard({ feedback, websiteId }: { feedback: Feedback; websiteId: string }) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [optimisticStatus, setOptimisticStatus] = useState<FeedbackStatus>(
    (feedback.status as FeedbackStatus) || 'unassigned'
  )
  const dropdownRef = useRef<HTMLDivElement>(null)

  const mutation = useMutation(
    orpc.feedbacks.updateStatus.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.feedbacks.list.queryOptions({ input: { websiteId } }))
      },
    })
  )

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  async function handleStatusChange(status: FeedbackStatus) {
    setOpen(false)
    setOptimisticStatus(status)
    try {
      await mutation.mutateAsync({ feedbackId: feedback.id, status })
    } catch {
      setOptimisticStatus((feedback.status as FeedbackStatus) || 'unassigned')
    }
  }

  const cfg = STATUS_CONFIG[optimisticStatus] ?? STATUS_CONFIG.unassigned

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 hover:border-neutral-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200">
      {/* Message */}
      <p className="text-[14px] text-neutral-800 leading-[1.65] mb-4">
        "{feedback.message}"
      </p>

      {/* Meta row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-neutral-400">
          {(feedback.submitterName || feedback.submitterEmail) && (
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M1.5 10.5c0-2.21 2.015-4 4.5-4s4.5 1.79 4.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {feedback.submitterName || feedback.submitterEmail}
            </span>
          )}
          {feedback.url && (
            <span className="flex items-center gap-1 truncate max-w-[180px]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1.5h4.5v9H1.5V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.5 7.5l6-6M8 1.5h3v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {(() => { try { return new URL(feedback.url).pathname } catch { return feedback.url } })()}
            </span>
          )}
          <span>{timeAgo(feedback.createdAt)}</span>
        </div>

        {/* Status dropdown */}
        <div className="relative shrink-0" ref={dropdownRef}>
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
                    onClick={() => handleStatusChange(s)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-[12px] font-medium transition-colors hover:bg-neutral-50 ${s === optimisticStatus ? 'opacity-50 pointer-events-none' : 'text-neutral-700'}`}
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
    </div>
  )
}
