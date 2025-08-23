import { createServerFn } from "@tanstack/react-start";
import { authenticatedMiddleware } from "~/lib/auth/middleware/auth-guard";
import { payment } from "~/utils/payment";

interface TransactionResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export const createSubsTransactionFn = createServerFn({
  method: "POST",
})
  .middleware([authenticatedMiddleware])
  .handler(async ({ context: { user } }) => {
    try {
      const { data }: { data: TransactionResponse } = await payment.post(
        "/transaction/initialize",
        {
          email: user.email,
          amount: 200,
          currency: "KES",
          reference: new Date().getTime().toString(),
        },
      );
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create transaction. Please try again later.");
    }
  });
