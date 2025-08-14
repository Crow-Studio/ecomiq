import { Icon } from "@iconify/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import authClient from "~/lib/auth/auth-client";
import { cn } from "~/lib/utils";

type AuthProvider = "google";

interface OauthButtonProps {
  isAuthenticating: boolean;
}

interface OauthButton {
  provider: AuthProvider;
  text: string;
}

export default function OauthProviders({ isAuthenticating }: OauthButtonProps) {
  const [auth_providers] = useState<OauthButton[]>([
    {
      provider: "google",
      text: "Continue with Google",
    },
  ]);

  const [isOauthAuthentication, setIsOauthAthentication] = useState(false);
  const handleOauthLogin = async (provider: AuthProvider) => {
    setIsOauthAthentication(true);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message, {
          position: "top-center",
        });
      }
      return toast.error("Login failed", {
        position: "top-center",
      });
    } finally {
      setIsOauthAthentication(false);
    }
  };
  return (
    <div className="grid gap-2 overflow-hidden">
      <div className="flex h-[42px] items-center !overflow-hidden">
        {auth_providers.map((auth) => (
          <button
            key={auth.provider}
            className={cn(
              "flex h-[42px] w-full items-center justify-center gap-2 rounded border px-2 text-sm font-medium duration-300 hover:border-orange-200",
              isAuthenticating ? "cursor-not-allowed" : "cursor-pointer",
            )}
            type="button"
            onClick={() => handleOauthLogin(auth.provider)}
            disabled={isAuthenticating}
          >
            {isAuthenticating && isOauthAuthentication ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Icon icon="devicon:google" className="size-4" />
            )}
            Continue with Google
          </button>
        ))}
      </div>
    </div>
  );
}
