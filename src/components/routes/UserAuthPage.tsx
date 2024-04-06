import React from "react";
import { UserAuthForm } from "../user-auth/UserAuth";
import { Box } from "@mui/material";

const UserAuthPage: React.FC = () => {
  // const styles = (theme?) => ({
  //   backgroundColor: "green",
  // });

  return (
    <Box sx={{ backgroundColor: "green" }}>
      <UserAuthForm />
    </Box>
  );
};

export default UserAuthPage;
