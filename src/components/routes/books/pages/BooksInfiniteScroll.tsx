/*
The Google books api does not handle pagination accurately (the totalItems field is not accurate).
*/
import React, { type PropsWithChildren } from "react";
import useBooksInfiniteQuery from "../hooks/useBooksInfiniteQuery";
import { useSearchParams } from "react-router-dom";
import BookResults from "../components/BookResults";
import { Button } from "../../../ui/button";

const Books: React.FC<PropsWithChildren> = () => {
  const [queryText, setQueryText] = React.useState<string>("");
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useBooksInfiniteQuery({
      searchQuery: queryText,
    });
  const searchParams = useSearchParams()[0];

  React.useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setQueryText(query);
    } else {
      setQueryText("");
    }
  }, [searchParams]);

  return (
    <>
      <BookResults
        data={data as any}
        isLoading={isLoading && queryText !== ""}
      />

      <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} variant="secondary" className="mt-2">
        load more
      </Button>
    </>
  );
};

export default Books;
