import { os } from '@orpc/server'
import { ORPCError } from '@orpc/client'
import { auth } from '#/lib/auth'
import { getRequestHeaders } from '@tanstack/react-start/server'

export interface ORPCContext {
  headers: Headers | Record<string, string>
}

// Error logging middleware
const errorLogger = async ({ context, next, path }: any) => {
  try {
    return await next({ context })
  } catch (error) {
    console.error('[oRPC Error]', "Path:", path, error)

    if (error instanceof ORPCError) throw error

    throw new ORPCError('INTERNAL_SERVER_ERROR', {
      message: 'Something went wrong',
    })
  }
}

// Base procedure with context and error logging - use for public routes
export const base = os
  .$context<ORPCContext>()
  .use(errorLogger)

// Authed procedure - use for protected routes
export const authed = base.use(async ({ context, next }) => {
  const headers = getRequestHeaders()
  const session = await auth.api.getSession({ headers })

  if (!session?.user) {
    console.log('session', session);
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
