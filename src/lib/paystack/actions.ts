/* eslint-disable @typescript-eslint/no-explicit-any */

export const callPaystackPop = async (
  paystackArgs: Record<string, any>,
): Promise<void> => {
  // Check if we're on the client side
  if (typeof window === "undefined") {
    console.warn("Paystack can only be used on the client side");
    return;
  }

  try {
    const PaystackPop = (await import("@paystack/inline-js")).default;
    const paystack = new PaystackPop();
    paystack.newTransaction(paystackArgs);
  } catch (error) {
    console.error("Failed to initialize Paystack:", error);
  }
};
