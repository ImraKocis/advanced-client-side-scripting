import { queryOptions } from "@tanstack/react-query";
import { getBill, getBills } from "@/api/bill/bill.ts";

export const billQueryOptions = (billId: string) =>
  queryOptions({
    queryKey: ["bill", { billId }],
    queryFn: () => getBill(billId),
  });

export const billsQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["bills"],
    queryFn: () => getBills(userId),
  });
