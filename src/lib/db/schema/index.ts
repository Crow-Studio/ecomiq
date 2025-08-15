/* eslint-disable @typescript-eslint/no-deprecated */
import { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  index,
  pgTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { customAlphabet } from "nanoid";

export const generateNanoId = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-",
  16,
);

export function enumToPgEnum<T extends Record<string, string>>(
  myEnum: T,
): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum) as [T[keyof T], ...T[keyof T][]];
}

const PREFIX = "app";
const pgTable = pgTableCreator((name) => `${PREFIX}_${name}`);

// user
export const user = pgTable(
  "user",
  {
    id: varchar("id", { length: 16 })
      .primaryKey()
      .$defaultFn(() => generateNanoId()),
    email: varchar("email", { length: 255 }).notNull().unique(),
    username: varchar("username", { length: 255 }).notNull(),
    avatar: text("avatar").notNull(),
    password: text("password"),
    email_verified: boolean("email_verified").notNull().default(false),
    created_at: timestamp("created_at", { mode: "date", precision: 3 })
      .notNull()
      .defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
      () => new Date(),
    ),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
  }),
);

// OAuth
export const oauth_account = pgTable("oauth_account", {
  id: varchar("id", { length: 16 })
    .primaryKey()
    .$defaultFn(() => generateNanoId()),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  provider: text("provider").notNull(),
  provider_user_id: text("provider_user_id").notNull(),
  created_at: timestamp("created_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ),
});

// Email Verification
export const email_verification_request_table = pgTable("email_verification_request", {
  id: varchar("id", { length: 16 })
    .primaryKey()
    .$defaultFn(() => generateNanoId()),
  email: text("email").notNull(),
  code: text("code").notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires_at: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
  created_at: timestamp("created_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ),
});

// sessions
export const session = pgTable("session", {
  id: varchar("id", { length: 255 }).primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires_at: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
  created_at: timestamp("created_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ),
});

/* ------------------- TYPES ------------------- */
export type User = InferSelectModel<typeof user>;
