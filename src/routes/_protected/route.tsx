import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getSessionAndSub } from '#/lib/server-fns'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ location }) => {
    const { session, hasSubscription } = await getSessionAndSub()

    if (!session) {
      throw redirect({ to: '/login' })
    }

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
