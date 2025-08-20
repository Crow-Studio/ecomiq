import { pgEnum } from "drizzle-orm/pg-core";

export function enumToPgEnum<T extends Record<string, string>>(
  myEnum: T,
): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum) as [T[keyof T], ...T[keyof T][]];
}

// Enums
export enum UserRole {
  OWNER = "owner",
  MANAGER = "manager",
  STAFF = "staff",
}

export enum CurrencyEnum {
  USD = "USD",
  KES = "KES",
}

export enum BillingCyleEnum {
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export enum SubscriptionStatusEnum {
  TRIALING = "trialing",
  ACTIVE = "active",
  PAST_DUE = "past_due",
  CANCELED = "canceled",
  EXPIRED = "expired",
}

export enum PaymentChannelEnum {
  CARD = "card",
  MOBILE_MONEY = "mobile_money",
  BANK_TRANSFER = "bank_transfer",
  USSD = "ussd",
  QR = "qr",
}

export enum PaymentStatusEnum {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
  REFUNDED = "refunded",
  DISPUTED = "disputed",
}

export enum WithdrawalStatusEnum {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELED = "canceled",
}

export enum LedgerEntryTypeEnum {
  CREDIT = "credit",
  DEBIT = "debit",
}

export const user_role_enum = pgEnum("user_role", enumToPgEnum(UserRole));
export const currency_enum = pgEnum("currency_enum", enumToPgEnum(CurrencyEnum));
export const billing_cyle_enum = pgEnum(
  "billing_cyle_enum",
  enumToPgEnum(BillingCyleEnum),
);
export const subscription_status_enum = pgEnum(
  "subscription_status_enum",
  enumToPgEnum(SubscriptionStatusEnum),
);
export const payment_channel_enum = pgEnum(
  "payment_channel_enum",
  enumToPgEnum(PaymentChannelEnum),
);
export const payment_status_enum = pgEnum(
  "payment_status_enum",
  enumToPgEnum(PaymentStatusEnum),
);
export const withdrawal_status_enum = pgEnum(
  "withdrawal_status_enum",
  enumToPgEnum(WithdrawalStatusEnum),
);
export const ledger_entry_type_enum = pgEnum(
  "ledger_entry_type_enum",
  enumToPgEnum(LedgerEntryTypeEnum),
);
