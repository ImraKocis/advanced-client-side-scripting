import { queryOptions } from "@tanstack/react-query";
import { getItem, getItems } from "@/api/item/item.ts";

export const itemQueryOptions = (itemId: string) =>
  queryOptions({
    queryKey: ["item", { itemId }],
    queryFn: () => getItem(itemId),
  });

export const itemsQueryOptions = () => {
  queryOptions({
    queryKey: ["items"],
    queryFn: () => getItems(),
  });
};
