// Basic filters for all root endpoints.

import { RESULT_COUNT } from "./constants";
import { LanguageType } from "./interface";

// Omitting: subject, isbn, lccn, oclc

export const QUERY_FILTERS = {
  // Search queries must be called first.
  // e.g. q=+intitle:"harry+potter" OR q=+inauthor:"rowling"
  searchTitle: (search: string) =>
    "+intitle=" + search + "&maxResults=" + RESULT_COUNT,
  searchAuthor: (search: string) => "+inauthor=" + search,
  searchPublisher: (search: string) => "+inpublisher=" + search,
  searchTitleWithPage: (search: string, page: number) =>
    "+intitle=" +
    `${search}` +
    "&maxResults=" +
    RESULT_COUNT +
    "&startIndex=" +
    (page * RESULT_COUNT + 1).toString(),
  free: () => "&filter=free-ebooks",
  paid: () => "&filter=paid-ebooks",
  paidOrFree: () => "&filter=ebooks",
  language: (lang: LanguageType) => "&langRestrict=" + lang,
  orderBy: (field: "relevance" | "newest") => "&orderBy=" + field,
  printType: (field: "all" | "books" | "magazines") => "&printType=" + field,
};

// Poster path =  https://image.tmdb.org/t/p/w185/ + poster_path
/*
  "w45",
  "w92",
  "w154",
  "w185",
  "w300",
  "w500",
  "original"
  */
