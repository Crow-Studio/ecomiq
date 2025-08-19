import { Icon } from "@iconify/react";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "~/lib/utils";

type AuthProvider = "google";

interface OauthButtonProps {
  isAuthenticating: boolean;
}

interface OauthButton {
  provider: AuthProvider;
  text: string;
  icon: string;
}

export default function OauthProviders({ isAuthenticating }: OauthButtonProps) {
  const authProviders = useMemo<OauthButton[]>(
    () => [
      {
        provider: "google",
        text: "Continue with Google",
        icon: "devicon:google",
      },
    ],
    [],
  );

  const [isOauthAuthentication, setIsOauthAuthentication] = useState(false);

  const handleOauthLogin = useCallback(
    async (provider: AuthProvider) => {
      if (isAuthenticating || isOauthAuthentication) return;

      setIsOauthAuthentication(true);

      if (provider === "google") {
        window.location.assign("/api/oauth/signin/google");
      }
    },
    [isAuthenticating, isOauthAuthentication],
  );

  useEffect(() => {
    const handleOauthResponse = (event: MessageEvent) => {
      if (event.data === "oauth-success") {
        setIsOauthAuthentication(false);
      } else if (event.data === "oauth-failure") {
        setIsOauthAuthentication(false);
      }
    };

    window.addEventListener("message", handleOauthResponse);

    return () => {
      window.removeEventListener("message", handleOauthResponse);
    };
  });

  return (
    <div className="grid gap-2 overflow-hidden">
      <div className="flex h-[42px] items-center !overflow-hidden">
        {authProviders.map((auth) => {
          const isButtonDisabled = isAuthenticating || isOauthAuthentication;

          return (
            <button
              key={auth.provider}
              className={cn(
                "flex h-[42px] w-full items-center justify-center gap-2 rounded border px-2 text-sm font-medium transition-colors duration-200 hover:border-orange-200 focus:ring-2 focus:ring-orange-200 focus:ring-offset-1 focus:outline-none",
                isButtonDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
              )}
              type="button"
              onClick={() => handleOauthLogin(auth.provider)}
              disabled={isButtonDisabled}
              aria-label={`${auth.text} - OAuth authentication`}
            >
              {isOauthAuthentication ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Icon icon={auth.icon} className="size-4" />
              )}
              {auth.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
