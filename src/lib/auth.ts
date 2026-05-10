import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { magicLink } from 'better-auth/plugins'
import { db } from '#/db/index'
import { Resend } from 'resend'
import { env } from '#/env'
import { user, session, account, verification } from '#/db/schema'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { createServerFn } from '@tanstack/react-start'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: { user, session, account, verification },
  }),
  baseURL:env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: env.GOOGLE_CLIENT_SECRET ?? '',
    },
  },
  plugins: [
    tanstackStartCookies(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        if (!env.RESEND_API_KEY) {
          // Dev fallback: log to console
          console.log(`[DEV] Magic link for ${email}: ${url}`)
          return
        }
        const resend = new Resend(env.RESEND_API_KEY)
        const response = await resend.emails.send({
          from: 'quickfeed@syncmate.xyz',
          to: email,
          subject: 'Your QuickFeed login link',
          html: `
            <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;">
              <div style="margin-bottom:24px;">
                <span style="font-size:20px;font-weight:800;letter-spacing:-0.04em;">QuickFeed</span>
              </div>
              <h2 style="font-size:22px;font-weight:700;margin:0 0 8px;">Your magic link</h2>
              <p style="color:#6b7280;font-size:15px;line-height:1.6;margin:0 0 24px;">
                Click below to sign in. This link expires in 15 minutes and can only be used once.
              </p>
              <a href="${url}" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#f97316,#f59e0b);color:white;text-decoration:none;border-radius:12px;font-weight:600;font-size:15px;">
                Sign in to QuickFeed →
              </a>
              <p style="color:#9ca3af;font-size:12px;margin-top:32px;">
                If you didn't request this, you can safely ignore this email.
              </p>
            </div>
          `,
        })
        console.log('[Resend]', JSON.stringify(response))
      },
    }),
  ],
  	trustedOrigins: ["https://www.quickfeed.live", "https://quickfeed-tan.vercel.app"],
})

export type Session = typeof auth.$Infer.Session

export const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders()  
  const session = await auth.api.getSession({
    headers,
  })
  return session
})
