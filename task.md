# QuickFeed – DodoPayments Integration

## Status: COMPLETE ✅

## What was done
- `src/lib/dodo.ts` — DodoPayments client, product ID map, pricing helpers
- `src/db/schema.ts` — `subscriptions` table added + pushed to DB
- `src/orpc/router/billing.ts` — getSubscription, getPlans, createCheckout, cancelSubscription, resumeSubscription, changePlan, getUpdatePaymentUrl
- `src/orpc/router/index.ts` — billing router wired in
- `src/routes/pricing.tsx` — full pricing page (2 cards, slider, monthly/yearly)
- `src/routes/_protected/billing.tsx` — billing management page (plan info, change plan, cancel, resume, update payment)
- `src/routes/api/webhook/dodo.ts` — webhook handler for subscription lifecycle events
- `src/components/dashboard/DashboardTopbar.tsx` — Billing dropdown item links to /billing
- `src/components/landing/Navbar.tsx` — Pricing nav link points to /pricing page
- `.env.example` — all DODO_PRODUCT_* vars documented
- Success banner on /billing?success=1 (auto-dismisses after 5s)
- All TypeScript errors fixed (0 errors)

## SDK type notes
- `checkoutSessions.create` uses `return_url` not `success_url`/`cancel_url`
- Response field is `checkout_url` not `url`
- `subscriptions.changePlan` requires `quantity` and `proration_billing_mode` (not `proration`)
- `subscriptions.updatePaymentMethod` takes `{ type: 'new', return_url }`, returns `{ payment_link }`
- `cancel_at_next_billing_date` ✅ confirmed in SubscriptionUpdateParams

## Env vars needed from user
- DODO_PAYMENTS_API_KEY
- DODO_PAYMENTS_WEBHOOK_KEY
- DODO_PRODUCT_{MB}_{MONTHLY|YEARLY} for each of 7 tiers
