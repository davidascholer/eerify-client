import React, { type PropsWithChildren } from "react";
import { Box } from "@mui/material";
import useAutoLogin from "../../features/user-auth/hooks/useAutoLogin";

const styles = {
  container: {},
};

const Home: React.FC<PropsWithChildren> = () => {
  // Returns the user data object, status string, error object, and refetch function.
  const loginState = useAutoLogin();
  return (
    <Box style={styles.container}>
      Status:
      {loginState.status}
      <br />
      Data:
      {JSON.stringify(loginState.data)}
      <br />
      Error:
      {JSON.stringify(loginState.error)}
    </Box>
  );
};

export default Home;
