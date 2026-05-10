import { z } from 'zod'
import { eq, and } from 'drizzle-orm'
import { db } from '#/db/index'
import { subscriptions } from '#/db/schema'
import { authed } from '#/orpc/middleware/auth'
import { dodo, getProductId, getMonthlyPrice, getYearlyPrice, STORAGE_TIERS, STORAGE_LABELS } from '#/lib/dodo'
import { ORPCError } from '@orpc/client'
import { os } from '@orpc/server'

// Get current subscription for the user
export const getSubscription = authed
  .input(z.void())
  .handler(async ({ context }) => {
    const [sub] = await db
      .select()
      .from(subscriptions)
      .where(and(eq(subscriptions.userId, context.user.id), eq(subscriptions.status, 'active')))
      .limit(1)
    return sub ?? null
  })

// Get all plans (for pricing display)
export const getPlans = os
  .input(z.void())
  .handler(async () => {
    return STORAGE_TIERS.map((storageMb) => ({
      storageMb,
      label: STORAGE_LABELS[storageMb],
      monthlyPrice: getMonthlyPrice(storageMb),
      yearlyPrice: getYearlyPrice(storageMb),
      monthlyProductId: getProductId(storageMb, 'monthly'),
      yearlyProductId: getProductId(storageMb, 'yearly'),
    }))
  })

// Create a checkout session
export const createCheckout = authed
  .input(
    z.object({
      storageMb: z.number(),
      interval: z.enum(['monthly', 'yearly']),
      successUrl: z.string().url(),
      cancelUrl: z.string().url(),
    }),
  )
  .handler(async ({ input, context }) => {
    const productId = getProductId(input.storageMb, input.interval)
    if (!productId) {
      throw new ORPCError('BAD_REQUEST', { message: `No product configured for ${input.storageMb}MB ${input.interval}` })
    }

    const session = await dodo.checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      customer: {
        email: context.user.email,
        name: context.user.name ?? context.user.email,
      },
      // return_url is the single redirect URL (success or cancel)
      return_url: input.successUrl,
      metadata: {
        userId: context.user.id,
        storageMb: String(input.storageMb),
        interval: input.interval,
      },
    })

    return { url: session.checkout_url ?? null, sessionId: session.session_id }
  })

// Cancel subscription at period end
export const cancelSubscription = authed
  .input(z.void())
  .handler(async ({ context }) => {
    const [sub] = await db
      .select()
      .from(subscriptions)
      .where(and(eq(subscriptions.userId, context.user.id), eq(subscriptions.status, 'active')))
      .limit(1)

    if (!sub) throw new ORPCError('NOT_FOUND', { message: 'No active subscription' })

    await dodo.subscriptions.update(sub.dodoSubscriptionId, {
      cancel_at_next_billing_date: true,
    })

    await db
      .update(subscriptions)
      .set({ cancelAtNextBilling: true, updatedAt: new Date() })
      .where(eq(subscriptions.id, sub.id))

    return { success: true }
  })

// Resume (un-cancel) subscription
export const resumeSubscription = authed
  .input(z.void())
  .handler(async ({ context }) => {
    const [sub] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, context.user.id))
      .limit(1)

    if (!sub) throw new ORPCError('NOT_FOUND', { message: 'No subscription' })

    await dodo.subscriptions.update(sub.dodoSubscriptionId, {
      cancel_at_next_billing_date: false,
    })

    await db
      .update(subscriptions)
      .set({ cancelAtNextBilling: false, status: 'active', updatedAt: new Date() })
      .where(eq(subscriptions.id, sub.id))

    return { success: true }
  })

// Change plan (upgrade/downgrade)
export const changePlan = authed
  .input(
    z.object({
      storageMb: z.number(),
      interval: z.enum(['monthly', 'yearly']),
    }),
  )
  .handler(async ({ input, context }) => {
    const [sub] = await db
      .select()
      .from(subscriptions)
      .where(and(eq(subscriptions.userId, context.user.id), eq(subscriptions.status, 'active')))
      .limit(1)

    if (!sub) throw new ORPCError('NOT_FOUND', { message: 'No active subscription' })

    const newProductId = getProductId(input.storageMb, input.interval)
    if (!newProductId) throw new ORPCError('BAD_REQUEST', { message: 'Plan not found' })

    // SDK requires product_id, quantity, and proration_billing_mode
    await dodo.subscriptions.changePlan(sub.dodoSubscriptionId, {
      product_id: newProductId,
      quantity: 1,
      proration_billing_mode: 'full_immediately',
    })

    await db
      .update(subscriptions)
      .set({
        productId: newProductId,
        storageMb: input.storageMb,
        billingInterval: input.interval,
        cancelAtNextBilling: false,
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.id, sub.id))

    return { success: true }
  })

// Get update payment method URL
export const getUpdatePaymentUrl = authed
  .input(z.object({ returnUrl: z.string().url() }))
  .handler(async ({ context, input }) => {
    const [sub] = await db
      .select()
      .from(subscriptions)
      .where(and(eq(subscriptions.userId, context.user.id), eq(subscriptions.status, 'active')))
      .limit(1)

    if (!sub) throw new ORPCError('NOT_FOUND', { message: 'No active subscription' })

    // type: 'new' triggers a new payment method update flow
    const result = await dodo.subscriptions.updatePaymentMethod(sub.dodoSubscriptionId, {
      type: 'new',
      return_url: input.returnUrl,
    })

    // payment_link is the redirect URL for the update flow
    return { url: result.payment_link ?? null }
  })
