import { createOauthAccount } from "~/data-access/accounts";
import { createOauthUser, getUserByEmail } from "~/data-access/users";
import { GoogleUser } from "./types";

export async function createGoogleUserUseCase(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email);

  if (!existingUser) {
    existingUser = await createOauthUser(
      googleUser.email,
      googleUser.picture,
      googleUser.name,
    );
  }

  await createOauthAccount(existingUser.id, googleUser.sub, "google");

  return existingUser.id;
}
