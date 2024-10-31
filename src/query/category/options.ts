import { queryOptions } from "@tanstack/react-query";
import { getCategories, getCategory } from "@/api/category/category.ts";

export const categoryQueryOptions = (categoryId: string) =>
  queryOptions({
    queryKey: ["category", { categoryId }],
    queryFn: () => getCategory(categoryId),
  });

export const categoriesQueryOptions = () => {
  queryOptions({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};
