import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authClient } from '#/lib/auth-client'
import { orpc } from '#/orpc/client'
import { DashboardTopbar } from '#/components/dashboard/DashboardTopbar'
import { useEffect, useRef, useState } from 'react'
import { codeToHtml } from 'shiki'

export const Route = createFileRoute('/_protected/dashboard/$websiteId/settings')({
  component: WebsiteSettings,
})

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
      }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-neutral-200 text-[12px] font-medium transition-colors"
    >
      {copied ? (
        <>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 6.5L5 9.5L11 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <rect x="4.5" y="1.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M1.5 4.5H3M1.5 4.5V11.5H8.5V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Copy
        </>
      )}
    </button>
  )
}

function ShikiBlock({ code, lang }: { code: string; lang: string }) {
  const [html, setHtml] = useState<string>('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    codeToHtml(code, {
      lang,
      theme: 'github-dark',
    }).then(setHtml)
  }, [code, lang])

  return (
    <div className="relative rounded-2xl overflow-hidden border border-neutral-800">
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800">
        <span className="text-[12px] text-neutral-400 font-mono">{lang}</span>
        <CopyButton text={code} />
      </div>
      <div
        ref={containerRef}
        className="overflow-x-auto text-[13px] leading-[1.7]"
        style={{ background: '#0d1117' }}
        // biome-ignore lint: shiki output is safe
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

function WebsiteSettings() {
  const { websiteId } = Route.useParams()
  const id = Number(websiteId)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: session } = authClient.useSession()
  const user = session?.user

  const { data: websites = [] } = useQuery(orpc.websites.list.queryOptions())
  const site = websites.find((w) => w.id === id)

  const deleteMutation = useMutation({
    mutationFn: () => orpc.websites.delete.call({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orpc.websites.list.key() })
      navigate({ to: '/dashboard' })
    },
  })

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://quickfeed.app'

  const embedCode = `<!-- QuickFeed Widget -->
<script>
  window.__quickfeed = {
    websiteId: ${id},
    apiBase: '${origin}',
  };
</script>
<script src="${origin}/widget.js" defer></script>`

  function handleDelete() {
    if (!site) return
    const input = window.prompt(
      `To delete "${site.domain}", type the domain name to confirm:`,
    )
    if (input === null) return // cancelled
    if (input.trim() !== site.domain) {
      alert(`Domain didn't match. Type exactly: ${site.domain}`)
      return
    }
    deleteMutation.mutate()
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <DashboardTopbar user={user} />

      <main className="max-w-[700px] mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-[13px] text-neutral-400">
          <button
            onClick={() => navigate({ to: '/dashboard' })}
            className="hover:text-neutral-700 transition-colors"
          >
            Websites
          </button>
          <span className="text-neutral-200">/</span>
          <button
            onClick={() => navigate({ to: '/dashboard/$websiteId', params: { websiteId } })}
            className="hover:text-neutral-700 transition-colors"
          >
            {site?.domain ?? `#${id}`}
          </button>
          <span className="text-neutral-200">/</span>
          <span className="text-neutral-600 font-medium">Settings</span>
        </div>

        <h1 className="text-[22px] font-bold tracking-[-0.02em] text-[#0A0A0A] mb-8">
          Site Settings
        </h1>

        {/* Domain */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-6 mb-5">
          <h2 className="text-[14px] font-semibold text-neutral-800 mb-1">Domain</h2>
          <p className="text-[13px] text-neutral-400 mb-4">The domain this widget is attached to.</p>
          <div className="flex items-center gap-3">
            {site && (
              <img
                src={`https://icons.duckduckgo.com/ip3/${site.domain}.ico`}
                alt=""
                className="w-5 h-5 object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            )}
            <span className="text-[15px] font-semibold text-neutral-800">{site?.domain ?? '…'}</span>
          </div>
        </section>

        {/* Embed Script */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-6 mb-5">
          <h2 className="text-[14px] font-semibold text-neutral-800 mb-1">Embed Script</h2>
          <p className="text-[13px] text-neutral-400 mb-4">
            Paste this snippet into your site's <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded text-[12px]">&lt;head&gt;</code> or before the closing <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded text-[12px]">&lt;/body&gt;</code> tag.
          </p>
          <ShikiBlock code={embedCode} lang="html" />
        </section>

        {/* Danger Zone */}
        <section className="bg-white rounded-2xl border border-red-200 p-6">
          <h2 className="text-[14px] font-semibold text-red-600 mb-1">Danger Zone</h2>
          <p className="text-[13px] text-neutral-400 mb-4">
            Deleting this website is permanent. All associated feedback will be removed.
          </p>
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px] font-semibold hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2.5 4h10M6 4V2.5h3V4M5.5 7v4.5M9.5 7v4.5M3.5 4l.75 8.5h6.5L11.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {deleteMutation.isPending ? 'Deleting…' : 'Delete Website'}
          </button>
        </section>
      </main>
    </div>
  )
}
