import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { SigninForm } from "~/components/auth/signin/signin-form";
import VerifyOTPSignin from "~/components/auth/signin/verify-otp-signin";
import { Ecomiq } from "~/components/svgs/ecomiq";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { AuthFormData } from "~/types";

export const Route = createFileRoute("/auth/_auth-layout/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });
  return (
    <div className="flex flex-col gap-6">
      {isOTPSent ? (
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
              <Link to="/">
                <Ecomiq className="mx-auto h-auto w-12" />
              </Link>
              <div>
                <CardTitle className="text-2xl">Verify OTP</CardTitle>
                <CardDescription className="text-base">
                  We sent an OTP to <br />
                  <strong>{formData.email}</strong>. <br />
                  Paste it below to continue.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <VerifyOTPSignin
                setFormData={setFormData}
                formData={formData}
                isOTPSent={isOTPSent}
                setIsOTPSent={setIsOTPSent}
              />
            </CardContent>
          </Card>
        </motion.div>
      ) : (
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
        >
          <Card>
            <CardHeader className="items-center gap-y-3 text-center">
              <Link to="/">
                <Ecomiq className="mx-auto h-auto w-12" />
              </Link>
              <div>
                <CardTitle className="text-2xl">Signin to your account</CardTitle>
                <CardDescription className="text-base">
                  Let's keep your business running.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <SigninForm setFormData={setFormData} setIsOTPSent={setIsOTPSent} />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
