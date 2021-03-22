export interface StockQuery {
  search?: string;
  sort?: {
    sortDir: -1 | 1 | "asc" | "desc";
    sortKey: string;
  };
}
