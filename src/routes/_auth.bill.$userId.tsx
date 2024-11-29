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
  const customer = customerQuery.data;
  if (
    cardsQuery.isFetching ||
    billsQuery.isFetching ||
    customerQuery.isFetching
  )
    return <div>Loading...</div>;
  if (billsQuery.error) {
    return (
      <div className="flex flex-col w-full justify-center items-center py-12 px-20">
        <h2>Something went wrong wih bills</h2>
        <p>{billsQuery.error.name}</p>
        <p>{billsQuery.error.message}</p>
      </div>
    );
  }
  if (cardsQuery.error) {
    return (
      <div className="flex flex-col w-full justify-center items-center py-12 px-20">
        <h2>Something went wrong with cards</h2>
        <p>{cardsQuery.error.name}</p>
        <p>{cardsQuery.error.message}</p>
      </div>
    );
  }
  if (customerQuery.error) {
    return (
      <div className="flex flex-col w-full justify-center items-center py-12 px-20">
        <h2>Something went wrong with customer</h2>
        <p>{customerQuery.error.name}</p>
        <p>{customerQuery.error.message}</p>
      </div>
    );
  }
  if (!customer) {
    return (
      <div className="flex justify-center items-center p-20">
        <h2 className="font-semibold text-2xl">This user dose not exists</h2>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full xxl:px-0 px-4 max-w-wrapper-desktop mx-auto">
      <h1 className="font-semibold text-3xl mt-12 mb-4">{`${customer?.name} ${customer?.surname}`}</h1>
      <h2 className="text-2xl">Bills</h2>
      {bills && bills.length > 1 ? (
        <BillDataTable billData={bills} creditCardData={cards!} />
      ) : null}
    </div>
  );
}
