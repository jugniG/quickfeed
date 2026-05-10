import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '#/lib/auth-client'
import { useMutation } from '@tanstack/react-query'
import { orpc } from '#/orpc/client'

export const Route = createFileRoute('/pricing')({
  component: Pricing,
})

const STORAGE_TIERS = [
  { mb: 100, label: '100 MB' },
  { mb: 500, label: '500 MB' },
  { mb: 1024, label: '1 GB' },
  { mb: 2048, label: '2 GB' },
  { mb: 3072, label: '3 GB' },
  { mb: 4096, label: '4 GB' },
  { mb: 5120, label: '5 GB' },
]

const SLIDER_STEPS = STORAGE_TIERS.length - 1

function getMonthlyPrice(mb: number) { return (mb / 100) * 2 }
function getYearlyPrice(mb: number) { return getMonthlyPrice(mb) * 0.8 }

function fmt(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`
}

export function Pricing() {
  const [sliderIdx, setSliderIdx] = useState(0)
  const tier = STORAGE_TIERS[sliderIdx]
  const navigate = useNavigate()
  const { data: session } = authClient.useSession()

  const checkoutMutation = useMutation(orpc.billing.createCheckout.mutationOptions())

  async function handleSubscribe(interval: 'monthly' | 'yearly') {
    if (!session?.user) {
      navigate({ to: '/login' })
      return
    }
    try {
      const result = await checkoutMutation.mutateAsync({
        storageMb: tier.mb,
        interval,
        successUrl: `${window.location.origin}/billing?success=1`,
        cancelUrl: `${window.location.origin}/pricing`,
      })
      if (result.url) window.location.href = result.url
    } catch (err: any) {
      console.error(err)
      alert(err?.message ?? 'Something went wrong. Check that products are configured in your Dodo dashboard.')
    }
  }

  const monthly = getMonthlyPrice(tier.mb)
  const yearly = getYearlyPrice(tier.mb)
  const annualSavings = ((monthly - yearly) * 12).toFixed(0)

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Background */}
      <div className="fixed top-[-80px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-r from-orange-200/20 to-amber-200/15 blur-[120px] pointer-events-none" />

      {/* Nav */}
      <header className="h-[60px] border-b border-neutral-200 bg-white/80 backdrop-blur-sm flex items-center justify-between px-6 max-w-[1100px] mx-auto">
        <a href="/" className="flex items-center gap-2 no-underline">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/30">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 4h10M2 7h7M2 10h5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[15px] text-[#0A0A0A] tracking-tight font-bold">QuickFeed</span>
        </a>
        <div className="flex items-center gap-3">
          {session?.user ? (
            <a href="/dashboard" className="text-[13.5px] font-semibold text-orange-500 hover:text-orange-600 no-underline">
              Dashboard →
            </a>
          ) : (
            <a href="/login" className="text-[13.5px] font-semibold text-neutral-600 hover:text-neutral-900 no-underline">
              Sign in
            </a>
          )}
        </div>
      </header>

      <main className="max-w-[720px] mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-[12px] font-semibold text-orange-600 mb-5">
            Simple pricing
          </div>
          <h1 className="text-[38px] font-black tracking-[-0.04em] text-[#0A0A0A] leading-[1.1] mb-4">
            Storage that scales<br />with your feedback
          </h1>
          <p className="text-[16px] text-neutral-500 leading-[1.65] max-w-[400px] mx-auto">
            $2 per 100 MB / month. Drag the slider to your storage need.
          </p>
        </div>

        {/* Slider */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-7 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-neutral-500">Storage</span>
            <span className="text-[20px] font-black text-[#0A0A0A] tracking-tight">{tier.label}</span>
          </div>
          <input
            type="range"
            min={0}
            max={SLIDER_STEPS}
            step={1}
            value={sliderIdx}
            onChange={e => setSliderIdx(Number(e.target.value))}
            className="w-full accent-orange-500 cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            {STORAGE_TIERS.map((t, i) => (
              <button
                key={t.mb}
                onClick={() => setSliderIdx(i)}
                className={`text-[10.5px] font-medium transition-colors ${i === sliderIdx ? 'text-orange-500' : 'text-neutral-400 hover:text-neutral-600'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Monthly */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-7 shadow-sm flex flex-col">
            <div className="mb-5">
              <div className="text-[13px] font-semibold text-neutral-500 mb-1">Monthly</div>
              <div className="flex items-end gap-1.5">
                <span className="text-[36px] font-black tracking-[-0.04em] text-[#0A0A0A]">{fmt(monthly)}</span>
                <span className="text-[14px] text-neutral-400 mb-1.5">/mo</span>
              </div>
            </div>
            <ul className="space-y-2.5 mb-7 flex-1">
              <PricingFeature text={`${tier.label} image storage`} />
              <PricingFeature text="Unlimited feedback entries" />
              <PricingFeature text="Unlimited websites" />
              <PricingFeature text="Screenshot capture" />
              <PricingFeature text="Cancel anytime" />
            </ul>
            <button
              onClick={() => handleSubscribe('monthly')}
              disabled={checkoutMutation.isPending}
              className="w-full py-3 rounded-xl border border-neutral-200 text-[14px] font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-200 disabled:opacity-60"
            >
              {checkoutMutation.isPending ? 'Redirecting...' : 'Get started'}
            </button>
          </div>

          {/* Yearly — highlighted */}
          <div className="relative bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] rounded-2xl border border-neutral-800 p-7 shadow-xl flex flex-col overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-[11px] font-bold text-orange-400">
              Save {Math.round((1 - yearly / monthly) * 100)}%
            </div>

            <div className="mb-4">
              <div className="text-[13px] font-semibold text-neutral-400 mb-1">Yearly</div>
              <div className="flex items-end gap-1.5">
                <span className="text-[36px] font-black tracking-[-0.04em] text-white">{fmt(yearly)}</span>
                <span className="text-[14px] text-neutral-500 mb-1.5">/mo</span>
              </div>
              <div className="text-[12px] text-neutral-500 mt-0.5">
                Billed {fmt(yearly * 12)}/year · Save {fmt(Number(annualSavings))}
              </div>
            </div>

            {/* Callout */}
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3 mb-5">
              <p className="text-[12.5px] text-orange-300 leading-[1.55] italic">
                "Iterating over user feedbacks is a long bet."
              </p>
            </div>

            <ul className="space-y-2.5 mb-7 flex-1">
              <PricingFeatureDark text={`${tier.label} image storage`} />
              <PricingFeatureDark text="Unlimited feedback entries" />
              <PricingFeatureDark text="Unlimited websites" />
              <PricingFeatureDark text="Screenshot capture" />
              <PricingFeatureDark text="Priority support" />
            </ul>

            <button
              onClick={() => handleSubscribe('yearly')}
              disabled={checkoutMutation.isPending}
              className="relative w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[14px] font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-shadow duration-200 overflow-hidden group disabled:opacity-60"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
              <span className="relative">
                {checkoutMutation.isPending ? 'Redirecting...' : 'Get started — best value'}
              </span>
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-[12.5px] text-neutral-400 mt-8 leading-relaxed">
          Payments secured by DodoPayments · Cancel anytime · No hidden fees
        </p>
      </main>
    </div>
  )
}

function PricingFeature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2.5 text-[13px] text-neutral-600">
      <span className="w-4 h-4 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1.5 4l1.5 1.5 3.5-3" stroke="#f97316" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {text}
    </li>
  )
}

function PricingFeatureDark({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2.5 text-[13px] text-neutral-300">
      <span className="w-4 h-4 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shrink-0">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1.5 4l1.5 1.5 3.5-3" stroke="#fb923c" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {text}
    </li>
  )
}
