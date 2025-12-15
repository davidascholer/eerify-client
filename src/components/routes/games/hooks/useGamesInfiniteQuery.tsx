import ms from "ms";
import useReactInfiniteQuery from "../../../../lib/react-query/useReactInfiniteQuery";
import { GamesResponseInterface } from "../utils/interface";
import { devDebug } from "../utils/logger";
import GamesAPIClient from "../services/games-api-client";
import { GAMES_FILTERS } from "../utils/filters";
import { AxiosResponse } from "axios";

// Create an  instance of the API client custom to login
const gamesClient = (filter: string) => {
  const url: string = `/${filter}`;
  const client = new GamesAPIClient(url);
  return client;
};

// Create a hook that makes the query to the API
const useGamesInfiniteQuery = ({ searchQuery = "" }) => {
  const fetchGames = async ({ pageParam = 1 }) => {
    const client = gamesClient(GAMES_FILTERS.search(searchQuery));
    try {
      const result: GamesResponseInterface = await client.get({
        params: { page: pageParam },
      });
      devDebug("useGamesInfiniteQuery result", result);
      return result;
    } catch (e) {
      console.error("useGetUser error:", e);
      return e;
    }
  };

  return useReactInfiniteQuery({
    queryKey: ["games", { searchQuery }],
    queryFn: fetchGames,
    refetchOnWindowFocus: false,
    staleTime: ms("24h"),
    enabled: searchQuery.length > 0,
    keepPreviousData: true,
    getNextPageParam: (curPage) => {
      devDebug("useGamesInfiniteQuery curPage", curPage);
      const nextPage: string = (curPage as AxiosResponse)?.config?.params?.page;
      devDebug("useGamesInfiniteQuery nextPage", nextPage);
      devDebug("useGamesInfiniteQuery Number(nextPage)", Number(nextPage));
      return Number(nextPage) && (curPage as AxiosResponse)?.data?.next
        ? Number(nextPage) + 1
        : undefined;
    },
  });
};

export default useGamesInfiniteQuery;
