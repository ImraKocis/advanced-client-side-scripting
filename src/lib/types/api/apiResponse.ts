export interface ApiPaginatedResponse<T> {
  data: T;
  totalItems: string | null;
}
