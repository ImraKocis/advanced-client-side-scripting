import { queryOptions } from "@tanstack/react-query";
import { getCities, getCity } from "@/api/city/city.ts";

export const cityQueryOptions = (cityId: string) =>
  queryOptions({
    queryKey: ["city", { cityId }],
    queryFn: () => getCity(cityId),
  });

export const citiesQueryOptions = queryOptions({
  queryKey: ["cities"],
  queryFn: () => getCities(),
});
