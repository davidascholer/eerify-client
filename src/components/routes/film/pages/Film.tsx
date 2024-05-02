import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";
import useFilmQuery from "../hooks/useFilmQuery";
import CenteredCircularProgress from "../../../loading/CenteredCircularProgress";

const styles = {
  container: {},
};

const Film: React.FC<PropsWithChildren> = () => {
  const { data, isLoading, error } = useFilmQuery();

  if (error) return null;

  if (isLoading) return <CenteredCircularProgress />;

  return (
    <Box style={styles.container}>
      <Typography>{JSON.stringify(data)}</Typography>
    </Box>
  );
};

export default Film;
