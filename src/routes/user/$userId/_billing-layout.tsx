import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getUserSubscriptionFn } from "~/fn/subscriptions";
import { getAuthenticatedUserFn } from "~/lib/auth/functions/auth";
import { signoutUserAction } from "~/lib/auth/functions/signout-user";
import { UserRole } from "~/lib/db/schema";
import { getStoresQuery } from "~/lib/queries/stores";

export const Route = createFileRoute("/user/$userId/_billing-layout")({
  component: RouteComponent,
  beforeLoad: async ({ params, context: { queryClient } }) => {
    const { user } = await getAuthenticatedUserFn();

    if (params.userId !== user.id) {
      await signoutUserAction();
      throw redirect({
        to: "/auth/signin",
      });
    }

    const subscription = await getUserSubscriptionFn();

    const stores = await queryClient.ensureQueryData(getStoresQuery(params.userId));

    // Identify all stores where the user is the OWNER
    const ownedStores = stores.filter((s) => s.role === UserRole.OWNER);

    /**
     * Access Control:
     * - If user has no active subscription
     * - AND does not own any store
     * → they are redirected to the dashboard of the first available store
     */
    if (!user.subscription_id && ownedStores.length === 0 && stores.length > 0) {
      throw redirect({
        to: "/user/$userId/store/$storeId/dashboard",
        params: {
          userId: user.id,
          storeId: stores[0].id,
        },
      });
    }

    return { user, subscription };
  },
});

function RouteComponent() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-3">
      <figure className="pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full bg-orange-100 blur-[200px] dark:bg-orange-400" />
      <figure className="pointer-events-none absolute top-[64px] left-[4vw] z-20 hidden aspect-square w-[32vw] rounded-full bg-orange-100 opacity-50 blur-[100px] md:block dark:bg-orange-600/20" />
      <figure className="pointer-events-none absolute right-[7vw] bottom-[-50px] z-20 hidden aspect-square w-[30vw] rounded-full bg-orange-100 opacity-50 blur-[100px] md:block dark:bg-orange-600/20" />
      <Outlet />
    </section>
  );
}
