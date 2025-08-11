import { Link } from "@tanstack/react-router";
import { Ecomiq } from "~/components/svgs/ecomiq";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import OauthProviders from "../oauth/oauth-providers";
import { motion } from 'motion/react'

export function SignupForm() {
  return (
    <motion.div initial={{
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
          <form className="space-y-3">
            <div className="flex flex-col gap-y-3.5">
              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="bg-brand w-full text-white">
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
              <OauthProviders />
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
        </CardContent>
      </Card>
    </motion.div>
  );
}
