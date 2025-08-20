import { Icon } from "@iconify/react/dist/iconify.js";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Ecomiq } from "~/components/svgs/ecomiq";
import { Button } from "~/components/ui/button";
import MyStoreUser from "~/components/user/my-stores/user";
import { seo } from "~/lib/seo";

export const Route = createFileRoute("/user/$userId/_my-stores-layout/my-stores")({
  component: RouteComponent,
  loader({ context }) {
    return {
      username: context.user.username
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: `${loaderData?.username} - My Stores`,
        description: `Ecomiq is a powerful all-in-one ecommerce platform built for store owners of all skill levels—manage orders, inventory, marketing, and customers with ease.`,
      }),
    ],
  }),
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  return (
    <div className="bg-card text-card-foreground flex flex-col gap-y-5 rounded-xl border p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <Ecomiq className="h-auto w-8" />
        <MyStoreUser user={user} />
      </div>
      <div className="grid gap-y-7">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium">My stores</h2>
          <Button className="bg-brand hover:bg-primary-secondary group inline-flex h-max w-fit cursor-pointer items-center justify-center rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-white shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(249,129,99,1)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_#F97452_inset] transition-colors duration-300 ease-in-out hover:translate-y-0.5 hover:shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(252,199,185,0.8)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_hsla(0,_0%,_100%,_0.25)_inset] focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:shadow-xs disabled:hover:shadow-xs">
            <Plus />
            Create store
          </Button>
        </div>

        <div>
          <div className="flex flex-col items-center gap-y-1">
            <div className="flex items-center justify-center">
              <div className="bg-brand/20 text-brand grid size-28 place-content-center rounded-full p-2">
                <Icon icon="hugeicons:store-04" className="size-20" />
              </div>
            </div>
            <p className="text-muted-foreground max-w-xs text-center text-sm">
              Currently you have no stores. Click the button above to create a new store.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
