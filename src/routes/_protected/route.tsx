import { getSession } from '#/lib/auth-client'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ location }) => {
    console.log('a');
    
    const session = await getSession()

    if (!session?.user) {
      throw redirect({ to: '/login' })
    }

    // Subscription is now included in session.user.subscription
    const hasSubscription = !!session.user.subscriptionId

    // Billing page is always accessible — avoids redirect loop
    const isBillingPage = location.pathname === '/billing'
    if (!isBillingPage && !hasSubscription) {
      throw redirect({ to: '/pricing' })
    }

    return { session }
  },
  component: ProtectedLayout,
})

function ProtectedLayout() {
  return <Outlet />
}
