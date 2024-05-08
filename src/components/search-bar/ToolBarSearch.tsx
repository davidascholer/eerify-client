/*
A wrapper for the SearchBar component to be used in a toolbar.
*/
import React from "react";
import SearchBar from "./SearchBar";
import useFilmQuery from "../routes/film/hooks/useFilmQuery";
import { FilmResponseInterface } from "../routes/film/utils/interface";
import { useLocation, useSearchParams } from "react-router-dom";
import FILM_ENDPOINTS from "../routes/film/utils/endpoints";
import BOOKS_ENDPOINTS from "../routes/books/utils/endpoints";
import useBooksQuery from "../routes/books/hooks/useBooksQuery";
import { BookResult } from "../routes/books/utils/interface";
import { AxiosResponse } from "axios";

const FilmSearchBar = () => {
  const [queryText, setQueryText] = React.useState<string>("");
  const { data, isLoading, error } = useFilmQuery({ searchQuery: queryText });
  const [filmPreviewList, setFilmPreviewList] = React.useState<Array<string>>(
    []
  );
  const setSearchParams = useSearchParams()[1];

  React.useEffect(() => {
    if (data) {
      const returnArray: string[] = [];
      (data as FilmResponseInterface).data?.results?.map((film) =>
        returnArray.push(film.title.toLowerCase())
      );
      const uniqueArray = [...new Set(returnArray)];
      setFilmPreviewList(uniqueArray);
    }
  }, [data]);

  const handleTextChanged = (newQueryString: string) => {
    setQueryText(newQueryString);
  };

  const handleOnSubmit = (completedQueryString: string) => {
    setQueryText(completedQueryString);
    setSearchParams({ "film-query": completedQueryString });
  };

  return (
    <SearchBar
      handleOnSubmit={handleOnSubmit}
      handleOnChange={handleTextChanged}
      optionList={filmPreviewList}
      loading={isLoading}
      sx={{ width: "50%" }}
    />
  );
};

const BookSearchBar = () => {
  const [queryText, setQueryText] = React.useState<string>("");
  const { data, isLoading, error } = useBooksQuery({ searchQuery: queryText });
  const [bookPreviewList, setBookPreviewList] = React.useState<Array<string>>(
    []
  );
  const setSearchParams = useSearchParams()[1];

  React.useEffect(() => {
    if (data) {
      const returnArray: string[] = [];
      (data as AxiosResponse).data.items.map((book: BookResult) =>
        returnArray.push(book.volumeInfo.title.toLowerCase())
      );
      const uniqueArray = [...new Set(returnArray)];
      setBookPreviewList(uniqueArray);
    }
  }, [data]);

  const handleTextChanged = (newQueryString: string) => {
    setQueryText(newQueryString);
  };

  const handleOnSubmit = (completedQueryString: string) => {
    setQueryText(completedQueryString);
    setSearchParams({ "film-query": completedQueryString });
  };

  return (
    <SearchBar
      handleOnSubmit={handleOnSubmit}
      handleOnChange={handleTextChanged}
      optionList={bookPreviewList}
      loading={isLoading}
      sx={{ width: "50%" }}
    />
  );
};

const ToolBarSearch: React.FC = () => {
  const location = useLocation();
  if (location.pathname.includes(FILM_ENDPOINTS.films)) {
    return <FilmSearchBar />;
  }
  if (location.pathname.includes(BOOKS_ENDPOINTS.books)) {
    return <BookSearchBar />;
  }
};

export default ToolBarSearch;
