import React, { type PropsWithChildren } from "react";
import { Box } from "@mui/material";
import BooksSearchBar from "./components/BooksSearchBar";
import { Outlet } from "react-router-dom";

const BooksLayout: React.FC<PropsWithChildren> = () => {
  return (
    <>
      <BooksSearchBar />
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
};

export default BooksLayout;
