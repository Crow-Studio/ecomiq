import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
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
import { Input } from "~/components/ui/input";
import { userOTPAction } from "~/lib/auth/functions/user-otp";
import { AuthFormData } from "~/types";
import { formSchema } from "~/types/forms";
import OauthProviders from "../oauth/oauth-providers";

interface Props {
  setFormData: Dispatch<SetStateAction<AuthFormData>>;
  setIsOTPSent: Dispatch<SetStateAction<boolean>>;
}

export function SigninForm({ setFormData, setIsOTPSent }: Props) {
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
        <div className="flex flex-col gap-3">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-3">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="m@example.com"
                      disabled={isAuthenticating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-3">
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <FormControl>
                    <PasswordInput {...field} disabled={isAuthenticating} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Button
              disabled={isAuthenticating}
              type="submit"
              className="bg-brand hover:bg-brand-secondary w-full gap-1.5 text-white"
            >
              {isAuthenticating && <Loader2 className="size-4 animate-spin" />}
              Signin
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
        <div className="text-center text-sm">
          Don't have an account?
          <Link
            to="/auth/signup"
            className="ml-1 underline decoration-wavy underline-offset-2"
          >
            Sign up
          </Link>
          .
        </div>
      </form>
    </Form>
  );
}
