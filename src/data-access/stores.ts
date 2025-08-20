import { eq } from "drizzle-orm";
import { db } from "~/lib/db";

export const getStores = async (user_id: string) => {
  return await db.query.store.findMany({
    where: (table) => eq(table.owner_id, user_id),
  });
};
