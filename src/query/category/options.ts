import { queryOptions } from "@tanstack/react-query";
import { getCategories } from "@/api/category/category.ts";

export const categoriesQueryOptions = queryOptions({
  queryKey: ["categories"],
  queryFn: () => getCategories(),
});
