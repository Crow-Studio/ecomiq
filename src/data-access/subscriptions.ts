import { and, eq } from "drizzle-orm";
import { db, tables } from "~/lib/db";
import { BillingCyleEnum, SubscriptionPlanEnum, SubscriptionStatusEnum } from "~/lib/db/schema";

export async function getUserSubscription(user_id: string) {
  const user = await db.query.user.findFirst({
    where: table => eq(table.id, user_id)
  })

  if (!user) {
    return undefined
  }

  if (!user.subscription_id) {
    return undefined
  }

  return await db.query.subscriptions.findFirst({
    where: and(
      eq(tables.subscriptions.id, user.subscription_id),
      eq(tables.subscriptions.user_id, user_id)
    ),
  });
}

export async function createSubscription({
  user_id,
  current_period_end,
  status,
  subscription_plan = SubscriptionPlanEnum.TRIAL,
  billing_cycle = BillingCyleEnum.TRIAL_PERIOD
}: {
  user_id: string;
  current_period_end: Date;
  status: SubscriptionStatusEnum;
  subscription_plan?: SubscriptionPlanEnum
  billing_cycle?: BillingCyleEnum
}) {
  const [subscription] = await db
    .insert(tables.subscriptions)
    .values({
      user_id,
      status,
      current_period_end,
      subscription_plan,
      billing_cycle
    })
    .returning();

  await db
    .update(tables.user)
    .set({
      subscription_id: subscription.id,
    })
    .where(eq(tables.user.id, user_id));

  return subscription
}
