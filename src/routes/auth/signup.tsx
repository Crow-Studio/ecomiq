import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { SignupForm } from "~/components/auth/signup/signup-form";
import VerifyOTPSignup from "~/components/auth/signup/verify-otp-signup";
import { Ecomiq } from "~/components/svgs/ecomiq";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { AuthFormData } from "~/types";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isVerifyOTP] = useState(true);
  const [formData] = useState<AuthFormData>({
    email: "thecodingmontana@gmail.com",
    otp: "",
    password: "",
  });

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeIn",
      }}
      className="flex flex-col gap-6"
    >
      {isVerifyOTP ? (
        <Card>
          <CardHeader className="items-center gap-y-3 text-center">
            <Link to="/">
              <Ecomiq className="mx-auto h-auto w-12" />
            </Link>
            <div>
              <CardTitle className="text-2xl">Verify OTP</CardTitle>
              <CardDescription className="text-base">
                We sent an OTP to <br />
                <strong>{formData.email}</strong>. <br />
                Enter it below to continue.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <VerifyOTPSignup />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="items-center gap-y-3 text-center">
            <Link to="/">
              <Ecomiq className="mx-auto h-auto w-12" />
            </Link>
            <div>
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription className="text-base">
                Let's get started with your 30 day free trial
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
