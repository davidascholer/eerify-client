// Basic filters for all root endpoints.

import { RESULT_COUNT } from "./constants";
import { LanguageType } from "./interface";

// Omitting: subject, isbn, lccn, oclc

export const QUERY_FILTERS = {
  // Search queries must be called first and only one.
  // e.g. q=+intitle:"harry+potter" OR q=+inauthor:"rowling"
  searchTitle: (search: string) => "+intitle=" + search,
  searchAuthor: (search: string) => "+inauthor=" + search,
  searchPublisher: (search: string) => "+inpublisher=" + search,
  page: (page: number) => "&startIndex=" + page * RESULT_COUNT,
  free: () => "&filter=free-ebooks",
  paid: () => "&filter=paid-ebooks",
  paidOrFree: () => "&filter=ebooks",
  language: (lang: LanguageType) => "&langRestrict=" + lang,
  orderBy: (field: "relevance" | "newest") => "&orderBy=" + field,
  printType: (field: "all" | "books" | "magazines") => "&printType=" + field,
};
