import { createFileRoute } from "@tanstack/react-router";
import { isBefore } from "date-fns";
import { motion } from "motion/react";
import { useState } from "react";
import BillingActionButtons from "~/components/user/billing/billing-action-buttons";
import BillingFooter from "~/components/user/billing/billing-footer";
import BillingHeader from "~/components/user/billing/billing-header";
import BillingPlan from "~/components/user/billing/billing-plan";
import { pricingPlans } from "~/data/plans";
import { BillingCyleEnum, CurrencyEnum, SubscriptionPlanEnum } from "~/lib/db/schema";
import { seo } from "~/lib/seo";
import { storeLimits } from "~/utils/stores";

export const Route = createFileRoute("/user/$userId/_billing-layout/billing")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: `Ecomiq - Billing`,
        description: `Ecomiq is a powerful all-in-one ecommerce platform built for store owners of all skill levels—manage orders, inventory, marketing, and customers with ease.`,
      }),
    ],
  }),
});

function RouteComponent() {
  const { user, subscription, stores } = Route.useRouteContext();

  const isSubscriptionExpired =
    subscription &&
    subscription.current_period_end &&
    isBefore(subscription.current_period_end, new Date());
  const totalStores = stores.length;
  const allowedStores =
    storeLimits[subscription?.subscription_plan ?? SubscriptionPlanEnum.TRIAL] ?? 0;
  const hasExceededStoreLimit = totalStores >= allowedStores;

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanEnum>(
    SubscriptionPlanEnum.STARTER,
  );
  const [billingPeriod, setBillingPeriod] = useState<BillingCyleEnum>(
    BillingCyleEnum.MONTHLY,
  );
  const [currency, setCurrency] = useState<CurrencyEnum>(CurrencyEnum.KES);

  const getPrice = (monthlyPrice: number) => {
    let price = monthlyPrice;
    if (billingPeriod === BillingCyleEnum.YEARLY) {
      price = Math.round(monthlyPrice * 12 * 0.8);
    }

    if (currency === CurrencyEnum.KES) {
      price = Math.round(price * 130);
    }

    return price;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <motion.div
      className="bg-card w-full max-w-2xl space-y-3 overflow-hidden rounded-xl shadow-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <BillingHeader
        billingPeriod={billingPeriod}
        currency={currency}
        itemVariants={itemVariants}
        setBillingPeriod={setBillingPeriod}
        setCurrency={setCurrency}
        user={user}
        isSubscriptionExpired={isSubscriptionExpired}
        hasExceededStoreLimit={hasExceededStoreLimit}
      />
      <div className="space-y-3 px-8 pt-6">
        <motion.div className="" variants={itemVariants}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <BillingPlan
                plan={plan}
                index={index}
                currency={currency}
                billingPeriod={billingPeriod}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                key={plan.name}
                getPrice={getPrice}
              />
            ))}
          </div>
        </motion.div>
        <BillingActionButtons
          itemVariants={itemVariants}
          isSubscriptionExpired={isSubscriptionExpired}
          billingPeriod={billingPeriod}
          currency={currency}
          selectedPlan={selectedPlan}
          plans={pricingPlans}
          getPrice={getPrice}
          user={user}
          hasExceededStoreLimit={hasExceededStoreLimit}
        />
      </div>
      <BillingFooter itemVariants={itemVariants} />
    </motion.div>
  );
}
