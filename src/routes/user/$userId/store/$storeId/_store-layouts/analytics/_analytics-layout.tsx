import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/user/$userId/store/$storeId/_store-layouts/analytics/_analytics-layout",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/user/$userId/store/$storeId/_store-layouts/analytics/_analytics-layout"!
      <Outlet />
    </div>
  );
}
