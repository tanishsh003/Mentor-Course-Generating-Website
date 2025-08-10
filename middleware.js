import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Keep debug mode enabled to see detailed logs in your terminal
  debug: true,

  // Define all public routes that should not require authentication
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/public(.*)" ,
    "/workspace/profile(.*)" 
  ],

  // **THE FIX**: Increase the allowed clock skew to 60 seconds (60000 milliseconds).
  // This makes authentication tolerant to time differences between your computer and Clerk's servers,
  // which is the root cause of the 401 error on hard refresh.
  clockSkewInMs: 60000 
});

export const config = {
  matcher: [
    // This pattern runs middleware on all routes except for static files and _next internals.
    '/((?!.*\\..*|_next).*)',
    // This ensures the root route is also covered.
    '/',
    // This covers all API and TRPC routes.
    '/(api|trpc)(.*)',
  ],
};
