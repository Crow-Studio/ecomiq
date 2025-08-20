/* eslint-disable @typescript-eslint/no-deprecated */
import { boolean, index, text, timestamp, varchar } from "drizzle-orm/pg-core";
import * as enums from "./enums";
import { generateNanoId, pgTable } from "./types";
import { user } from "./user";

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
