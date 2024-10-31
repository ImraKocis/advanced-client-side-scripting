import { API_BASE_URL } from "@/lib/constants/api.ts";

export interface Product {
  id: number;
  guid: string;
  name: string;
  surname: string;
  permanentEmployee: boolean;
}

export async function getProduct(id: string): Promise<Product | null> {
  const response = await fetch(`${API_BASE_URL}/Product/${id}`);

  if (!response.ok) return null;

  return await response.json();
}

export async function getProducts(): Promise<Product[] | null> {
  const response = await fetch(`${API_BASE_URL}/Product`);

  if (!response.ok) return null;

  return await response.json();
}
