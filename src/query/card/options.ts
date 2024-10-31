import { queryOptions } from "@tanstack/react-query";
import { getCard, getCards } from "@/api/card/card.ts";

export const cardQueryOptions = (cardId: string) =>
  queryOptions({
    queryKey: ["card", { cardId }],
    queryFn: () => getCard(cardId),
  });

export const cardsQueryOptions = queryOptions({
  queryKey: ["cards"],
  queryFn: () => getCards(),
});
