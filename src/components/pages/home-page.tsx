import { ReactElement } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { customersQueryOptions } from "@/query/customer/options.ts";
import { citiesQueryOptions } from "@/query/city/options.ts";
import { CustomerDataTable } from "@/components/tables/customer-data-table.tsx";
import { useHomePageContext } from "@/components/context/home-page-context.tsx";

export function HomePage(): ReactElement {
  const { perPage, page } = useHomePageContext();
  const customersQuery = useSuspenseQuery(customersQueryOptions(perPage, page));
  const cityQuery = useSuspenseQuery(citiesQueryOptions);
  const customers = customersQuery.data;
  const cities = cityQuery.data;

  if (customersQuery.isFetching || cityQuery.isFetching)
    return <div>Loading...</div>;
  if (!customers || !cities) return <div>Something went wrong</div>;
  return (
    <div className="max-w-wrapper-desktop xxl:px-0 px-4 mx-auto w-full">
      <h1 className="font-semibold text-3xl mt-12">Customers</h1>
      <CustomerDataTable
        customerData={customers.data}
        cityData={cities}
        totalItems={customers.totalItems}
      />
    </div>
  );
}
