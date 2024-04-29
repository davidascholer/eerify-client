import React, { type PropsWithChildren } from "react";
import { Box } from "@mui/material";
import GamesSearchBar from "./components/GamesSearchBar";
import { Outlet } from "react-router-dom";

const GamesLayout: React.FC<PropsWithChildren> = () => {
  return (
    <>
      <GamesSearchBar />
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
};

export default GamesLayout;
