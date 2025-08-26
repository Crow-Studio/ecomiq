import { Icon } from "@iconify/react/dist/iconify.js";
import { ChevronsUpDown, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { StoreWithRole } from "~/data-access/stores";

interface Props {
  stores: StoreWithRole[];
}

export function StoreSwitcher({ stores }: Props) {
  const [activeStore, setActiveStore] = useState(stores[0]);

  if (!activeStore) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center gap-x-2 border-0 outline-none"
        >
          <div className="grid flex-1 text-left text-sm leading-tight">
            <p className="truncate font-medium">{activeStore.name}</p>
          </div>
          <ChevronsUpDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="start"
      >
        <DropdownMenuLabel className="text-muted-foreground text-xs">
          Teams
        </DropdownMenuLabel>
        {stores.map((store, index) => (
          <DropdownMenuItem
            key={store.name}
            onClick={() => setActiveStore(store)}
            className="gap-2 p-2"
          >
            <div className="flex size-6 items-center justify-center rounded-md border">
              <Icon icon="hugeicons:store-02" className="size-3.5 shrink-0" />
            </div>
            {store.name}
            <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 p-2">
          <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
            <Plus className="size-4" />
          </div>
          <div className="text-muted-foreground font-medium">Add store</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
