import { z } from 'zod'
import { and, eq } from 'drizzle-orm'
import { db } from '#/db/index'
import { feedbacks, websites } from '#/db/schema'
import { authed } from '#/orpc/middleware/auth'

export const FEEDBACK_STATUSES = ['unassigned', 'pending', 'inprogress', 'completed', 'rejected'] as const
export type FeedbackStatus = typeof FEEDBACK_STATUSES[number]

// List feedbacks for a website (verifies ownership)
export const listFeedbacks = authed
  .input(z.object({ websiteId: z.number() }))
  .handler(async ({ input, context }) => {
    // Verify user owns this website
    const [site] = await db
      .select()
      .from(websites)
      .where(and(eq(websites.id, input.websiteId), eq(websites.userId, context.user.id)))
    if (!site) throw new Error('Not found')

    return db
      .select()
      .from(feedbacks)
      .where(eq(feedbacks.websiteId, input.websiteId))
      .orderBy(feedbacks.createdAt)
  })

// Update status of a single feedback (verifies ownership via join)
export const updateFeedbackStatus = authed
  .input(z.object({
    feedbackId: z.number(),
    status: z.enum(FEEDBACK_STATUSES),
  }))
  .handler(async ({ input, context }) => {
    // Verify ownership via join
    const [fb] = await db
      .select({ feedbackId: feedbacks.id, userId: websites.userId })
      .from(feedbacks)
      .innerJoin(websites, eq(feedbacks.websiteId, websites.id))
      .where(and(eq(feedbacks.id, input.feedbackId), eq(websites.userId, context.user.id)))

    if (!fb) throw new Error('Not found')

    const [updated] = await db
      .update(feedbacks)
      .set({ status: input.status })
      .where(eq(feedbacks.id, input.feedbackId))
      .returning()

    return updated
  })
