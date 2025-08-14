import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SigninForm } from "~/components/auth/signin/signin-form";
import { Ecomiq } from "~/components/svgs/ecomiq";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const Route = createFileRoute("/auth/signin")({
  component: RouteComponent,
});

function RouteComponent() {
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
          <SigninForm />
        </CardContent>
      </Card>
    </motion.div>
  );
}
