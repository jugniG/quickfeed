import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/db/index'
import { feedbacks, websites } from '#/db/schema'
import { eq } from 'drizzle-orm'
import { uploadImageToR2 } from '#/lib/r2'
import crypto from 'node:crypto'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const MAX_BYTES = 5 * 1024 * 1024
const MAX_IMAGES = 5

function toHostname(raw: string): string {
  try {
    return new URL(raw.includes('://') ? raw : `https://${raw}`).hostname.replace(/^www\./, '')
  } catch {
    return raw.replace(/^www\./, '')
  }
}

/** Upload a base64 data URL to R2, returns public URL */
async function uploadBase64ToR2(dataUrl: string, websiteId: string): Promise<string | null> {
  try {
    // "data:image/png;base64,AAAA..."
    const match = dataUrl.match(/^data:(image\/[a-z+]+);base64,(.+)$/)
    if (!match) return null

    const mimeType = match[1]
    if (!ALLOWED_TYPES.includes(mimeType)) return null

    const base64Data = match[2]
    const buffer = Buffer.from(base64Data, 'base64')
    if (buffer.byteLength > MAX_BYTES) return null

    const ext = mimeType.split('/')[1].replace('jpeg', 'jpg').replace('+xml', '')
    const key = `feedback/${websiteId}/${crypto.randomUUID()}.${ext}`

    return await uploadImageToR2(buffer, key, mimeType)
  } catch {
    return null
  }
}

export const Route = createFileRoute('/api/feedback/')(({
  server: {
    handlers: {
      OPTIONS: () => new Response(null, { status: 204, headers: cors }),

      POST: async ({ request }: { request: Request }) => {
        try {
          const body = await request.json()
          const { websiteId, message, submitterEmail, submitterName, url, userAgent, imageFiles } = body

          if (!websiteId || !message?.trim()) {
            return new Response(
              JSON.stringify({ error: 'websiteId and message are required' }),
              { status: 400, headers: cors },
            )
          }

          // ── Domain verification ─────────────────────────────────────────────
          const origin      = request.headers.get('origin')  || ''
          const referer     = request.headers.get('referer') || ''
          const requestHost = toHostname(origin || referer)
          const isLocalhost = ['localhost', '127.0.0.1', ''].includes(requestHost)

          const [site] = await db
            .select({ id: websites.id, domain: websites.domain })
            .from(websites)
            .where(eq(websites.id, String(websiteId)))

          if (!site) {
            return new Response(JSON.stringify({ error: 'Website not found' }), {
              status: 404, headers: cors,
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

          // ── Upload images to R2 ─────────────────────────────────────────────
          const safeImages: string[] = []

          if (Array.isArray(imageFiles)) {
            const toUpload = imageFiles
              .filter((f): f is { data: string; type: string } =>
                f && typeof f.data === 'string' && typeof f.type === 'string'
              )
              .slice(0, MAX_IMAGES)

            await Promise.all(
              toUpload.map(async (f) => {
                const uploadedUrl = await uploadBase64ToR2(f.data, String(websiteId))
                if (uploadedUrl) safeImages.push(uploadedUrl)
              })
            )
          }
          // ───────────────────────────────────────────────────────────────────

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
            status: 201, headers: cors,
          })
        } catch (err) {
          console.error('[feedback api]', err)
          return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500, headers: cors,
          })
        }
      },
    },
  },
}))
