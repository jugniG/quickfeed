import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authClient } from '#/lib/auth-client'
import { orpc } from '#/orpc/client'
import { DashboardTopbar } from '#/components/dashboard/DashboardTopbar'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/_protected/billing')({
  validateSearch: (search: Record<string, unknown>) => ({
    success: search.success === '1' || search.success === 1 ? true : undefined,
  }),
  component: BillingPage,
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

function getMonthlyPrice(mb: number) { return (mb / 100) * 2 }
function getYearlyPrice(mb: number) { return getMonthlyPrice(mb) * 0.8 }
function fmt(n: number) { return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}` }

function BillingPage() {
  const { data: session } = authClient.useSession()
  const user = session?.user
  const queryClient = useQueryClient()
  const { success } = useSearch({ from: '/_protected/billing' })
  const [showSuccessBanner, setShowSuccessBanner] = useState(!!success)

  useEffect(() => {
    if (success) {
      // Remove ?success=1 from URL without reload
      const url = new URL(window.location.href)
      url.searchParams.delete('success')
      window.history.replaceState({}, '', url.toString())
      const t = setTimeout(() => setShowSuccessBanner(false), 5000)
      return () => clearTimeout(t)
    }
  }, [success])

  const { data: sub, isLoading } = useQuery(orpc.billing.getSubscription.queryOptions())

  const [changingPlan, setChangingPlan] = useState(false)
  const [selectedMb, setSelectedMb] = useState<number | null>(null)
  const [selectedInterval, setSelectedInterval] = useState<'monthly' | 'yearly'>('monthly')

  const cancelMutation = useMutation(
    orpc.billing.cancelSubscription.mutationOptions({
      onSuccess: () => queryClient.invalidateQueries(orpc.billing.getSubscription.queryOptions()),
    }),
  )

  const resumeMutation = useMutation(
    orpc.billing.resumeSubscription.mutationOptions({
      onSuccess: () => queryClient.invalidateQueries(orpc.billing.getSubscription.queryOptions()),
    }),
  )

  const changePlanMutation = useMutation(
    orpc.billing.changePlan.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.billing.getSubscription.queryOptions())
        setChangingPlan(false)
      },
    }),
  )

  const checkoutMutation = useMutation(orpc.billing.createCheckout.mutationOptions())

  const updatePaymentMutation = useMutation(
    orpc.billing.getUpdatePaymentUrl.mutationOptions({
      onSuccess: (data) => {
        if (data.url) window.location.href = data.url
      },
    }),
  )

  async function handleSubscribe(mb: number, interval: 'monthly' | 'yearly') {
    try {
      const result = await checkoutMutation.mutateAsync({
        storageMb: mb,
        interval,
        successUrl: `${window.location.origin}/billing?success=1`,
        cancelUrl: `${window.location.origin}/billing`,
      })
      if (result.url) window.location.href = result.url
    } catch (err: any) {
      alert(err?.message ?? 'Something went wrong.')
    }
  }

  async function handleChangePlan() {
    if (!selectedMb) return
    try {
      await changePlanMutation.mutateAsync({ storageMb: selectedMb, interval: selectedInterval })
    } catch (err: any) {
      alert(err?.message ?? 'Failed to change plan. Please contact support.')
    }
  }

  const formatDate = (d: Date | string | null | undefined) => {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  const storageLabel = (mb: number) => {
    if (mb < 1024) return `${mb} MB`
    return `${mb / 1024} GB`
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <DashboardTopbar user={user} />

      <main className="max-w-[680px] mx-auto px-6 py-10">

        {/* Success banner */}
        {showSuccessBanner && (
          <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-[13.5px] font-medium">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-green-500">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Subscription activated! You're all set.
            <button onClick={() => setShowSuccessBanner(false)} className="ml-auto text-green-400 hover:text-green-600">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </button>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-[26px] font-bold tracking-[-0.03em] text-[#0A0A0A]">Billing</h1>
          <p className="text-[13.5px] text-neutral-500 mt-0.5">Manage your subscription and storage plan.</p>
        </div>

        {isLoading && (
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 animate-pulse">
            <div className="h-5 bg-neutral-100 rounded w-1/3 mb-3" />
            <div className="h-4 bg-neutral-100 rounded w-1/2" />
          </div>
        )}

        {!isLoading && !sub && (
          <NoSubscription onSubscribe={handleSubscribe} checkoutPending={checkoutMutation.isPending} />
        )}

        {!isLoading && sub && (
          <div className="space-y-5">
            {/* Current plan card */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-7 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-[12px] font-semibold text-neutral-400 uppercase tracking-widest mb-1">Current Plan</div>
                  <div className="text-[24px] font-black tracking-[-0.03em] text-[#0A0A0A]">
                    {storageLabel(sub.storageMb)}
                  </div>
                  <div className="text-[13px] text-neutral-500 mt-1 capitalize">
                    {sub.billingInterval} · {fmt(sub.billingInterval === 'yearly' ? getYearlyPrice(sub.storageMb) : getMonthlyPrice(sub.storageMb))}/mo
                  </div>
                </div>
                <StatusBadge status={sub.status} cancelAt={sub.cancelAtNextBilling} />
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-100 mb-6">
                <div>
                  <div className="text-[11px] text-neutral-400 font-medium mb-0.5">Next billing</div>
                  <div className="text-[13px] font-semibold text-neutral-700">
                    {sub.cancelAtNextBilling ? '—' : formatDate(sub.currentPeriodEnd)}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-neutral-400 font-medium mb-0.5">Storage</div>
                  <div className="text-[13px] font-semibold text-neutral-700">{storageLabel(sub.storageMb)}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {!sub.cancelAtNextBilling && sub.status === 'active' && (
                  <button
                    onClick={() => setChangingPlan(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] font-semibold shadow-sm shadow-orange-200 hover:shadow-orange-300 transition-shadow"
                  >
                    Change plan
                  </button>
                )}
                {sub.status === 'active' && !sub.cancelAtNextBilling && (
                  <button
                    onClick={() => updatePaymentMutation.mutate({ returnUrl: window.location.href })}
                    disabled={updatePaymentMutation.isPending}
                    className="px-4 py-2.5 rounded-xl border border-neutral-200 text-[13px] font-semibold text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 transition-all disabled:opacity-60"
                  >
                    Update payment method
                  </button>
                )}
                {sub.status === 'active' && !sub.cancelAtNextBilling && (
                  <button
                    onClick={() => {
                      if (confirm('Cancel at end of billing period?')) cancelMutation.mutate(undefined)
                    }}
                    disabled={cancelMutation.isPending}
                    className="px-4 py-2.5 rounded-xl border border-red-200 text-[13px] font-semibold text-red-500 hover:bg-red-50 transition-all disabled:opacity-60"
                  >
                    {cancelMutation.isPending ? 'Cancelling...' : 'Cancel subscription'}
                  </button>
                )}
                {sub.cancelAtNextBilling && (
                  <button
                    onClick={() => resumeMutation.mutate(undefined)}
                    disabled={resumeMutation.isPending}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] font-semibold shadow-sm"
                  >
                    {resumeMutation.isPending ? 'Resuming...' : 'Resume subscription'}
                  </button>
                )}
              </div>
            </div>

            {/* Change plan panel */}
            {changingPlan && (
              <div className="bg-white rounded-2xl border border-orange-200 p-7 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-[16px] font-bold text-[#0A0A0A]">Change Plan</h2>
                  <button onClick={() => setChangingPlan(false)} className="text-neutral-400 hover:text-neutral-600">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* Interval toggle */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex p-1 bg-neutral-100 rounded-xl gap-1">
                    {(['monthly', 'yearly'] as const).map(iv => (
                      <button
                        key={iv}
                        onClick={() => setSelectedInterval(iv)}
                        className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${selectedInterval === iv ? 'bg-white text-neutral-800 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                      >
                        {iv === 'yearly' ? 'Yearly (save 20%)' : 'Monthly'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage options */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {STORAGE_TIERS.map(t => {
                    const price = selectedInterval === 'yearly' ? getYearlyPrice(t.mb) : getMonthlyPrice(t.mb)
                    const isCurrent = t.mb === sub.storageMb && selectedInterval === sub.billingInterval
                    const isSelected = selectedMb === t.mb
                    return (
                      <button
                        key={t.mb}
                        onClick={() => setSelectedMb(t.mb)}
                        disabled={isCurrent}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isCurrent
                            ? 'border-neutral-200 bg-neutral-50 opacity-50 cursor-not-allowed'
                            : isSelected
                            ? 'border-orange-400 bg-orange-50 shadow-sm'
                            : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        <div className="text-[13px] font-bold text-neutral-800">{t.label}</div>
                        <div className="text-[12px] text-neutral-500">{fmt(price)}/mo</div>
                        {isCurrent && <div className="text-[10px] text-neutral-400 mt-0.5">Current</div>}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={handleChangePlan}
                  disabled={!selectedMb || changePlanMutation.isPending}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[14px] font-semibold shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {changePlanMutation.isPending
                    ? 'Updating plan...'
                    : selectedMb
                    ? `Switch to ${storageLabel(selectedMb)} ${selectedInterval}`
                    : 'Select a plan above'}
                </button>
                {changePlanMutation.isError && (
                  <p className="text-[12px] text-red-500 mt-2 text-center">
                    {(changePlanMutation.error as any)?.message ?? 'Failed to change plan'}
                  </p>
                )}
              </div>
            )}

            {/* Info box */}
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
              <p className="text-[13px] text-orange-700 leading-[1.6]">
                <strong>Storage counts toward both feedback text and screenshots.</strong> If you exceed your limit, new submissions won't be stored until you upgrade.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function StatusBadge({ status, cancelAt }: { status: string; cancelAt: boolean }) {
  if (cancelAt) return (
    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-[12px] font-semibold text-amber-600">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
      Cancels at period end
    </span>
  )
  if (status === 'active') return (
    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-[12px] font-semibold text-green-600">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
      Active
    </span>
  )
  if (status === 'on_hold') return (
    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-[12px] font-semibold text-red-500">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
      Payment failed
    </span>
  )
  return (
    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-[12px] font-semibold text-neutral-500">
      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
      {status}
    </span>
  )
}

function NoSubscription({ onSubscribe, checkoutPending }: { onSubscribe: (mb: number, interval: 'monthly' | 'yearly') => void, checkoutPending: boolean }) {
  const [sliderIdx, setSliderIdx] = useState(0)
  const [interval, setInterval] = useState<'monthly' | 'yearly'>('yearly')
  const tier = STORAGE_TIERS[sliderIdx]
  const price = interval === 'yearly' ? getYearlyPrice(tier.mb) : getMonthlyPrice(tier.mb)

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-orange-400">
            <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <h2 className="text-[18px] font-bold text-[#0A0A0A] mb-2">No active subscription</h2>
        <p className="text-[13.5px] text-neutral-500">Choose your storage and billing cycle below.</p>
      </div>

      {/* Interval toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex p-1 bg-neutral-100 rounded-xl gap-1">
          {(['monthly', 'yearly'] as const).map(iv => (
            <button
              key={iv}
              onClick={() => setInterval(iv)}
              className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${interval === iv ? 'bg-white text-neutral-800 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
            >
              {iv === 'yearly' ? 'Yearly (save 20%)' : 'Monthly'}
            </button>
          ))}
        </div>
      </div>

      {/* Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-medium text-neutral-500">Storage</span>
          <span className="text-[18px] font-black text-[#0A0A0A]">{tier.label}</span>
        </div>
        <input
          type="range"
          min={0}
          max={STORAGE_TIERS.length - 1}
          step={1}
          value={sliderIdx}
          onChange={e => setSliderIdx(Number(e.target.value))}
          className="w-full accent-orange-500 cursor-pointer"
        />
        <div className="flex justify-between mt-1.5">
          {STORAGE_TIERS.map((t, i) => (
            <span key={t.mb} className={`text-[10px] font-medium ${i === sliderIdx ? 'text-orange-500' : 'text-neutral-400'}`}>
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Price display */}
      <div className="text-center mb-6">
        <div className="text-[32px] font-black tracking-[-0.04em] text-[#0A0A0A]">
          {fmt(price)}<span className="text-[16px] font-medium text-neutral-400">/mo</span>
        </div>
        {interval === 'yearly' && (
          <div className="text-[12.5px] text-neutral-500 mt-0.5">Billed {fmt(price * 12)}/year</div>
        )}
      </div>

      <button
        onClick={() => onSubscribe(tier.mb, interval)}
        disabled={checkoutPending}
        className="relative w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[14px] font-semibold shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow duration-200 overflow-hidden group disabled:opacity-70"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
        <span className="relative">
          {checkoutPending ? 'Redirecting to checkout...' : `Subscribe · ${fmt(price)}/mo`}
        </span>
      </button>
    </div>
  )
}
