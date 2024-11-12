import { API_BASE_URL } from "@/lib/constants/api.ts";
import { ApiPaginatedResponse } from "@/lib/types/api/apiResponse.ts";

export interface Customer {
  id: number;
  guid: string;
  name: string;
  surname: string;
  email: string;
  telephone: string;
  cityId: number | null;
}

export async function getCustomer(id?: string): Promise<Customer | null> {
  const response = await fetch(`${API_BASE_URL}/Customer/${id}`);

  if (!response.ok) return null;

  return await response.json();
}

export async function getCustomers(
  perPage: number,
  page: number,
): Promise<ApiPaginatedResponse<Customer[]> | null> {
  const response = await fetch(
    `${API_BASE_URL}/Customer?_page=${page.toString()}&_limit=${perPage.toString()}`,
  );

  if (!response.ok) return null;
  const totalItems = response.headers.get("X-Total-Count");
  const data = await response.json();
  return { data, totalItems };
}

export async function getCustomersWithSearch(
  searchValue: string,
  perPage: number,
  page: number,
): Promise<ApiPaginatedResponse<Customer[]> | null> {
  const response = await fetch(
    `${API_BASE_URL}/Customer?_page=${page.toString()}&_limit=${perPage.toString()}&name_like=${searchValue}&surname_like=${searchValue}`,
  );

  if (!response.ok) return null;
  const totalItems = response.headers.get("X-Total-Count");
  const data = await response.json();
  return { data, totalItems };
}
