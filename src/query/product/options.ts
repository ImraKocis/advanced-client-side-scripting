import { queryOptions } from "@tanstack/react-query";
import { getProducts } from "@/api/product/product.ts";

export const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: () => getProducts(),
});
