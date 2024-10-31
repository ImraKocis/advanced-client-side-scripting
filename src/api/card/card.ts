import { API_BASE_URL } from "@/lib/constants/api.ts";

export interface Card {
  id: number;
  guid: string;
  type: string;
  cardNumber: string;
  expirationMonth: number;
  expirationYear: number;
}

export async function getCard(id: string): Promise<Card | null> {
  const response = await fetch(`${API_BASE_URL}/CreditCard/${id}`);

  if (!response.ok) return null;

  return await response.json();
}

export async function getCards(): Promise<Card[] | null> {
  const response = await fetch(`${API_BASE_URL}/CreditCard`);

  if (!response.ok) return null;

  return await response.json();
}
