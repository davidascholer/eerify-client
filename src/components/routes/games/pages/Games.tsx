import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";
import useGamesQuery from "../hooks/useGames";
import CenteredCircularProgress from "../../../loading/CenteredCircularProgress";

const styles = {
  container: {},
};

const Games: React.FC<PropsWithChildren> = () => {
  const { data, isLoading, error } = useGamesQuery();

  if (error) return null;

  if (isLoading) return <CenteredCircularProgress />;

  return (
    <Box style={styles.container}>
      <Typography>{JSON.stringify(data)}</Typography>
    </Box>
  );
};

export default Games;
