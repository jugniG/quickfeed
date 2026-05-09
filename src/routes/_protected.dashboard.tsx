import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '#/lib/auth-client'

export const Route = createFileRoute('/_protected/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const { data: session } = authClient.useSession()
  const user = session?.user

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Topbar */}
      <header className="h-[60px] border-b border-neutral-200 bg-white flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/30">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 4h10M2 7h7M2 10h5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-[15px] text-[#0A0A0A] tracking-tight" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>QuickFeed</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[13px] text-neutral-500">{user?.email}</div>
          <button
            onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => { window.location.href = '/login' } } })}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 text-[13px] text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-[28px] font-bold tracking-[-0.03em] text-[#0A0A0A]">Dashboard</h1>
          <p className="text-[14px] text-neutral-500 mt-1">Welcome back{user?.name ? `, ${user.name}` : ''}.</p>
        </div>

        {/* Empty state */}
        <div className="rounded-2xl border border-dashed border-neutral-200 bg-white p-16 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-2xl mb-5">
            📭
          </div>
          <h2 className="text-[17px] font-bold text-neutral-800 mb-2">No reports yet</h2>
          <p className="text-[13.5px] text-neutral-400 max-w-[340px] leading-[1.6]">
            Add QuickFeed to your product and reports will show up here the moment users submit them.
          </p>
          <div className="mt-6 px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-[12.5px] font-mono text-neutral-500">
            {'<script src="https://cdn.quickfeed.dev/widget.js" />'}
          </div>
        </div>
      </main>
    </div>
  )
}
