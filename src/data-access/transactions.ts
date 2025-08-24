import { db, tables } from "~/lib/db"
import { CurrencyEnum } from "~/lib/db/schema"

/* ------------------- Types------------------- */
export interface SubTransactionParams {
  subscription_id: string
  paystack_transaction_id: string
  paystack_reference: string
  paystack_trxref: string
  amount: number
  currency?: CurrencyEnum
}

export const createTransaction = async ({
  subscription_id,
  paystack_transaction_id,
  paystack_reference,
  paystack_trxref,
  amount,
  currency = CurrencyEnum.KES
}: SubTransactionParams) => {
  const [transaction] = await db.insert(tables.subs_transactions).values({
    subscription_id,
    paystack_transaction_id,
    paystack_reference,
    paystack_trxref,
    amount,
    currency
  }).returning()
  return transaction
}
