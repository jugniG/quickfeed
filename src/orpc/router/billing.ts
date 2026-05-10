import { z } from 'zod'
import { eq, and } from 'drizzle-orm'
import { db } from '#/db/index'
import { subscriptions } from '#/db/schema'
import { authed, base } from '#/orpc/middleware'
import { dodo, getOrCreateProduct, getMonthlyPrice, getYearlyPrice, STORAGE_TIERS, STORAGE_LABELS } from '#/lib/dodo'
import { ORPCError } from '@orpc/client'
import { createServerFn } from '@tanstack/react-start'

// Get current subscription for the user
const getSubscriptionServerFn = createServerFn()
  .inputValidator(z.object({userId:z.string()}))
  .handler(async ({data:{userId}}) => {
    const [sub] = await db
      .select()
      .from(subscriptions)
      .where(and(eq(subscriptions.userId, userId), eq(subscriptions.status, 'active')))
      .limit(1)
    return sub ?? null
  })

export const getSubscription = authed
  .input(z.void())
  .handler(async ({ context }) => {
    return getSubscriptionServerFn({data:{userId:context.user.id}})
  })

// Get all plans (for pricing display — no product IDs needed client-side)
export const getPlans = base
  .input(z.void())
  .handler(async () => {
    return STORAGE_TIERS.map((storageMb) => ({
      storageMb,
      label: STORAGE_LABELS[storageMb],
      monthlyPrice: getMonthlyPrice(storageMb),
      yearlyPrice: getYearlyPrice(storageMb),
    }))
  })

// Create a checkout session
const createCheckoutServerFn = createServerFn()
  .inputValidator(z.object({
    storageMb: z.number(),
    interval: z.enum(['monthly', 'yearly']),
    successUrl: z.string().url(),
    cancelUrl: z.string().url(),
    userId: z.string(),
    email: z.string().email(),
  }))
  .handler(async ({ data }) => {
    const { storageMb, interval, successUrl, userId, email } = data
    // Auto-creates product in Dodo if it doesn't exist yet, caches in DB
    const productId = await getOrCreateProduct(storageMb, interval)

    const session = await dodo.checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      customer: {
        email,
      },
      // return_url is the single redirect URL (success or cancel)
      return_url: successUrl,
      metadata: {
        userId,
        storageMb: String(storageMb),
        interval,
      },
    })

    return { url: session.checkout_url ?? null, sessionId: session.session_id }
  })

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
    return createCheckoutServerFn({
      data: {
        ...input,
        userId: context.user.id,
        email: context.user.email,
      }
    })
  })

// Cancel subscription at period end
const cancelSubscriptionServerFn = createServerFn()
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data: { userId } }) => {
    const [sub] = await db
      .select()
      .from(subscriptions)
      .where(and(eq(subscriptions.userId, userId), eq(subscriptions.status, 'active')))
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

export const cancelSubscription = authed
  .input(z.void())
  .handler(async ({ context }) => {
    return cancelSubscriptionServerFn({ data: { userId: context.user.id } })
  })

// Resume (un-cancel) subscription
const resumeSubscriptionServerFn = createServerFn()
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data: { userId } }) => {
    const [sub] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
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

export const resumeSubscription = authed
  .input(z.void())
  .handler(async ({ context }) => {
    return resumeSubscriptionServerFn({ data: { userId: context.user.id } })
  })

// Change plan (upgrade/downgrade)
const changePlanServerFn = createServerFn()
  .inputValidator(z.object({
    userId: z.string(),
    storageMb: z.number(),
    interval: z.enum(['monthly', 'yearly']),
  }))
  .handler(async ({ data }) => {
    const { userId, storageMb, interval } = data
    const [sub] = await db
      .select()
      .from(subscriptions)
      .where(and(eq(subscriptions.userId, userId), eq(subscriptions.status, 'active')))
      .limit(1)

    if (!sub) throw new ORPCError('NOT_FOUND', { message: 'No active subscription' })

    const newProductId = await getOrCreateProduct(storageMb, interval)

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
        storageMb,
        billingInterval: interval,
        cancelAtNextBilling: false,
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.id, sub.id))

    return { success: true }
  })

export const changePlan = authed
  .input(
    z.object({
      storageMb: z.number(),
      interval: z.enum(['monthly', 'yearly']),
    }),
  )
  .handler(async ({ input, context }) => {
    return changePlanServerFn({
      data: {
        userId: context.user.id,
        ...input,
      }
    })
  })

// Get update payment method URL
const getUpdatePaymentUrlServerFn = createServerFn()
  .inputValidator(z.object({
    userId: z.string(),
    returnUrl: z.string(),
  }))
  .handler(async ({ data }) => {
    const { userId, returnUrl } = data
    const [sub] = await db
      .select()
      .from(subscriptions)
      .where(and(eq(subscriptions.userId, userId), eq(subscriptions.status, 'active')))
      .limit(1)

    if (!sub) throw new ORPCError('NOT_FOUND', { message: 'No active subscription' })

    // type: 'new' triggers a new payment method update flow
    const result = await dodo.subscriptions.updatePaymentMethod(sub.dodoSubscriptionId, {
      type: 'new',
      return_url: returnUrl,
    })

    // payment_link is the redirect URL for the update flow
    return { url: result.payment_link ?? null }
  })

export const getUpdatePaymentUrl = authed
  .input(z.object({ returnUrl: z.string().url() }))
  .handler(async ({ context, input }) => {
    return getUpdatePaymentUrlServerFn({
      data: {
        userId: context.user.id,
        returnUrl: input.returnUrl,
      }
    })
  })
