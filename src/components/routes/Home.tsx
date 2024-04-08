import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";
import UserAuthPage from "./UserAuthPage";
import useCookie from "../../lib/js-cookie/hooks/useCookie";
import useUserQuery from "../../features/user-auth/hooks/useUserQuery";
import ENDPOINTS from "../../features/user-auth/util/endpoints";

const styles = {
  container: {},
};

const Home: React.FC<PropsWithChildren> = () => {
  const authCookie = useCookie("app-auth");
  //   const refreshCookie = useCookie("app-refresh");
  const { data: userData, isLoading: userLoading } = useUserQuery(
    ENDPOINTS.me,
    authCookie.value
  );

  return (
    <Box style={styles.container}>
      <UserAuthPage />
      {!userLoading && <Typography>{JSON.stringify(userData)}</Typography>}
    </Box>
  );
};

export default Home;
