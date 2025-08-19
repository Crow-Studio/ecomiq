import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useState } from "react";
import { Button } from "~/components/ui/button";
import StoreName from "~/components/user/onboarding/store-name";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/user/$userId/_onboarding-layout/onboarding")({
  component: RouteComponent,
});

interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
  content: ReactNode;
}

function RouteComponent() {
  const steps: OnboardingStep[] = [
    {
      id: "business-size",
      title: "What size is your business?",
      subtitle: "Select one to get tailored support. We won't share this with anyone.",
      content: <StoreName />,
    },
    {
      id: "business-sie",
      title: "What size is your business?",
      subtitle: "Select one to get tailored support. We won't share this with anyone.",
      content: <StoreName />,
    },
    {
      id: "business-siz",
      title: "What sze is your business?",
      subtitle: "Select one to get tailored support. We won't share this with anyone.",
      content: <StoreName />,
    },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };
  const handleComplete = () => {
    console.log("Onboarding completed!");
    // Handle completion logic here
  };
  return (
    <div className="relative w-full max-w-4xl">
      <div className="absolute inset-0 translate-x-1 translate-y-2 transform rounded-2xl bg-white shadow-sm" />
      <div className="absolute inset-0 translate-x-0.5 translate-y-1 transform rounded-2xl bg-white shadow-sm" />

      {/* Main card container */}
      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="rounded-2xl bg-white p-8 shadow-lg md:p-12"
          >
            {/* Step indicators */}
            <div className="mb-8 flex justify-center space-x-2">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={`h-1 w-6 rounded-full transition-colors duration-300 ${
                    index <= currentStep ? "bg-gray-900" : "bg-gray-300"
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{
                    scale: index === currentStep ? 1.2 : 1,
                    backgroundColor: index <= currentStep ? "#111827" : "#d1d5db",
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            <div className="mb-8">
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600">{steps[currentStep].subtitle}</p>
            </div>

            {/* Dynamic content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="mb-12"
            >
              {steps[currentStep].content}
            </motion.div>

            <div
              className={cn(
                "flex items-center",
                currentStep > 0 ? "justify-between" : "justify-end",
              )}
            >
              {currentStep > 0 && (
                <Button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="bg-brand hover:bg-primary-secondary group inline-flex h-max w-fit cursor-pointer items-center justify-center rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-white shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(249,129,99,1)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_#F97452_inset] transition-colors duration-300 ease-in-out hover:translate-y-0.5 hover:shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(252,199,185,0.8)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_hsla(0,_0%,_100%,_0.25)_inset] focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:shadow-xs disabled:hover:shadow-xs"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
              )}

              <Button
                onClick={handleNext}
                className="bg-brand hover:bg-primary-secondary group inline-flex h-max w-fit cursor-pointer items-center justify-center rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-white shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(249,129,99,1)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_#F97452_inset] transition-colors duration-300 ease-in-out hover:translate-y-0.5 hover:shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(252,199,185,0.8)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_hsla(0,_0%,_100%,_0.25)_inset] focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:shadow-xs disabled:hover:shadow-xs"
              >
                <span>{currentStep === steps.length - 1 ? "Complete" : "Next"}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
