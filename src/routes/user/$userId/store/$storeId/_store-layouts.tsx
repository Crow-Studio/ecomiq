import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/user/$userId/store/$storeId/_store-layouts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <p>Store Layout</p>
      <Outlet />
    </div>
  );
}
