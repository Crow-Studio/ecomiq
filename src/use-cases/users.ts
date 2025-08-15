import { createUser, getUserByEmail } from "~/data-access/users";
import { GoogleUser } from "./types";
import { createOauthAccount } from "~/data-access/accounts";

export async function createGoogleUserUseCase(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email);

  if (!existingUser) {
    existingUser = await createUser(
      googleUser.email,
      googleUser.picture,
      googleUser.name
    );
  }

  await createOauthAccount(
    existingUser.id,
    googleUser.sub,
    'google'
  );

  return existingUser.id;
}
