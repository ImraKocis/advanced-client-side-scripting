import { API_BASE_URL } from "@/lib/constants/api.ts";

export interface Category {
  id: number;
  guid: string;
  name: string;
}

export async function getCategory(id: string): Promise<Category | null> {
  const response = await fetch(`${API_BASE_URL}/Category/${id}`);

  if (!response.ok) return null;

  return await response.json();
}

export async function getCategories(): Promise<Category[] | null> {
  const response = await fetch(`${API_BASE_URL}/Category`);

  if (!response.ok) return null;

  return await response.json();
}
