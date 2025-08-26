import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { ecomiqStore } from "~/hooks/use-ecomiq-store";

export const Route = createFileRoute(
  "/user/$userId/store/$storeId/_store-layouts/campaign/_campaign-layout",
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
      currentRoute: "Campaign",
    }));
  }, [pathname]);

  return (
    <div>
      Hello "/user/$userId/store/$storeId/_store-layouts/campaign/_campaign-layout"!
      <Outlet />
      Oyaa
    </div>
  );
}
