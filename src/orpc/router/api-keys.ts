import { z } from 'zod'
import { and, eq } from 'drizzle-orm'
import { db } from '#/db/index'
import { apiKeys, websites } from '#/db/schema'
import { authed } from '#/orpc/middleware'
import crypto from 'node:crypto'

// ─── Helpers ───────────────────────────────────────────────────────────────

const KEY_PREFIX = 'qf_'

function generateApiKey(): { raw: string; hash: string; prefix: string } {
  const bytes = crypto.randomBytes(32)
  const raw = KEY_PREFIX + bytes.toString('base64url')
  const hash = crypto.createHash('sha256').update(raw).digest('hex')
  const prefix = raw.slice(0, 8) + '…'
  return { raw, hash, prefix }
}

// ─── Procedures ────────────────────────────────────────────────────────────

// List API keys for a website (only show prefix + name + dates, never the key)
export const listApiKeys = authed
  .input(z.object({
    websiteId: z.string().uuid(),
  }))
  .handler(async ({ input, context }) => {
    // Verify user owns this website
    const [site] = await db
      .select()
      .from(websites)
      .where(and(eq(websites.id, input.websiteId), eq(websites.userId, context.user.id)))
    if (!site) throw new Error('Website not found')

    const keys = await db
      .select({
        id: apiKeys.id,
        name: apiKeys.name,
        prefix: apiKeys.prefix,
        lastUsedAt: apiKeys.lastUsedAt,
        createdAt: apiKeys.createdAt,
      })
      .from(apiKeys)
      .where(eq(apiKeys.websiteId, input.websiteId))
      .orderBy(apiKeys.createdAt)

    return keys
  })

// Create a new API key for a website
export const createApiKey = authed
  .input(z.object({
    websiteId: z.string().uuid(),
    name: z.string().min(1, 'Name is required').max(64, 'Name too long'),
  }))
  .handler(async ({ input, context }) => {
    // Verify user owns this website
    const [site] = await db
      .select()
      .from(websites)
      .where(and(eq(websites.id, input.websiteId), eq(websites.userId, context.user.id)))
    if (!site) throw new Error('Website not found')

    const { raw, hash, prefix } = generateApiKey()

    await db.insert(apiKeys).values({
      userId: context.user.id,
      websiteId: input.websiteId,
      name: input.name,
      keyHash: hash,
      prefix,
    })

    // Return the raw key — this is the only time it will be visible
    return { rawKey: raw, prefix }
  })

// Delete an API key
export const deleteApiKey = authed
  .input(z.object({
    id: z.number(),
  }))
  .handler(async ({ input, context }) => {
    const [deleted] = await db
      .delete(apiKeys)
      .where(and(eq(apiKeys.id, input.id), eq(apiKeys.userId, context.user.id)))
      .returning()
    if (!deleted) throw new Error('API key not found')
    return { success: true }
  })
