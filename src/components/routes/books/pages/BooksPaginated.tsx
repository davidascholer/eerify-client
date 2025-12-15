/*
The Google books api does not handle pagination accurately (the totalItems field is not accurate).
*/
import React, { type PropsWithChildren } from "react";
import useBooksQuery from "../hooks/useBooksQuery";
import { useSearchParams } from "react-router-dom";
import BookResults from "../components/BookResults";
import { Button } from "@mui/material";

const Books: React.FC<PropsWithChildren> = () => {
  const [queryText, setQueryText] = React.useState<string>("");

  const [page, setPage] = React.useState<number>(1);
  const { data, isLoading, error } = useBooksQuery({
    searchQuery: queryText,
  });
  const searchParams = useSearchParams()[0];

  const responseValid = !!(data as any)?.data?.items;

  React.useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setQueryText(query);
      setPage(0);
    } else {
      setQueryText("");
    }
  }, [searchParams]);

  const decrementPage = () => {
    setPage((page) => {
      return page > 0 ? page - 1 : page;
    });
  };
  const incrementPage = () => {
    if (responseValid) {
      setPage((page) => {
        return page + 1;
      });
    }
  };

  return (
    <>
      <BookResults
        data={data as any}
        isLoading={isLoading && queryText !== ""}
      />

      <Button disabled={!responseValid} onClick={decrementPage}>
        previous
      </Button>
      <Button disabled={!responseValid} onClick={incrementPage}>
        next
      </Button>
    </>
  );
};

export default Books;
