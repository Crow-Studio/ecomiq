import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/user/$userId/store/$storeId/_store-layouts/orders/_orders-layout",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/user/$userId/store/$storeId/_store-layouts/orders/_orders-layout"!
      <Outlet />
    </div>
  );
}
