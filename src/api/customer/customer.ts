import { API_BASE_URL } from "@/lib/constants/api.ts";

export interface Customer {
  id: number;
  guid: string;
  name: string;
  surname: string;
  email: string;
  telephone: string;
  cityId: number | null;
}

export async function getCustomer(id: string): Promise<Customer | null> {
  const response = await fetch(`${API_BASE_URL}/Customer/${id}`);

  if (!response.ok) return null;

  return await response.json();
}

export async function getCustomers(): Promise<Customer[] | null> {
  const response = await fetch(`${API_BASE_URL}/Customer`);

  if (!response.ok) return null;

  return await response.json();
}
