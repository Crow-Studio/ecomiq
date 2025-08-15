import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { signoutUserAction } from "~/lib/auth/functions/signout-user";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  const [isSignout, setIsSignout] = useState(false);
  const navigate = useNavigate();

  const onSignout = async () => {
    try {
      setIsSignout(true);
      await signoutUserAction();

      navigate({
        to: "/auth/signin",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          position: "top-center",
        });
      }
    } finally {
      setIsSignout(false);
    }
  };
  return (
    <div className="flex flex-col items-center gap-1">
      Dashboard index page
      <pre className="bg-card text-card-foreground rounded-md border p-1">
        routes/dashboard/index.tsx
      </pre>
      <button
        onClick={() => onSignout()}
        type="button"
        className="flex items-center gap-x-2"
        disabled={isSignout}
      >
        {isSignout && <Loader2 className="size-4 animate-spin" />}
        Signout
      </button>
    </div>
  );
}
