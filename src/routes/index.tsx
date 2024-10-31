import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/navigation.tsx";
import { customersQueryOptions } from "@/query/customer/options.ts";
import { CustomerDataTable } from "@/components/tables/customer-data-table.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { citiesQueryOptions } from "@/query/city/options.ts";

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(customersQueryOptions);
    queryClient.ensureQueryData(citiesQueryOptions);
  },
  component: HomeComponent,
});

function HomeComponent() {
  const customersQuery = useSuspenseQuery(customersQueryOptions);
  const cityQuery = useSuspenseQuery(citiesQueryOptions);
  const customers = customersQuery.data;
  const cities = cityQuery.data;

  if (customersQuery.isFetching || cityQuery.isFetching)
    return <div>Loading...</div>;
  if (!customers || !cities) return <div>Something went wrong</div>;
  return (
    <div className="flex flex-col w-full gap-2">
      <Navigation />
      <CustomerDataTable customerData={customers} cityData={cities} />
    </div>
  );
}
