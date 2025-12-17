/*
A wrapper for the SearchBar component to be used in a toolbar.
*/
import React from "react";
import SearchBar from "./SearchBar";
import { useLocation, useSearchParams } from "react-router-dom";
import { devDebug } from "../../logger";

// Simplified toolbar search: no remote suggestions; submits query param only.

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

  return (
    <SearchBar
      handleOnSubmit={handleOnSubmit}
      handleOnChange={handleTextChanged}
      optionList={previewList}
      loading={false}
      sx={{ width: "50%" }}
    />
  );
};

export default ToolBarSearch;
