/* eslint-disable @typescript-eslint/no-deprecated */
/* ------------------- PAYMENT (Paystack) ------------------- */
import {
  boolean,
  index,
  integer,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import * as enums from "./enums";
import { generateNanoId, pgTable } from "./types";
import { user } from "./user";

// Paystack Customer
export const paystack_customer = pgTable("paystack_customer", {
  id: varchar("id", { length: 16 })
    .primaryKey()
    .$defaultFn(() => generateNanoId()),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }),
  country: varchar("country", { length: 2 }),
  paystack_customer_code: varchar("paystack_customer_code", { length: 160 }),
  created_at: timestamp("created_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ),
});
// Plans
export const plans = pgTable(
  "plans",
  {
    id: varchar("id", { length: 16 })
      .primaryKey()
      .$defaultFn(() => generateNanoId()),
    name: varchar("name", { length: 100 }).notNull(),
    price_cents: integer("price_cents").notNull(), // minor units
    currency: enums.currency_enum("currency").default(enums.CurrencyEnum.KES).notNull(),
    billing_cycle: enums.billing_cyle_enum("billing_cycle").notNull(),
    popular: boolean("popular").default(false).notNull(),
    active: boolean("active").default(true).notNull(),
    paystack_plan_code: varchar("paystack_plan_code", { length: 180 }),
    created_at: timestamp("created_at", { mode: "date", precision: 3 })
      .notNull()
      .defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
      () => new Date(),
    ),
  },
  (t) => ({
    planUnique: uniqueIndex("plans_name_cycle_unique").on(t.name, t.billing_cycle),
  }),
);

// subscriptions
export const subscriptions = pgTable(
  "subscriptions",
  {
    id: varchar("id", { length: 16 })
      .primaryKey()
      .$defaultFn(() => generateNanoId()),
    user_id: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    plan_id: text("plan_id")
      .notNull()
      .references(() => plans.id, { onDelete: "cascade" }),
    status: enums
      .subscription_status_enum("status")
      .default(enums.SubscriptionStatusEnum.TRIALING)
      .notNull(),
    trial_dtart: timestamp("trial_start").defaultNow().notNull(),
    trial_end: timestamp("trial_end").notNull(), // set now plus 30 days
    current_period_start: timestamp("current_period_start").defaultNow().notNull(),
    current_period_end: timestamp("current_period_end").notNull(), // set by billing cycle
    cancel_at_period_end: boolean("cancel_at_period_end").default(false).notNull(),
    paystack_subscription_code: varchar("paystack_subscription_code", { length: 200 }),
    latest_invoice_reference: varchar("latest_invoice_reference", { length: 200 }),
    created_at: timestamp("created_at", { mode: "date", precision: 3 })
      .notNull()
      .defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
      () => new Date(),
    ),
  },
  (t) => ({ userIdx: index("user_subscriptions_user_idx").on(t.user_id) }),
);
// stores
export const store = pgTable(
  "stores",
  {
    id: varchar("id", { length: 16 })
      .primaryKey()
      .$defaultFn(() => generateNanoId()),
    owner_id: text("owner_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 200 }).notNull(),
    currency: enums.currency_enum("currency").default(enums.CurrencyEnum.KES).notNull(),
    active: boolean("active").default(true).notNull(),
    created_at: timestamp("created_at", { mode: "date", precision: 3 })
      .notNull()
      .defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
      () => new Date(),
    ),
  },
  (t) => ({ ownerIdx: index("stores_owner_idx").on(t.owner_id) }),
);
// Payments from customers, Paystack deducts processing fee, platform takes one percent commission
export const payments = pgTable(
  "payments",
  {
    id: varchar("id", { length: 16 })
      .primaryKey()
      .$defaultFn(() => generateNanoId()),
    owner_id: text("owner_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    store_id: text("store_id")
      .notNull()
      .references(() => store.id, { onDelete: "cascade" }), // convenience for queries
    reference: varchar("reference", { length: 180 }).notNull(), // Paystack reference
    status: enums
      .payment_status_enum("status")
      .default(enums.PaymentStatusEnum.PENDING)
      .notNull(),
    channel: enums.payment_channel_enum("channel").notNull(),
    amount_cents: integer("amount_cents").notNull(),
    currency: enums.currency_enum("currency").default(enums.CurrencyEnum.KES).notNull(),
    paystack_fee_cents: integer("paystack_fee_cents").default(0).notNull(),
    platform_commission_cents: integer("platform_commission_cents").default(0).notNull(), // one percent
    net_to_wallet_cents: integer("net_to_wallet_cents").default(0).notNull(),
    raw_payload: text("raw_payload"),
    paid_at: timestamp("paid_at"),
    created_at: timestamp("created_at", { mode: "date", precision: 3 })
      .notNull()
      .defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
      () => new Date(),
    ),
  },
  (t) => ({ refUnique: uniqueIndex("payments_reference_unique").on(t.reference) }),
);
// Wallets
export const wallets = pgTable(
  "wallets",
  {
    id: varchar("id", { length: 16 })
      .primaryKey()
      .$defaultFn(() => generateNanoId()),
    user_id: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    balance_cents: integer("balance_cents").default(0).notNull(),
    currency: enums.currency_enum("currency").default(enums.CurrencyEnum.KES).notNull(),
    created_at: timestamp("created_at", { mode: "date", precision: 3 })
      .notNull()
      .defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
      () => new Date(),
    ),
  },
  (t) => ({ uniq: uniqueIndex("user_wallet_unique").on(t.user_id) }),
);
// Withdrawals
export const withdrawals = pgTable(
  "withdrawals",
  {
    id: varchar("id", { length: 16 })
      .primaryKey()
      .$defaultFn(() => generateNanoId()),
    user_id: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    requested_amount_cents: integer("requested_amount_cents").notNull(), // must be at least 500 KES
    withdrawal_fee_cents: integer("withdrawal_fee_cents").default(0).notNull(), // 30 KES under 10000, 0.5 percent otherwise
    payout_amount_cents: integer("payout_amount_cents").notNull(),
    paystack_transfer_fee_cents: integer("paystack_transfer_fee_cents")
      .default(0)
      .notNull(),
    status: enums
      .withdrawal_status_enum("status")
      .default(enums.WithdrawalStatusEnum.PENDING)
      .notNull(),
    paystack_recipient_code: varchar("paystack_recipient_code", { length: 200 }),
    paystack_transfer_code: varchar("paystack_transfer_code", { length: 200 }),
    destination_mask: varchar("destination_mask", { length: 100 }),
    processed_at: timestamp("processed_at"),
    created_at: timestamp("created_at", { mode: "date", precision: 3 })
      .notNull()
      .defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
      () => new Date(),
    ),
  },
  (t) => ({ userIdx: index("withdrawals_user_idx").on(t.user_id) }),
);
// Ledger Entries
export const ledger_entries = pgTable(
  "ledger_entries",
  {
    id: varchar("id", { length: 16 })
      .primaryKey()
      .$defaultFn(() => generateNanoId()),
    user_id: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    store_id: text("store_id")
      .notNull()
      .references(() => store.id, { onDelete: "cascade" }), // optional source store
    type: enums.ledger_entry_type_enum("type").notNull(), // credit or debit
    amount_cents: integer("amount_cents").notNull(),
    currency: enums.currency_enum("currency").default(enums.CurrencyEnum.KES).notNull(),
    payment_id: text("payment_id")
      .notNull()
      .references(() => payments.id, { onDelete: "cascade" }),
    withdrawal_id: text("withdrawal_id")
      .notNull()
      .references(() => withdrawals.id, { onDelete: "cascade" }),
    memo: varchar("memo", { length: 300 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    created_at: timestamp("created_at", { mode: "date", precision: 3 })
      .notNull()
      .defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
      () => new Date(),
    ),
  },
  (t) => ({ userIdx: index("ledger_user_idx").on(t.user_id) }),
);
// webhooks
export const webhooks = pgTable(
  "webhooks",
  {
    id: varchar("id", { length: 16 })
      .primaryKey()
      .$defaultFn(() => generateNanoId()),
    event: varchar("event", { length: 180 }).notNull(),
    reference: varchar("reference", { length: 200 }),
    signature: varchar("signature", { length: 400 }),
    payload: text("payload").notNull(),
    processed: boolean("processed").default(false).notNull(),
    created_at: timestamp("created_at", { mode: "date", precision: 3 })
      .notNull()
      .defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
      () => new Date(),
    ),
  },
  (t) => ({ evtIdx: index("webhooks_event_idx").on(t.event) }),
);
