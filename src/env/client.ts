import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_BASE_URL: z.url().default("http://localhost:3000"),
    // Paystack
    VITE_PAYSTACK_SECRET_KEY: z.string().min(1),
    VITE_PAYSTACK_PUBLIC_KEY: z.string().min(1),
  },
  runtimeEnv: import.meta.env,
});
