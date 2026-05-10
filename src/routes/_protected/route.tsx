import { getSession } from '#/lib/auth-client'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { DashboardTopbar } from '#/components/dashboard/DashboardTopbar'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ location }) => {
    const session = await getSession()

    if (!session?.user) {
      throw redirect({ to: '/login' })
    }

    const hasSubscription = !!session.user.subscriptionId

    const isBillingPage = location.pathname === '/billing'
    if (!isBillingPage && !hasSubscription) {
      throw redirect({ to: '/pricing' })
    }

    return { session }
  },
  component: ProtectedLayout,
})

function ProtectedLayout() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <DashboardTopbar />
      <Outlet />
    </div>
  )
}
