import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";

const styles = {
  container: {},
};

const GamesSearchBar: React.FC<PropsWithChildren> = () => {
  return (
    <Box style={styles.container}>
      <Typography>GamesSearchBar</Typography>
    </Box>
  );
};

export default GamesSearchBar;
