import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

// Schema
const domainSchema = z.string().min(1, 'Enter your website URL').transform((val) => {
  // Strip protocol and trailing slash to normalize
  return val.replace(/^https?:\/\//, '').replace(/\/$/, '').trim()
}).pipe(
  z.string()
    .min(3, 'Enter a valid domain')
    .regex(
      /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:[0-9]+)?(\/.*)?$/,
      'Enter a valid domain (e.g. yourapp.com)'
    )
)

function extractDomain(input: string): string {
  return input.replace(/^https?:\/\//, '').replace(/\/$/, '').trim().split('/')[0]
}

function getFaviconUrl(domain: string): string {
  return `https://icons.duckduckgo.com/ip3/${domain}.ico`
}

// Mutation: "register" domain (navigates to signup with domain param)
async function registerDomain(domain: string): Promise<{ domain: string }> {
  // Simulate brief async work; in real impl this would POST to API
  await new Promise(r => setTimeout(r, 300))
  return { domain }
}

interface DomainInputProps {
  size?: 'default' | 'compact'
  btnLabel?: string
  onSuccess?: (domain: string) => void
}

export function DomainInput({
  size = 'default',
  btnLabel = 'Add to your product →',
  onSuccess,
}: DomainInputProps) {
  const [raw, setRaw] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [faviconOk, setFaviconOk] = useState(false)

  const domain = raw ? extractDomain(raw) : ''

  // Reset favicon state when domain changes
  useEffect(() => {
    setFaviconOk(false)
    if (!domain) return
    const img = new Image()
    img.src = getFaviconUrl(domain)
    img.onload = () => setFaviconOk(true)
    img.onerror = () => setFaviconOk(false)
  }, [domain])

  const mutation = useMutation({
    mutationFn: registerDomain,
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data.domain)
      } else {
        window.location.href = `/login?domain=${encodeURIComponent(data.domain)}`
      }
    },
  })

  function validate(value: string): string | null {
    const result = domainSchema.safeParse(value)
    if (!result.success) return result.error.issues[0].message
    return null
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!raw.trim()) {
      setError('Enter your website URL')
      return
    }
    const err = validate(raw)
    if (err) { setError(err); return }
    setError(null)
    mutation.mutate(domain)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRaw(e.target.value)
    if (error) {
      // Re-validate on change to clear error early
      const err = validate(e.target.value)
      setError(err)
    }
  }

  function handleBlur() {
    if (!raw.trim()) return
    const err = validate(raw)
    setError(err)
  }

  const isCompact = size === 'compact'

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`flex flex-col ${isCompact ? 'gap-2' : 'gap-3'} w-full`}>
        {/* Input row */}
        <div
          className={`flex items-center gap-0 rounded-xl border ${
            error
              ? 'border-red-300 bg-red-50/30 shadow-sm shadow-red-100'
              : 'border-neutral-200 bg-white shadow-sm hover:border-orange-200 focus-within:border-orange-400 focus-within:shadow-md focus-within:shadow-orange-100'
          } transition-all duration-200 overflow-hidden`}
        >
          {/* Icon */}
          <div className={`flex items-center justify-center shrink-0 ${isCompact ? 'w-9 h-9 ml-2' : 'w-10 h-10 ml-3'}`}>
            {domain && faviconOk ? (
              <img
                src={getFaviconUrl(domain)}
                alt=""
                className="w-5 h-5 rounded-sm object-contain"
              />
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className={`transition-colors duration-200 ${domain ? 'text-neutral-300' : 'text-neutral-400'}`}
              >
                <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M9 1.5C9 1.5 6.5 4.5 6.5 9s2.5 7.5 2.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M9 1.5C9 1.5 11.5 4.5 11.5 9s-2.5 7.5-2.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M1.5 9h15M2.5 5.5h13M2.5 12.5h13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            )}
          </div>

          {/* Input */}
          <input
            type="text"
            value={domain ? domain : raw}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="insightly.live"
            autoComplete="off"
            spellCheck={false}
            autoFocus
            className={`flex-1 bg-transparent outline-none border-none font-mono ${
              isCompact ? 'text-[13px] px-2 py-2.5' : 'text-[14px] px-3 py-3'
            } text-neutral-800 placeholder:text-neutral-400 placeholder:font-sans`}
          />

          {/* Button */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className={`relative shrink-0 m-1.5 ${
              isCompact ? 'px-4 py-2 text-[12.5px]' : 'px-5 py-2.5 text-[13.5px]'
            } rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow duration-200 overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />
            <span className="relative">
              {mutation.isPending ? 'Setting up...' : btnLabel}
            </span>
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-[12px] text-red-500 font-medium pl-1 flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6 3.5V6.5M6 8.5v.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {error}
          </p>
        )}
      </div>
    </form>
  )
}
