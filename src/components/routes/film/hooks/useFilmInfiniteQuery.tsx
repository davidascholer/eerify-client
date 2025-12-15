import ms from "ms";
import useReactInfiniteQuery from "../../../../lib/react-query/useReactInfiniteQuery";
import { ResponseInterface } from "../utils/interface";
import { devDebug } from "../utils/logger";
import FilmAPIClient from "../services/film-api-client";
// import data from "../test/data.json";
import { QUERY_FILTERS } from "../utils/filters";
import { AxiosResponse } from "axios";

// Create an  instance of the API client custom to login
const FilmClient = (filter: string) => {
  const url: string = `/${filter}`;
  const client = new FilmAPIClient(url);
  return client;
};

// Create a hook that makes the query to the API
const useFilmInfiniteQuery = ({ searchQuery = "" }) => {
  const fetchFilms = async () => {
    const client = FilmClient(QUERY_FILTERS.search(searchQuery));
    devDebug("FilmClient", client);
    try {
      // const result = data;
      const result: ResponseInterface = await client.get();
      return result;
    } catch (e) {
      console.error("useGetUser error:", e);
      return e;
    }
  };

  // https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
  return useReactInfiniteQuery({
    queryKey: ["film", { searchQuery }],
    queryFn: fetchFilms,
    refetchOnWindowFocus: false,
    staleTime: ms("24h"),
    enabled: searchQuery.length > 0,
    keepPreviousData: true,
    getNextPageParam: (lastPage = 0, allPages) =>
      (lastPage as AxiosResponse)?.data?.items?.length &&
      (lastPage as AxiosResponse).data.items.length > 0
        ? (lastPage as AxiosResponse).data.items.length
        : null,
  });
};

export default useFilmInfiniteQuery;
