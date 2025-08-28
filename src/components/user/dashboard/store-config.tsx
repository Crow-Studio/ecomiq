import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "motion/react";
import UpgradePlan from "./upgrade-plan";

export default function StoreConfigurations() {
  const items = [
    {
      title: "Add business details",
      description: "Set up your store name, description, and contact information",
    },
    {
      title: "Add at least 2 product categories",
      description: "Organize your products into categories for better navigation",
    },
    {
      title: "Add at least 5 products",
      description: "Upload your first products with images and descriptions",
    },
    {
      title: "Design your e-commerce store (optional)",
      description: "Personalize your store's appearance, colors, and branding",
    },
  ];

  return (
    <motion.div
      className="mx-auto mt-10 max-w-xl space-y-3"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <motion.div
        variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
      >
        <UpgradePlan />
      </motion.div>

      <motion.div className="space-y-4" variants={{ hidden: {}, visible: {} }}>
        <motion.div
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
        >
          <h2 className="text-xl font-medium">
            Setup your store and start selling online.
          </h2>
          <p className="text-muted-foreground text-xs">
            Complete these steps to get your store ready for customers
          </p>
        </motion.div>

        <motion.div
          className="bg-app-sidebar space-y-3 overflow-clip rounded-md"
          variants={{ hidden: {}, visible: {} }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 * index }}
              className="group px-5 py-1 hover:bg-[#f1f2f5] dark:hover:bg-[#313131]"
            >
              <motion.div
                whileHover={{ x: 4 }}
                className="text-muted-foreground flex cursor-pointer items-center justify-between"
              >
                <div className="flex items-start gap-x-2">
                  <Icon
                    icon="hugeicons:square"
                    className="group-hover:text-primary mt-0.5 size-5 self-start"
                  />
                  <div>
                    <h3 className="group-hover:text-primary">{item.title}</h3>
                    <p className="text-xs">{item.description}</p>
                  </div>
                </div>
                <Icon
                  icon="hugeicons:arrow-right-01"
                  className="group-hover:text-primary mt-0.5 size-8 self-start"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
