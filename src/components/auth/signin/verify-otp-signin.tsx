import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, InfoIcon, Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { signinUserAction } from "~/lib/auth/functions/signin-user";
import { AuthFormData } from "~/types";
import { codeFormSchema } from "~/types/forms";
import ResendOTPButton from "../shared/resend-otp";

interface Props {
  setFormData: Dispatch<SetStateAction<AuthFormData>>;
  setIsOTPSent: Dispatch<SetStateAction<boolean>>;
  formData: AuthFormData;
  isOTPSent: boolean;
}

export default function VerifyOTPSignin({ setIsOTPSent, formData }: Props) {
  const navigate = useNavigate();
  const [isResendOTPCode, setIsResendingOTPCode] = useState(false);
  const [isVerifyOTP, setIsVerifyOTP] = useState(false);

  const form = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof codeFormSchema>) {
    setIsVerifyOTP(true);
    try {
      const res = await signinUserAction({
        data: {
          ...values,
          ...formData,
        },
      });

      form.reset();
      toast.success(res.message, { position: "top-center" });

      navigate({
        to: "/dashboard",
      });
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message, {
          position: "top-center",
        });
      }
    } finally {
      setIsVerifyOTP(false);
    }
  }

  const onCancel = () => {
    setIsOTPSent(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="mx-auto flex w-full justify-center">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <div className="mx-auto flex w-full justify-center">
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      disabled={isVerifyOTP || isResendOTPCode}
                    >
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
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full items-center justify-between pt-1">
          <p className="text-muted-foreground flex items-center gap-1 text-xs font-medium">
            <InfoIcon className="size-4" />
            Paste the verification code sent to your email
          </p>
          <ResendOTPButton
            setIsResendingOTPCode={setIsResendingOTPCode}
            isResendOTPCode={isResendOTPCode}
            formData={formData}
            type="signin"
            isVerifyOTP={isVerifyOTP}
          />
        </div>
        <div className="space-y-2">
          <Button
            type="submit"
            className="bg-brand hover:bg-brand-secondary w-full text-white"
            disabled={isVerifyOTP || isResendOTPCode}
          >
            {isVerifyOTP && <Loader2 className="size-4 animate-spin" />}
            Verify code
          </Button>
          <Button
            disabled={isVerifyOTP || isResendOTPCode}
            type="button"
            className="w-full"
            variant={"link"}
            onClick={() => onCancel()}
          >
            <ChevronLeft />
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
