import { useNavigate } from '@tanstack/react-router'
import { authClient } from '#/lib/auth-client'
import { useMutation } from '@tanstack/react-query'
import { orpc } from '#/orpc/client'
import { PricingSection } from '#/components/pricing/PricingSection'

export function LandingPricing() {
  const navigate = useNavigate()
  const { data: session } = authClient.useSession()
  const checkoutMutation = useMutation(orpc.billing.createCheckout.mutationOptions())

  async function triggerCheckout(storageMb: number, interval: 'monthly' | 'yearly') {
    if (!session?.user) {
      // Save intent, redirect to login — login page will resume after auth
      sessionStorage.setItem('checkout_intent', JSON.stringify({ storageMb, interval }))
      navigate({ to: '/login' })
      return
    }
    try {
      const result = await checkoutMutation.mutateAsync({
        storageMb,
        interval,
        successUrl: `${window.location.origin}/billing?success=1`,
        cancelUrl: `${window.location.origin}/pricing`,
      })
      if (result.url) window.location.href = result.url
    } catch (err: any) {
      console.error(err)
    }
  }

  return (
    <section id="pricing" className="bg-[#111111]">
      <PricingSection
        triggerCheckout={triggerCheckout}
        isPending={checkoutMutation.isPending}
      />
    </section>
  )
}
