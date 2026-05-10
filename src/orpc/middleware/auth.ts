import { os } from '@orpc/server'
import { ORPCError } from '@orpc/client'
import { auth } from '#/lib/auth'
import { errorLogger } from './error-logger'

export interface ORPCContext {
  headers: Headers | Record<string, string>
}

// Base with error logging — export for public routes
export const base = os.$context<ORPCContext>().use(errorLogger)

// Authed base builder — use this instead of `os` for protected procedures
export const authed = base.use(async ({ context, next }) => {
  const headers =
    context.headers instanceof Headers
      ? context.headers
      : new Headers(context.headers as Record<string, string>)

  const session = await auth.api.getSession({ headers })

  if (!session?.user) {
    throw new ORPCError('UNAUTHORIZED')
  }

  return next({
    context: {
      ...context,
      session: session.session,
      user: session.user,
    },
  })
})
