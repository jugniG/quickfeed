import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { orpc } from '#/orpc/client'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

export const Route = createFileRoute('/_protected/dashboard/$websiteId/settings/')({
  component: WebsiteSettings,
})

// ─── Copy Button ─────────────────────────────────────────────────────────────

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

// ─── Shiki Block ─────────────────────────────────────────────────────────────

function ShikiBlock({ code, lang }: { code: string; lang: string }) {
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    codeToHtml(code, { lang, theme: 'github-dark' }).then(setHtml)
  }, [code, lang])

  return (
    <div className="relative rounded-2xl overflow-hidden border border-neutral-800">
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800">
        <span className="text-[12px] text-neutral-400 font-mono">{lang}</span>
        <CopyButton text={code} />
      </div>
      <div
        className="text-[13px] leading-[1.7] [&>pre]:p-5 [&>pre]:whitespace-pre-wrap [&>pre]:break-all"
        style={{ background: '#0d1117' }}
        // biome-ignore lint: shiki output is safe
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

// ─── Modal Position options ───────────────────────────────────────────────────

type ModalPosition =
  | 'center'
  | 'bottom-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'top-right'
  | 'top-left'

interface ModalConfig {
  position: ModalPosition
  bgColor: string
  blur: boolean
  overlayColor: string
  overlayOpacity: number
  titleColor: string
  descriptionColor: string
  inputColor: string
  btnPrimaryBg: string
  btnPrimaryText: string
  btnSecondaryBg: string
  btnSecondaryText: string
  borderRadius: number
  btnBorderRadius: number
  disableBranding: boolean
}

const POSITION_OPTIONS: { value: ModalPosition; label: string }[] = [
  { value: 'center', label: 'Center' },
  { value: 'bottom-center', label: 'Bottom Center' },
  { value: 'bottom-right', label: 'Bottom Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'top-center', label: 'Top Center' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'top-left', label: 'Top Left' },
]

const DEFAULT_CONFIG: ModalConfig = {
  position: 'center',
  bgColor: '#ffffff',
  blur: true,
  overlayColor: '#000000',
  overlayOpacity: 0.45,
  titleColor: '#0a0a0a',
  descriptionColor: '#444444',
  inputColor: '#0a0a0a',
  btnPrimaryBg: '#f97316',
  btnPrimaryText: '#ffffff',
  btnSecondaryBg: '#f5f5f5',
  btnSecondaryText: '#555555',
  borderRadius: 20,
  btnBorderRadius: 8,
  disableBranding: false,
}

// ─── Color Input ─────────────────────────────────────────────────────────────

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-neutral-600">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value.startsWith('rgba') ? '#000000' : value}
          onChange={e => onChange(e.target.value)}
          className="w-8 h-8 rounded-lg border border-neutral-200 cursor-pointer p-0.5"
        />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-28 text-[12px] font-mono border border-neutral-200 rounded-lg px-2 py-1.5 outline-none focus:border-orange-400"
        />
      </div>
    </div>
  )
}

// ─── Modal Preview ────────────────────────────────────────────────────────────

function ModalPreview({ config }: { config: ModalConfig }) {
  const positionStyle: React.CSSProperties = (() => {
    const base: React.CSSProperties = { position: 'absolute', zIndex: 10 }
    switch (config.position) {
      case 'center':        return { ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
      case 'bottom-center': return { ...base, bottom: 16, left: '50%', transform: 'translateX(-50%)' }
      case 'bottom-right':  return { ...base, bottom: 16, right: 16 }
      case 'bottom-left':   return { ...base, bottom: 16, left: 16 }
      case 'top-center':    return { ...base, top: 16, left: '50%', transform: 'translateX(-50%)' }
      case 'top-right':     return { ...base, top: 16, right: 16 }
      case 'top-left':      return { ...base, top: 16, left: 16 }
      default:              return base
    }
  })()

  const inputBorderRadius = Math.min(config.btnBorderRadius, 16)

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 320 }}>
      {/* fake page bg */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#f0f0f0_0%,#e8e8e8_100%)]" style={{ zIndex: 0 }} />
      {/* overlay */}
      <div className="absolute inset-0" style={{ background: config.overlayColor, opacity: config.overlayOpacity, backdropFilter: config.blur ? 'blur(4px)' : undefined, zIndex: 5 }} />
      {/* modal panel */}
      <div
        style={{
          ...positionStyle,
          background: config.bgColor,
          borderRadius: config.borderRadius,
          padding: '16px',
          width: 220,
          boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: config.titleColor, marginBottom: 2 }}>
          Share your feedback
        </div>
        <div style={{ fontSize: 11, color: config.descriptionColor, marginBottom: 10 }}>
          We read every response.
        </div>
        {/* Paste hint */}
        <div style={{ fontSize: 9, color: '#aaa', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 3 }}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <rect x="1" y="3" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M3 3V2a1 1 0 011-1h5a1 1 0 011 1v7a1 1 0 01-1 1H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Paste an image with Ctrl+V
        </div>
        {/* Textarea */}
        <div style={{ background: 'transparent', border: '1.5px solid #e5e5e5', borderRadius: inputBorderRadius, padding: '8px', fontSize: 11, color: config.inputColor, marginBottom: 6, minHeight: 48 }}>
          Give us feedback…
        </div>
        {/* Email input */}
        <div style={{ background: 'transparent', border: '1.5px solid #e5e5e5', borderRadius: inputBorderRadius, padding: '6px 8px', fontSize: 11, color: config.inputColor, marginBottom: 8 }}>
          Email (optional)
        </div>
        {/* Buttons */}
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ flex: 1, background: config.btnSecondaryBg, color: config.btnSecondaryText, borderRadius: config.btnBorderRadius, fontSize: 10, fontWeight: 600, padding: '6px 0', textAlign: 'center' }}>
            Cancel
          </div>
          <div style={{ flex: 2, background: config.btnPrimaryBg, color: config.btnPrimaryText, borderRadius: config.btnBorderRadius, fontSize: 10, fontWeight: 600, padding: '6px 0', textAlign: 'center' }}>
            Send feedback
          </div>
        </div>
        {!config.disableBranding && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 10, paddingTop: 8, borderTop: '1px solid rgba(0,0,0,0.06)', fontSize: 9, color: config.descriptionColor, opacity: 0.8 }}>
            <span>Powered by</span>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: 'linear-gradient(135deg, #f97316, #f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="8" height="8" viewBox="0 0 14 14" fill="none">
                <path d="M2 4h10M2 7h7M2 10h5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </span>
            <span style={{ fontWeight: 600, color: config.titleColor }}>QuickFeed</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Generate Tab ─────────────────────────────────────────────────────────────

function GenerateTab({
  site,
  embedCode,
  onDelete,
  isDeleting,
}: {
  site: { domain: string; id: string } | undefined
  embedCode: string
  onDelete: () => void
  isDeleting: boolean
}) {
  return (
    <div className="space-y-5">
      {/* Domain */}
      <section className="bg-white rounded-2xl border border-neutral-200 p-6">
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
      <section className="bg-white rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-[14px] font-semibold text-neutral-800 mb-1">Embed Script</h2>
        <p className="text-[13px] text-neutral-400 mb-4">
          Paste this snippet into your site's{' '}
          <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded text-[12px]">&lt;head&gt;</code>{' '}
          or before the closing{' '}
          <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded text-[12px]">&lt;/body&gt;</code> tag.
        </p>
        <ShikiBlock code={embedCode} lang="html" />
      </section>

      {/* How it works */}
      <section className="bg-white rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-[14px] font-semibold text-neutral-800 mb-4">How it works</h2>
        <ol className="space-y-3">
          {[
            'Copy the embed snippet above.',
            `Paste it into your site's HTML before the closing </body> tag.`,
            'The feedback button will appear on your site automatically.',
            'Responses show up in your QuickFeed dashboard in real time.',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-[11px] font-bold text-orange-500 shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-[13px] text-neutral-600">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Danger Zone */}
      <section className="bg-white rounded-2xl border border-red-200 p-6">
        <h2 className="text-[14px] font-semibold text-red-600 mb-1">Danger Zone</h2>
        <p className="text-[13px] text-neutral-400 mb-4">
          Deleting this website is permanent. All associated feedback will be removed.
        </p>
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px] font-semibold hover:bg-red-100 transition-colors disabled:opacity-50"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M2.5 4h10M6 4V2.5h3V4M5.5 7v4.5M9.5 7v4.5M3.5 4l.75 8.5h6.5L11.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {isDeleting ? 'Deleting…' : 'Delete Website'}
        </button>
      </section>
    </div>
  )
}

// ─── Custom Modal Tab ────────────────────────────────────────────────────────

function CustomModalTab({ websiteId }: { websiteId: string }) {
  const [config, setConfig] = useState<ModalConfig>(DEFAULT_CONFIG)

  function set<K extends keyof ModalConfig>(key: K, value: ModalConfig[K]) {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  function resetConfig() {
    setConfig(DEFAULT_CONFIG)
  }

  const customEmbedCode = `<script
  src="https://www.quickfeed.live/widget.js"
  data-website-id="${websiteId}"
  data-position="${config.position}"
  data-bg="${config.bgColor}"
  data-blur="${config.blur}"
  data-overlay="${config.overlayColor}"
  data-overlay-opacity="${config.overlayOpacity}"
  data-title-color="${config.titleColor}"
  data-desc-color="${config.descriptionColor}"
  data-input-color="${config.inputColor}"
  data-btn-bg="${config.btnPrimaryBg}"
  data-btn-text="${config.btnPrimaryText}"
  data-btn2-bg="${config.btnSecondaryBg}"
  data-btn2-text="${config.btnSecondaryText}"
  data-radius="${config.borderRadius}"
  data-btn-radius="${config.btnBorderRadius}"${config.disableBranding ? '\n  data-disable-branding="true"' : ''}
  defer
><\/script>`

  return (
    <div className="space-y-5">
      {/* Side-by-side: preview + controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

        {/* Preview — sticky so it stays visible while scrolling controls */}
        <div className="lg:sticky lg:top-6">
          <section className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-100">
              <h2 className="text-[14px] font-semibold text-neutral-800">Live Preview</h2>
              <p className="text-[12px] text-neutral-400 mt-0.5">Updates as you edit options.</p>
            </div>
            <ModalPreview config={config} />
          </section>
        </div>

        {/* Controls */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-5">
          {/* Header with Reset */}
          <div className="flex items-center justify-between">
            <h3 className="text-[13px] font-semibold text-neutral-700">Customise</h3>
            <button
              onClick={resetConfig}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 text-neutral-500 text-[12px] font-medium hover:border-neutral-300 hover:text-neutral-700 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 6A4.5 4.5 0 1 0 3 2.5M1.5 6V3M1.5 6H4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Reset to defaults
            </button>
          </div>

          <div className="h-px bg-neutral-100" />

          {/* Position */}
          <div>
            <h3 className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wide mb-2.5">Position</h3>
            <div className="flex flex-wrap gap-1.5">
              {POSITION_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => set('position', opt.value)}
                  className={`px-2.5 py-1 rounded-lg text-[12px] font-medium border transition-all ${
                    config.position === opt.value
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-neutral-100" />

          {/* Modal Card */}
          <div>
            <h3 className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wide mb-2.5">Modal Card</h3>
            <div className="space-y-3">
              <ColorInput label="Background" value={config.bgColor} onChange={v => set('bgColor', v)} />
              <ColorInput label="Overlay color" value={config.overlayColor} onChange={v => set('overlayColor', v)} />
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-neutral-600">Overlay opacity</span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={config.overlayOpacity}
                    onChange={e => set('overlayOpacity', Number(e.target.value))}
                    className="w-24 accent-orange-500"
                  />
                  <span className="text-[12px] text-neutral-500 w-8 text-right">{Math.round(config.overlayOpacity * 100)}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-neutral-600">Background blur</span>
                <button
                  onClick={() => set('blur', !config.blur)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${config.blur ? 'bg-orange-500' : 'bg-neutral-200'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${config.blur ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-neutral-600">Modal border radius</span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={32}
                    value={config.borderRadius}
                    onChange={e => set('borderRadius', Number(e.target.value))}
                    className="w-24 accent-orange-500"
                  />
                  <span className="text-[12px] text-neutral-500 w-8 text-right">{config.borderRadius}px</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-neutral-600">Button border radius</span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={32}
                    value={config.btnBorderRadius}
                    onChange={e => set('btnBorderRadius', Number(e.target.value))}
                    className="w-24 accent-orange-500"
                  />
                  <span className="text-[12px] text-neutral-500 w-8 text-right">{config.btnBorderRadius}px</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[13px] text-neutral-600 block">Disable QuickFeed branding</span>
                  <span className="text-[11px] text-neutral-400">Hide the "Powered by QuickFeed" footer</span>
                </div>
                <button
                  onClick={() => set('disableBranding', !config.disableBranding)}
                  className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${config.disableBranding ? 'bg-orange-500' : 'bg-neutral-200'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${config.disableBranding ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="h-px bg-neutral-100" />

          {/* Text Colors */}
          <div>
            <h3 className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wide mb-2.5">Text Colors</h3>
            <div className="space-y-3">
              <ColorInput label="Title" value={config.titleColor} onChange={v => set('titleColor', v)} />
              <ColorInput label="Description" value={config.descriptionColor} onChange={v => set('descriptionColor', v)} />
              <ColorInput label="Input text" value={config.inputColor} onChange={v => set('inputColor', v)} />
            </div>
          </div>

          <div className="h-px bg-neutral-100" />

          {/* Buttons */}
          <div>
            <h3 className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wide mb-2.5">Buttons</h3>
            <div className="space-y-3">
              <ColorInput label="Primary background" value={config.btnPrimaryBg} onChange={v => set('btnPrimaryBg', v)} />
              <ColorInput label="Primary text" value={config.btnPrimaryText} onChange={v => set('btnPrimaryText', v)} />
              <ColorInput label="Secondary background" value={config.btnSecondaryBg} onChange={v => set('btnSecondaryBg', v)} />
              <ColorInput label="Secondary text" value={config.btnSecondaryText} onChange={v => set('btnSecondaryText', v)} />
            </div>
          </div>
        </section>
      </div>

      {/* Generated code */}
      <section className="bg-white rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-[14px] font-semibold text-neutral-800 mb-1">Custom Embed Code</h2>
        <p className="text-[13px] text-neutral-400 mb-4">Copy this to apply your custom theme.</p>
        <ShikiBlock code={customEmbedCode} lang="html" />
      </section>
    </div>
  )
}

// ─── API Keys Tab ──────────────────────────────────────────────────────────

function ApiKeysTab({ websiteId }: { websiteId: string }) {
  const queryClient = useQueryClient()

  const { data: keys = [], isLoading } = useQuery(
    orpc.apiKeys.list.queryOptions({ input: { websiteId } })
  )

  const createMutation = useMutation({
    mutationFn: (name: string) => orpc.apiKeys.create.call({ websiteId, name }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: orpc.apiKeys.list.key() })
      // Show the raw key in an alert — this is the only time it's visible
      setNewKeyValue(data.rawKey)
      setShowCreateForm(false)
      setNewKeyName('')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => orpc.apiKeys.delete.call({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orpc.apiKeys.list.key() })
    },
  })

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyValue, setNewKeyValue] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  return (
    <div className="space-y-5">
      {/* Create form / key reveal */}
      {newKeyValue && (
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h2 className="text-[14px] font-semibold text-amber-800 mb-1">API Key Created</h2>
          <p className="text-[13px] text-amber-700 mb-3">
            Copy this key now — you won't be able to see it again.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-[13px] font-mono bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-amber-900 break-all select-all">
              {newKeyValue}
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(newKeyValue).then(() => {
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                })
              }}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-[13px] font-medium transition-colors shrink-0"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <button
            onClick={() => setNewKeyValue(null)}
            className="mt-3 text-[12px] text-amber-600 hover:text-amber-800 font-medium"
          >
            Dismiss
          </button>
        </section>
      )}

      {/* Create form */}
      {showCreateForm && (
        <section className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h2 className="text-[14px] font-semibold text-neutral-800 mb-3">Create API Key</h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="e.g. Production, Staging, CI..."
              className="flex-1 text-[13px] border border-neutral-200 rounded-xl px-4 py-2.5 outline-none focus:border-orange-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newKeyName.trim() && !createMutation.isPending) {
                  createMutation.mutate(newKeyName.trim())
                }
              }}
              autoFocus
            />
            <button
              onClick={() => {
                if (newKeyName.trim()) createMutation.mutate(newKeyName.trim())
              }}
              disabled={!newKeyName.trim() || createMutation.isPending}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] font-semibold shadow-sm hover:shadow-orange-200 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createMutation.isPending ? 'Creating…' : 'Create'}
            </button>
            <button
              onClick={() => { setShowCreateForm(false); setNewKeyName('') }}
              className="px-3 py-2.5 rounded-xl border border-neutral-200 text-[13px] font-medium text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              Cancel
            </button>
          </div>
          {createMutation.isError && (
            <p className="text-[12px] text-red-500 mt-2">
              {(createMutation.error as any)?.message ?? 'Failed to create key'}
            </p>
          )}
        </section>
      )}

      {/* API Keys list */}
      <section className="bg-white rounded-2xl border border-neutral-200">
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <div>
            <h2 className="text-[14px] font-semibold text-neutral-800">API Keys</h2>
            <p className="text-[13px] text-neutral-400 mt-0.5">
              Use these keys to submit feedback programmatically.
            </p>
          </div>
          {!showCreateForm && !newKeyValue && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] font-semibold shadow-sm shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 2v9M2 6.5h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              Create key
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="p-6 space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="h-14 bg-neutral-50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : keys.length === 0 ? (
          <div className="p-12 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-neutral-300">
                <rect x="3" y="7" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M7 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                <circle cx="10" cy="12" r="1.5" fill="currentColor"/>
              </svg>
            </div>
            <p className="text-[13px] text-neutral-400">No API keys yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {keys.map((key) => (
              <div key={key.id} className="flex items-center justify-between px-6 py-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[14px] font-medium text-neutral-800">{key.name}</span>
                    <code className="text-[12px] font-mono text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded-lg border border-neutral-100">
                      {key.prefix}
                    </code>
                  </div>
                  <div className="text-[12px] text-neutral-400 mt-0.5">
                    Created {new Date(key.createdAt).toLocaleDateString()}
                    {key.lastUsedAt && (
                      <span> · Last used {new Date(key.lastUsedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm(`Delete API key "${key.name}"? This action cannot be undone.`)) {
                      deleteMutation.mutate(key.id)
                    }
                  }}
                  disabled={deleteMutation.isPending}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-medium text-red-500 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all disabled:opacity-50"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2 3.5h9M4.5 3.5V2.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1M5.5 6.5v3M7.5 6.5v3M3 3.5l.75 7.5a1 1 0 0 0 1 .9h2.5a1 1 0 0 0 1-.9L10 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────────────────

function WebsiteSettings() {
  const { websiteId } = Route.useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()


  const [tab, setTab] = useState<'generate' | 'custom' | 'apikeys'>('generate')

  const { data: websites = [] } = useQuery(orpc.websites.list.queryOptions())
  const site = websites.find((w) => w.id === websiteId)

  const deleteMutation = useMutation({
    mutationFn: () => orpc.websites.delete.call({ id: websiteId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orpc.websites.list.key() })
      navigate({ to: '/dashboard' })
    },
  })

  const embedCode = `<script src="https://www.quickfeed.live/widget.js" data-website-id="${websiteId}" defer></script>`

  function handleDelete() {
    if (!site) return
    const input = window.prompt(
      `To delete "${site.domain}", type the domain name to confirm:`,
    )
    if (input === null) return
    if (input.trim() !== site.domain) {
      alert(`Domain didn't match. Type exactly: ${site.domain}`)
      return
    }
    deleteMutation.mutate()
  }

  return (
    <>


      <main className="max-w-[900px] mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-[13px] text-neutral-400">
          <Link to="/dashboard" className="hover:text-neutral-700 transition-colors no-underline">
            Websites
          </Link>
          <span className="text-neutral-200">/</span>
          <Link
            to="/dashboard/$websiteId"
            params={{ websiteId }}
            className="hover:text-neutral-700 transition-colors no-underline"
          >
            {site?.domain ?? websiteId}
          </Link>
          <span className="text-neutral-200">/</span>
          <span className="text-neutral-600 font-medium">Settings</span>
        </div>

        <h1 className="text-[22px] font-bold tracking-[-0.02em] text-[#0A0A0A] mb-6">
          Site Settings
        </h1>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl mb-6 w-fit">
          <button
            onClick={() => setTab('generate')}
            className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all ${
              tab === 'generate'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setTab('custom')}
            className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all ${
              tab === 'custom'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Custom Modal
          </button>
          <button
            onClick={() => setTab('apikeys')}
            className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all ${
              tab === 'apikeys'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            API Keys
          </button>
        </div>

        {/* Tab content */}
        {tab === 'generate' ? (
          <GenerateTab
            site={site}
            embedCode={embedCode}
            onDelete={handleDelete}
            isDeleting={deleteMutation.isPending}
          />
        ) : tab === 'custom' ? (
          <CustomModalTab websiteId={websiteId} />
        ) : (
          <ApiKeysTab websiteId={websiteId} />
        )}
      </main>
    </>
  )
}
