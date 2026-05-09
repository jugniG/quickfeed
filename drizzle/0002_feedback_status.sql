ALTER TABLE "quickfeed"."feedbacks"
  ADD COLUMN IF NOT EXISTS "status" text NOT NULL DEFAULT 'unassigned';
