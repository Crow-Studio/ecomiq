import { Link } from "@tanstack/react-router";
import { ChevronLeft, InfoIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import ResendOTPButton from "../shared/resend-otp";

export default function VerifyOTPSignup() {
  return (
    <div className="space-y-3">
      <div className="mx-auto flex w-full justify-center">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="flex w-full items-center justify-between pt-1">
        <p className="text-muted-foreground flex items-center gap-1 text-xs font-medium">
          <InfoIcon className="size-4" />
          Paste the OTP sent to your email
        </p>
        <ResendOTPButton />
        {/* <ResendCodeButton
              :email="props?.email"
              :api-url="apiUrl"
              :set-is-resending-code="setIsResendingCode"
              :is-resend-code="isResendCode"
            /> */}
      </div>
      <div className="space-y-2">
        <Button className="w-full">Verify OTP</Button>
        <Link to="/auth/signup">
          <Button className="w-full" variant={"link"}>
            <ChevronLeft />
            Back to Signup
          </Button>
        </Link>
      </div>
    </div>
  );
}
