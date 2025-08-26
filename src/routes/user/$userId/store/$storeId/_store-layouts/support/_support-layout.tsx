import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/user/$userId/store/$storeId/_store-layouts/support/_support-layout",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/user/$userId/store/$storeId/_store-layouts/support/_support-layout"!
      <Outlet />
    </div>
  );
}
