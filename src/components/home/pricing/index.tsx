// Ecomiq Pricing - Africa-friendly

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Pricing() {
  return (
    <section id="pricing" className="bg-muted/30 relative w-full overflow-hidden py-10">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)] bg-[size:4rem_4rem] dark:bg-black dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]"></div>

      <div className="relative container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-center justify-center space-y-4 text-center"
        >
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium"
            variant="secondary"
          >
            Pricing
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Affordable Plans for Every Seller
          </h2>
          <p className="text-muted-foreground max-w-[800px] md:text-lg">
            Build, manage, and grow your online store with Ecomiq. All plans come with a
            14-day free trial.
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <Tabs defaultValue="monthly" className="w-full">
            <div className="mb-8 flex justify-center">
              <TabsList className="rounded-full p-1">
                <TabsTrigger value="monthly" className="cursor-pointer rounded-full px-6">
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="annually"
                  className="cursor-pointer rounded-full px-6"
                >
                  Annually (Save 20%)
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Monthly Plans */}
            <TabsContent value="monthly">
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                {[
                  {
                    name: "Starter",
                    price: "$9",
                    description: "For individuals starting their first online store.",
                    features: [
                      "1 store",
                      "Unlimited products",
                      "Local payment integrations",
                      "Basic inventory management",
                      "Basic analytics",
                      "Email support",
                    ],
                    cta: "Start Free Trial",
                  },
                  {
                    name: "Growth",
                    price: "$19",
                    description: "Best for growing businesses with more orders.",
                    features: [
                      "Up to 3 stores",
                      "Unlimited products",
                      "Local & international payments",
                      "Advanced inventory & order tracking",
                      "Discount codes & coupons",
                      "Priority email support",
                      "Analytics dashboard",
                    ],
                    cta: "Start Free Trial",
                    popular: true,
                  },
                  {
                    name: "Enterprise",
                    price: "$49",
                    description: "For large-scale sellers with high traffic.",
                    features: [
                      "Unlimited stores",
                      "Advanced analytics & reports",
                      "Custom checkout experience",
                      "API & custom integrations",
                      "Dedicated account manager",
                      "24/7 priority support",
                    ],
                    cta: "Contact Sales",
                  },
                ].map((plan, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card
                      className={`relative h-full overflow-hidden ${
                        plan.popular
                          ? "border-primary shadow-lg"
                          : "border-border/40 shadow-md"
                      } from-background to-muted/10 bg-gradient-to-b backdrop-blur`}
                    >
                      {plan.popular && (
                        <div className="bg-primary text-primary-foreground absolute top-0 right-0 rounded-bl-lg px-3 py-1 text-xs font-medium">
                          Most Popular
                        </div>
                      )}
                      <CardContent className="flex h-full flex-col p-6">
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <div className="mt-4 flex items-baseline">
                          <span className="text-4xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground ml-1">/month</span>
                        </div>
                        <p className="text-muted-foreground mt-2">{plan.description}</p>
                        <ul className="my-6 flex-grow space-y-3">
                          {plan.features.map((feature, j) => (
                            <li key={j} className="flex items-center">
                              <Check className="text-primary mr-2 size-4" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={`mt-auto w-full rounded-full ${
                            plan.popular
                              ? "bg-primary hover:bg-primary/90"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          {plan.cta}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Annual Plans */}
            <TabsContent value="annually">
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                {[
                  {
                    name: "Starter",
                    price: "$7",
                    description: "For individuals starting their first online store.",
                    features: [
                      "1 store",
                      "Unlimited products",
                      "Local payment integrations",
                      "Basic inventory management",
                      "Basic analytics",
                      "Email support",
                    ],
                    cta: "Start Free Trial",
                  },
                  {
                    name: "Growth",
                    price: "$15",
                    description: "Best for growing businesses with more orders.",
                    features: [
                      "Up to 3 stores",
                      "Unlimited products",
                      "Local & international payments",
                      "Advanced inventory & order tracking",
                      "Discount codes & coupons",
                      "Priority email support",
                      "Analytics dashboard",
                    ],
                    cta: "Start Free Trial",
                    popular: true,
                  },
                  {
                    name: "Enterprise",
                    price: "$39",
                    description: "For large-scale sellers with high traffic.",
                    features: [
                      "Unlimited stores",
                      "Advanced analytics & reports",
                      "Custom checkout experience",
                      "API & custom integrations",
                      "Dedicated account manager",
                      "24/7 priority support",
                    ],
                    cta: "Contact Sales",
                  },
                ].map((plan, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card
                      className={`relative h-full overflow-hidden ${
                        plan.popular
                          ? "border-primary shadow-lg"
                          : "border-border/40 shadow-md"
                      } from-background to-muted/10 bg-gradient-to-b backdrop-blur`}
                    >
                      {plan.popular && (
                        <div className="bg-primary text-primary-foreground absolute top-0 right-0 rounded-bl-lg px-3 py-1 text-xs font-medium">
                          Most Popular
                        </div>
                      )}
                      <CardContent className="flex h-full flex-col p-6">
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <div className="mt-4 flex items-baseline">
                          <span className="text-4xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground ml-1">/month</span>
                        </div>
                        <p className="text-muted-foreground mt-2">{plan.description}</p>
                        <ul className="my-6 flex-grow space-y-3">
                          {plan.features.map((feature, j) => (
                            <li key={j} className="flex items-center">
                              <Check className="text-primary mr-2 size-4" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={`mt-auto w-full rounded-full ${
                            plan.popular
                              ? "bg-primary hover:bg-primary/90"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          {plan.cta}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
