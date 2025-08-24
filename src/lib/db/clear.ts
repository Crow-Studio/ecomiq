import "dotenv/config";
import { sql } from "drizzle-orm";
import { db, driver as pool } from "./index";

async function main() {
  const tablesSchema = db._.schema;
  if (!tablesSchema) throw new Error("Schema not loaded");

  // Drop drizzle schema
  await db.execute(sql.raw(`DROP SCHEMA IF EXISTS "drizzle" CASCADE;`));

  // Drop public schema (wipes everything)
  await db.execute(sql.raw(`DROP SCHEMA IF EXISTS public CASCADE;`));

  // Recreate public schema
  await db.execute(sql.raw(`CREATE SCHEMA public;`));

  // Restore Supabase grants (critical!)
  await db.execute(
    sql.raw(`
    GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;

    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO service_role;

    ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT ALL ON TABLES TO service_role;

    ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT ALL ON SEQUENCES TO service_role;
  `),
  );

  await pool.end();
}

main();
