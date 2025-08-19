import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordInput } from "~/common/password-input";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { userOTPAction } from "~/lib/auth/functions/user-otp";
import { AuthFormData } from "~/types";
import { formSchema } from "~/types/forms";
import OauthProviders from "../oauth/oauth-providers";

interface Props {
  setFormData: Dispatch<SetStateAction<AuthFormData>>;
  setIsOTPSent: Dispatch<SetStateAction<boolean>>;
}

export function SignupForm({ setFormData, setIsOTPSent }: Props) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsAuthenticating(true);
    try {
      const res = await userOTPAction({
        data: values,
      });
      form.reset();
      setFormData((prev) => ({
        ...prev,
        email: values.email,
        password: values.password,
      }));
      setIsOTPSent(true);
      toast.success(res?.message, { position: "top-center" });
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message, {
          position: "top-center",
        });
      }
    } finally {
      setIsAuthenticating(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex flex-col gap-y-3.5">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="m@example.com"
                      disabled={isAuthenticating}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} disabled={isAuthenticating} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Button
              disabled={isAuthenticating}
              type="submit"
              className="bg-brand hover:bg-brand-secondary w-full gap-x-2 text-white"
            >
              {isAuthenticating && <Loader2 className="size-4 animate-spin" />}
              Create Ecomiq account
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <hr className="w-full" />
            <p className="mx-3 shrink-0 text-center text-sm">or</p>
            <hr className="w-full" />
          </div>
          <OauthProviders isAuthenticating={isAuthenticating} />
        </div>
        <div className="flex items-center justify-center text-center text-sm">
          <p>Already have an Ecomiq account?</p>
          <Link
            to="/auth/signin"
            className="text-brand hover:text-brand-secondary group ml-1 flex items-center gap-x-1"
          >
            Sign in
            <Icon
              icon="hugeicons:arrow-right-02"
              className="size-4 transition-all duration-300 ease-in-out group-hover:translate-x-1.5"
            />
          </Link>
        </div>
      </form>
    </Form>
  );
}
