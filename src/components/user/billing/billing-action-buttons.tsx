import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "@tanstack/react-router";
import { addMonths, addYears } from "date-fns";
import { Loader2 } from "lucide-react";
import { motion, Variants } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { env } from "~/env/client";
import { billingCreateStoreFn } from "~/fn/stores";
import { createSubTransactionFn, createTransactionFn } from "~/fn/subscriptions";
import { paystackPayment } from "~/hooks/use-paystack";
import { BillingCyleEnum, CurrencyEnum, SubscriptionPlanEnum } from "~/lib/db/schema";
import { generateNanoId } from "~/lib/db/schema/utils";
import { PaymentReference } from "~/lib/paystack/types";
import { PricingPlan } from "~/types";
import { User } from "~/use-cases/types";

interface Props {
  itemVariants: Variants;
  isSubscriptionExpired: boolean | undefined;
  selectedPlan: string;
  currency: CurrencyEnum;
  billingPeriod: BillingCyleEnum;
  plans: PricingPlan[];
  getPrice: (monthlyPrice: number) => number;
  user: User;
  hasExceededStoreLimit: boolean;
  allowedStores: number;
  totalStores: number;
}

export default function BillingActionButtons({
  itemVariants,
  isSubscriptionExpired,
  selectedPlan,
  currency,
  billingPeriod,
  plans,
  getPrice,
  user,
  hasExceededStoreLimit,
  allowedStores,
  totalStores,
}: Props) {
  const navigate = useNavigate();
  const [isPayNow, setIsPayNow] = useState(false);
  const [isSkipNow, setIsSkipNow] = useState(false);
  const reference = generateNanoId(16);
  const amount =
    getPrice(plans.find((p) => p.name === selectedPlan)?.monthlyPrice || 0) * 100;
  // const amount = 2 * 100
  const subscription_plan =
    plans.find((p) => p.name === selectedPlan)?.name || SubscriptionPlanEnum.STARTER;
  const config = {
    reference,
    email: user.email,
    amount,
    currency,
    publicKey: env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const onSuccess = async (payload: PaymentReference) => {
    try {
      const current_period_end =
        billingPeriod === BillingCyleEnum.MONTHLY
          ? addMonths(new Date(), 1)
          : addYears(new Date(), 1);

      const subscription = await createSubTransactionFn({
        data: {
          subscription_plan,
          billing_cycle: billingPeriod,
          current_period_end,
        },
      });

      await createTransactionFn({
        data: {
          subscription_id: subscription.id,
          paystack_transaction_id: payload.trans,
          paystack_reference: payload.reference,
          paystack_trxref: payload.trxref,
          amount,
          currency,
        },
      });

      const res = await billingCreateStoreFn();

      toast.success(res.message, {
        position: "top-center",
      });

      return navigate({
        to: "/user/$userId/store/$storeId/dashboard",
        params: {
          storeId: res.storeId,
          userId: user.id,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          position: "top-center",
        });
      }
    } finally {
      setIsPayNow(false);
    }
  };

  const onClose = async () => {
    setIsPayNow(false);
    toast.info("Payment process was closed before completion. No charges were made.", {
      position: "top-center",
    });
  };

  const initializePayment = paystackPayment(config);

  const handleSkipPayment = async () => {
    try {
      setIsSkipNow(true);

      if (hasExceededStoreLimit) {
        return toast.error(
          `Store limit reached. Your plan allows ${allowedStores} store(s), you currently have ${totalStores}.`,
          {
            position: "top-center",
          },
        );
      }
      const res = await billingCreateStoreFn({
        data: {
          total_stores: totalStores,
        },
      });

      toast.success(res.message, {
        position: "top-center",
      });

      return navigate({
        to: "/user/$userId/store/$storeId/dashboard",
        params: {
          storeId: res.storeId,
          userId: user.id,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          position: "top-center",
        });
      }
    } finally {
      setIsSkipNow(false);
    }
  };

  const onPayNow = async () => {
    setIsPayNow(true);
    initializePayment({ config, onSuccess, onClose });
  };
  return (
    <motion.div className="space-y-2" variants={itemVariants}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          onClick={() => onPayNow()}
          disabled={isPayNow || isSkipNow}
          className="bg-brand hover:bg-primary-secondary group inline-flex h-max w-full cursor-pointer items-center justify-center rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-white shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(249,129,99,1)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_#F97452_inset] transition-colors duration-300 ease-in-out hover:shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(252,199,185,0.8)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_hsla(0,_0%,_100%,_0.25)_inset] focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:shadow-xs disabled:hover:shadow-xs"
        >
          {isPayNow && <Loader2 className="size-4 animate-spin" />}
          Pay now
          {!isPayNow && (
            <Icon
              icon="hugeicons:arrow-right-01"
              className="-ml-1 transition-transform group-hover:translate-x-2"
            />
          )}
        </Button>
      </motion.div>

      {!isSubscriptionExpired && !hasExceededStoreLimit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center"
        >
          <Button
            onClick={() => handleSkipPayment()}
            disabled={isPayNow || isSkipNow}
            variant="ghost"
            type="button"
            className="w-full"
          >
            {isSkipNow && <Loader2 className="size-4 animate-spin" />}
            Skip for now
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
