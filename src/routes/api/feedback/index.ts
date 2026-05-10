import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/db/index'
import { feedbacks, websites } from '#/db/schema'
import { eq } from 'drizzle-orm'

export const Route = createFileRoute('/api/feedback/')({
  server: {
    handlers: {
      OPTIONS: () =>
        new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }),
      POST: async ({ request }) => {
        const cors = {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }

        try {
          const body = await request.json()
          const { websiteId, message, submitterEmail, submitterName, url, userAgent } = body

          if (!websiteId || !message?.trim()) {
            return new Response(JSON.stringify({ error: 'websiteId and message are required' }), {
              status: 400,
              headers: cors,
            })
          }

          // Verify website exists
          const [site] = await db
            .select({ id: websites.id })
            .from(websites)
            .where(eq(websites.id, String(websiteId)))

          if (!site) {
            return new Response(JSON.stringify({ error: 'Website not found' }), {
              status: 404,
              headers: cors,
            })
          }

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
})
