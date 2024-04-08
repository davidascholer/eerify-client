import React from "react";
import { UserAuthForm } from "../../features/user-auth/UserAuthForm";
import { Box } from "@mui/material";

const styles = () => ({
  container: {
    width: "100%",
    backgroundColor: "green",
    display: "flex",
    justifyContent: "center",
  },
});

const UserAuthPage: React.FC = () => {
  return (
    <Box sx={styles().container}>
      <UserAuthForm />
    </Box>
  );
};

export default UserAuthPage;
