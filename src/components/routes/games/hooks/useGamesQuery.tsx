import ms from "ms";
import useReactQuery from "../../../../lib/react-query/useReactQuery";
import GAMES_ENDPOINTS from "../utils/endpoints";
import { GamesResponseInterface } from "../utils/interface";
import { devDebug } from "../utils/logger";
import GamesAPIClient from "../services/games-api-client";
import { GAMES_FILTERS } from "../utils/filters";

// Create an  instance of the API client custom to login
const gamesClient = (filter: string) => {
  const url: string = `/${filter}`;
  const client = new GamesAPIClient(url);
  return client;
};

// Create a hook that makes the query to the API
const useGamesQuery = ({ searchQuery = "" }) => {
  const fetchGames = async () => {
    const client = gamesClient(GAMES_FILTERS.search(searchQuery));
    devDebug("gamesClient", client);
    try {
      const result: GamesResponseInterface = await client.get();
      return result;
    } catch (e) {
      console.error("useGetUser error:", e);
      return e;
    }
  };

  // https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
  return useReactQuery({
    queryKey: ["games", { searchQuery }],
    queryFn: fetchGames,
    refetchOnWindowFocus: false,
    staleTime: ms("24h"),
    enabled: searchQuery.length > 0,
  });
};

export default useGamesQuery;
