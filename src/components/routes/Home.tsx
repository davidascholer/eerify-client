import React, { type PropsWithChildren } from "react";
import { Box } from "@mui/material";
import UserAuthPage from "./UserAuthPage";

const styles = {
  container: {},
};

const Home: React.FC<PropsWithChildren> = () => {
  return (
    <Box style={styles.container}>
      <UserAuthPage />
    </Box>
  );
};

export default Home;
