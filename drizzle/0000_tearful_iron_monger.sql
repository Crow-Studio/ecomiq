CREATE TYPE "public"."billing_cyle_enum" AS ENUM('monthly', 'yearly', 'trial_period');--> statement-breakpoint
CREATE TYPE "public"."currency_enum" AS ENUM('USD', 'KES');--> statement-breakpoint
CREATE TYPE "public"."ledger_entry_type_enum" AS ENUM('credit', 'debit');--> statement-breakpoint
CREATE TYPE "public"."payment_channel_enum" AS ENUM('card', 'mobile_money', 'bank_transfer', 'ussd', 'qr');--> statement-breakpoint
CREATE TYPE "public"."payment_status_enum" AS ENUM('pending', 'success', 'failed', 'refunded', 'disputed');--> statement-breakpoint
CREATE TYPE "public"."subscription_plan" AS ENUM('trial', 'starter', 'growth', 'enterprise');--> statement-breakpoint
CREATE TYPE "public"."subscription_status_enum" AS ENUM('trialing', 'active', 'past_due', 'canceled', 'expired');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('owner', 'manager', 'staff');--> statement-breakpoint
CREATE TYPE "public"."withdrawal_status_enum" AS ENUM('pending', 'processing', 'completed', 'failed', 'canceled');--> statement-breakpoint
CREATE TABLE "app_cron_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "app_subs_transactions" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"subscription_id" text NOT NULL,
	"amount" integer NOT NULL,
	"paystack_reference" varchar(255) NOT NULL,
	"paystack_trxref" varchar(255) NOT NULL,
	"currency" "currency_enum" DEFAULT 'KES',
	"paystack_transaction_id" varchar(255) NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "app_subscriptions" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"status" "subscription_status_enum" DEFAULT 'trialing' NOT NULL,
	"current_period_start" timestamp DEFAULT now() NOT NULL,
	"subscription_plan" "subscription_plan" DEFAULT 'trial' NOT NULL,
	"billing_cycle" "billing_cyle_enum" DEFAULT 'trial_period' NOT NULL,
	"current_period_end" timestamp NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "app_stores" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"owner_id" varchar(16) NOT NULL,
	"name" varchar(200) NOT NULL,
	"url" text NOT NULL,
	"currency" "currency_enum" DEFAULT 'KES' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3),
	CONSTRAINT "app_stores_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "app_store_members" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_id" varchar(16) NOT NULL,
	"store_id" varchar(16) NOT NULL,
	"role" "user_role" DEFAULT 'staff',
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3),
	CONSTRAINT "store_members_user_store_unique" UNIQUE("user_id","store_id")
);
--> statement-breakpoint
CREATE TABLE "app_oauth_account" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"provider" text NOT NULL,
	"provider_user_id" text NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "app_session" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"two_factor_verified" boolean DEFAULT false NOT NULL,
	"ip_address" varchar(100),
	"location" text,
	"device" text,
	"browser" text,
	"os" text,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "app_unique_code" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"code" varchar(6) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3),
	CONSTRAINT "code_exact_length" CHECK (LENGTH("app_unique_code"."code") = 6)
);
--> statement-breakpoint
CREATE TABLE "app_user" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"avatar" text NOT NULL,
	"password" text,
	"subscription_id" varchar(16),
	"email_verified" boolean DEFAULT false NOT NULL,
	"registered_2fa" boolean DEFAULT false NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3),
	CONSTRAINT "app_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "app_subs_transactions" ADD CONSTRAINT "app_subs_transactions_subscription_id_app_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."app_subscriptions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_subscriptions" ADD CONSTRAINT "app_subscriptions_user_id_app_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_stores" ADD CONSTRAINT "app_stores_owner_id_app_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."app_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_store_members" ADD CONSTRAINT "app_store_members_user_id_app_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_store_members" ADD CONSTRAINT "app_store_members_store_id_app_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."app_stores"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_oauth_account" ADD CONSTRAINT "app_oauth_account_user_id_app_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_session" ADD CONSTRAINT "app_session_user_id_app_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_subscriptions_user_idx" ON "app_subscriptions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "stores_owner_idx" ON "app_stores" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "email_index" ON "app_user" USING btree ("email");