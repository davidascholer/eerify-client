import React, { type PropsWithChildren } from "react";
import { Box } from "@mui/material";
import GamesNavigation from "./GamesNavigation";
import { Outlet } from "react-router-dom";

// const styles = {
//   container: {},
// };

const GamesLayout: React.FC<PropsWithChildren> = () => {
  return (
    <>
      <GamesNavigation />
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
};

export default GamesLayout;
