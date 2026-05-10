import { createAuthClient } from 'better-auth/react'
import { magicLinkClient } from 'better-auth/client/plugins'
import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { auth } from './auth'

export const authClient = createAuthClient({
  plugins: [magicLinkClient()],
})
export const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders()
  const session = await auth.api.getSession({
    headers,
  })
  return session
})
