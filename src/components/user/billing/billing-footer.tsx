import { Icon } from "@iconify/react/dist/iconify.js";
import { motion, Variants } from "motion/react"

interface Props {
  itemVariants: Variants
}

export default function BillingFooter({ itemVariants }: Props) {
  return (
    <motion.div className="bg-brand/5 border-t px-8 py-4" variants={itemVariants}>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Ecomiq.</p>
        <div className="flex items-center gap-1">
          <Icon icon="hugeicons:security-lock" />
          <p>Secured payment</p>
        </div>
      </div>
    </motion.div>
  );
}
