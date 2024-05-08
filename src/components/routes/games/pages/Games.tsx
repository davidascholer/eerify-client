import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";
import useGamesQuery from "../hooks/useGamesQuery";
import { AxiosResponse } from "axios";
import { useSearchParams } from "react-router-dom";
import CenteredCircularProgress from "../../../loading/CenteredCircularProgress";
import { GameResult } from "../utils/interface";

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

  if (isLoading && queryText !== "") return <CenteredCircularProgress />;

  return (
    <Box style={styles.container}>
      {(data as AxiosResponse)?.data?.results
        ? (data as AxiosResponse).data.results.map((game: GameResult) => (
            <Typography key={game.id}>{game.name}</Typography>
          ))
        : null}
    </Box>
  );
};

export default Games;
