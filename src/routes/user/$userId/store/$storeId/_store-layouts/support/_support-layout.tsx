import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { ecomiqStore } from "~/hooks/use-ecomiq-store";

export const Route = createFileRoute(
  "/user/$userId/store/$storeId/_store-layouts/support/_support-layout",
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
      currentRoute: "Support",
    }));
  }, [pathname]);
  return (
    <div>
      Hello "/user/$userId/store/$storeId/_store-layouts/support/_support-layout"!
      <Outlet />
    </div>
  );
}
