import React, { type PropsWithChildren } from "react";
import { Box } from "@mui/material";
import useFilmQuery from "../hooks/useFilmQuery";
import CenteredCircularProgress from "../../../loading/CenteredCircularProgress";
import { useSearchParams } from "react-router-dom";
import FilmResults from "../components/FilmResults";

const styles = {
  container: {},
};

const FilmPaginated: React.FC<PropsWithChildren> = () => {
  const [queryText, setQueryText] = React.useState<string>("");
  const { data, isLoading } = useFilmQuery({ searchQuery: queryText });
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
      <FilmResults data={data} isLoading={isLoading && queryText !== ""} />
    </Box>
  );
};

export default FilmPaginated;
