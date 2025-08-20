import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getStores } from "~/data-access/stores";
import { authenticatedMiddleware } from "~/lib/auth/middleware/auth-guard";

// zod schemas
const storeSchema = z.object({
  user_id: z
    .string()
    .min(16, {
      error: "User ID must be at least 16 characters long",
    })
    .max(16, {
      error: "User ID must be at most 16 characters long",
    }),
});

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
