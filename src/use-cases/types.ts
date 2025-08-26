import { CurrencyEnum, UserRole } from "~/lib/db/schema";

export type UserId = string;

export interface Session {
  id: string;
  expires_at: Date;
  user_id: string;
}

export interface SessionMetadata {
  location: string;
  browser: string;
  device: string;
  os: string;
  ipAddress: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  email_verified: boolean;
  registered_2fa: boolean;
  subscription_id: string | null;
  created_at: Date;
  updated_at: Date | null;
}

export type OauthProvider = "google";

export interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export interface StoreWithMembers {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date | null;
  url: string;
  currency: CurrencyEnum;
  owner_id: string;
  active: boolean;
  members: {
    id: string;
    role: UserRole | null;
    created_at: Date;
    updated_at: Date | null;
    user_id: string;
    store_id: string;
  }[];
}
