import { createFileRoute, Outlet } from "@tanstack/react-router";
import { getAuthenticatedUser } from "~/lib/auth/functions/auth";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
  beforeLoad: async () => {
    const { user, session } = await getAuthenticatedUser();
    return { user, session };
  },
});

function DashboardLayout() {
  const { user } = Route.useRouteContext();
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-10 p-2">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold sm:text-4xl">Dashboard Layout</h1>
        <div className="flex items-center gap-2 max-sm:flex-col">
          This is a protected layout:
          <pre className="bg-card text-card-foreground rounded-md border p-1">
            routes/dashboard/route.tsx
          </pre>
        </div>

        <p>user_id: {user.id}</p>
      </div>

      <Outlet />
    </div>
  );
}
