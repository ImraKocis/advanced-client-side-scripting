import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/navigation.tsx";
import { customersQueryOptions } from "@/query/customer/options.ts";
import { citiesQueryOptions } from "@/query/city/options.ts";
import { HomePage } from "@/components/pages/home-page.tsx";
import { HomePageProvider } from "@/components/context/home-page-context.tsx";

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(customersQueryOptions(10, 1));
    queryClient.ensureQueryData(citiesQueryOptions);
  },
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="flex flex-col w-full gap-2">
      <Navigation />
      <HomePageProvider>
        <HomePage />
      </HomePageProvider>
    </div>
  );
}
