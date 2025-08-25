import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createTransaction } from "~/data-access/transactions";
import { authenticatedMiddleware } from "~/lib/auth/middleware/auth-guard";

/* ------------------- Zod Schema------------------- */
export const createTransactionSchema = z.object({
  subscription_id: z.string(),
  paystack_transaction_id: z.string(),
  paystack_reference: z.string(),
  paystack_trxref: z.string(),
  amount: z.number(),
});

/* ------------------- Server Functions------------------- */
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
      });
    } catch {
      throw new Error("Failed to create sub transaction. Please try again!");
    }
  });
