import { RouterProvider } from "@tanstack/react-router";
import { queryClient, router } from "@/main.tsx";
import { useAuth } from "@/hooks/useAuth.ts";
import { QueryClientProvider } from "@tanstack/react-query";

function InnerApp() {
  const auth = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ auth }} />
    </QueryClientProvider>
  );
}

export { InnerApp };
