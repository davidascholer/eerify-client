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
import GAMES_ENDPOINTS from "../routes/games/utils/endpoints";
import useGamesQuery from "../routes/games/hooks/useGamesQuery";
import { GameResult } from "../routes/games/utils/interface";
import { devDebug } from "../../logger";

const FilmSearchBar = ({
  queryText,
  previewList,
  setPreviewList,
  handleTextChanged,
  handleOnSubmit,
}: any) => {
  const { data, isLoading, error } = useFilmQuery({ searchQuery: queryText });

  React.useEffect(() => {
    if (data) {
      const returnArray: string[] = [];
      (data as FilmResponseInterface).data?.results?.map((film) =>
        returnArray.push(film.title.toLowerCase())
      );
      const uniqueArray = [...new Set(returnArray)];
      setPreviewList(uniqueArray);
    }
  }, [data]);

  return (
    <SearchBar
      handleOnSubmit={handleOnSubmit}
      handleOnChange={handleTextChanged}
      optionList={previewList}
      loading={isLoading && queryText !== ""}
      sx={{ width: "50%" }}
    />
  );
};

const BooksSearchBar = ({
  queryText,
  previewList,
  setPreviewList,
  handleTextChanged,
  handleOnSubmit,
}: any) => {
  const { data, isLoading, error } = useBooksQuery({ searchQuery: queryText });

  React.useEffect(() => {
    if (data) {
      const returnArray: string[] = [];
      (data as AxiosResponse)?.data?.items?.map((book: BookResult) => {
        let title = book.volumeInfo.title.toLowerCase();
        // if (title.length > 30) title = title.substring(0, 30) + "...";
        return returnArray.push(title);
      });
      const uniqueArray = [...new Set(returnArray)];
      devDebug("uniqueArray", uniqueArray);
      setPreviewList(uniqueArray);
    }
  }, [data]);

  return (
    <SearchBar
      handleOnSubmit={handleOnSubmit}
      handleOnChange={handleTextChanged}
      optionList={previewList}
      loading={isLoading && queryText !== ""}
      sx={{ width: "50%" }}
    />
  );
};

const GamesSearchBar = ({
  queryText,
  previewList,
  setPreviewList,
  handleTextChanged,
  handleOnSubmit,
}: any) => {
  const { data, isLoading, error } = useGamesQuery({ searchQuery: queryText });

  React.useEffect(() => {
    if (data) {
      const returnArray: string[] = [];
      (data as AxiosResponse).data.results.map((game: GameResult) =>
        returnArray.push(game.name.toLowerCase())
      );
      const uniqueArray = [...new Set(returnArray)];
      setPreviewList(uniqueArray);
    }
  }, [data]);

  return (
    <SearchBar
      handleOnSubmit={handleOnSubmit}
      handleOnChange={handleTextChanged}
      optionList={previewList}
      loading={isLoading && queryText !== ""}
      sx={{ width: "50%" }}
    />
  );
};

const ToolBarSearch: React.FC = () => {
  const [queryText, setQueryText] = React.useState<string>("");
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [previewList, setPreviewList] = React.useState<Array<string>>([]);

  const handleTextChanged = (newQueryString: string) => {
    setQueryText(newQueryString);
  };

  const handleOnSubmit = (completedQueryString: string) => {
    setQueryText(completedQueryString);
    setSearchParams({ search: completedQueryString });
  };

  React.useEffect(() => {
    const filmQuery = searchParams.get("search");
    if (!filmQuery) {
      setQueryText("");
      setPreviewList([]);
    }
  }, [location.pathname]);

  /*
  Here, the search bar will render different components based on the current location.
  The ideal way would be to render conditional hooks based on the location, but that is not possible.
  */
  if (location.pathname.includes(FILM_ENDPOINTS.films)) {
    return (
      <FilmSearchBar
        queryText={queryText}
        previewList={previewList}
        setPreviewList={setPreviewList}
        handleTextChanged={handleTextChanged}
        handleOnSubmit={handleOnSubmit}
      />
    );
  }
  if (location.pathname.includes(BOOKS_ENDPOINTS.books)) {
    return (
      <BooksSearchBar
        queryText={queryText}
        previewList={previewList}
        setPreviewList={setPreviewList}
        handleTextChanged={handleTextChanged}
        handleOnSubmit={handleOnSubmit}
      />
    );
  }
  if (location.pathname.includes(GAMES_ENDPOINTS.games)) {
    return (
      <GamesSearchBar
        queryText={queryText}
        previewList={previewList}
        setPreviewList={setPreviewList}
        handleTextChanged={handleTextChanged}
        handleOnSubmit={handleOnSubmit}
      />
    );
  }
};

export default ToolBarSearch;
