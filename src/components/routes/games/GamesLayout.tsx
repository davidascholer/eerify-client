import React, { type PropsWithChildren } from "react";
import GamesSearchBar from "./components/GamesSearchBar";
import { Outlet } from "react-router-dom";

const GamesLayout: React.FC<PropsWithChildren> = () => {
  return (
    <>
      <GamesSearchBar />
      <div className="p-5">
        <Outlet />
      </div>
    </>
  );
};

export default GamesLayout;
