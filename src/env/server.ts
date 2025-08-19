import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    VITE_BASE_URL: z.url().default("http://localhost:3000"),
    BETTER_AUTH_SECRET: z.string().min(1),
    NODE_ENV: z.string(),

    // Upstash
    UPSTASH_URL: z.string(),
    UPSTASH_TOKEN: z.string(),

    // OAuth2 providers, optional, update as needed
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),

    // SMTP Credentials
    RESEND_API_KEY: z.string().min(1),

    // Paystack
    PAYSTACK_SECRET_KEY: z.string().min(1),
    PAYSTACK_PUBLIC_KEY: z.string().min(1),
  },
  runtimeEnv: process.env,
});
