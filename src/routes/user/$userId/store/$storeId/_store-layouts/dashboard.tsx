import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import StoreConfigurations from "~/components/user/dashboard/store-config";
import { ecomiqStore } from "~/hooks/use-ecomiq-store";
import { seo } from "~/lib/seo";
import { capitalize } from "~/lib/utils";

export const Route = createFileRoute(
  "/user/$userId/store/$storeId/_store-layouts/dashboard",
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
        title: `${capitalize(loaderData?.store_name as string)} - Dashboard`,
        description: `Ecomiq is a powerful all-in-one ecommerce platform built for store owners of all skill levels—manage orders, inventory, marketing, and customers with ease.`,
      }),
    ],
  }),
});

function RouteComponent() {
  const {
    location: { pathname },
  } = useRouterState();

  useEffect(() => {
    ecomiqStore.setState((state) => ({
      ...state,
      currentRoute: "Dashboard",
    }));
  }, [pathname]);
  return (
    <div>
      <StoreConfigurations />
    </div>
  );
}
