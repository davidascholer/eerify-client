import { OrderingType, PlatformsType, StoresType } from "./interface";

// Basic filters for all root endpoints.
export const QUERY_FILTERS = {
  // Number of results to return per page.
  pageSize: (size: number) => "&page_size=" + size,
  page: (page: number) => "&page=" + page,
  // You can reverse the sort order adding a hyphen, for example: &ordering=-released.
  ordering: (field: OrderingType) => "&ordering=" + field,
};

// Filters extended for the games endpoint.
export const GAMES_FILTERS = {
  ...QUERY_FILTERS,
  // Search query.
  search: (slug: string) =>
    "&search=" + slug + "&search_precise=true&search_exact=true",
  parentPlatforms: (platforms: [PlatformsType]) =>
    "&parent_platforms=" + platforms.toString(),
  platforms: (platforms: [PlatformsType]) =>
    "&parent_platforms=" + platforms.toString(),
  stores: (stores: [StoresType]) => "&stores=" + stores.toString(),
};
