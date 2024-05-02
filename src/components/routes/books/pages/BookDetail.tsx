import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";

const styles = {
  container: {},
};

const BookDetail: React.FC<PropsWithChildren> = () => {
  return (
    <Box style={styles.container}>
      <Typography>BookDetail</Typography>
    </Box>
  );
};

export default BookDetail;
