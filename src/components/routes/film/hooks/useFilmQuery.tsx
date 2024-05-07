import ms from "ms";
import useReactQuery from "../../../../lib/react-query/useReactQuery";
import FILM_ENDPOINTS from "../utils/endpoints";
import { ResponseInterface } from "../utils/interface";
import { devDebug } from "../utils/logger";
import FilmAPIClient from "../services/film-api-client";
// import data from "../test/data.json";
import { QUERY_FILTERS } from "../utils/filters";

// Create an  instance of the API client custom to login
const FilmClient = (filter: string) => {
  const url: string = `/${filter}`;
  const client = new FilmAPIClient(url);
  return client;
};

// Create a hook that makes the query to the API
const useFilmQuery = ({ searchQuery = "" }) => {
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
  return useReactQuery({
    queryKey: [...FILM_ENDPOINTS.film.split("/"), { searchQuery }],
    queryFn: fetchFilms,
    refetchOnWindowFocus: false,
    staleTime: ms("24h"),
  });
};

export default useFilmQuery;
