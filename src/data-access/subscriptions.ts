import { eq } from "drizzle-orm";
import { db, tables } from "~/lib/db";
import { SubscriptionStatusEnum } from "~/lib/db/schema";

export async function getUserSubscription(user_id: string) {
  return await db.query.subscriptions.findFirst({
    where: eq(tables.subscriptions.user_id, user_id),
  });
}

export async function createSubscription({
  user_id,
  current_period_end,
  status,
}: {
  user_id: string;
  current_period_end: Date;
  status: SubscriptionStatusEnum;
}) {
  const [subscription] = await db
    .insert(tables.subscriptions)
    .values({
      user_id,
      status,
      current_period_end,
    })
    .returning();

  await db
    .update(tables.user)
    .set({
      subscription_id: subscription.id,
    })
    .where(eq(tables.user.id, user_id));
}
