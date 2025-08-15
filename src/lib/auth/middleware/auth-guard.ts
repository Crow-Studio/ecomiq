import { createMiddleware } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { validateRequest } from "~/utils/auth";

/**
 * Middleware to force authentication on a server function, and add the user to the context.
 */

export const logMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next, functionId }) => {
    const now = Date.now();

    const result = await next();

    const duration = Date.now() - now;
    console.log("Server Req/Res:", { duration: `${duration}ms`, functionId });

    return result;
  }
);

export const authMiddleware = createMiddleware({ type: "function" })
  .middleware([logMiddleware])
  .server(
    async ({ next }) => {
      const { user, session } = await validateRequest();

      if (!session) {
        setResponseStatus(401);
        throw new Error("Unauthorized");
      }

      return next({ context: { user } });
    },
  );
