import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "~/lib/utils";

interface Props {
  pathname: string;
}

export default function ProductsSidebar({ pathname }: Props) {
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
            <Icon icon="hugeicons:shopping-basket-02" className="size-5 flex-shrink-0" />
            <p className="text-sm">Physical</p>
          </button>
          <button
            type="button"
            className={cn(
              "text-muted-foreground hover:text-primary flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 transition-colors duration-500 ease-in-out hover:bg-[#f3f4f8] dark:hover:bg-[#171717]",
            )}
          >
            <Icon icon="hugeicons:cloud-upload" className="size-5 flex-shrink-0" />
            <p className="text-sm">Digital</p>
          </button>
          <button
            type="button"
            className={cn(
              "text-muted-foreground hover:text-primary flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 transition-colors duration-500 ease-in-out hover:bg-[#f3f4f8] dark:hover:bg-[#171717]",
            )}
          >
            <Icon icon="hugeicons:software" className="size-5 flex-shrink-0" />
            <p className="text-sm">License Keys</p>
          </button>
        </div>
      </div>
    </div>
  );
}
