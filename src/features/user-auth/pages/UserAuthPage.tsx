/*
A generic page for user authentication. Wrap, replace, or move this page with the apps authentication structure.
*/
import React from "react";
import { UserAuthForm } from "../components/user-auth-form/UserAuthForm";
import { Box } from "@mui/material";

const styles = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  child: {},
};

const UserAuthPage: React.FC = () => {
  return (
    <Box sx={styles.container}>
      <UserAuthForm sx={styles.child} />
    </Box>
  );
};

export default UserAuthPage;
