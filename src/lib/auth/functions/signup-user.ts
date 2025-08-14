import { faker } from "@faker-js/faker";
import { createServerFn } from "@tanstack/react-start";
import { capitalize } from "~/lib/utils";
import { formSchema } from "~/types/forms";
import authClient from "../auth-client";

export const signupUserAction = createServerFn({
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
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const imageText = `${capitalize(firstName.charAt(0))}${capitalize(lastName).charAt(0)}`;

    console.log(imageText);

    // const { data: authData, error } = await authClient.signUp.email({
    //   name: `${capitalize(firstName)} ${capitalize(lastName)}`,
    //   email: data.email,
    //   password: data.password,
    //   image: `https://avatar.vercel.sh/vercel.svg?text=${imageText}`,
    //   callbackURL: "/",
    // });

    const { error, data: authData } = await authClient.emailOtp.sendVerificationOtp({
      email: data.email,
      type: "sign-in",
    });

    console.log(authData);

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
