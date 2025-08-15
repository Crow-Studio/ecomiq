export type UserId = string;

export interface Session {
  id: string;
  expires_at: Date;
  user_id: string;
}
