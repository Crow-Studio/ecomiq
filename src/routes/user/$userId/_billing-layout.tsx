import { Icon } from "@iconify/react/dist/iconify.js";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Check, CreditCard, CreditCardIcon, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import images, { type CardImages } from "react-payment-inputs/images";
import * as RPNInput from "react-phone-number-input";
import { Ecomiq } from "~/components/svgs/ecomiq";
import { ThemeToggle } from "~/components/theme-toggle";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import MyStoreUser from "~/components/user/my-stores/user";
import CountrySelect from "~/components/user/shared/phone/country-select";
import PhoneFlag from "~/components/user/shared/phone/phone-flags";
import PhoneInput from "~/components/user/shared/phone/phone-input";
import { getAuthenticatedUserFn } from "~/lib/auth/functions/auth";
import { signoutUserAction } from "~/lib/auth/functions/signout-user";

const pricingPlans = [
  {
    name: "Starter",
    monthlyPrice: 37,
    description: "For the new marketer on a budget who just wants basic tracking...",
  },
  {
    name: "Standard",
    monthlyPrice: 77,
    description: "For the new marketer on a budget who just wants basic tracking...",
  },
  {
    name: "Pro",
    monthlyPrice: 150,
    description: "For the new marketer on a budget who just wants basic tracking...",
  },
];

export const Route = createFileRoute("/user/$userId/_billing-layout")({
  component: RouteComponent,
  beforeLoad: async ({ params }) => {
    const { user } = await getAuthenticatedUserFn();

    if (params.userId !== user.id) {
      await signoutUserAction();
      throw redirect({
        to: "/auth/signin",
      });
    }

    return { user };
  },
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps, getCardImageProps } =
    usePaymentInputs();
  const [selectedPlan, setSelectedPlan] = useState("Starter");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [currency, setCurrency] = useState<"USD" | "KES">("USD");
  const [currentStep, setCurrentStep] = useState<"plan" | "payment">("plan");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"card" | "mobile">(
    "card",
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const getCurrencySymbol = () => {
    return currency === "USD" ? "$" : "Ksh";
  };

  const getPrice = (monthlyPrice: number) => {
    let price = monthlyPrice;
    if (billingPeriod === "annual") {
      price = Math.round(monthlyPrice * 12 * 0.8); // 20% discount for annual
    }

    if (currency === "KES") {
      price = Math.round(price * 130); // Convert USD to KES (approximate rate)
    }

    return price;
  };

  const getPriceLabel = () => {
    return billingPeriod === "monthly" ? "/mo." : "/year";
  };

  const handleContinue = () => {
    if (currentStep === "plan") {
      setCurrentStep("payment");
    }
  };

  const handleBack = () => {
    setCurrentStep("plan");
  };

  const handleProceedToPayment = () => {
    // Handle payment processing here
    console.log("Proceeding to payment with:", {
      plan: selectedPlan,
      billingPeriod,
      currency,
      paymentMethod: selectedPaymentMethod,
      phoneNumber,
      cardNumber,
      expiryDate,
      cvv,
      cardholderName,
    });
  };

  const handleSkipPayment = () => {
    // Handle skipping payment setup
    console.log("Skipping payment setup for:", {
      plan: selectedPlan,
      billingPeriod,
      currency,
    });
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
        // ease: [0.42, 0, 1, 1], // cubic-bezier for easeOut
      },
    },
  };
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-3">
      <figure className="pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full bg-orange-100 blur-[200px] dark:bg-orange-400" />
      <figure className="pointer-events-none absolute top-[64px] left-[4vw] z-20 hidden aspect-square w-[32vw] rounded-full bg-orange-100 opacity-50 blur-[100px] md:block dark:bg-orange-600/20" />
      <figure className="pointer-events-none absolute right-[7vw] bottom-[-50px] z-20 hidden aspect-square w-[30vw] rounded-full bg-orange-100 opacity-50 blur-[100px] md:block dark:bg-orange-600/20" />
      <motion.div
        className="bg-card w-full max-w-2xl space-y-3 overflow-hidden rounded-xl shadow-lg"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="space-y-3 px-8 pt-6">
          <div className="flex items-center justify-between">
            <Ecomiq className="h-auto w-9" />
            <div className="flex items-center gap-x-3">
              <ThemeToggle />
              <MyStoreUser user={user} />
            </div>
          </div>
          {currentStep === "plan" ? (
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h1 className="text-center text-2xl font-bold">
                  Select your Ecomiq plan
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Billing Period Tabs */}
                <div className="flex rounded-lg bg-gray-100 p-1">
                  <button
                    type="button"
                    onClick={() => setBillingPeriod("monthly")}
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
                    onClick={() => setBillingPeriod("annual")}
                    className={`relative w-full cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      billingPeriod === "annual"
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

                {/* Currency Selector Dropdown */}
                <Select
                  value={currency}
                  onValueChange={(value: "USD" | "KES") => setCurrency(value)}
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
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-3 pt-4"
            >
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex cursor-pointer items-center gap-2 transition-colors"
                >
                  <Icon icon="hugeicons:arrow-left-01" className="h-4 w-4" />
                  <span className="text-sm uppercase md:text-base">Back</span>
                </button>
                <p className="text-brand text-sm font-medium tracking-wider">
                  STEP 2 OF 2
                </p>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Choose payment method</h1>
                <p className="text-muted-foreground text-xs">
                  Pay securely and cancel any time.
                </p>
              </div>
              <p className="text-sm">
                Selected: {selectedPlan} plan - {getCurrencySymbol()}
                <span className="">
                  {getPrice(
                    pricingPlans.find((p) => p.name === selectedPlan)?.monthlyPrice || 0,
                  ).toLocaleString()}
                  {getPriceLabel()}
                </span>
              </p>
            </motion.div>
          )}
        </motion.div>
        {currentStep === "plan" ? (
          <div className="space-y-3 px-8 pt-6">
            {/* Pricing Cards */}
            <motion.div className="" variants={itemVariants}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {pricingPlans.map((plan, index) => (
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
                            animate={
                              selectedPlan === plan.name
                                ? { scale: [1, 1.1, 1] }
                                : { scale: 1 }
                            }
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
                ))}
              </div>
            </motion.div>
            <Outlet />
            <motion.div className="space-y-2" variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  onClick={handleContinue}
                  className="bg-brand hover:bg-primary-secondary group inline-flex h-max w-full cursor-pointer items-center justify-center rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-white shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(249,129,99,1)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_#F97452_inset] transition-colors duration-300 ease-in-out hover:shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(252,199,185,0.8)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_hsla(0,_0%,_100%,_0.25)_inset] focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:shadow-xs disabled:hover:shadow-xs"
                >
                  Continue
                  <Icon
                    icon="hugeicons:arrow-right-01"
                    className="-ml-1 transition-transform group-hover:translate-x-2"
                  />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-center"
              >
                <Button
                  onClick={() => handleSkipPayment()}
                  variant={"ghost"}
                  type="button"
                  className="w-full"
                >
                  Skip for now
                </Button>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          <motion.div className="space-y-3 px-8" variants={itemVariants}>
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-2 md:gap-4">
                {/* Card Payment */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{ scale: 1.01 }}
                  className="relative"
                >
                  <Card
                    className={`cursor-pointer border transition-all duration-200 ${
                      selectedPaymentMethod === "card"
                        ? "border-brand bg-brand/30"
                        : "border-input hover:border-gray-500"
                    }`}
                    onClick={() => setSelectedPaymentMethod("card")}
                  >
                    <CardContent className="flex items-center gap-x-2">
                      <div className="bg-brand/50 flex h-10 w-10 shrink-0 items-center justify-center self-start rounded-lg">
                        <CreditCard className="text-brand h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Card Payment</h3>
                        <p className="text-muted-foreground text-xs">
                          Pay with credit or debit card
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Mobile Money */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  whileHover={{ scale: 1.01 }}
                  className="relative"
                >
                  <Card
                    className={`cursor-pointer border transition-all duration-200 ${
                      selectedPaymentMethod === "mobile"
                        ? "border-brand bg-brand/30"
                        : "border-input hover:border-gray-500"
                    }`}
                    onClick={() => setSelectedPaymentMethod("mobile")}
                  >
                    <CardContent className="flex items-center gap-x-2">
                      <div className="bg-brand/50 flex h-10 w-10 shrink-0 items-center justify-center self-start rounded-lg">
                        <Smartphone className="text-brand h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Mobile Money</h3>
                        <p className="text-muted-foreground text-xs">Pay with M-PESA</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-3">
              <motion.div
                key={selectedPaymentMethod}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-card border-input rounded-lg border p-4"
              >
                {selectedPaymentMethod === "card" ? (
                  <div className="space-y-2">
                    <div className="*:not-first:mt-2">
                      <Label>Name on card</Label>
                      <Input
                        type="text"
                        required
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                      />
                    </div>
                    <div className="*:not-first:mt-2">
                      <legend className="text-foreground text-sm font-medium">
                        Card Details
                      </legend>
                      <div className="rounded-md shadow-xs">
                        <div className="relative focus-within:z-10">
                          <Input
                            className="peer rounded-b-none pe-9 shadow-none [direction:inherit]"
                            {...getCardNumberProps()}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                            {meta.cardType ? (
                              <svg
                                className="overflow-hidden rounded-sm"
                                {...getCardImageProps({
                                  images: images as unknown as CardImages,
                                })}
                                width={20}
                              />
                            ) : (
                              <CreditCardIcon size={16} aria-hidden="true" />
                            )}
                          </div>
                        </div>
                        <div className="-mt-px flex">
                          <div className="min-w-0 flex-1 focus-within:z-10">
                            <Input
                              className="rounded-e-none rounded-t-none shadow-none [direction:inherit]"
                              {...getExpiryDateProps()}
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                            />
                          </div>
                          <div className="-ms-px min-w-0 flex-1 focus-within:z-10">
                            <Input
                              className="rounded-s-none rounded-t-none shadow-none [direction:inherit]"
                              {...getCVCProps()}
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="*:not-first:mt-2" dir="ltr">
                    <Label>Phone number</Label>
                    <RPNInput.default
                      className="flex rounded-md shadow-xs"
                      international
                      flagComponent={PhoneFlag}
                      countrySelectComponent={CountrySelect}
                      inputComponent={PhoneInput}
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={(newValue) => setPhoneNumber(newValue ?? "")}
                    />
                  </div>
                )}
              </motion.div>
              <motion.div variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    className="bg-brand hover:bg-brand-secondary w-full rounded-md py-3 font-semibold text-white"
                    size="lg"
                    onClick={handleProceedToPayment}
                  >
                    Proceed to Payment
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        <motion.div className="bg-brand/5 border-t px-8 py-4" variants={itemVariants}>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Ecomiq.</p>
            <div className="flex items-center gap-1">
              <Icon icon="hugeicons:security-lock" />
              <p>Secured payment</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
