import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchResponse } from "../services/api-client";
import { useAppSelector } from "../../../../../lib/redux-toolkit/hooks";
import Game from "../entities/Game";
import { GamesState } from "../../../../../redux/types";

const apiClient = new APIClient<Game>("/games");

const useGames = () => {
  const gamesState: GamesState = useAppSelector((state) => state.games);

  return useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gamesState],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          genres: gamesState.genreId,
          parent_platforms: gamesState.platformId,
          ordering: gamesState.sortOrder,
          search: gamesState.searchText,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: ms("24h"),
  });
};

export default useGames;
