import { API_BASE_URL } from "@/lib/constants/api.ts";

export interface Item {
  id: number;
  guid: string;
  billId: number;
  quantity: number;
  productId: number;
  totalPrice: number;
}

export interface ItemCreate {
  billId: string;
  quantity: string;
  productId: string;
  totalPrice: string;
}

export async function getItem(id: string): Promise<Item | null> {
  const response = await fetch(`${API_BASE_URL}/Item/${id}`);

  if (!response.ok) return null;

  return await response.json();
}

export async function getItems(billId: string): Promise<Item[] | null> {
  const response = await fetch(`${API_BASE_URL}/Item?billId=${billId}`);

  if (!response.ok) return null;

  return await response.json();
}

export async function addItem(item: ItemCreate): Promise<Item | null> {
  const response = await fetch(`${API_BASE_URL}/Item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: Number(item.productId),
      quantity: Number(item.quantity),
      totalPrice: Number(item.totalPrice),
      billId: Number(item.billId),
    }),
  });

  if (!response.ok) return null;

  return await response.json();
}

export async function deleteItem(id: number): Promise<boolean> {
  const response = await fetch(`${API_BASE_URL}/Item/${id}`, {
    method: "DELETE",
  });

  return response.ok;
}
