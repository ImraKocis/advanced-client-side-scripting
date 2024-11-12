import { queryOptions } from "@tanstack/react-query";
import { getSubCategories } from "@/api/sub-category/sub-category.ts";

export const subCategoriesQueryOptions = (categoryId: number | null) =>
  queryOptions({
    queryKey: ["subCategories", categoryId],
    queryFn: () => getSubCategories(categoryId),
  });
