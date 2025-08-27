import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { ecomiqStore } from "~/hooks/use-ecomiq-store";

export const Route = createFileRoute(
  "/user/$userId/store/$storeId/_store-layouts/analytics/_analytics-layout",
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
      currentRoute: "Analytics",
    }));
  }, [pathname]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
