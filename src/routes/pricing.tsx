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

      <PricingSection
        standalone
        triggerCheckout={triggerCheckout}
        isPending={checkoutMutation.isPending}
        defaultTierIdx={defaultTierIdx}
      />
    </>
  )
}
