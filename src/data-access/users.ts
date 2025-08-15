import { and, eq } from "drizzle-orm";
import { db, tables } from "~/lib/db";
import { User } from "~/lib/db/schema";
import { UserId } from "~/use-cases/types";

export async function deleteUser(user_id: UserId) {
  await db.delete(tables.user).where(eq(tables.user.id, user_id));
}

export async function getUser(user_id: UserId) {
  const user = await db.query.user.findFirst({
    where: (table) => eq(table.id, user_id),
  });

  return user;
}

export async function createUser(
  email: string,
  username: string,
  password: string,
  avatar: string,
) {
  const [user] = await db
    .insert(tables.user)
    .values({
      email,
      username,
      password,
      avatar,
      email_verified: true,
    })
    .returning();

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    avatar: user.avatar,
    email_verified: user.email_verified,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}

export async function createOauthUser(email: string, avatar: string, username: string) {
  const [user] = await db
    .insert(tables.user)
    .values({
      email,
      avatar,
      username,
    })
    .returning();
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await db.query.user.findFirst({
    where: (table) => eq(table.email, email),
  });

  return user;
}

export async function setEmailVerified(user_id: UserId) {
  await db
    .update(tables.user)
    .set({
      email_verified: true,
    })
    .where(eq(tables.user.id, user_id));
}

export async function updateUser(user_id: UserId, updatedUser: Partial<User>) {
  await db.update(tables.user).set(updatedUser).where(eq(tables.user.id, user_id));
}

export async function getEmailVerificationCode(email: string) {
  const existingCode = await db.query.unique_code.findFirst({
    where: (table) => eq(table.email, email),
  });

  return existingCode;
}

export async function createEmailVerificationCode(
  email: string,
  code: string,
  expires_at: Date,
) {
  await db.insert(tables.unique_code).values({
    email,
    code,
    expires_at,
  });
}

export async function updateEmailVerificationCode(
  email: string,
  code: string,
  expires_at: Date,
) {
  await db
    .update(tables.unique_code)
    .set({
      code,
      expires_at,
    })
    .where(eq(tables.unique_code.email, email));
}

export async function checkUniqueCode(email: string, code: string) {
  const unique_code_request = await db.query.unique_code.findFirst({
    where: (table) => and(eq(table.email, email), eq(table.code, code)),
  });
  return unique_code_request;
}

export async function deleteUniqueCode(id: string) {
  await db.delete(tables.unique_code).where(eq(tables.unique_code.id, id));
}
