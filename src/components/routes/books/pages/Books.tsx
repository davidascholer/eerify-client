import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";
import useBooksQuery from "../hooks/useBooksQuery";
import CenteredCircularProgress from "../../../loading/CenteredCircularProgress";

const styles = {
  container: {},
};

const Books: React.FC<PropsWithChildren> = () => {
  const { data, isLoading, error } = useBooksQuery();

  if (error) return null;

  if (isLoading) return <CenteredCircularProgress />;

  return (
    <Box style={styles.container}>
      <Typography>{JSON.stringify(data)}</Typography>
    </Box>
  );
};

export default Books;
