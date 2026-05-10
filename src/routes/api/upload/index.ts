import { createFileRoute } from '@tanstack/react-router'
import { uploadImageToR2 } from '#/lib/r2'
import { db } from '#/db/index'
import { websites } from '#/db/schema'
import { eq } from 'drizzle-orm'
import crypto from 'node:crypto'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const MAX_BYTES = 5 * 1024 * 1024 // 5 MB

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export const Route = createFileRoute('/api/upload/')({
  server: {
    handlers: {
      OPTIONS: () => new Response(null, { status: 204, headers: cors }),

      POST: async ({ request }) => {
        try {
          const formData = await request.formData()
          const file      = formData.get('file') as File | null
          const websiteId = formData.get('websiteId') as string | null

          if (!file || !websiteId) {
            return new Response(
              JSON.stringify({ error: 'file and websiteId required' }),
              { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } },
            )
          }

          if (!ALLOWED_TYPES.includes(file.type)) {
            return new Response(
              JSON.stringify({ error: 'Only JPEG, PNG, GIF, WEBP allowed' }),
              { status: 415, headers: { ...cors, 'Content-Type': 'application/json' } },
            )
          }

          if (file.size > MAX_BYTES) {
            return new Response(
              JSON.stringify({ error: 'Max file size is 5MB' }),
              { status: 413, headers: { ...cors, 'Content-Type': 'application/json' } },
            )
          }

          // Verify website exists
          const [site] = await db
            .select({ id: websites.id })
            .from(websites)
            .where(eq(websites.id, websiteId))

          if (!site) {
            return new Response(
              JSON.stringify({ error: 'Website not found' }),
              { status: 404, headers: { ...cors, 'Content-Type': 'application/json' } },
            )
          }

          const ext = file.type.split('/')[1].replace('jpeg', 'jpg')
          const key = `feedback/${websiteId}/${crypto.randomUUID()}.${ext}`
          const buf = Buffer.from(await file.arrayBuffer())
          const url = await uploadImageToR2(buf, key, file.type)

          return new Response(
            JSON.stringify({ ok: true, url }),
            { status: 200, headers: { ...cors, 'Content-Type': 'application/json' } },
          )
        } catch (err) {
          console.error('[upload api]', err)
          return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } },
          )
        }
      },
    },
  },
})
