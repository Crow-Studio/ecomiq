import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    VITE_BASE_URL: z.url(),
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
    VITE_PAYSTACK_SECRET_KEY: z.string().min(1),
    VITE_PAYSTACK_PUBLIC_KEY: z.string().min(1),

    // Cloudflare
    CLOUDFLARE_ACCOUNT_ID: z.string(),
    R2_BUCKET_NAME: z.string(),
    R2_PUBLIC_URL: z.string(),
    R2_ACCESS_KEY_ID: z.string(),
    R2_SECRET_ACCESS_KEY: z.string()
  },
  runtimeEnv: process.env,
});
