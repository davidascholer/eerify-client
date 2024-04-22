import React from "react";
import UserAuthPage from "../../features/user-auth/pages/UserAuthPage";
import { Box } from "@mui/material";
import EerifyLogo from "../../assets/icons/EerifyLogo";

const styles = {
  width: "100%",
  objectFit: "contain",
  minWidth: "300px",
  maxWidth: "800px",
};

const UserAuth: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        m: 2,
      }}
    >
      <EerifyLogo sx={{ width: "300px", height: "300px", m: 5, mb: 10 }} />
      <UserAuthPage propStyles={styles} />
    </Box>
  );
};

export default UserAuth;
