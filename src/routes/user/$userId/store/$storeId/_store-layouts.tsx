import { createFileRoute, Outlet } from "@tanstack/react-router";
import MainSidebar from "~/components/user/navigations/main-sidebar";

export const Route = createFileRoute("/user/$userId/store/$storeId/_store-layouts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex">
      <MainSidebar />
      <div className="w-full">
        <Outlet />
      </div>
    </main>
  );
}
