import { createFileRoute } from "@tanstack/react-router";
import { seo } from "~/lib/seo";

export const Route = createFileRoute("/user/$userId/_billing-layout/billing")({
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
        title: `Ecomiq - Billing`,
        description: `Ecomiq is a powerful all-in-one ecommerce platform built for store owners of all skill levels—manage orders, inventory, marketing, and customers with ease.`,
      }),
    ],
  }),
});

function RouteComponent() {
  return <div></div>;
}
