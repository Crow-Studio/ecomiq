import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordInput } from "~/common/password-input";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { signupUserAction } from "~/lib/auth/functions/signup-user";
import { formSchema } from "~/types/forms";
import OauthProviders from "../oauth/oauth-providers";

export function SignupForm() {
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
      const res = await signupUserAction({
        data: values,
      });

      console.log("res", res);
      form.reset();
      toast.success("Success!", { position: "top-center" });
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
            // Handle Zod validation errors
            if (errorData.issues.length > 0) {
              const message = errorData.issues[0].message;
              return toast.error(message, {
                position: "top-center",
              });
            }
          } else if (errorData.type === "auth") {
            // Handle Zod validation errors
            if (errorData.issues.length > 0) {
              const message = errorData.issues[0].message;
              return toast.error(message, {
                position: "top-center",
              });
            }
          }
        } catch {
          // Not a JSON error, handle as regular error
          console.log("error");
        }
      }

      toast.error("An error occurred", {
        position: "top-center",
      });
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
              Create account
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
          Already have an account?
          <Link
            to="/auth/signin"
            className="ml-1 underline decoration-wavy underline-offset-2"
          >
            Sign in
          </Link>
          .
        </div>
      </form>
    </Form>
  );
}
