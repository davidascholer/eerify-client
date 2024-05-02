import ms from "ms";
import useReactQuery from "../../../../lib/react-query/useReactQuery";
import BOOKS_ENDPOINTS from "../utils/endpoints";
// import { ResponseInterface } from "../utils/interface";
import { devDebug } from "../utils/logger";
import BooksAPIClient from "../services/books-api-client";
import data from "../test/data.json";

// Create an  instance of the API client custom to login
const BooksClient = (filter: string) => {
  const url: string = `/${filter}`;
  const client = new BooksAPIClient(url);
  return client;
};

// Create a hook that makes the query to the API
const useBooksQuery = () => {
  const fetchBooks = async () => {
    const client = BooksClient(BOOKS_ENDPOINTS.books);
    devDebug("BooksClient", client);
    try {
      const result = data;
      // const result: ResponseInterface = await client.get();
      return result;
    } catch (e) {
      console.error("useGetUser error:", e);
      return e;
    }
  };

  // https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
  return useReactQuery({
    queryKey: BOOKS_ENDPOINTS.books.split("/"),
    queryFn: fetchBooks,
    refetchOnWindowFocus: false,
    staleTime: ms("24h"),
  });
};

export default useBooksQuery;
