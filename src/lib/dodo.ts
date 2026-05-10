import DodoPayments from 'dodopayments'
import { env } from '#/env'

export const dodo = new DodoPayments({
  bearerToken: env.DODO_PAYMENTS_API_KEY ?? 'placeholder',
  webhookKey: env.DODO_PAYMENTS_WEBHOOK_KEY ?? null,
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
// $2 per 100MB
export function getMonthlyPrice(storageMb: number): number {
  return (storageMb / 100) * 2
}

export function getYearlyPrice(storageMb: number): number {
  // 20% off yearly, billed as monthly equivalent
  return getMonthlyPrice(storageMb) * 0.8
}

// Product IDs from Dodo — keys are `${storageMb}_${interval}`
// These must be set from the env or hardcoded after creating products in Dodo dashboard
export const PRODUCT_IDS: Record<string, string> = {
  // populated from env vars at runtime
}

export function getProductId(storageMb: number, interval: 'monthly' | 'yearly'): string | undefined {
  const key = `${storageMb}_${interval}`
  const envKey = `DODO_PRODUCT_${storageMb}_${interval.toUpperCase()}`
  return process.env[envKey] ?? PRODUCT_IDS[key]
}
