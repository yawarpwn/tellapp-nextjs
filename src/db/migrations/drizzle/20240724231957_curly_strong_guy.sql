CREATE TABLE IF NOT EXISTS "_products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text NOT NULL,
	"code" text NOT NULL,
	"unit_size" text NOT NULL,
	"link" text,
	"rank" integer DEFAULT 0 NOT NULL,
	"price" integer NOT NULL,
	"cost" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "_customers" ALTER COLUMN "is_regular" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "_quotations" ALTER COLUMN "include_igv" SET NOT NULL;