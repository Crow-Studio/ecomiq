import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createSubscription, getUserSubscription } from "~/data-access/subscriptions";
import { createTransaction } from "~/data-access/transactions";
import { authenticatedMiddleware } from "~/lib/auth/middleware/auth-guard";
import {
  BillingCyleEnum,
  CurrencyEnum,
  SubscriptionPlanEnum,
  SubscriptionStatusEnum,
} from "~/lib/db/schema";

/* ------------------- Zod Schema------------------- */
export const createSubTransactionSchema = z.object({
  subscription_plan: z.enum(SubscriptionPlanEnum),
  billing_cycle: z.enum(BillingCyleEnum),
  current_period_end: z.date(),
});

export const createTransactionSchema = z.object({
  subscription_id: z.string(),
  paystack_transaction_id: z.string(),
  paystack_reference: z.string(),
  paystack_trxref: z.string(),
  amount: z.number(),
  currency: z.enum(CurrencyEnum),
});

/* ------------------- Server Functions ------------------- */
export const getUserSubscriptionFn = createServerFn({
  method: "GET",
})
  .middleware([authenticatedMiddleware])
  .handler(async ({ context: { user } }) => {
    return await getUserSubscription(user.id);
  });

export const createSubTransactionFn = createServerFn({
  method: "POST",
})
  .validator((data: unknown) => {
    const result = createSubTransactionSchema.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.issues[0].message);
    }
    return result.data;
  })
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context: { user } }) => {
    try {
      const subscription = await createSubscription({
        user_id: user.id,
        current_period_end: data.current_period_end,
        billing_cycle: data.billing_cycle,
        status: SubscriptionStatusEnum.ACTIVE,
        subscription_plan: data.subscription_plan,
      });

      return subscription;
    } catch {
      throw new Error("Failed to create subscription. Please try again!");
    }
  });

export const createTransactionFn = createServerFn({
  method: "POST",
})
  .validator((data: unknown) => {
    const result = createTransactionSchema.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.issues[0].message);
    }
    return result.data;
  })
  .middleware([authenticatedMiddleware])
  .handler(async ({ data }) => {
    try {
      await createTransaction({
        subscription_id: data.subscription_id,
        paystack_transaction_id: data.paystack_transaction_id,
        paystack_reference: data.paystack_reference,
        paystack_trxref: data.paystack_trxref,
        amount: data.amount,
        currency: data.currency,
      });
    } catch {
      throw new Error("Failed to create transaction. Please try again!");
    }
  });
