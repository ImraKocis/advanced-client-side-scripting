import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { AuthContextProps } from "../auth";
import { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  auth: AuthContextProps;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      {/*<TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />*/}
    </>
  ),
});
