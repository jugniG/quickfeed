import { os } from '@orpc/server'
import { ORPCError } from '@orpc/client'

// Error logging middleware — catches all errors, logs them, and returns proper ORPC errors
export const errorLogger = os.use(async ({ context, next, path }) => {
  try {
    return await next({ context })
  } catch (error) {
    // Log the error with full context
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error('🔴 ORPC Error')
    console.error('Path:', path.join('.'))
    console.error('Context:', JSON.stringify({
      headers: context.headers instanceof Headers
        ? Object.fromEntries(context.headers.entries())
        : context.headers,
      user: (context as any).user?.id ?? 'anonymous',
    }, null, 2))

    if (error instanceof Error) {
      console.error('Error Name:', error.name)
      console.error('Error Message:', error.message)
      console.error('Stack Trace:', error.stack)
    } else {
      console.error('Error:', error)
    }
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    // Re-throw ORPCError as-is
    if (error instanceof ORPCError) {
      throw error
    }

    // Wrap unknown errors in INTERNAL_SERVER_ERROR
    throw new ORPCError('INTERNAL_SERVER_ERROR', {
      message: error instanceof Error ? error.message : 'Internal server error',
    })
  }
})
