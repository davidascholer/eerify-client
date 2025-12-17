import React, { useRef, type PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import useGamesInfiniteQuery from "../hooks/useGamesInfiniteQuery";
import { useSearchParams } from "react-router-dom";
import GamesResult from "../components/GamesResult";
import useOnScreen from "../hooks/useOnScreen";

const styles = {
  container: {},
};

const Games: React.FC<PropsWithChildren> = () => {
  const [queryText, setQueryText] = React.useState<string>("");
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGamesInfiniteQuery({ searchQuery: queryText });
  const searchParams = useSearchParams()[0];
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  React.useEffect(() => {
    const filmQuery = searchParams.get("search");
    if (filmQuery) {
      setQueryText(filmQuery);
    } else {
      setQueryText("");
    }
  }, [searchParams]);

  const onScroll = (event: any) => {
    if (isVisible) console.debug("bottom");
  };

  return (
    <div style={styles.container} onScroll={onScroll}>
      {data?.pages
        ? data.pages.map((page: any) => (
            <GamesResult
              isLoading={isLoading && queryText !== ""}
              data={page.data}
            />
          ))
        : null}
      <Button
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage || !hasNextPage}
        variant="secondary"
        className="mt-2"
      >
        load more
      </Button>
      <div ref={ref} />
    </div>
  );
};

export default Games;
