import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { monthlyPlans } from "~/data/plans";

export default function MonthlyPlan() {
  const [plans] = useState(monthlyPlans);
  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
      {plans.map((plan, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <Card
            className={`relative h-full overflow-hidden ${
              plan.popular ? "border-primary shadow-lg" : "border-border/40 shadow-md"
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
  );
}
