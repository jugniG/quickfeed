import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/db/index'
import { feedbacks, websites } from '#/db/schema'
import { eq } from 'drizzle-orm'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

/** Normalize a raw origin/url to bare hostname, e.g. "https://foo.com/page" → "foo.com" */
function toHostname(raw: string): string {
  try {
    return new URL(raw.includes('://') ? raw : `https://${raw}`).hostname.replace(/^www\./, '')
  } catch {
    return raw.replace(/^www\./, '')
  }
}

export const Route = createFileRoute('/api/feedback/')(({
  server: {
    handlers: {
      OPTIONS: () => new Response(null, { status: 204, headers: cors }),

      POST: async ({ request }: { request: Request }) => {
        try {
          const body = await request.json()
          const { websiteId, message, submitterEmail, submitterName, url, userAgent, images } = body

          if (!websiteId || !message?.trim()) {
            return new Response(
              JSON.stringify({ error: 'websiteId and message are required' }),
              { status: 400, headers: cors },
            )
          }

          // ── Domain verification ─────────────────────────────────────────────
          // Accept request only if the Origin/Referer matches the registered domain.
          // We skip strict check in dev (localhost / 127.x).
          const origin  = request.headers.get('origin')  || ''
          const referer = request.headers.get('referer') || ''
          const requestHost = toHostname(origin || referer)
          const isLocalhost = ['localhost', '127.0.0.1', ''].includes(requestHost)

          // Fetch site
          const [site] = await db
            .select({ id: websites.id, domain: websites.domain })
            .from(websites)
            .where(eq(websites.id, String(websiteId)))

          if (!site) {
            return new Response(JSON.stringify({ error: 'Website not found' }), {
              status: 404,
              headers: cors,
            })
          }

          if (!isLocalhost) {
            const registeredHost = toHostname(site.domain)
            if (requestHost !== registeredHost) {
              return new Response(
                JSON.stringify({
                  error: `Domain mismatch: request from "${requestHost}", expected "${registeredHost}"`,
                }),
                { status: 403, headers: cors },
              )
            }
          }
          // ───────────────────────────────────────────────────────────────────

          // Validate images — must be array of strings from our R2 bucket
          const publicUrl = process.env.CF_R2_PUBLIC_URL ?? ''
          const safeImages: string[] = Array.isArray(images)
            ? images
                .filter((img): img is string => typeof img === 'string')
                .filter(img => !publicUrl || img.startsWith(publicUrl))
                .slice(0, 5) // max 5 images
            : []

          const [feedback] = await db
            .insert(feedbacks)
            .values({
              websiteId: String(websiteId),
              message: String(message).trim(),
              submitterEmail: submitterEmail ? String(submitterEmail) : null,
              submitterName: submitterName ? String(submitterName) : null,
              url: url ? String(url) : null,
              userAgent: userAgent ?? request.headers.get('user-agent') ?? null,
              status: 'unassigned',
              images: safeImages,
            })
            .returning()

          return new Response(JSON.stringify({ ok: true, id: feedback.id }), {
            status: 201,
            headers: cors,
          })
        } catch (err) {
          console.error('[feedback api]', err)
          return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: cors,
          })
        }
      },
    },
  },
}))
