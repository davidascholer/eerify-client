import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";

const styles = {
  container: {},
};

const FilmSearchBar: React.FC<PropsWithChildren> = () => {
  return (
    <Box style={styles.container}>
      <Typography>FilmSearchBar</Typography>
    </Box>
  );
};

export default FilmSearchBar;
