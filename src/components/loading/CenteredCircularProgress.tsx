import { Box, CircularProgress } from "@mui/material";
import React from "react";

const CenteredCircularProgress: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        my: 2,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default CenteredCircularProgress;
