import { queryOptions } from "@tanstack/react-query";
import { getCustomer, getCustomers } from "@/api/customer/customer.ts";

export const customerQueryOptions = (customerId: string) =>
  queryOptions({
    queryKey: ["customer", { customerId }],
    queryFn: () => getCustomer(customerId),
  });

export const customersQueryOptions = queryOptions({
  queryKey: ["customers"],
  queryFn: () => getCustomers(),
});
