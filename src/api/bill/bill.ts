import { API_BASE_URL } from "@/lib/constants/api.ts";

export interface Bill {
  id: number;
  guid: string;
  date: string;
  billNumber: string;
  customerId: number;
  sellerId: number;
  creditCardId: number;
  comment: string;
  total: number;
}

export async function getBill(id: string): Promise<Bill | null> {
  const response = await fetch(`${API_BASE_URL}/Bill/${id}`);

  if (!response.ok) return null;

  return await response.json();
}

export async function getBills(id: string): Promise<Bill[] | null> {
  const response = await fetch(`${API_BASE_URL}/Bill?customerId=${id}`);

  if (!response.ok) return null;

  return await response.json();
}
