import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { userOTPAction } from "~/lib/auth/functions/user-otp";
import { cn } from "~/lib/utils";
import { AuthFormData } from "~/types";

interface Props {
  setIsResendingOTPCode: Dispatch<SetStateAction<boolean>>;
  isResendOTPCode: boolean;
  formData: AuthFormData;
}

export default function ResendOTPButton({
  setIsResendingOTPCode,
  isResendOTPCode,
  formData,
}: Props) {
  const [timeElapsed, setTimeElapsed] = useState(30);
  const [isStopTimer, setIsStopTimer] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    if (timerRef.current) return;
    setIsStopTimer(true);
    timerRef.current = setInterval(() => {
      setTimeElapsed((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setIsStopTimer(false);
          return 30;
        }
      });
    }, 1000);
  };

  const resendOTPCode = async () => {
    setIsResendingOTPCode(true);
    try {
      const res = await userOTPAction({
        data: formData,
      });
      startTimer();
      toast.success(res?.message, { position: "top-center" });
    } catch (error) {
      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message) as {
            type: string;
            issues: {
              code: string;
              path: string[];
              message: string;
            }[];
          };
          if (errorData.type === "validation") {
            if (errorData.issues.length > 0) {
              const message = errorData.issues[0].message;
              return toast.error(message, {
                position: "top-center",
              });
            }
          } else if (errorData.type === "auth") {
            if (errorData.issues.length > 0) {
              const message = errorData.issues[0].message;
              return toast.error(message, {
                position: "top-center",
              });
            }
          }
        } catch {
          console.log("error");
        }
      }

      toast.error("An error occurred", {
        position: "top-center",
      });
    } finally {
      setIsResendingOTPCode(false);
    }
  };

  return (
    <button
      type="button"
      className={cn(
        "font-medium",
        isResendOTPCode || (timeElapsed > 0 && isStopTimer)
          ? "text-muted-foreground cursor-not-allowed text-xs"
          : "text-brand hover:text-brand-secondary cursor-pointer text-sm",
      )}
      onClick={resendOTPCode}
      disabled={isResendOTPCode || (timeElapsed > 0 && isStopTimer)}
    >
      {isResendOTPCode
        ? "Resending..."
        : isStopTimer
          ? `Resend in ${timeElapsed}s`
          : "Resend"}
    </button>
  );
}
