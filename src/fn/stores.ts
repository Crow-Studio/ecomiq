import { createServerFn } from "@tanstack/react-start";
import { addDays, isBefore } from "date-fns";
import { z } from "zod";
import { createStore, getStores } from "~/data-access/stores";
import { createSubscription, getUserSubscription } from "~/data-access/subscriptions";
import { authenticatedMiddleware } from "~/lib/auth/middleware/auth-guard";
import { SubscriptionStatusEnum } from "~/lib/db/schema";
import { storeLimits } from "~/utils/stores";

/* ------------------- Zod Schema------------------- */
export const storeSchema = z.object({
  user_id: z
    .string()
    .min(16, {
      error: "User ID must be at least 16 characters long",
    })
    .max(16, {
      error: "User ID must be at most 16 characters long",
    }),
});

export const createStoreFnSchema = z.object({
  total_stores: z.number({
    error: 'Please provide total number of stores!'
  })
})

/* ------------------- Server Functions------------------- */
export const getStoresFn = createServerFn({
  method: "GET",
})
  .middleware([authenticatedMiddleware])
  .validator((data: unknown) => {
    const result = storeSchema.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.issues[0].message);
    }
    return result.data;
  })
  .handler(async ({ data }) => {
    return await getStores(data.user_id);
  });

interface CreateServerFnResponse {
  redirectTo: "BILLING" | "DASHBOARD";
  storeId: string | null;
}

export const createStoreFn = createServerFn({
  method: "POST",
})
  .validator((data: unknown) => {
    const result = createStoreFnSchema.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.issues[0].message);
    }
    return result.data;
  })
  .middleware([authenticatedMiddleware])
  .handler(async ({ data: { total_stores }, context: { user } }): Promise<CreateServerFnResponse> => {
    try {
      // Validate user context
      if (!user?.id) {
        throw new Error("User context is missing or invalid!");
      }

      let subscription;

      try {
        subscription = await getUserSubscription(user.id);

        console.log("down", subscription);
      } catch (error) {
        console.error("Failed to fetch user subscription:", error);
        throw new Error("Unable to retrieve subscription information. Please try again!");
      }

      /*
       * Case 1: No subscription exists
       * Automatically create a trial subscription (14 days)
       * and redirect the user to billing
       */
      if (!subscription) {
        const current_period_end = addDays(new Date(), 14);

        if (!current_period_end || isNaN(current_period_end.getTime())) {
          throw new Error("Invalid trial period calculation");
        }

        try {
          await createSubscription({
            user_id: user.id,
            status: SubscriptionStatusEnum.TRIALING,
            current_period_end,
          });

          return {
            redirectTo: "BILLING",
            storeId: null,
          };
        } catch (error) {
          console.error("Failed to create trial subscription:", error);
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("Failed to create trial subscription. Please try again.");
        }
      }

      /*
       * Case 2: Subscription exists but trial/plan has expired
       * Redirect the user to billing to renew/upgrade
       */
      if (
        subscription.current_period_end &&
        isBefore(subscription.current_period_end, new Date())
      ) {
        return {
          redirectTo: "BILLING",
          storeId: null,
        };
      }

      /*
       * Case 3: Subscription in invalid state
       * Handle edge cases like cancelled, past_due, expired.
       */
      const invalidStates = [
        SubscriptionStatusEnum.CANCELED,
        SubscriptionStatusEnum.PAST_DUE,
        SubscriptionStatusEnum.EXPIRED,
      ];

      if (invalidStates.includes(subscription.status)) {
        return {
          redirectTo: "BILLING",
          storeId: null,
        };
      }

      /*
       * Case 4: User has an active subscription and it is still valid
       * Check store limits
       * Allow store creation and redirect to the new store's dashboard
       */
      if (
        subscription.status === SubscriptionStatusEnum.ACTIVE &&
        subscription.current_period_end &&
        isBefore(new Date(), subscription.current_period_end)
      ) {
        try {
          const allowedStores = storeLimits[subscription.subscription_plan] ?? 0
          if (total_stores >= allowedStores) {
            throw new Error("You've exceeded the allowed number of stores for your plan!")
          }

          const store = await createStore({ user_id: user.id })

          if (!store?.id) {
            throw new Error("Store creation failed - no store ID returned!")
          }

          return {
            redirectTo: "DASHBOARD",
            storeId: store.id,
          }
        } catch (error) {
          console.error("Failed to create store:", error)
          throw new Error(error instanceof Error ? error.message : "Failed to create store. Please try again.")
        }
      }


      /*
       * Fallback: redirect to billing for any other subscription state
       */
      console.warn("Unexpected subscription state:", subscription.status);
      return {
        redirectTo: "BILLING",
        storeId: null,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error(
        "An unexpected error occurred. Please try again or contact support!",
      );
    }
  });

export const billingCreateStoreFn = createServerFn({
  method: "POST",
})
  .middleware([authenticatedMiddleware])
  .handler(async ({ context: { user } }) => {
    try {
      // Validate user context
      if (!user?.id) {
        throw new Error("User context is missing or invalid!");
      }

      const store = await createStore({
        user_id: user.id,
      });

      return {
        message: "Your store has been created!",
        storeId: store.id,
      };
    } catch (error) {
      console.log("Failed to create store", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to create store. Please try again!");
    }
  });
