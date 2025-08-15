import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { Google } from "arctic";
import { eq } from "drizzle-orm";
import { env } from "~/env/server";
import { db, tables } from "~/lib/db";
import { User } from "~/lib/db/schema";
import { Session, UserId } from "~/use-cases/types";
import { getSessionToken } from "./session";

const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15;
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2;

export const googleAuth = new Google(
  env.GOOGLE_CLIENT_ID!,
  env.GOOGLE_CLIENT_SECRET!,
  `${env.VITE_BASE_URL}/api/login/google/callback`,
);

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(token: string, user_id: UserId): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    user_id,
    expires_at: new Date(Date.now() + SESSION_MAX_DURATION_MS),
  };
  await db.insert(tables.session).values(session);
  return session;
}

export async function validateRequest(): Promise<SessionValidationResult> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) {
    return { session: null, user: null };
  }
  return validateSessionToken(sessionToken);
}

export async function getAuthenticatedUser(): Promise<User | null> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) {
    return null;
  }
  const { user } = await validateSessionToken(sessionToken);
  return user;
}

export async function isAuthenticated(): Promise<boolean> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) {
    return false;
  }
  const { user } = await validateSessionToken(sessionToken);
  return !!user;
}

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const sessionInDb = await db.query.session.findFirst({
    where: (table) => eq(table.id, sessionId),
  });
  if (!sessionInDb) {
    return { session: null, user: null };
  }
  if (Date.now() >= sessionInDb.expires_at.getTime()) {
    await db.delete(tables.session).where(eq(tables.session.id, sessionInDb.id));
    return { session: null, user: null };
  }

  const user = await db.query.user.findFirst({
    where: (table) => eq(table.id, sessionInDb.user_id),
  });

  if (!user) {
    await db.delete(tables.session).where(eq(tables.session.id, sessionInDb.id));
    return { session: null, user: null };
  }

  if (Date.now() >= sessionInDb.expires_at.getTime() - SESSION_REFRESH_INTERVAL_MS) {
    sessionInDb.expires_at = new Date(Date.now() + SESSION_MAX_DURATION_MS);
    await db
      .update(tables.session)
      .set({
        expires_at: sessionInDb.expires_at,
      })
      .where(eq(tables.session.id, sessionInDb.id));
  }

  return { session: sessionInDb, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(tables.session).where(eq(tables.session.id, sessionId));
}

export async function invalidateUserSessions(user_id: UserId): Promise<void> {
  await db.delete(tables.session).where(eq(tables.user.id, user_id));
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
