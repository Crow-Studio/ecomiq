import { Check } from "lucide-react";
import { motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { BillingCyleEnum, CurrencyEnum, SubscriptionPlanEnum } from "~/lib/db/schema";
import { PricingPlan } from "~/types";

interface Props {
  index: number;
  setSelectedPlan: Dispatch<SetStateAction<SubscriptionPlanEnum>>;
  selectedPlan: SubscriptionPlanEnum;
  billingPeriod: BillingCyleEnum;
  currency: CurrencyEnum;
  plan: PricingPlan;
  getPrice: (monthlyPrice: number) => number;
}

export default function BillingPlan({
  index,
  selectedPlan,
  setSelectedPlan,
  billingPeriod,
  currency,
  plan,
  getPrice,
}: Props) {
  const getCurrencySymbol = () => {
    return currency === CurrencyEnum.USD ? "$" : "Ksh";
  };

  const getPriceLabel = () => {
    return billingPeriod === BillingCyleEnum.MONTHLY ? "/mo." : "/year";
  };

  return (
    <motion.div
      key={plan.name}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="relative"
    >
      <Card
        className={`h-full cursor-pointer border transition-all duration-200 ${
          selectedPlan === plan.name
            ? "border-brand/20 bg-brand/10"
            : "border-input hover:border-brand/40"
        }`}
        onClick={() => setSelectedPlan(plan.name)}
      >
        <CardContent className="flex h-full flex-col px-4">
          <div className="space-y-2">
            <motion.div
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 ${
                selectedPlan === plan.name
                  ? "border-brand/20 bg-brand"
                  : "border-gray-300"
              }`}
              animate={selectedPlan === plan.name ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {selectedPlan === plan.name && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="h-3 w-3 text-white" />
                </motion.div>
              )}
            </motion.div>
            <div>
              <div className="flex items-baseline gap-1">
                <motion.div
                  key={`${plan.name}-${billingPeriod}-${currency}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-x-1 text-xl font-bold"
                >
                  <p>{getCurrencySymbol()}</p>
                  <p>{getPrice(plan.monthlyPrice).toLocaleString()}</p>
                </motion.div>
                <p className="text-sm text-gray-500">{getPriceLabel()}</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="mb-2 text-base font-semibold">{plan.name}</h3>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
