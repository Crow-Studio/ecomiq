import { eq } from "drizzle-orm";
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

export async function createUser(email: string, avatar: string, username: string) {
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
