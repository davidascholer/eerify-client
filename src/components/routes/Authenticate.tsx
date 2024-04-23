import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";

const styles = {
  container: {},
};

const Authenticate: React.FC<PropsWithChildren> = () => {
  return (
    <Box style={styles.container}>
      <Typography>Authenticate</Typography>
    </Box>
  );
};

export default Authenticate;
