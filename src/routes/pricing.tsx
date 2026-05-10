import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { authClient } from '#/lib/auth-client'
import { useMutation } from '@tanstack/react-query'
import { orpc } from '#/orpc/client'
import { PricingSection } from '#/components/pricing/PricingSection'
import { z } from 'zod'

export const Route = createFileRoute('/pricing')({
  validateSearch: z.object({
    storageMb:    z.coerce.number().optional(),
    interval:     z.enum(['monthly', 'yearly']).optional(),
    autoCheckout: z.coerce.number().optional(), // 1 = trigger checkout immediately
  }).parse,
  component: PricingPage,
})

const STORAGE_TIERS = [100, 500, 1024, 2048, 3072, 4096, 5120]

function PricingPage() {
  const navigate = useNavigate()
  const { data: session } = authClient.useSession()
  const { storageMb, interval, autoCheckout } = Route.useSearch()
  const checkoutMutation = useMutation(orpc.billing.createCheckout.mutationOptions())

  async function triggerCheckout(mb: number, inv: 'monthly' | 'yearly') {
    if (!session?.user) {
      sessionStorage.setItem('checkout_intent', JSON.stringify({ storageMb: mb, interval: inv }))
      navigate({ to: '/login' })
      return
    }
    try {
      const result = await checkoutMutation.mutateAsync({
        storageMb: mb,
        interval: inv,
        successUrl: `${window.location.origin}/billing?success=1`,
        cancelUrl: `${window.location.origin}/pricing`,
      })
      if (result.url) window.location.href = result.url
    } catch (err: any) {
      console.error(err)
      alert(err?.message ?? 'Something went wrong.')
    }
  }

  // Auto-trigger checkout if redirected back from login with intent
  useEffect(() => {
    if (autoCheckout && storageMb && interval && session?.user) {
      triggerCheckout(storageMb, interval)
    }
  }, [autoCheckout, session])

  const defaultTierIdx = storageMb
    ? Math.max(0, STORAGE_TIERS.indexOf(storageMb))
    : 0

  return (
    <>
      {/* Nav */}
      <header className="h-[60px] border-b border-neutral-800 bg-[#111111]/90 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-50">
        <a href="/" className="flex items-center gap-2 no-underline">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/30">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 4h10M2 7h7M2 10h5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[15px] text-white tracking-tight font-bold">QuickFeed</span>
        </a>
        <div className="flex items-center gap-3">
          {session?.user ? (
            <a href="/dashboard" className="text-[13.5px] font-semibold text-orange-400 hover:text-orange-300 no-underline transition-colors">
              Dashboard →
            </a>
          ) : (
            <a href="/login" className="text-[13.5px] font-semibold text-neutral-400 hover:text-white no-underline transition-colors">
              Sign in
            </a>
          )}
        </div>
      </header>

      <PricingSection
        standalone
        triggerCheckout={triggerCheckout}
        isPending={checkoutMutation.isPending}
        defaultTierIdx={defaultTierIdx}
      />
    </>
  )
}
