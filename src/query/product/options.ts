import { queryOptions } from "@tanstack/react-query";
import { getProduct, getProducts } from "@/api/product/product.ts";

export const productQueryOptions = (productId: string) =>
  queryOptions({
    queryKey: ["product", { productId }],
    queryFn: () => getProduct(productId),
  });

export const productsQueryOptions = () => {
  queryOptions({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
};
