import { text, timestamp, varchar } from "drizzle-orm/pg-core";
import { generateNanoId, pgTable } from "./utils";

export const cron_job = pgTable("cron_jobs", {
  id: varchar("id", { length: 16 })
    .primaryKey()
    .$defaultFn(() => generateNanoId()),
  message: text("message"),
  created_at: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow(),
});
