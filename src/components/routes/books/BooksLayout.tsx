import React, { type PropsWithChildren } from "react";
import BooksSearchBar from "./components/BooksSearchBar";
import { Outlet } from "react-router-dom";

const BooksLayout: React.FC<PropsWithChildren> = () => {
  return (
    <>
      <BooksSearchBar />
      <div className="p-5">
        <Outlet />
      </div>
    </>
  );
};

export default BooksLayout;
