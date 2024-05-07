// Basic filters for all root endpoints.
export const QUERY_FILTERS = {
  // Number of results to return per page.
  // pageSize: (size: number) => "&page_size=" + size,
  // page: (page: number) => "&page=" + page,
  search: (search: string) => "search/movie?query=" + search,
};
