import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordInput } from "~/common/password-input";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { userResetPasswordAction } from "~/lib/auth/functions/user-new-password";
import { AuthForgotPasswordFormData } from "~/types";
import { resetPasswordFormSchema } from "~/types/forms";
import ResendVerificationCodeButton from "./resend-verification-code-btn";

interface Props {
  formData: AuthForgotPasswordFormData;
  setIsResetPassword: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<AuthForgotPasswordFormData>>;
}

export default function ResetPasswordForm({
  formData,
  setFormData,
  setIsResetPassword,
}: Props) {
  const navigate = useNavigate();
  const [isFinishingReset, setIsFinishingReset] = useState(false);
  const [isResendVerificationCode, setIsResendVerificationCode] = useState(false);
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      code: "",
      new_password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
    setIsFinishingReset(false);
    try {
      const res = await userResetPasswordAction({
        data: {
          email: formData.email,
          code: values.code,
          new_password: values.new_password,
        },
      });
      form.reset();
      setIsResetPassword(false);

      setFormData({
        email: "",
        new_password: "",
      });

      toast.success(res?.message, {
        position: "top-center",
      });

      return navigate({
        to: "/auth/signin",
      });
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message, {
          position: "top-center",
        });
      }
    } finally {
      setIsFinishingReset(false);
    }
  }

  const onCancel = () => {
    setIsResetPassword(false);
    setFormData({
      email: "",
      new_password: "",
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <div className="flex w-full items-center justify-between self-start">
                <FormLabel>Verification code</FormLabel>
                <ResendVerificationCodeButton
                  formData={formData}
                  setIsResendVerificationCode={setIsResendVerificationCode}
                  isResendVerificationCode={isResendVerificationCode}
                  isFinishingReset={isFinishingReset}
                />
              </div>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  disabled={isFinishingReset || isResendVerificationCode}
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
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  disabled={isFinishingReset || isResendVerificationCode}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <Button
            type="submit"
            className="bg-brand hover:bg-brand-secondary w-full text-white"
            disabled={isFinishingReset || isResendVerificationCode}
          >
            {isFinishingReset && <Loader2 className="size-4 animate-spin" />}
            Reset password
          </Button>
          <Button
            disabled={isFinishingReset || isResendVerificationCode}
            onClick={() => onCancel()}
            variant={"ghost"}
            className="group w-full"
          >
            <ChevronLeft className="transition-all duration-300 ease-in-out group-hover:-translate-x-2" />
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
