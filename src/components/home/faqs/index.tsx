import { motion, Variants } from "motion/react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Badge } from "~/components/ui/badge";
import { faqs as FaqsInitial } from "~/data/faqs";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0.0, 0.2, 1], // easeOut cubic bezier
    },
  },
};

const faqItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1], // easeOut cubic bezier
    },
  },
};

export default function Faqs() {
  const [faqs] = useState(FaqsInitial);

  return (
    <section id="faq" className="relative w-full py-20 lg:py-24">
      {/* Background gradient */}
      <div className="from-background via-background/95 to-background absolute inset-0 bg-gradient-to-b"></div>

      <div className="relative container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 flex flex-col items-center justify-center space-y-6 text-center"
        >
          <motion.div variants={itemVariants}>
            <Badge
              className="rounded-full px-5 py-2 text-sm font-semibold tracking-wide"
              variant="secondary"
            >
              FAQ
            </Badge>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Frequently Asked{" "}
            <span className="from-primary to-primary/80 bg-gradient-to-r bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground max-w-2xl text-lg leading-relaxed sm:text-xl"
          >
            Find answers to common questions about Ecomiq and discover how we can help
            accelerate your business growth.
          </motion.p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto max-w-4xl"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={faq.question} variants={faqItemVariants} className="group">
                <AccordionItem
                  value={`item-${index}`}
                  className="border-border/50 bg-card/30 hover:border-border hover:bg-card/50 data-[state=open]:bg-card/60 overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-300 hover:shadow-lg data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="group-hover:text-foreground/90 data-[state=open]:text-foreground cursor-pointer px-6 py-5 text-left text-lg font-semibold transition-colors hover:no-underline data-[state=open]:pb-3">
                    <span className="flex items-start gap-3">
                      <span className="bg-primary/10 text-primary mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                        {index + 1}
                      </span>
                      <span>{faq.question}</span>
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="px-6 pt-0 pb-6">
                    <div className="text-muted-foreground ml-9 text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.4, 0.0, 0.2, 1], // easeOut cubic bezier
          }}
          className="mt-16 text-center"
        ></motion.div>
      </div>
    </section>
  );
}
