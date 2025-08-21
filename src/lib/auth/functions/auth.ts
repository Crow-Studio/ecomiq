import { createServerFn } from "@tanstack/react-start";
import {
  authenticatedMiddleware,
  unauthenticatedMiddleware,
} from "../middleware/auth-guard";

// Use authenticatedMiddleware for dashboard (requires auth)
export const getAuthenticatedUserFn = createServerFn({
  method: "GET",
})
  .middleware([authenticatedMiddleware]) // Changed from unauthenticatedMiddleware
  .handler(async ({ context }) => {
    return { user: context.user, session: context.session };
  });

// Use unauthenticatedMiddleware for auth pages (no auth required)
export const checkAuthenticatedUserFn = createServerFn({
  method: "GET",
})
  .middleware([unauthenticatedMiddleware]) // Changed from authenticatedMiddleware
  .handler(async ({ context }) => {
    return { user: context.user, session: context.session };
  });
