import { API_BASE_URL } from "@/lib/constants/api.ts";

export interface City {
  id: number;
  guid: string;
  name: string;
}

export async function getCity(id: string): Promise<City | null> {
  const response = await fetch(`${API_BASE_URL}/City/${id}`);

  if (!response.ok) return null;

  return await response.json();
}

export async function getCities(): Promise<City[] | null> {
  const response = await fetch(`${API_BASE_URL}/City`);

  if (!response.ok) return null;

  return await response.json();
}
