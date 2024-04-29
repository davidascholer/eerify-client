import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";

const styles = {
  container: {},
};

const GamesDetail: React.FC<PropsWithChildren> = () => {
  return (
    <Box style={styles.container}>
      <Typography>GamesDetail</Typography>
    </Box>
  );
};

export default GamesDetail;
