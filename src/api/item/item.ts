import { API_BASE_URL } from "@/lib/constants/api.ts";

export interface Item {
  id: number;
  guid: string;
  billId: number;
  quantity: number;
  productId: number;
  totalPrice: number;
}

export async function getItem(id: string): Promise<Item | null> {
  const response = await fetch(`${API_BASE_URL}/Item/${id}`);

  if (!response.ok) return null;

  return await response.json();
}

export async function getItems(): Promise<Item[] | null> {
  const response = await fetch(`${API_BASE_URL}/Item`);

  if (!response.ok) return null;

  return await response.json();
}
