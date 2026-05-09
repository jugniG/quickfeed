import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getServerSession } from '#/lib/session'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async () => {
    const session = await getServerSession()
    if (!session) {
      throw redirect({ to: '/login' })
    }
    return { session }
  },
  component: ProtectedLayout,
})

function ProtectedLayout() {
  return <Outlet />
}
