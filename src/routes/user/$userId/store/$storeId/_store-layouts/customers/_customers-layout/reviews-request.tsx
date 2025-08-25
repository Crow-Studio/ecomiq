import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/user/$userId/store/$storeId/_store-layouts/customers/_customers-layout/reviews-request",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello
      "/user/$userId/store/$storeId/_store-layouts/customers/_customers-layout/reviews-request"!
    </div>
  );
}
