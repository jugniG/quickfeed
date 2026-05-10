import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getServerSession } from '#/lib/session'
import { getUserSubscription } from '#/orpc/middleware/subscription'

// Server-only fn — DB + Dodo SDK never touch the client bundle
const getSessionAndSub = createServerFn().handler(async () => {
  const session = await getServerSession()
  if (!session) return { session: null, hasSubscription: false }
  const sub = await getUserSubscription(session.user.id)
  return { session, hasSubscription: !!sub }
})

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
