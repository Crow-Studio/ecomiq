import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { ecomiqStore } from "~/hooks/use-ecomiq-store";

export const Route = createFileRoute(
  "/user/$userId/store/$storeId/_store-layouts/orders/_orders-layout",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    location: { pathname },
  } = useRouterState();

  useEffect(() => {
    ecomiqStore.setState((state) => ({
      ...state,
      currentRoute: "Orders",
    }));
  }, [pathname]);
  return (
    <div>
      Hello "/user/$userId/store/$storeId/_store-layouts/orders/_orders-layout"!
      <Outlet />
    </div>
  );
}
