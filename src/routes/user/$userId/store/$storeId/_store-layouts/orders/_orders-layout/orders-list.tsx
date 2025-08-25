import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/user/$userId/store/$storeId/_store-layouts/orders/_orders-layout/orders-list",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello
      "/user/$userId/store/$storeId/_store-layouts/orders/_orders-layout/orders-list"!
    </div>
  );
}
