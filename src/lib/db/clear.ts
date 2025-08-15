import "dotenv/config";

import { sql } from "drizzle-orm";
import { db, driver as pool } from "./index";

async function main() {
  const tablesSchema = db._.schema;
  if (!tablesSchema) throw new Error("Schema not loaded");

  await db.execute(sql.raw(`DROP SCHEMA IF EXISTS "drizzle" CASCADE;`));

  await db.execute(sql.raw(`DROP SCHEMA public CASCADE;`));
  await db.execute(sql.raw(`CREATE SCHEMA public;`));
  await pool.end();
}

main();
