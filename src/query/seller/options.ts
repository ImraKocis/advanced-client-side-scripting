import { queryOptions } from "@tanstack/react-query";
import { getSeller, getSellers } from "@/api/seller/seller.ts";

export const sellerQueryOptions = (sellerId: string) =>
  queryOptions({
    queryKey: ["seller", { sellerId }],
    queryFn: () => getSeller(sellerId),
  });

export const sellersQueryOptions = () => {
  queryOptions({
    queryKey: ["sellers"],
    queryFn: () => getSellers(),
  });
};
