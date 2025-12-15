import React, { type PropsWithChildren } from "react";
import { Box } from "@mui/material";
import useGamesQuery from "../hooks/useGamesQuery";
import { useSearchParams } from "react-router-dom";
import GamesResult from "../components/GamesResult";

const styles = {
  container: {},
};

const Games: React.FC<PropsWithChildren> = () => {
  const [queryText, setQueryText] = React.useState<string>("");
  const { data, isLoading, error } = useGamesQuery({ searchQuery: queryText });
  const searchParams = useSearchParams()[0];

  React.useEffect(() => {
    const filmQuery = searchParams.get("search");
    if (filmQuery) {
      setQueryText(filmQuery);
    } else {
      setQueryText("");
    }
  }, [searchParams]);

  return (
    <Box style={styles.container}>
      <GamesResult isLoading={isLoading && queryText !== ""} data={data} />
    </Box>
  );
};

export default Games;
