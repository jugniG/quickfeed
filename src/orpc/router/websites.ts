import { z } from 'zod'
import { and, eq, sql } from 'drizzle-orm'
import { db } from '#/db/index'
import { websites } from '#/db/schema'
import { authed } from '#/orpc/middleware'

export const listWebsites = authed.handler(async ({ context }) => {
  const rows = await db
    .select({
      id: websites.id,
      userId: websites.userId,
      domain: websites.domain,
      createdAt: websites.createdAt,
      feedbackCount: sql<number>`(select count(*)::int from quickfeed.feedbacks f where f.website_id = ${websites.id})`,
    })
    .from(websites)
    .where(eq(websites.userId, context.user.id))
    .orderBy(websites.createdAt)
  return rows
})

export const addWebsite = authed
  .input(
    z.object({
      domain: z.string().min(3, 'Invalid domain'),
    }),
  )
  .handler(async ({ input, context }) => {
    const [website] = await db
      .insert(websites)
      .values({
        userId: context.user.id,
        domain: input.domain,
      })
      .returning()
    return website
  })

export const deleteWebsite = authed
  .input(z.object({ id: z.number() }))
  .handler(async ({ input, context }) => {
    const [deleted] = await db
      .delete(websites)
      .where(and(eq(websites.id, input.id), eq(websites.userId, context.user.id)))
      .returning()
    return deleted
  })
