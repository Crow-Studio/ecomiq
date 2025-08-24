import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { StoreWithRole } from "~/data-access/stores";
import { capitalize } from "~/lib/utils";
import { User } from "~/use-cases/types";

interface Props {
  stores: StoreWithRole[];
  user: User;
}

export default function UserStores({ stores, user }: Props) {
  return (
    <div className="grid gap-y-2">
      {stores.map((store) => (
        <Link
          to="/user/$userId/store/$storeId/dashboard"
          key={store.id}
          params={{
            storeId: store.id,
            userId: user.id,
          }}
        >
          <motion.div
            className="hover:bg-accent flex cursor-pointer items-center gap-x-3 rounded-xl border p-3"
            whileHover="hover"
            initial="initial"
          >
            <Avatar className="size-12 rounded-xl">
              <AvatarImage
                src={`https://avatar.vercel.sh/vercel.svg?text=${capitalize(store.name.charAt(0))}`}
              />
              <AvatarFallback className="rounded-xl">
                {store.name.charAt(0)}
              </AvatarFallback>
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
                <h2 className="text-sm font-semibold capitalize">{store.name}</h2>
                <p className="text-muted-foreground text-xs">{store.url}</p>
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
        </Link>
      ))}
    </div>
  );
}
