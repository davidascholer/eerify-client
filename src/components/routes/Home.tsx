import React, { type PropsWithChildren } from "react";
import { Box } from "@mui/material";

const styles = {
  container: {},
};

const Home: React.FC<PropsWithChildren> = () => {
  return (
    <Box style={styles.container}>
      <h1>Home</h1>
    </Box>
  );
};

export default Home;
