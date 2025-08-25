import { SubscriptionPlanEnum } from "~/lib/db/schema";

// store limits by plan
export const storeLimits: Record<SubscriptionPlanEnum, number> = {
  [SubscriptionPlanEnum.TRIAL]: 1,
  [SubscriptionPlanEnum.STARTER]: 3,
  [SubscriptionPlanEnum.GROWTH]: 5,
  [SubscriptionPlanEnum.ENTERPRISE]: Infinity, // no limit
};
