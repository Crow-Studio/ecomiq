import { serverOnly } from "@tanstack/react-start";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";

import { emailOTP } from "better-auth/plugins";
import { env } from "~/env/server";
import { db } from "~/lib/db";
import { sendEmailVerificationMail } from "../emails/email-verication";
import { checkIfUserExistsByEmail } from "./functions/user-exists";

const getAuthConfig = serverOnly(() =>
  betterAuth({
    baseURL: env.VITE_BASE_URL,
    database: drizzleAdapter(db, {
      provider: "pg",
    }),

    // https://www.better-auth.com/docs/integrations/tanstack#usage-tips
    plugins: [
      reactStartCookies(),
      emailOTP({
        async sendVerificationOTP({ email, otp, type }) {
          if (type === "sign-in") {
            // Logic to check if user exists for a potential sign-up
            const userExists = await checkIfUserExistsByEmail({
              data: {
                email,
              },
            });

            if (!userExists) {
              console.log(`Sending sign-up OTP ${otp} to ${email}`);
              // Logic to send the OTP for new user registration
              await sendEmailVerificationMail({
                email,
                subject: "Verify your email address",
                otp,
              }); // your send function
            } else {
              console.log(
                `User ${email} found, not sending sign-in OTP (or handle existing user sign-in flow)`,
              );
            }
          } else if (type === "email-verification") {
            // Logic to check if user exists for signIn
            const userExists = await checkIfUserExistsByEmail({
              data: {
                email,
              },
            });

            if (userExists) {
              console.log(`Sending email verification OTP ${otp} to ${email}`);
              // Logic to send the OTP to verify an existing user's email
              await sendEmailVerificationMail({
                email,
                subject: "Verify your email address",
                otp,
              }); // your send function
            } else {
              console.log(`No user found, no email sent for ${email}`);
            }
          }
        },
      }),
    ],

    // https://www.better-auth.com/docs/concepts/session-management#session-caching
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // 5 minutes
      },
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 24 hours
    },

    // https://www.better-auth.com/docs/concepts/oauth
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID!,
        clientSecret: env.GOOGLE_CLIENT_SECRET!,
      },
    },

    // https://www.better-auth.com/docs/authentication/email-password
    emailAndPassword: {
      enabled: true,
    },
    requireEmailVerification: true,
    emailVerification: {
      sendOnSignUp: true,
      sendOnSignIn: true,
      autoSignInAfterVerification: true,
    },
  }),
);

export const auth = getAuthConfig();
