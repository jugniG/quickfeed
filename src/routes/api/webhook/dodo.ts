import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/db/index'
import { subscriptions } from '#/db/schema'
import { dodo } from '#/lib/dodo'
import { eq } from 'drizzle-orm'
import type { UnwrapWebhookEvent } from 'dodopayments/resources/webhooks'

async function handle({ request }: { request: Request }) {
  try {
    const body = await request.text()

    // Convert Headers to plain object for dodopayments SDK
    const headersObj: Record<string, string> = {}
    request.headers.forEach((value, key) => {
      headersObj[key] = value
    })

    // Verify + parse webhook
    let event: UnwrapWebhookEvent
    try {
      event = dodo.webhooks.unwrap(body, { headers: headersObj })
    } catch (err) {
      console.error('[webhook] signature verification failed:', err)
      return new Response('Invalid signature', { status: 401 })
    }

    console.log('[webhook] received event:', event.type)

    switch (event.type) {
      case 'subscription.active': {
        const sub = event.data
        const userId = sub.metadata?.userId as string | undefined
        if (!userId) {
          console.warn('[webhook] subscription.active missing userId in metadata')
          break
        }

        const storageMb = parseInt(sub.metadata?.storageMb as string ?? '100', 10)
        const interval = (sub.metadata?.interval as string) === 'yearly' ? 'yearly' : 'monthly'

        // Upsert subscription
        const existing = await db
          .select()
          .from(subscriptions)
          .where(eq(subscriptions.dodoSubscriptionId, sub.subscription_id))
          .limit(1)

        if (existing.length > 0) {
          await db
            .update(subscriptions)
            .set({
              status: 'active',
              storageMb,
              billingInterval: interval,
              productId: sub.product_id,
              currentPeriodEnd: sub.next_billing_date ? new Date(sub.next_billing_date) : null,
              cancelAtNextBilling: sub.cancel_at_next_billing_date ?? false,
              updatedAt: new Date(),
            })
            .where(eq(subscriptions.dodoSubscriptionId, sub.subscription_id))
        } else {
          await db.insert(subscriptions).values({
            userId,
            dodoSubscriptionId: sub.subscription_id,
            dodoCustomerId: sub.customer?.customer_id ?? null,
            productId: sub.product_id,
            status: 'active',
            storageMb,
            billingInterval: interval,
            currentPeriodEnd: sub.next_billing_date ? new Date(sub.next_billing_date) : null,
            cancelAtNextBilling: sub.cancel_at_next_billing_date ?? false,
          })
        }
        break
      }

      case 'subscription.renewed': {
        const sub = event.data
        await db
          .update(subscriptions)
          .set({
            status: 'active',
            currentPeriodEnd: sub.next_billing_date ? new Date(sub.next_billing_date) : null,
            cancelAtNextBilling: sub.cancel_at_next_billing_date ?? false,
            updatedAt: new Date(),
          })
          .where(eq(subscriptions.dodoSubscriptionId, sub.subscription_id))
        break
      }

      case 'subscription.plan_changed': {
        const sub = event.data
        const storageMb = parseInt(sub.metadata?.storageMb as string ?? '100', 10)
        const interval = (sub.metadata?.interval as string) === 'yearly' ? 'yearly' : 'monthly'
        await db
          .update(subscriptions)
          .set({
            status: 'active',
            storageMb,
            billingInterval: interval,
            productId: sub.product_id,
            currentPeriodEnd: sub.next_billing_date ? new Date(sub.next_billing_date) : null,
            updatedAt: new Date(),
          })
          .where(eq(subscriptions.dodoSubscriptionId, sub.subscription_id))
        break
      }

      case 'subscription.cancelled': {
        const sub = event.data
        await db
          .update(subscriptions)
          .set({ status: 'cancelled', cancelAtNextBilling: true, updatedAt: new Date() })
          .where(eq(subscriptions.dodoSubscriptionId, sub.subscription_id))
        break
      }

      case 'subscription.expired': {
        const sub = event.data
        await db
          .update(subscriptions)
          .set({ status: 'expired', updatedAt: new Date() })
          .where(eq(subscriptions.dodoSubscriptionId, sub.subscription_id))
        break
      }

      case 'subscription.on_hold': {
        const sub = event.data
        await db
          .update(subscriptions)
          .set({ status: 'on_hold', updatedAt: new Date() })
          .where(eq(subscriptions.dodoSubscriptionId, sub.subscription_id))
        break
      }

      case 'subscription.failed': {
        const sub = event.data
        await db
          .update(subscriptions)
          .set({ status: 'on_hold', updatedAt: new Date() })
          .where(eq(subscriptions.dodoSubscriptionId, sub.subscription_id))
        break
      }

      default:
        console.log('[webhook] unhandled event type:', (event as any).type)
    }

    return new Response('ok', { status: 200 })
  } catch (err) {
    console.error('[webhook] error:', err)
    return new Response('Internal error', { status: 500 })
  }
}

export const Route = createFileRoute('/api/webhook/dodo')({
  server: {
    handlers: {
      POST: handle,
    },
  },
})
