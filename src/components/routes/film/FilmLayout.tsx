import React, { type PropsWithChildren } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const FilmLayout: React.FC<PropsWithChildren> = () => {
  return (
    <>
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
};

export default FilmLayout;
