import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CenteredCircularProgress from "../../../loading/CenteredCircularProgress";
import { FilmResponseInterface } from "../utils/interface";
import { devDebug } from "../utils/logger";

const styles = {
  container: {},
};

interface FilmResultsProps {
  isLoading: boolean;
  data: any;
}

const FilmResults: React.FC<FilmResultsProps> = ({ isLoading, data }) => {
  if (isLoading) return <CenteredCircularProgress />;

  useEffect(() => {
    devDebug("data", data);
  }, [data]);

  return (
    <Box style={styles.container}>
      {(data as FilmResponseInterface)?.data?.results
        ? (data as FilmResponseInterface).data.results.map((film) => (
            <Typography key={film.id} sx={{ height: "100px" }}>
              {film.title}
            </Typography>
          ))
        : null}
    </Box>
  );
};

export default FilmResults;
