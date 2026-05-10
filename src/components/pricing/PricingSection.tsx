import { useState } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

const STORAGE_TIERS = [
  { mb: 100,  label: '100 MB',  feedbacks: '~500' },
  { mb: 500,  label: '500 MB',  feedbacks: '~2,500' },
  { mb: 1024, label: '1 GB',    feedbacks: '~5,000' },
  { mb: 2048, label: '2 GB',    feedbacks: '~10,000' },
  { mb: 3072, label: '3 GB',    feedbacks: '~15,000' },
  { mb: 4096, label: '4 GB',    feedbacks: '~20,000' },
  { mb: 5120, label: '5 GB',    feedbacks: '~25,000' },
]

function getMonthlyPrice(mb: number) { return (mb / 100) * 2 }
function getYearlyPrice(mb: number)  { return getMonthlyPrice(mb) * 0.8 }
function fmt(n: number) { return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}` }

// ─── Props ───────────────────────────────────────────────────────────────────

interface PricingSectionProps {
  /** If true, shows the full-page wrapper (used on /pricing). If false, renders inline for landing page. */
  standalone?: boolean
  /** Called when user picks a plan — for landing page redirect-to-login-then-checkout flow */
  onSubscribe?: (storageMb: number, interval: 'monthly' | 'yearly') => void
  /** If provided, used to trigger checkout directly */
  triggerCheckout?: (storageMb: number, interval: 'monthly' | 'yearly') => Promise<void>
  isPending?: boolean
  /** Initial slider index */
  defaultTierIdx?: number
}

// ─── Main component ───────────────────────────────────────────────────────────

export function PricingSection({
  standalone = false,
  onSubscribe,
  triggerCheckout,
  isPending = false,
  defaultTierIdx = 0,
}: PricingSectionProps) {
  const [sliderIdx, setSliderIdx]   = useState(defaultTierIdx)
  const [interval, setInterval]     = useState<'monthly' | 'yearly'>('monthly')
  const tier    = STORAGE_TIERS[sliderIdx]
  const monthly = getMonthlyPrice(tier.mb)
  const yearly  = getYearlyPrice(tier.mb)
  const annualSaving = fmt((monthly - yearly) * 12)

  function handlePick(chosenInterval: 'monthly' | 'yearly') {
    if (triggerCheckout) {
      triggerCheckout(tier.mb, chosenInterval)
    } else if (onSubscribe) {
      onSubscribe(tier.mb, chosenInterval)
    }
  }

  const inner = (
    <div className={standalone ? 'max-w-[860px] mx-auto px-6 py-16' : 'max-w-[860px] mx-auto px-6 py-20'}>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/25 text-[12px] font-semibold text-orange-400 mb-5">
          Simple pricing
        </div>
        <h2 className="text-[38px] font-black tracking-[-0.04em] text-white leading-[1.1] mb-4">
          Storage that scales<br />with your feedback
        </h2>
        <p className="text-[15px] text-neutral-400 leading-relaxed">
          $2 per 100 MB / month. Unlimited feedback entries, images &amp; screenshots.
        </p>
      </div>

      {/* ── Slider + toggle row ─────────────────────────────────────── */}
      <div className="mb-8">
        {/* Tier badge + toggle */}
        <div className="flex items-center justify-between mb-4">
          {/* Current tier badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-800 border border-neutral-700 text-[13px] font-semibold text-white">
            <span className="text-amber-400">★</span>
            Up to {tier.feedbacks} feedbacks
            <span className="text-neutral-500 font-normal">({tier.label} storage)</span>
          </div>

          {/* Monthly / Yearly toggle */}
          <div className="relative flex items-center">
            {interval === 'yearly' && (
              <span className="absolute -top-5 right-0 text-[11px] text-orange-400 font-semibold whitespace-nowrap">
                2 months free ↗
              </span>
            )}
            <div className="flex items-center p-1 rounded-xl bg-neutral-800 border border-neutral-700 gap-1">
              <button
                onClick={() => setInterval('monthly')}
                className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                  interval === 'monthly'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setInterval('yearly')}
                className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                  interval === 'yearly'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="flex items-center gap-4">
          <span className="text-[12px] text-neutral-500 w-10 shrink-0">
            {STORAGE_TIERS[0].label}
          </span>
          <div className="flex-1 relative">
            <input
              type="range"
              min={0}
              max={STORAGE_TIERS.length - 1}
              step={1}
              value={sliderIdx}
              onChange={e => setSliderIdx(Number(e.target.value))}
              className="w-full h-2 appearance-none rounded-full cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-orange-500
                [&::-webkit-slider-thumb]:shadow-md
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-runnable-track]:rounded-full"
              style={{
                background: `linear-gradient(to right, #f97316 0%, #f97316 ${(sliderIdx / (STORAGE_TIERS.length - 1)) * 100}%, #404040 ${(sliderIdx / (STORAGE_TIERS.length - 1)) * 100}%, #404040 100%)`,
              }}
            />
          </div>
          <span className="text-[12px] text-neutral-500 w-10 shrink-0 text-right">
            {STORAGE_TIERS[STORAGE_TIERS.length - 1].label}
          </span>
        </div>
      </div>

      {/* ── Cards ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        {/* Monthly card */}
        <div className="bg-neutral-800/60 border border-neutral-700 rounded-2xl p-7 flex flex-col">
          <div className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase mb-4">
            Monthly
          </div>
          <div className="flex items-end gap-1.5 mb-1">
            <span className="text-[44px] font-black tracking-[-0.04em] text-white leading-none">
              {fmt(monthly)}
            </span>
            <span className="text-[14px] text-neutral-500 mb-1.5">/month</span>
          </div>
          <p className="text-[12px] text-neutral-500 mb-6">Billed monthly, cancel anytime</p>

          <ul className="space-y-3 mb-8 flex-1">
            <Feature label="Unlimited feedback entries" />
            <Feature label={`${tier.label} image storage`} />
            <Feature label={`~${tier.feedbacks} feedbacks stored`} />
            <Feature label="Unlimited websites" />
            <Feature label="Screenshot capture" />
            <Feature label="Cancel anytime" />
          </ul>

          <button
            onClick={() => handlePick('monthly')}
            disabled={isPending}
            className="w-full py-3.5 rounded-xl border border-neutral-600 text-[14px] font-semibold text-white hover:border-neutral-400 hover:bg-neutral-700/50 transition-all duration-200 disabled:opacity-50"
          >
            {isPending ? 'Redirecting…' : 'Pick Monthly plan'}
          </button>
        </div>

        {/* Yearly card — highlighted */}
        <div className="relative bg-neutral-800/60 border border-neutral-600 rounded-2xl p-7 flex flex-col overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Quote — on top of card as requested */}
          <div className="relative mb-5">
            <p className="text-[12.5px] text-orange-300/80 italic leading-[1.6]">
              "Iterating over user feedbacks is a long bet."
            </p>
          </div>

          <div className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase mb-4">
            Yearly
          </div>

          <div className="flex items-end gap-1.5 mb-1">
            <span className="text-[44px] font-black tracking-[-0.04em] text-white leading-none">
              {fmt(yearly)}
            </span>
            <span className="text-[14px] text-neutral-500 mb-1.5">/month</span>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[12px] text-neutral-500">
              Billed {fmt(yearly * 12)}/year
            </span>
            <span className="px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-[11px] font-bold text-orange-400">
              Save {annualSaving}/yr
            </span>
          </div>

          <ul className="space-y-3 mb-8 flex-1">
            <Feature label="Unlimited feedback entries" dark />
            <Feature label={`${tier.label} image storage`} dark />
            <Feature label={`~${tier.feedbacks} feedbacks stored`} dark />
            <Feature label="Unlimited websites" dark />
            <Feature label="Screenshot capture" dark />
            <Feature label="Priority support" dark />
          </ul>

          <button
            onClick={() => handlePick('yearly')}
            disabled={isPending}
            className="relative w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[14px] font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow duration-200 overflow-hidden group disabled:opacity-50"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            <span className="relative">
              {isPending ? 'Redirecting…' : 'Pick Yearly plan'}
            </span>
          </button>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-center text-[12px] text-neutral-600 mt-8">
        Payments secured by DodoPayments · No hidden fees · Cancel anytime
      </p>
    </div>
  )

  if (!standalone) return inner

  return (
    <div className="min-h-screen bg-[#111111]">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.07)_0%,transparent_60%)] pointer-events-none" />
      <div className="relative z-10">{inner}</div>
    </div>
  )
}

// ─── Feature row ──────────────────────────────────────────────────────────────

function Feature({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <li className={`flex items-center gap-2.5 text-[13px] ${dark ? 'text-neutral-300' : 'text-neutral-300'}`}>
      <span className="w-4 h-4 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shrink-0">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1.5 4l1.5 1.5 3.5-3" stroke="#fb923c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {label}
    </li>
  )
}
