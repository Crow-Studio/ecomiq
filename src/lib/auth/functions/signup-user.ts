import { faker } from "@faker-js/faker";
import { createServerFn } from "@tanstack/react-start";
import { capitalize } from "~/lib/utils";
import { otpVerifyFormSchema } from "~/types/forms";
import authClient from "../auth-client";

export const signupUserAction = createServerFn({
  method: "POST",
})
  .validator((person: unknown) => {
    const result = otpVerifyFormSchema.safeParse(person);
    if (!result.success) {
      throw new Error(
        JSON.stringify({
          type: "validation",
          issues: result.error.issues,
        }),
      );
    }
    return result.data;
  })
  .handler(async ({ data }) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const imageText = `${capitalize(firstName.charAt(0))}${capitalize(lastName.charAt(0))}`;

    // STEP 1: Try to create user (might already exist from previous failed attempt)
    const { error: signupError } = await authClient.signUp.email({
      name: `${capitalize(firstName)} ${capitalize(lastName)}`,
      email: data.email,
      password: data.password,
      image: `https://avatar.vercel.sh/vercel.svg?text=${imageText}`,
      callbackURL: "/",
    });

    // Handle the case where user already exists but is unverified
    if (signupError) {
      // Check if error is "user already exists" - if so, proceed to OTP verification
      if (
        signupError.code === "USER_ALREADY_EXISTS" ||
        signupError.message?.includes("already exists") ||
        signupError.message?.includes("already registered")
      ) {
        console.log(
          `User ${data.email} already exists, proceeding to OTP verification...`,
        );

        // User exists but might be unverified, proceed to OTP verification
      } else {
        // Some other signup error occurred
        throw new Error(
          JSON.stringify({
            type: "auth",
            issues: [
              {
                code: signupError?.code as string,
                path: ["auth"],
                message: signupError?.message as string,
              },
            ],
          }),
        );
      }
    } else {
      console.log(`New user ${data.email} created successfully`);
    }

    // STEP 2: Verify the OTP (works for both new and existing unverified users)
    const { error: emailOTPError } = await authClient.emailOtp.verifyEmail({
      email: data.email,
      otp: data.otp,
    });

    if (emailOTPError) {
      throw new Error(
        JSON.stringify({
          type: "auth",
          issues: [
            {
              code: emailOTPError?.code as string,
              path: ["otp"],
              message: "Invalid or expired OTP. Please try again.",
            },
          ],
        }),
      );
    }

    return {
      message: "You've successfully signed up and verified your account!",
    };
  });
