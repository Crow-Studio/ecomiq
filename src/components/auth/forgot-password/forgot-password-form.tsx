import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { AtSignIcon, Loader2 } from "lucide-react";
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
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { userForgotPasswordOTPAction } from "~/lib/auth/functions/user-forgot-password-otp";
import { AuthForgotPasswordFormData } from "~/types";
import { forgotPasswordFormSchema } from "~/types/forms";

interface Props {
  setIsResetPassword: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<AuthForgotPasswordFormData>>;
}

export default function ForgotPasswordForm({ setIsResetPassword, setFormData }: Props) {
  const navigate = useNavigate();
  const [isSendingVerificationCode, setIsSendingVerificationCode] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>) {
    setIsSendingVerificationCode(true);
    try {
      const res = await userForgotPasswordOTPAction({
        data: values,
      });
      form.reset();
      setIsResetPassword(true);
      setFormData((prev) => ({
        ...prev,
        email: values.email,
      }));
      toast.success(res?.message, { position: "top-center" });
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message, {
          position: "top-center",
        });
      }
    } finally {
      setIsSendingVerificationCode(false);
    }
  }

  const onCancel = () => {
    return navigate({
      to: "/auth/signin",
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    className="peer ps-9"
                    placeholder="johndoe@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <AtSignIcon size={16} aria-hidden="true" />
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2.5">
          <Button
            disabled={isSendingVerificationCode}
            className="bg-brand hover:bg-brand-secondary w-full text-white"
            type="submit"
          >
            {isSendingVerificationCode && <Loader2 className="size-4 animate-spin" />}
            Continue
          </Button>
          <div className="flex items-center justify-center gap-x-1 text-sm">
            <p>Do I remember 🤔?</p>
            <button
              onClick={() => onCancel()}
              disabled={isSendingVerificationCode}
              type="button"
              className="cursor-pointer p-0 text-sm underline decoration-wavy"
            >
              Sign in
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}
