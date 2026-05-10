import { createServerFn } from '@tanstack/react-start'
import { getServerSession } from '#/lib/session'
import { getUserSubscription } from '#/orpc/middleware/subscription'

export const getSessionAndSub = createServerFn().handler(async () => {
  const session = await getServerSession()
  if (!session) return { session: null, hasSubscription: false }
  const sub = await getUserSubscription(session.user.id)
  return { session, hasSubscription: !!sub }
})
