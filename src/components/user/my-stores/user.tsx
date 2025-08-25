import { User } from "~/use-cases/types";

import { useNavigate } from "@tanstack/react-router";
import { Loader2, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { signoutUserAction } from "~/lib/auth/functions/signout-user";

interface Props {
  user: User;
}
export default function MyStoreUser({ user }: Props) {
  const [isSignout, setIsSignout] = useState(false);
  const navigate = useNavigate();

  const onSignout = async () => {
    toast.promise(
      (async () => {
        setIsSignout(true);
        await signoutUserAction();
      })(),
      {
        loading: "Signing out...",
        success: "Signed out successfully!",
        error: (error) => (error instanceof Error ? error.message : "Failed to sign out"),
        finally() {
          setIsSignout(false);
          navigate({
            to: "/auth/signin",
          });
        },
        position: "top-center",
      },
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback className="rounded-lg">
            {user.username.charAt(0).toUpperCase() || "CN"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback className="rounded-lg">
                {user.username.charAt(0).toUpperCase() || "CN"}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.username}</span>
              <span className="text-muted-foreground truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer" onClick={() => onSignout()}>
          {isSignout ? <Loader2 className="size-4 animate-spin" /> : <LogOut />}
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
