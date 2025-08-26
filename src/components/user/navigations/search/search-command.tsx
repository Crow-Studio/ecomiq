import { useRouter } from "@tanstack/react-router";
import {
  BarChart3,
  CreditCard,
  Home,
  Megaphone,
  Settings,
  ShoppingCart,
  UserIcon,
  UserPlus,
  Users,
} from "lucide-react";
import { useCallback } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/components/ui/command";
import { StoreWithMembers, User } from "~/use-cases/types";

interface SearchCommandProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  store: StoreWithMembers;
  user: User;
}

export function SearchCommand({ open, setOpen, store, user }: SearchCommandProps) {
  const router = useRouter();

  const runCommand = useCallback(
    (command: () => void) => {
      setOpen(false);
      command();
    },
    [setOpen],
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem
            className="cursor-pointer"
            onSelect={() =>
              runCommand(() =>
                router.navigate({
                  to: "/user/$userId/store/$storeId/dashboard",
                  replace: true,
                  params: {
                    storeId: store.id,
                    userId: user.id,
                  },
                }),
              )
            }
          >
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem
            className="cursor-pointer"
            onSelect={() =>
              runCommand(() =>
                router.navigate({
                  to: "/user/$userId/store/$storeId/products",
                  replace: true,
                  params: {
                    storeId: store.id,
                    userId: user.id,
                  },
                }),
              )
            }
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>Products</span>
          </CommandItem>
          <CommandItem
            className="cursor-pointer"
            onSelect={() =>
              runCommand(() =>
                router.navigate({
                  to: "/user/$userId/store/$storeId/orders",
                  replace: true,
                  params: {
                    storeId: store.id,
                    userId: user.id,
                  },
                }),
              )
            }
          >
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Orders</span>
          </CommandItem>
          <CommandItem
            className="cursor-pointer"
            onSelect={() =>
              runCommand(() =>
                router.navigate({
                  to: "/user/$userId/store/$storeId/customers",
                  replace: true,
                  params: {
                    storeId: store.id,
                    userId: user.id,
                  },
                }),
              )
            }
          >
            <Users className="mr-2 h-4 w-4" />
            <span>Customers</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Tools">
          <CommandItem
            className="cursor-pointer"
            onSelect={() =>
              runCommand(() =>
                router.navigate({
                  to: "/user/$userId/store/$storeId/dashboard",
                  replace: true,
                  params: {
                    storeId: store.id,
                    userId: user.id,
                  },
                }),
              )
            }
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Analytics</span>
          </CommandItem>
          <CommandItem
            className="cursor-pointer"
            onSelect={() =>
              runCommand(() =>
                router.navigate({
                  to: "/user/$userId/store/$storeId/dashboard",
                  replace: true,
                  params: {
                    storeId: store.id,
                    userId: user.id,
                  },
                }),
              )
            }
          >
            <Megaphone className="mr-2 h-4 w-4" />
            <span>Campaign</span>
          </CommandItem>
          <CommandItem
            className="cursor-pointer"
            onSelect={() =>
              runCommand(() =>
                router.navigate({
                  to: "/user/$userId/store/$storeId/dashboard",
                  replace: true,
                  params: {
                    storeId: store.id,
                    userId: user.id,
                  },
                }),
              )
            }
          >
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Team</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Settings">
          <CommandItem
            className="cursor-pointer"
            onSelect={() =>
              runCommand(() =>
                router.navigate({
                  to: "/user/$userId/store/$storeId/dashboard",
                  replace: true,
                  params: {
                    storeId: store.id,
                    userId: user.id,
                  },
                }),
              )
            }
          >
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem
            className="cursor-pointer"
            onSelect={() =>
              runCommand(() =>
                router.navigate({
                  to: "/user/$userId/store/$storeId/dashboard",
                  replace: true,
                  params: {
                    storeId: store.id,
                    userId: user.id,
                  },
                }),
              )
            }
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
