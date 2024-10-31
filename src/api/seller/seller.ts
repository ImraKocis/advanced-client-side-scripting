import { API_BASE_URL } from "@/lib/constants/api.ts";

export interface Seller {
  id: number;
  guid: string;
  name: string;
  surname: string;
  permanentEmployee: boolean;
}

export async function getSeller(id: string): Promise<Seller | null> {
  const response = await fetch(`${API_BASE_URL}/Seller/${id}`);

  if (!response.ok) return null;

  return await response.json();
}

export async function getSellers(): Promise<Seller[] | null> {
  const response = await fetch(`${API_BASE_URL}/Seller`);

  if (!response.ok) return null;

  return await response.json();
}
