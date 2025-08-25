import { motion, Variants } from "motion/react";
import { Dispatch, SetStateAction } from "react";
import { Ecomiq } from "~/components/svgs/ecomiq";
import { ThemeToggle } from "~/components/theme-toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { BillingCyleEnum, CurrencyEnum } from "~/lib/db/schema";
import { User } from "~/use-cases/types";
import MyStoreUser from "../my-stores/user";

interface Props {
  user: User;
  setBillingPeriod: Dispatch<SetStateAction<BillingCyleEnum>>;
  billingPeriod: BillingCyleEnum;
  setCurrency: Dispatch<SetStateAction<CurrencyEnum>>;
  currency: CurrencyEnum;
  itemVariants: Variants;
  isSubscriptionExpired: boolean | undefined;
  hasExceededStoreLimit: boolean;
}

export default function BillingHeader({
  user,
  setBillingPeriod,
  billingPeriod,
  currency,
  setCurrency,
  itemVariants,
  isSubscriptionExpired,
  hasExceededStoreLimit,
}: Props) {
  return (
    <motion.div variants={itemVariants} className="space-y-3 px-8 pt-6">
      <div className="flex items-center justify-between">
        <Ecomiq className="h-auto w-9" />
        <div className="flex items-center gap-x-3">
          <ThemeToggle />
          <MyStoreUser user={user} />
        </div>
      </div>
      <div className="space-y-4">
        {!isSubscriptionExpired && hasExceededStoreLimit && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-muted-foreground mx-auto flex w-full max-w-md items-center gap-x-3"
          >
            <p className="text-center text-sm text-balance">
              You’ve reached the maximum number of stores creation for your plan. Please
              upgrade or renew to continue.
            </p>
          </motion.div>
        )}
        {isSubscriptionExpired && !hasExceededStoreLimit && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-muted-foreground mx-auto flex w-full max-w-md items-center gap-x-3"
          >
            <p className="text-center text-sm text-balance">
              Your subscription has expired. Please upgrade or renew to continue.
            </p>
          </motion.div>
        )}
        {isSubscriptionExpired && hasExceededStoreLimit && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-muted-foreground mx-auto flex w-full max-w-md items-center gap-x-3"
          >
            <p className="text-center text-sm text-balance">
              Your subscription has expired and you’ve reached the maximum number of
              stores creation for your plan. Please upgrade or renew to continue.
            </p>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-center text-2xl font-bold">Select your Ecomiq plan</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => setBillingPeriod(BillingCyleEnum.MONTHLY)}
              className={`w-full cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                billingPeriod === "monthly"
                  ? "bg-brand text-white shadow-sm"
                  : "text-muted-foreground hover:text-black"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingPeriod(BillingCyleEnum.YEARLY)}
              className={`relative w-full cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                billingPeriod === BillingCyleEnum.YEARLY
                  ? "bg-brand text-white shadow-sm"
                  : "text-muted-foreground hover:text-black"
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-3 rounded-full bg-black px-1.5 py-0.5 text-xs text-white">
                20% off
              </span>
            </button>
          </div>
          <Select
            value={currency}
            onValueChange={(value: CurrencyEnum) => setCurrency(value)}
          >
            <SelectTrigger className="w-full cursor-pointer sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-pointer" value="USD">
                USD ($)
              </SelectItem>
              <SelectItem className="cursor-pointer" value="KES">
                KES (Ksh)
              </SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </div>
    </motion.div>
  );
}
