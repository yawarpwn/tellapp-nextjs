CREATE TABLE IF NOT EXISTS "_customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"ruc" text NOT NULL,
	"address" text,
	"is_regular" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "_customers_name_unique" UNIQUE("name"),
	CONSTRAINT "_customers_ruc_unique" UNIQUE("ruc")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_quotations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"number" integer NOT NULL,
	"deadline" integer NOT NULL,
	"credit" text,
	"include_igv" boolean DEFAULT false,
	"customer_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"items" jsonb NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "_quotations_number_unique" UNIQUE("number")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_quotations" ADD CONSTRAINT "_quotations_customer_id__customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."_customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
