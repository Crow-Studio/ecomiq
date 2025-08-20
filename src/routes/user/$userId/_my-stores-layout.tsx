import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { ThemeToggle } from "~/components/theme-toggle";
import { getAuthenticatedUser } from "~/lib/auth/functions/auth";
import { signoutUserAction } from "~/lib/auth/functions/signout-user";
import { getStoresQuery } from "~/lib/queries/stores";

export const Route = createFileRoute("/user/$userId/_my-stores-layout")({
  component: RouteComponent,
  beforeLoad: async ({ params, context: { queryClient } }) => {
    const { user, session } = await getAuthenticatedUser();

    if (params.userId !== user.id) {
      await signoutUserAction();
      throw redirect({
        to: "/auth/signin",
      });
    }

    const stores = await queryClient.ensureQueryData(getStoresQuery(params.userId));

    return { user, session, stores };
  },
});

function RouteComponent() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0 grid h-full w-full grid-cols-[clamp(28px,10vw,120px)_auto_clamp(28px,10vw,120px)] border-b border-[--border] dark:border-[--dark-border]">
        <div className="col-span-1 flex h-full items-center justify-center" />
        <div className="col-span-1 flex h-full items-center justify-center border-x border-[--border] dark:border-[--dark-border]" />
        <div className="col-span-1 flex h-full items-center justify-center" />
      </div>
      <figure className="pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full bg-orange-100 blur-[200px] dark:bg-orange-400" />
      <figure className="pointer-events-none absolute top-[64px] left-[4vw] z-20 hidden aspect-square w-[32vw] rounded-full bg-orange-100 opacity-50 blur-[100px] md:block dark:bg-orange-600/20" />
      <figure className="pointer-events-none absolute right-[7vw] bottom-[-50px] z-20 hidden aspect-square w-[30vw] rounded-full bg-orange-100 opacity-50 blur-[100px] md:block dark:bg-orange-600/20" />

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center">
        <div className="w-full max-w-lg p-4">
          <div className="absolute top-5 right-16 sm:right-24 md:right-36">
            <ThemeToggle />
          </div>
          <Outlet />
        </div>
      </div>
    </section>
  );
}
