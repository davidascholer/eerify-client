import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";

const styles = {
  container: {},
};

const Games: React.FC<PropsWithChildren> = () => {
  return (
    <Box style={styles.container}>
      <Typography>Games</Typography>
    </Box>
  );
};

export default Games;
