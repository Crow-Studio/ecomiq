import { Icon } from "@iconify/react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const images = [
  {
    src: "https://cdn.shopify.com/b/shopify-brochure2-assets/890dbeb471a10637528a72179b12bfa9.jpg?originalWidth=575&originalHeight=795&width=400",
    alt: "Analytics Dashboard",
  },
  {
    src: "https://www.freepik.com/free-photo/woman-promoting-cloths-from-thrift-store_80752596.htm#fromView=search&page=1&position=18&uuid=5e39961a-faa1-43f9-bb19-26aaaaf80be4&query=store",
    alt: "Retail Store Setup",
  },
  {
    src: "https://cdn.shopify.com/b/shopify-brochure2-assets/669022e522248e4ab88aeeb1165486d0.jpg?originalWidth=571&originalHeight=744&width=200",
    alt: "Payment Setup",
  },
  {
    src: "https://cdn.shopify.com/b/shopify-brochure2-assets/669022e522248e4ab88aeeb1165486d0.jpg?originalWidth=571&originalHeight=744&width=200",
    alt: "Payment Setup",
  },
];

const steps = [
  { number: "01", title: "Create your store" },
  { number: "02", title: "Add your first product" },
  { number: "03", title: "Customize your store" },
  { number: "04", title: "Set up payments" },
];

export default function SellingSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const handleStepHover = (index: number) => {
    setCurrentImageIndex(index);
    setIsHovered(true);
  };

  const handleStepLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex items-center justify-center bg-black py-20 text-white">
      <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <div className="mb-8 space-y-1.5">
            <h1 className="text-4xl font-light md:text-5xl">Start selling in no time</h1>
            <p>
              Get started in minutes and see the difference our platform can make for your
              business.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative h-96 overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>

            <div className="absolute -right-4 -bottom-4 h-32 w-48 overflow-hidden rounded-xl shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`secondary-${currentImageIndex}`}
                  src={images[(currentImageIndex + 1) % images.length].src}
                  alt={images[(currentImageIndex + 1) % images.length].alt}
                  className="h-full w-full object-cover"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="group flex cursor-pointer items-center space-x-6"
              onMouseEnter={() => handleStepHover(index)}
              onMouseLeave={handleStepLeave}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.2 }}
              style={
                {
                  x: currentImageIndex === index ? 10 : 0
                }
              }
            >
              <div className="flex items-center space-x-4">
                <span
                  className={`font-mono text-2xl transition-colors duration-300 ${
                    currentImageIndex === index ? "text-brand" : "text-brand/40"
                  }`}
                >
                  {step.number}
                </span>
                <div className={cn(
                  'h-px w-16 bg-gray-600 transition-colors duration-300',
                  currentImageIndex === index ? 'bg-brand' : 'group-hover:bg-brand/50'
                )} />
              </div>
              <h3
                className={`text-2xl font-light transition-colors duration-300 md:text-3xl ${
                  currentImageIndex === index ? "text-white" : "text-gray-400"
                }`}
              >
                {step.title}
              </h3>
            </motion.div>
          ))}

          <div className="pt-4">
            <Link to="/">
              <Button className="bg-brand hover:bg-primary-secondary group inline-flex h-max w-fit cursor-pointer items-center justify-center rounded-lg border border-transparent px-8 py-2 text-sm font-medium text-white shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(249,129,99,1)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_#F97452_inset] transition-colors duration-300 ease-in-out hover:translate-y-0.5 hover:shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(252,199,185,0.8)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_hsla(0,_0%,_100%,_0.25)_inset] focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:shadow-xs disabled:hover:shadow-xs">
                Take your shot
                <Icon
                  icon="lucide-arrow-right"
                  className="-rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
