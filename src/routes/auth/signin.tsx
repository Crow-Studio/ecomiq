import { createFileRoute } from "@tanstack/react-router";
import { SigninForm } from "~/components/auth/signin/signin-form";

export const Route = createFileRoute("/auth/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SigninForm />
    </div>
  );
}
