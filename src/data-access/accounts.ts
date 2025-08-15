import { eq } from "drizzle-orm";
import { db, tables } from "~/lib/db";
import { OauthProvider, UserId } from "~/use-cases/types";

export async function createOauthAccount(user_id: UserId, googleId: string, provider: OauthProvider) {
  await db
    .insert(tables.oauth_account)
    .values({
      user_id,
      provider,
      provider_user_id: googleId,
    })
    .onConflictDoNothing()
    .returning();
}

export async function getAccountByUserId(user_id: UserId) {
  const account = await db.query.oauth_account.findFirst({
    where: table => eq(table.user_id, user_id),
  });

  return account;
}

export async function getAccountByGoogleId(googleId: string) {
  return await db.query.oauth_account.findFirst({
    where: table => eq(table.provider_user_id, googleId),
  });
}
