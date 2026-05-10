import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { z } from 'zod'
import { authClient } from '#/lib/auth-client'

const searchSchema = z.object({
  domain: z.string().optional(),
})

export const Route = createFileRoute('/login')({
  validateSearch: searchSchema,
  component: Login,
})

function getFaviconUrl(domain: string) {
  return `https://icons.duckduckgo.com/ip3/${domain}.ico`
}

// A domain is "registered" with QuickFeed if it came from the CTA input
// In reality this would hit an API — for now we treat any domain from query as "available"
function useDomainMeta(domain: string | undefined) {
  const [faviconOk, setFaviconOk] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!domain) { setLoaded(true); return }
    setFaviconOk(false)
    setLoaded(false)
    const img = new Image()
    img.src = getFaviconUrl(domain)
    img.onload = () => { setFaviconOk(true); setLoaded(true) }
    img.onerror = () => { setFaviconOk(false); setLoaded(true) }
  }, [domain])

  return { faviconOk, loaded }
}

function Login() {
  const { domain } = Route.useSearch()
  const navigate = useNavigate()
  const { faviconOk, loaded } = useDomainMeta(domain)

  // Redirect if already logged in — resume checkout intent if present
  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (data?.session) redirectAfterAuth()
    })
  }, [])

  function redirectAfterAuth() {
    const raw = sessionStorage.getItem('checkout_intent')
    if (raw) {
      sessionStorage.removeItem('checkout_intent')
      try {
        const { storageMb, interval } = JSON.parse(raw)
        // Go to pricing with intent embedded — pricing page will auto-trigger checkout
        window.location.href = `/pricing?storageMb=${storageMb}&interval=${interval}&autoCheckout=1`
        return
      } catch {}
    }
    navigate({ to: '/dashboard' })
  }

  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [emailLoading, setEmailLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const emailSchema = z.string().email('Enter a valid email address')

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = emailSchema.safeParse(email)
    if (!result.success) { setEmailError(result.error.issues[0].message); return }
    setEmailError(null)
    setEmailLoading(true)
    try {
      const intent = sessionStorage.getItem('checkout_intent')
      const cb = intent
        ? (() => { try { const { storageMb, interval } = JSON.parse(intent); return `/pricing?storageMb=${storageMb}&interval=${interval}&autoCheckout=1` } catch { return '/dashboard' } })()
        : '/dashboard'
      await authClient.signIn.magicLink({
        email,
        callbackURL: cb,
      })
      setEmailSent(true)
    } catch {
      setEmailError('Something went wrong. Try again.')
    } finally {
      setEmailLoading(false)
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true)
    try {
      const intent = sessionStorage.getItem('checkout_intent')
      const cb = intent
        ? (() => { try { const { storageMb, interval } = JSON.parse(intent); return `/pricing?storageMb=${storageMb}&interval=${interval}&autoCheckout=1` } catch { return '/dashboard' } })()
        : '/dashboard'
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: cb,
      })
    } catch {
      setGoogleLoading(false)
    }
  }

  const hasDomain = !!domain

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
      {/* Background blobs */}
      <div className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-gradient-to-r from-orange-200/25 to-amber-200/15 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-80px] right-[-80px] w-[400px] h-[300px] rounded-full bg-amber-200/20 blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[420px]">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <a href="/" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                <path d="M2 4h10M2 7h7M2 10h5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[16px] text-[#0A0A0A] tracking-tight" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>QuickFeed</span>
          </a>
        </div>

        {/* Auth card */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-[0_8px_40px_rgba(0,0,0,0.07)] overflow-hidden">

          {/* Domain context header */}
          {hasDomain && loaded && (
            <div className={`px-7 py-5 border-b ${faviconOk ? 'border-orange-100 bg-gradient-to-br from-orange-50/80 to-amber-50/40' : 'border-neutral-100 bg-neutral-50/60'}`}>
              <div className="flex items-center gap-3">
                {faviconOk ? (
                  <div className="w-10 h-10 rounded-xl border border-orange-100 bg-white shadow-sm flex items-center justify-center shrink-0">
                    <img
                      src={getFaviconUrl(domain!)}
                      alt={domain}
                      className="w-6 h-6 rounded-sm object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl border border-neutral-200 bg-white flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-neutral-400">
                      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M9 1.5C9 1.5 6.5 4.5 6.5 9s2.5 7.5 2.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      <path d="M9 1.5C9 1.5 11.5 4.5 11.5 9s-2.5 7.5-2.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      <path d="M1.5 9h15M2.5 5.5h13M2.5 12.5h13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[13px] font-mono font-semibold text-neutral-800 truncate">{domain}</span>
                    {faviconOk ? (
                      <span className="shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-50 border border-green-100 text-[10px] font-semibold text-green-600">
                        <span className="w-1 h-1 rounded-full bg-green-500" />
                        Ready
                      </span>
                    ) : (
                      <span className="shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-[10px] font-semibold text-neutral-500">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-neutral-500 leading-snug">
                    {faviconOk
                      ? `Sign in to manage feedback from ${domain}`
                      : `Sign up to start collecting feedback for ${domain}`
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form body */}
          <div className="px-7 py-7">
            {!hasDomain && (
              <>
                <h1 className="text-[20px] font-bold tracking-[-0.03em] text-[#0A0A0A] mb-1">
                  Welcome back
                </h1>
                <p className="text-[13.5px] text-neutral-500 mb-6">Sign in to your QuickFeed account.</p>
              </>
            )}

            {hasDomain && (
              <p className="text-[13.5px] text-neutral-500 mb-6 mt-1">
                {faviconOk ? 'Sign in to continue.' : 'Create your account to get started.'}
              </p>
            )}

            {emailSent ? (
              <div className="flex flex-col items-center text-center py-6 gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-2xl">
                  ✉️
                </div>
                <p className="text-[15px] font-bold text-neutral-800">Check your inbox</p>
                <p className="text-[13px] text-neutral-500 max-w-[280px] leading-[1.6]">
                  We sent a magic link to <span className="font-semibold text-neutral-700">{email}</span>. Click it to sign in.
                </p>
                <button
                  onClick={() => setEmailSent(false)}
                  className="mt-2 text-[12.5px] text-orange-500 hover:text-orange-600 font-medium"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {/* Google */}
                <button
                  onClick={handleGoogle}
                  disabled={googleLoading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {googleLoading ? (
                    <svg className="animate-spin w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                      <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96l3.007 2.332C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                    </svg>
                  )}
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-1">
                  <div className="flex-1 h-px bg-neutral-100" />
                  <span className="text-[11.5px] text-neutral-400 font-medium">or</span>
                  <div className="flex-1 h-px bg-neutral-100" />
                </div>

                {/* Email magic link */}
                <form onSubmit={handleEmailSubmit} className="flex flex-col gap-2.5">
                  <div
                    className={`flex items-center rounded-xl border overflow-hidden transition-all duration-200 ${
                      emailError
                        ? 'border-red-300 shadow-sm shadow-red-100'
                        : 'border-neutral-200 focus-within:border-orange-400 focus-within:shadow-md focus-within:shadow-orange-100'
                    }`}
                  >
                    <div className="px-3.5 flex items-center">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="text-neutral-400">
                        <rect x="1" y="3" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M1.5 3.5l6 4.5 6-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); if (emailError) setEmailError(null) }}
                      placeholder="you@yourproduct.com"
                      autoComplete="email"
                      autoFocus
                      className="flex-1 py-3 pr-3 text-[14px] text-neutral-800 bg-transparent outline-none border-none placeholder:text-neutral-400"
                    />
                  </div>

                  {emailError && (
                    <p className="text-[12px] text-red-500 font-medium flex items-center gap-1 pl-1">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M6 3.5V6.5M6 8.5v.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                      {emailError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={emailLoading}
                    className="relative w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[14px] font-semibold shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow duration-200 overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
                    <span className="relative flex items-center justify-center gap-2">
                      {emailLoading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3"/>
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          Sending link...
                        </>
                      ) : 'Continue with email'}
                    </span>
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-7 py-4 border-t border-neutral-100 bg-neutral-50/50">
            <p className="text-[11.5px] text-neutral-400 text-center leading-relaxed">
              By continuing you agree to our{' '}
              <a href="#" className="text-neutral-600 hover:text-orange-500 no-underline">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-neutral-600 hover:text-orange-500 no-underline">Privacy Policy</a>
            </p>
          </div>
        </div>

        <p className="text-center text-[12px] text-neutral-400 mt-6">
          No account?{' '}
          <a href="/" className="text-orange-500 hover:text-orange-600 no-underline font-medium">
            Back to home
          </a>
        </p>
      </div>
    </div>
  )
}
