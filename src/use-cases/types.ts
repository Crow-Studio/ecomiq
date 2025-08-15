export type UserId = string;

export interface Session {
  id: string;
  expires_at: Date;
  user_id: string;
}

export type OauthProvider = 'google'

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
