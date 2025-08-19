import { createFileRoute } from "@tanstack/react-router";
import { seo } from "~/lib/seo";

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
  return <div>Hello "/auth/_auth-layout/forgot-password"!</div>;
}
