import GAMES_ENDPOINTS from "./endpoints";
import { OrderingType, PlatformsType, StoresType } from "./interface";
const token = "key=" + import.meta.env.VITE_GAMES_API_KEY;
export const ROOT_API = import.meta.env.VITE_GAMES_API_ADDRESS;

const appendToken = (endpoint: string) => endpoint + "?" + token;

// Basic filters for all root endpoints.
const QUERY_FILTERS = {
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
    appendToken(GAMES_ENDPOINTS.games) +
    "&search_precise=true&search_exact=true&ordering=name" +
    "&search=" +
    slug,
  parentPlatforms: (platforms: [PlatformsType]) =>
    "&parent_platforms=" + platforms.toString(),
  platforms: (platforms: [PlatformsType]) =>
    "&parent_platforms=" + platforms.toString(),
  stores: (stores: [StoresType]) => "&stores=" + stores.toString(),
};

// export const gamesQuery = (query: string) =>
//   appendToken(GAMES_ENDPOINTS.games) + query;
