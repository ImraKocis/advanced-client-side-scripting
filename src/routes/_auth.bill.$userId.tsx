import { createFileRoute } from "@tanstack/react-router";

import { ReactElement } from "react";
import { billsQueryOptions } from "@/query/bill/options.ts";
import { cardsQueryOptions } from "@/query/card/options.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BillDataTable } from "@/components/tables/customer-bills-data-table.tsx";
import { customerQueryOptions } from "@/query/customer/options.ts";

export const Route = createFileRoute("/_auth/bill/$userId")({
  loader: ({ context: { queryClient }, params: { userId } }) => {
    queryClient.ensureQueryData(billsQueryOptions(userId));
    queryClient.ensureQueryData(cardsQueryOptions);
    queryClient.ensureQueryData(customerQueryOptions(userId));
  },
  component: BillComponent,
});

export function BillComponent(): ReactElement {
  const userId = Route.useParams().userId;
  const customerQuery = useSuspenseQuery(customerQueryOptions(userId));
  const billsQuery = useSuspenseQuery(billsQueryOptions(userId));
  const cardsQuery = useSuspenseQuery(cardsQueryOptions);
  const bills = billsQuery.data;
  const cards = cardsQuery.data;
  if (
    cardsQuery.isFetching ||
    billsQuery.isFetching ||
    customerQuery.isFetching
  )
    return <div>Loading...</div>;
  if (!bills || !cards) return <div>Something went wrong</div>;
  return (
    <div className="flex flex-col w-full xxl:px-0 px-4 max-w-wrapper-desktop mx-auto">
      <h1 className="font-semibold text-3xl mt-12 mb-4">{`${customerQuery.data?.name} ${customerQuery.data?.surname}`}</h1>
      <h2 className="text-2xl">Bills</h2>
      <BillDataTable billData={bills} creditCardData={cards} />
    </div>
  );
}
