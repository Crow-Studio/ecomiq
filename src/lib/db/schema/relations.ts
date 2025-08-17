import { relations } from "drizzle-orm";
import {
  ledger_entries,
  payments,
  plans,
  store,
  subscriptions,
  wallets,
  withdrawals,
} from "./payments";
import { user } from "./user";

/* ------------------- RELATIONS ------------------- */
export const users_relations = relations(user, ({ many }) => ({
  stores: many(store),
  subscriptions: many(subscriptions),
  wallet: many(wallets),
  ledger: many(ledger_entries),
  withdrawals: many(withdrawals),
}));

export const plans_relations = relations(plans, ({ many }) => ({
  subscriptions: many(subscriptions),
}));

export const subscriptions_relations = relations(subscriptions, ({ one }) => ({
  user: one(user, { fields: [subscriptions.user_id], references: [user.id] }),
  plan: one(plans, { fields: [subscriptions.plan_id], references: [plans.id] }),
}));

export const store_relations = relations(store, ({ one, many }) => ({
  owner: one(user, { fields: [store.owner_id], references: [user.id] }),
  payments: many(payments),
}));

export const payments_relations = relations(payments, ({ one }) => ({
  store: one(store, { fields: [payments.store_id], references: [store.id] }),
  owner: one(user, { fields: [payments.owner_id], references: [user.id] }),
}));

export const wallet_relations = relations(wallets, ({ one }) => ({
  user: one(user, { fields: [wallets.user_id], references: [user.id] }),
}));

export const ledger_relations = relations(ledger_entries, ({ one }) => ({
  user: one(user, { fields: [ledger_entries.user_id], references: [user.id] }),
  store: one(store, { fields: [ledger_entries.store_id], references: [store.id] }),
  payment: one(payments, {
    fields: [ledger_entries.payment_id],
    references: [payments.id],
  }),
}));

export const withdrawalsRelations = relations(withdrawals, ({ one }) => ({
  user: one(user, { fields: [withdrawals.user_id], references: [user.id] }),
}));
