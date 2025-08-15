import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

interface Props {
  setIsResendingOTPCode: Dispatch<SetStateAction<boolean>>;
  isResendOTPCode: boolean;
}

export default function ResendOTPButton({
  setIsResendingOTPCode,
  isResendOTPCode,
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
    startTimer();
    // try { ... } catch {}
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
