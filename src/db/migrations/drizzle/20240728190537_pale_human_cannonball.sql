CREATE TABLE IF NOT EXISTS "_customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"ruc" text NOT NULL,
	"phone" text,
	"address" text,
	"email" text,
	"is_regular" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "_customers_name_unique" UNIQUE("name"),
	CONSTRAINT "_customers_ruc_unique" UNIQUE("ruc")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text NOT NULL,
	"code" text NOT NULL,
	"unit_size" text NOT NULL,
	"category" text NOT NULL,
	"link" text,
	"rank" real DEFAULT 0 NOT NULL,
	"price" real NOT NULL,
	"cost" real NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "_products_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_quotations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"number" integer NOT NULL,
	"deadline" integer NOT NULL,
	"credit" integer,
	"include_igv" boolean DEFAULT false NOT NULL,
	"customer_id" uuid,
	"items" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "_quotations_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_quotations" ADD CONSTRAINT "_quotations_customer_id__customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."_customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
