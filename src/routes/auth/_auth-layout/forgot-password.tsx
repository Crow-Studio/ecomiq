import { Icon } from "@iconify/react/dist/iconify.js";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import ForgotPasswordForm from "~/components/auth/forgot-password/forgot-password-form";
import ResetPasswordForm from "~/components/auth/forgot-password/reset-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { seo } from "~/lib/seo";
import { AuthForgotPasswordFormData } from "~/types";

export const Route = createFileRoute("/auth/_auth-layout/forgot-password")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Ecomiq - Forgot Password",
        description: `A powerful all-in-one ecommerce platform built for store owners of all skill levels—manage orders, inventory, marketing, and customers with ease.`,
      }),
    ],
  }),
});

function RouteComponent() {
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [formData, setFormData] = useState<AuthForgotPasswordFormData>({
    email: "",
    new_password: "",
  });
  return (
    <div className="flex flex-col gap-6">
      {isResetPassword ? (
        <motion.div
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeIn",
          }}
        >
          <Card>
            <CardHeader className="items-center gap-y-3 text-center">
              <div className="flex items-center justify-center">
                <div className="bg-brand/20 text-brand grid size-16 place-content-center rounded-full p-2">
                  <Icon icon="hugeicons:reset-password" className="size-10" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl">Set a new password</CardTitle>
                <CardDescription className="text-sm text-balance">
                  Paste the verification code we sent to your email and set a new
                  password.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="-mt-2.5">
              <ResetPasswordForm
                formData={formData}
                setIsResetPassword={setIsResetPassword}
                setFormData={setFormData}
              />
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeIn",
          }}
        >
          <Card>
            <CardHeader className="items-center gap-y-3 text-center">
              <div className="flex items-center justify-center">
                <div className="bg-brand/20 text-brand grid size-16 place-content-center rounded-full p-2">
                  <Icon icon="hugeicons:forgot-password" className="size-10" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl">Forgot password?</CardTitle>
                <CardDescription className="text-sm text-balance">
                  No worries we'll send you reset instructions to your email.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="-mt-2.5">
              <ForgotPasswordForm
                setIsResetPassword={setIsResetPassword}
                setFormData={setFormData}
              />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
