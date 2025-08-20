import { eq } from "drizzle-orm";
import { db, tables } from "~/lib/db";
import { CurrencyEnum, UserRole } from "~/lib/db/schema";

export interface StoreWithRole {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date | null;
  currency: CurrencyEnum;
  active: boolean;
  user_id: string;
  role: UserRole;
}

export const getStores = async (user_id: string): Promise<StoreWithRole[]> => {
  // stores the user owns
  const ownedStores = await db.query.store.findMany({
    where: (s, { eq }) => eq(s.owner_id, user_id),
  });

  const ownedWithRole: StoreWithRole[] = ownedStores.map((s) => ({
    id: s.id,
    name: s.name,
    created_at: s.created_at,
    updated_at: s.updated_at,
    currency: s.currency,
    active: s.active,
    user_id,
    role: UserRole.OWNER,
  }));

  const memberStores = await db
    .select({
      id: tables.store.id,
      name: tables.store.name,
      created_at: tables.store.created_at,
      updated_at: tables.store.updated_at,
      currency: tables.store.currency,
      active: tables.store.active,
      user_id: tables.store_members.user_id,
      role: tables.store_members.role,
    })
    .from(tables.store_members)
    .innerJoin(tables.store, eq(tables.store.id, tables.store_members.store_id))
    .where(eq(tables.store_members.user_id, user_id));

  const memberStoresWithRole: StoreWithRole[] = memberStores
    .filter((s) => s.role !== null)
    .map((s) => ({
      ...s,
      role: s.role as UserRole,
    }));

  // Merge and remove duplicates if necessary
  const allStores = [...ownedWithRole, ...memberStoresWithRole];
  const uniqueStores = Array.from(new Map(allStores.map((s) => [s.id, s])).values());

  return uniqueStores;
};
