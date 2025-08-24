CREATE TYPE "public"."billing_cyle_enum" AS ENUM('monthly', 'yearly');--> statement-breakpoint
CREATE TYPE "public"."currency_enum" AS ENUM('USD', 'KES');--> statement-breakpoint
CREATE TYPE "public"."ledger_entry_type_enum" AS ENUM('credit', 'debit');--> statement-breakpoint
CREATE TYPE "public"."payment_channel_enum" AS ENUM('card', 'mobile_money', 'bank_transfer', 'ussd', 'qr');--> statement-breakpoint
CREATE TYPE "public"."payment_status_enum" AS ENUM('pending', 'success', 'failed', 'refunded', 'disputed');--> statement-breakpoint
CREATE TYPE "public"."subscription_status_enum" AS ENUM('trialing', 'active', 'past_due', 'canceled', 'expired');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('owner', 'manager', 'staff');--> statement-breakpoint
CREATE TYPE "public"."withdrawal_status_enum" AS ENUM('pending', 'processing', 'completed', 'failed', 'canceled');--> statement-breakpoint
CREATE TABLE "app_cron_jobs" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"message" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "app_ledger_entries" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"store_id" text NOT NULL,
	"type" "ledger_entry_type_enum" NOT NULL,
	"amount_cents" integer NOT NULL,
	"currency" "currency_enum" DEFAULT 'KES' NOT NULL,
	"payment_id" text NOT NULL,
	"withdrawal_id" text NOT NULL,
	"memo" varchar(300),
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "app_payments" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"owner_id" text NOT NULL,
	"store_id" text NOT NULL,
	"reference" varchar(180) NOT NULL,
	"status" "payment_status_enum" DEFAULT 'pending' NOT NULL,
	"channel" "payment_channel_enum" NOT NULL,
	"amount_cents" integer NOT NULL,
	"currency" "currency_enum" DEFAULT 'KES' NOT NULL,
	"paystack_fee_cents" integer DEFAULT 0 NOT NULL,
	"platform_commission_cents" integer DEFAULT 0 NOT NULL,
	"net_to_wallet_cents" integer DEFAULT 0 NOT NULL,
	"raw_payload" text,
	"paid_at" timestamp,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "app_paystack_customer" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" varchar(255),
	"country" varchar(2),
	"paystack_customer_code" varchar(160),
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "app_plans" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"price_cents" integer NOT NULL,
	"currency" "currency_enum" DEFAULT 'KES' NOT NULL,
	"billing_cycle" "billing_cyle_enum" NOT NULL,
	"popular" boolean DEFAULT false NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"paystack_plan_code" varchar(180),
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "app_subscriptions" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"plan_id" text NOT NULL,
	"status" "subscription_status_enum" DEFAULT 'trialing' NOT NULL,
	"trial_start" timestamp DEFAULT now() NOT NULL,
	"trial_end" timestamp NOT NULL,
	"current_period_start" timestamp DEFAULT now() NOT NULL,
	"current_period_end" timestamp NOT NULL,
	"cancel_at_period_end" boolean DEFAULT false NOT NULL,
	"paystack_subscription_code" varchar(200),
	"latest_invoice_reference" varchar(200),
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "app_wallets" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"balance_cents" integer DEFAULT 0 NOT NULL,
	"currency" "currency_enum" DEFAULT 'KES' NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "app_webhooks" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"event" varchar(180) NOT NULL,
	"reference" varchar(200),
	"signature" varchar(400),
	"payload" text NOT NULL,
	"processed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "app_withdrawals" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"requested_amount_cents" integer NOT NULL,
	"withdrawal_fee_cents" integer DEFAULT 0 NOT NULL,
	"payout_amount_cents" integer NOT NULL,
	"paystack_transfer_fee_cents" integer DEFAULT 0 NOT NULL,
	"status" "withdrawal_status_enum" DEFAULT 'pending' NOT NULL,
	"paystack_recipient_code" varchar(200),
	"paystack_transfer_code" varchar(200),
	"destination_mask" varchar(100),
	"processed_at" timestamp,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "app_stores" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"owner_id" varchar(16) NOT NULL,
	"name" varchar(200) NOT NULL,
	"currency" "currency_enum" DEFAULT 'KES' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3)
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
ALTER TABLE "app_ledger_entries" ADD CONSTRAINT "app_ledger_entries_user_id_app_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_ledger_entries" ADD CONSTRAINT "app_ledger_entries_store_id_app_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."app_stores"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_ledger_entries" ADD CONSTRAINT "app_ledger_entries_payment_id_app_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."app_payments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_ledger_entries" ADD CONSTRAINT "app_ledger_entries_withdrawal_id_app_withdrawals_id_fk" FOREIGN KEY ("withdrawal_id") REFERENCES "public"."app_withdrawals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_payments" ADD CONSTRAINT "app_payments_owner_id_app_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."app_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_payments" ADD CONSTRAINT "app_payments_store_id_app_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."app_stores"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_paystack_customer" ADD CONSTRAINT "app_paystack_customer_user_id_app_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_subscriptions" ADD CONSTRAINT "app_subscriptions_user_id_app_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_subscriptions" ADD CONSTRAINT "app_subscriptions_plan_id_app_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."app_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_wallets" ADD CONSTRAINT "app_wallets_user_id_app_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_withdrawals" ADD CONSTRAINT "app_withdrawals_user_id_app_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_stores" ADD CONSTRAINT "app_stores_owner_id_app_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."app_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_store_members" ADD CONSTRAINT "app_store_members_user_id_app_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_store_members" ADD CONSTRAINT "app_store_members_store_id_app_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."app_stores"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_oauth_account" ADD CONSTRAINT "app_oauth_account_user_id_app_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_session" ADD CONSTRAINT "app_session_user_id_app_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ledger_user_idx" ON "app_ledger_entries" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "payments_reference_unique" ON "app_payments" USING btree ("reference");--> statement-breakpoint
CREATE UNIQUE INDEX "plans_name_cycle_unique" ON "app_plans" USING btree ("name","billing_cycle");--> statement-breakpoint
CREATE INDEX "user_subscriptions_user_idx" ON "app_subscriptions" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_wallet_unique" ON "app_wallets" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "webhooks_event_idx" ON "app_webhooks" USING btree ("event");--> statement-breakpoint
CREATE INDEX "withdrawals_user_idx" ON "app_withdrawals" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "stores_owner_idx" ON "app_stores" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "email_index" ON "app_user" USING btree ("email");