import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getServerSession } from '#/lib/session'
import { getUserSubscription } from '#/orpc/middleware/subscription'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ location }) => {
    const session = await getServerSession()

    // Not logged in → login
    if (!session) {
      throw redirect({ to: '/login' })
    }

    // Billing page itself is always accessible (avoid redirect loop)
    const isBillingPage = location.pathname === '/billing'
    if (!isBillingPage) {
      const subscription = await getUserSubscription(session.user.id)
      if (!subscription) {
        throw redirect({ to: '/pricing' })
      }
    }

    return { session }
  },
  component: ProtectedLayout,
})

function ProtectedLayout() {
  return <Outlet />
}
