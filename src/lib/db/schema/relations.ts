import { relations } from "drizzle-orm";
import { subs_transactions, subscriptions } from "./payments";
import { store, store_members } from "./store";
import { user } from "./user";

/* ------------------- RELATIONS ------------------- */
export const users_relations = relations(user, ({ many }) => ({
  stores: many(store),
  memberships: many(store_members),
  subscriptions: many(subscriptions),
}));

export const store_relations = relations(store, ({ one, many }) => ({
  owner: one(user, { fields: [store.owner_id], references: [user.id] }),
  members: many(store_members),
}));

export const store_members_relations = relations(store_members, ({ one }) => ({
  user: one(user, { fields: [store_members.user_id], references: [user.id] }),
  store: one(store, { fields: [store_members.store_id], references: [store.id] }),
}));

export const subscriptions_relations = relations(subscriptions, ({ one, many }) => ({
  user: one(user, { fields: [subscriptions.user_id], references: [user.id] }),
  transactions: many(subs_transactions),
}));

export const subs_transactions_relations = relations(subs_transactions, ({ one }) => ({
  subscription: one(subscriptions, {
    fields: [subs_transactions.subscription_id],
    references: [subscriptions.id],
  }),
}));
