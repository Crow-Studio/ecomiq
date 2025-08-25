import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/user/$userId/store/$storeId/_store-layouts/products/_products-layout/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/user/$userId/store/$storeId/_store-layouts/products/_products-layout/"!
    </div>
  );
}
