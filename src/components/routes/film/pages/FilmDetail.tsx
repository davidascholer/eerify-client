import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";

const styles = {
  container: {},
};

const FilmDetail: React.FC<PropsWithChildren> = () => {
  return (
    <Box style={styles.container}>
      <Typography>FilmDetail</Typography>
    </Box>
  );
};

export default FilmDetail;
