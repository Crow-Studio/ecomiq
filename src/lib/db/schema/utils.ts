import { pgTableCreator } from "drizzle-orm/pg-core";
import { customAlphabet } from "nanoid";

export const PREFIX = "app";
export const pgTable = pgTableCreator((name) => `${PREFIX}_${name}`);

export const generateNanoId = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-",
  16,
);

// Fee constants, minor units
export const ONE_PERCENT = 0.01;
export const WITHDRAWAL_FLAT_CENTS = 3000; // 30 KES
export const WITHDRAWAL_PCT = 0.005; // 0.5 percent
export const WITHDRAWAL_PCT_THRESHOLD_CENTS = 1_000_000; // 10000 KES
export const MIN_WITHDRAWAL_CENTS = 50_000; // 500 KES

// Helpers
export function kesToCents(kes: number) {
  return Math.round(kes * 100);
}
export function centsToKes(cents: number) {
  return Math.round(cents) / 100;
}

// Commission one percent on sale amount
export function computePlatformCommissionCents(saleAmountCents: number) {
  return Math.floor(saleAmountCents * ONE_PERCENT);
}

// Withdrawal fee, 30 under 10000, 0.5 percent at or above 10000
export function computeWithdrawalFeeCents(requestedCents: number) {
  if (requestedCents >= WITHDRAWAL_PCT_THRESHOLD_CENTS) {
    return Math.floor(requestedCents * WITHDRAWAL_PCT);
  }
  return WITHDRAWAL_FLAT_CENTS;
}
