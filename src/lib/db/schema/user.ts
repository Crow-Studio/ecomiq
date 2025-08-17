/* eslint-disable @typescript-eslint/no-deprecated */
import { sql } from "drizzle-orm";
import { boolean, check, index, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { generateNanoId, pgTable } from "./types";

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

//  Unique Code
export const unique_code = pgTable(
  "unique_code",
  {
    id: varchar("id", { length: 16 })
      .primaryKey()
      .$defaultFn(() => generateNanoId()),
    email: text("email").notNull(),
    code: varchar("code", {
      length: 6,
    }).notNull(),
    expires_at: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
    created_at: timestamp("created_at", { mode: "date", precision: 3 })
      .notNull()
      .defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
      () => new Date(),
    ),
  },
  (table) => ({
    codeExactLengthCheck: check("code_exact_length", sql`LENGTH(${table.code}) = 6`),
  }),
);

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
