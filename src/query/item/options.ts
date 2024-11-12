import { queryOptions } from "@tanstack/react-query";
import { getItems } from "@/api/item/item.ts";

export const itemsQueryOptions = (billId: string) =>
  queryOptions({
    queryKey: ["items"],
    queryFn: () => getItems(billId),
  });
