import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "~/lib/utils";

interface Props {
  pathname: string;
}

export default function OrdersSidebar({ pathname }: Props) {
  console.log(pathname);
  return (
    <div className="bg-background border-border w-56 flex-shrink-0 border-r p-4">
      <div className="h-full space-y-2 overflow-y-auto">
        <h3 className="text-xs font-semibold uppercase">Workspace</h3>
        <div>
          <button
            type="button"
            className={cn(
              "text-muted-foreground hover:text-primary flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 transition-colors duration-500 ease-in-out hover:bg-[#f3f4f8] dark:hover:bg-[#171717]",
            )}
          >
            <Icon icon="hugeicons:shopping-cart-02" className="size-5 flex-shrink-0" />
            <p className="text-sm">Orders List</p>
          </button>
          <button
            type="button"
            className={cn(
              "text-muted-foreground hover:text-primary flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 transition-colors duration-500 ease-in-out hover:bg-[#f3f4f8] dark:hover:bg-[#171717]",
            )}
          >
            <Icon icon="hugeicons:shipping-truck-02" className="size-5 flex-shrink-0" />
            <p className="text-sm">Shipment</p>
          </button>
          <button
            type="button"
            className={cn(
              "text-muted-foreground hover:text-primary flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 transition-colors duration-500 ease-in-out hover:bg-[#f3f4f8] dark:hover:bg-[#171717]",
            )}
          >
            <Icon icon="hugeicons:return-request" className="size-5 flex-shrink-0" />
            <p className="text-sm">Return & Refund</p>
          </button>
        </div>
      </div>
    </div>
  );
}
