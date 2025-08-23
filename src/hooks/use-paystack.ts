/* eslint-disable @typescript-eslint/no-explicit-any */
import { callPaystackPop } from "~/lib/paystack/actions";
import { HookConfig, InitializePayment } from "~/lib/paystack/types";

export function paystackPayment(hookConfig: HookConfig): InitializePayment {
  function initializePayment({
    config,
    onSuccess,
    onClose,
  }: Parameters<InitializePayment>[0]): void {
    const args = { ...hookConfig, ...config };

    const {
      publicKey,
      firstname,
      lastname,
      phone,
      email,
      amount,
      reference,
      metadata,
      currency = "KES",
      channels,
      label,
      plan,
      quantity,
      subaccount,
      transaction_charge,
      bearer,
      split,
      split_code,
      connect_account,
      connect_split,
      onBankTransferConfirmationPending,
    } = args;
    const paystackArgs: Record<string, any> = {
      onSuccess: onSuccess ? onSuccess : () => null,
      onCancel: onClose ? onClose : () => null,
      key: publicKey,
      email,
      amount,
      ...(firstname && { firstname }),
      ...(lastname && { lastname }),
      ...(phone && { phone }),
      ...(reference && { ref: reference }),
      ...(currency && { currency }),
      ...(channels && { channels }),
      ...(metadata && { metadata }),
      ...(label && { label }),
      ...(onBankTransferConfirmationPending && { onBankTransferConfirmationPending }),
      ...(subaccount && { subaccount }),
      ...(transaction_charge && { transaction_charge }),
      ...(bearer && { bearer }),
      ...(split && { split }),
      ...(split_code && { split_code }),
      ...(plan && { plan }),
      ...(quantity && { quantity }),
      ...(connect_split && { connect_split }),
      ...(connect_account && { connect_account }),
    };

    callPaystackPop(paystackArgs);
  }

  return initializePayment;
}
