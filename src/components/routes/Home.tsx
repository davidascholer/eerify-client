import React, { type PropsWithChildren } from "react";
import { Box, Button } from "@mui/material";
import useAutoLogin from "../../features/user-auth/hooks/useAutoLogin";
import useLogout from "../../features/user-auth/hooks/useLogout";

const styles = {
  container: {},
};

const Home: React.FC<PropsWithChildren> = () => {
  // Returns the user data object, status string, error object, and refetch function.
  const loginState = useAutoLogin();
  const logout = useLogout();
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
      <br></br>
      <Button onClick={logout}>Logout</Button>
    </Box>
  );
};

export default Home;
