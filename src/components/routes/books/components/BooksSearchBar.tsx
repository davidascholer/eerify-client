import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";

const styles = {
  container: {},
};

const BooksSearchBar: React.FC<PropsWithChildren> = () => {
  return (
    <Box style={styles.container}>
      <Typography>BooksSearchBar</Typography>
    </Box>
  );
};

export default BooksSearchBar;
