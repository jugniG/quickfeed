import DodoPayments from 'dodopayments'
import { env } from '#/env'
import { db } from '#/db/index'
import { dodoProductCache } from '#/db/schema'
import { and, eq } from 'drizzle-orm'

export const dodo = new DodoPayments({
  bearerToken: env.DODO_PAYMENTS_API_KEY ?? 'placeholder',
  environment: env.DODO_PAYMENTS_ENVIRONMENT,
})

// Storage tiers in MB
export const STORAGE_TIERS = [100, 500, 1024, 2048, 3072, 4096, 5120] as const
export type StorageMb = typeof STORAGE_TIERS[number]

export const STORAGE_LABELS: Record<number, string> = {
  100: '100 MB',
  500: '500 MB',
  1024: '1 GB',
  2048: '2 GB',
  3072: '3 GB',
  4096: '4 GB',
  5120: '5 GB',
}

// Price in dollars per month
export function getMonthlyPrice(storageMb: number): number {
  return (storageMb / 100) * 2
}

export function getYearlyPrice(storageMb: number): number {
  return getMonthlyPrice(storageMb) * 0.8
}

/**
 * Returns the Dodo product ID for a given tier/interval.
 * Checks DB cache first. If not found, creates the product via Dodo API,
 * caches the ID, then returns it.
 *
 * This means zero manual product setup — products are created on first checkout.
 */
export async function getOrCreateProduct(
  storageMb: number,
  interval: 'monthly' | 'yearly',
): Promise<string> {
  // 1. Check DB cache
  const [cached] = await db
    .select()
    .from(dodoProductCache)
    .where(
      and(
        eq(dodoProductCache.storageMb, storageMb),
        eq(dodoProductCache.billingInterval, interval),
      ),
    )
    .limit(1)

  if (cached) return cached.dodoProductId

  // 2. Create product in Dodo
  const label = STORAGE_LABELS[storageMb] ?? `${storageMb} MB`
  const monthlyUsd = getMonthlyPrice(storageMb)
  const priceUsd = interval === 'yearly' ? getYearlyPrice(storageMb) : monthlyUsd
  // Dodo prices are in cents (smallest denomination)
  const priceCents = Math.round(priceUsd * 100)

  const product = await dodo.products.create({
    name: `QuickFeed ${label} — ${interval === 'yearly' ? 'Yearly' : 'Monthly'}`,
    description: `${label} feedback storage, billed ${interval === 'yearly' ? 'yearly (20% off)' : 'monthly'}. $${priceUsd.toFixed(2)}/mo.`,
    tax_category: 'saas',
    price: {
      type: 'recurring_price',
      currency: 'USD',
      price: priceCents,
      discount: 0,
      purchasing_power_parity: false,
      // charge every 1 month
      payment_frequency_count: 1,
      payment_frequency_interval: 'month',
      // subscription period: 1 month (monthly) or 12 months (yearly)
      subscription_period_count: interval === 'yearly' ? 12 : 1,
      subscription_period_interval: interval === 'yearly' ? 'month' : 'month',
      tax_inclusive: false,
    },
    metadata: {
      storageMb: String(storageMb),
      interval,
    },
  })

  // 3. Cache in DB
  await db.insert(dodoProductCache).values({
    storageMb,
    billingInterval: interval,
    dodoProductId: product.product_id,
  })

  return product.product_id
}
