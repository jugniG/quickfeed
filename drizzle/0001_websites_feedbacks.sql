CREATE TABLE IF NOT EXISTS "quickfeed"."websites" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL,
  "domain" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "websites_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "quickfeed"."user"("id") ON DELETE cascade
);

CREATE TABLE IF NOT EXISTS "quickfeed"."feedbacks" (
  "id" serial PRIMARY KEY NOT NULL,
  "website_id" integer NOT NULL,
  "message" text NOT NULL,
  "images" text[] DEFAULT '{}' NOT NULL,
  "submitter_email" text,
  "submitter_name" text,
  "url" text,
  "user_agent" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "feedbacks_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "quickfeed"."websites"("id") ON DELETE cascade
);

CREATE INDEX IF NOT EXISTS "websites_userId_idx" ON "quickfeed"."websites" ("user_id");
CREATE INDEX IF NOT EXISTS "feedbacks_websiteId_idx" ON "quickfeed"."feedbacks" ("website_id");
