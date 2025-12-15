import ms from "ms";
import useReactInfiniteQuery from "../../../../lib/react-query/useReactInfiniteQuery";
import { ResponseInterface } from "../utils/interface";
import { devDebug } from "../utils/logger";
import BooksAPIClient from "../services/books-api-client";
import { QUERY_FILTERS } from "../utils/filters";
import { AxiosResponse } from "axios";
// import data from "../test/data.json";

// Create an  instance of the API client custom to login
const BooksClient = (filter: string) => {
  const url: string = `/?q=""${filter}`;
  const client = new BooksAPIClient(url);
  return client;
};

// Create a hook that makes the query to the API
const useBooksQuery = ({ searchQuery = "" }) => {
  const fetchBooks = async ({ pageParam = 0 }) => {
    const client = BooksClient(
      QUERY_FILTERS.searchTitleWithPage(searchQuery, pageParam)
    );
    try {
      // const result = data;
      const result: ResponseInterface = await client.get();
      devDebug("useBooksQuery result", result);
      return result;
    } catch (e) {
      console.error("useGetUser error:", e);
      return e;
    }
  };

  // https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
  return useReactInfiniteQuery({
    queryKey: ["books", { searchQuery }],
    queryFn: fetchBooks,
    refetchOnWindowFocus: false,
    staleTime: ms("24h"),
    enabled: searchQuery.length > 0,
    keepPreviousData: true,
    getNextPageParam: (lastPage = 0, allPages) => {
      return (lastPage as AxiosResponse).data.items.length > 0
        ? (lastPage as AxiosResponse).data.items.length
        : undefined;
    },
  });
};

export default useBooksQuery;
