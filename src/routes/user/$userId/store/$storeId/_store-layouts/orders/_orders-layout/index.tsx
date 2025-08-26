import { createFileRoute } from "@tanstack/react-router";
import { seo } from "~/lib/seo";
import { capitalize } from "~/lib/utils";

export const Route = createFileRoute(
  "/user/$userId/store/$storeId/_store-layouts/orders/_orders-layout/",
)({
  component: RouteComponent,
  loader({ context }) {
    return {
      store_name: context.store.name,
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: `${capitalize(loaderData?.store_name as string)} - Orders`,
        description: `Ecomiq is a powerful all-in-one ecommerce platform built for store owners of all skill levels—manage orders, inventory, marketing, and customers with ease.`,
      }),
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/user/$userId/store/$storeId/_store-layouts/orders/"!</div>;
}
