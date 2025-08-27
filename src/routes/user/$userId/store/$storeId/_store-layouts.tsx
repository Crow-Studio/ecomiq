import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import MainHeader from "~/components/user/navigations/main-header";
import MainSidebar from "~/components/user/navigations/main-sidebar";
import { getAuthenticatedUserFn } from "~/lib/auth/functions/auth";
import { signoutUserAction } from "~/lib/auth/functions/signout-user";
import { getStoreQuery, getStoresQuery } from "~/lib/queries/stores";

export const Route = createFileRoute("/user/$userId/store/$storeId/_store-layouts")({
  component: RouteComponent,
  beforeLoad: async ({ params, context: { queryClient } }) => {
    const { user } = await getAuthenticatedUserFn();

    if (params.userId !== user.id) {
      await signoutUserAction();
      throw redirect({
        to: "/auth/signin",
      });
    }

    const store = await queryClient.ensureQueryData(getStoreQuery(params.storeId));
    const stores = await queryClient.ensureQueryData(getStoresQuery(params.userId));

    if (!store) {
      throw redirect({
        to: "/user/$userId/my-stores",
        params: {
          userId: user.id,
        },
      });
    }

    return { user, store, stores };
  },
});

function RouteComponent() {
  const { user, stores, store } = Route.useRouteContext();
  return (
    <main className="flex h-screen overflow-hidden">
      <MainSidebar user={user} store={store} />
      <div className="flex min-w-0 flex-1 flex-col">
        <MainHeader user={user} stores={stores} store={store} />
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
