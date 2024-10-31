import { queryOptions } from "@tanstack/react-query";
import {
  getSubCategories,
  getSubCategory,
} from "@/api/sub-category/sub-category.ts";

export const subCategoryQueryOptions = (subCategoryId: string) =>
  queryOptions({
    queryKey: ["subCategory", { subCategoryId }],
    queryFn: () => getSubCategory(subCategoryId),
  });

export const categoriesQueryOptions = () => {
  queryOptions({
    queryKey: ["subCategories"],
    queryFn: () => getSubCategories(),
  });
};
