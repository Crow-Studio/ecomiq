import { createServerFn } from "@tanstack/react-start";
import { formSchema } from "~/types/forms";
import authClient from "../auth-client";

export const signinUserAction = createServerFn({
  method: "POST",
})
  .validator((person: unknown) => {
    const result = formSchema.safeParse(person);
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
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: "/",
    });

    if (error) {
      throw new Error(
        JSON.stringify({
          type: "auth",
          issues: [
            {
              code: error?.code as string,
              path: ["auth"],
              message: error?.message as string,
            },
          ],
        }),
      );
    }

    return {
      message: "You've successfully signed in!",
    };
  });
