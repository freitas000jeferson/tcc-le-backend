export type SortOrder = 'asc' | 'desc';

export type PaginationType = {
  skip: number;
  limit: number;
  sort: [string, SortOrder][];
};

export type PaginationMetadata = {
  total: number;
  totalPages: number;
  previousPage?: number;
  nextPage?: number;
};
