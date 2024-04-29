import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";

const styles = {
  container: {},
};

const GamesNavigation: React.FC<PropsWithChildren> = () => {
  return (
    <Box style={styles.container}>
      <Typography>GamesNavigation</Typography>
    </Box>
  );
};

export default GamesNavigation;
