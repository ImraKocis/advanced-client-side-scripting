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

export async function getSubCategories(
  categoryId: number | null,
): Promise<SubCategory[] | null> {
  let url;

  if (!categoryId) url = new URL("SubCategory", API_BASE_URL);
  else
    url = new URL(
      `SubCategory?categoryId=${categoryId.toString()}`,
      API_BASE_URL,
    );

  const response = await fetch(url.toString());
  if (!response.ok) return null;

  return await response.json();
}
