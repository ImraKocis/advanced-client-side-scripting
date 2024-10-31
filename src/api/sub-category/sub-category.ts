import { API_BASE_URL } from "@/lib/constants/api.ts";

export interface SubCategory {
  id: number;
  guid: string;
  name: string;
  categoryId: number;
}

export async function getSubCategory(id: string): Promise<SubCategory | null> {
  const response = await fetch(`${API_BASE_URL}/SubCategory/${id}`);

  if (!response.ok) return null;

  return await response.json();
}

export async function getSubCategories(): Promise<SubCategory[] | null> {
  const response = await fetch(`${API_BASE_URL}/SubCategory`);

  if (!response.ok) return null;

  return await response.json();
}
