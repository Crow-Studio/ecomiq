import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { StoreWithRole } from "~/data-access/stores";

interface Props {
  stores: StoreWithRole[];
}

export default function UserStores({ stores }: Props) {
  console.log(stores);
  return (
    <div>
      <motion.div
        className="hover:bg-accent flex cursor-pointer items-center gap-x-3 rounded-xl border p-3"
        whileHover="hover"
        initial="initial"
      >
        <Avatar className="size-12 rounded-xl">
          <AvatarImage src={`https://avatar.vercel.sh/vercel.svg?text=MS`} />
          <AvatarFallback className="rounded-xl">CN</AvatarFallback>
        </Avatar>
        <motion.div
          variants={{
            initial: { x: 0 },
            hover: { x: 2 },
          }}
          className="flex w-full items-center justify-between"
        >
          <motion.div
            variants={{
              initial: { x: 0 },
              hover: { x: 2 },
            }}
          >
            <h2 className="text-sm font-semibold">My Store</h2>
            <p className="text-muted-foreground text-xs">yq1cpg-wh.ecomiqshop.com</p>
          </motion.div>
          <motion.div
            variants={{
              initial: { opacity: 0, x: -10 },
              hover: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.2 }}
          >
            <Icon icon="hugeicons:arrow-right-01" className="size-8" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
