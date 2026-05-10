import { ORPCError } from '@orpc/client'
import { db } from '#/db/index'
import { subscriptions } from '#/db/schema'
import { and, eq } from 'drizzle-orm'
import { authed } from './auth'

/**
 * Returns the active subscription for the current user, or throws FORBIDDEN.
 * Use as: `subscribed.handler(...)` after chaining with `authed`.
 */
export const subscribed = authed.use(async ({ context, next }) => {
  const [sub] = await db
    .select()
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, context.user.id),
        eq(subscriptions.status, 'active'),
      ),
    )
    .limit(1)

  if (!sub) {
    throw new ORPCError('FORBIDDEN', {
      message: 'Active subscription required. Please subscribe to continue.',
    })
  }

  return next({
    context: {
      ...context,
      subscription: sub,
    },
  })
})

/**
 * Helper to get active subscription for a user (for use in server fns / middleware)
 */
export async function getUserSubscription(userId: string) {
  const [sub] = await db
    .select()
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, userId),
        eq(subscriptions.status, 'active'),
      ),
    )
    .limit(1)
  return sub ?? null
}
