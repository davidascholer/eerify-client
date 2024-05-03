export const ROOT_API = import.meta.env.VITE_BOOKS_API_ADDRESS;

import { RESULT_COUNT } from "./constants";

export const BOOKS_ENDPOINTS = {
  books: "books",
  book: "books/:id",
};

export const booksQuery = (query: string | undefined) =>
  BOOKS_ENDPOINTS.books + '&q="' + query
    ? query
    : '"' + "&maxResults=" + RESULT_COUNT;
