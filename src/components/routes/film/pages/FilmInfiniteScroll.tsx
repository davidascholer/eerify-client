import React, { type PropsWithChildren } from "react";
import { Box, Button } from "@mui/material";
import useFilmInfiniteQuery from "../hooks/useFilmInfiniteQuery";
import CenteredCircularProgress from "../../../loading/CenteredCircularProgress";
import { useSearchParams } from "react-router-dom";
import FilmResults from "../components/FilmResults";

const styles = {
  container: {},
};

const Film: React.FC<PropsWithChildren> = () => {
  const [queryText, setQueryText] = React.useState<string>("");
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useFilmInfiniteQuery({ searchQuery: queryText });
  const searchParams = useSearchParams()[0];

  React.useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setQueryText(query);
    } else {
      setQueryText("");
    }
  }, [searchParams]);

  if (isLoading && queryText !== "") return <CenteredCircularProgress />;

  return (
    <Box style={styles.container}>
      {data?.pages
        ? data.pages.map((page: any) => (
            <FilmResults
              data={page}
              isLoading={isLoading && queryText !== ""}
            />
          ))
        : null}
      <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
        load more
      </Button>
    </Box>
  );
};

export default Film;
