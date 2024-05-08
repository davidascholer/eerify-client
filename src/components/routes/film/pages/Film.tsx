import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";
import useFilmQuery from "../hooks/useFilmQuery";
import CenteredCircularProgress from "../../../loading/CenteredCircularProgress";
import { FilmResponseInterface } from "../utils/interface";
import { useSearchParams } from "react-router-dom";

const styles = {
  container: {},
};

const Film: React.FC<PropsWithChildren> = () => {
  const [queryText, setQueryText] = React.useState<string>("");
  const { data, isLoading, error } = useFilmQuery({ searchQuery: queryText });
  const searchParams = useSearchParams()[0];

  React.useEffect(() => {
    const filmQuery = searchParams.get("film-query");
    if (filmQuery) {
      setQueryText(filmQuery);
    } else {
      setQueryText("");
    }
  }, [searchParams]);

  if (isLoading) return <CenteredCircularProgress />;

  return (
    <Box style={styles.container}>
      {(data as FilmResponseInterface)?.data?.results
        ? (data as FilmResponseInterface).data.results.map((film) => (
            <Typography key={film.id}>{film.title}</Typography>
          ))
        : null}
    </Box>
  );
};

export default Film;
