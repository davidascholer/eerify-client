import React, { type PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

const FilmLayout: React.FC<PropsWithChildren> = () => {
  return (
    <>
      <div className="p-5">
        <Outlet />
      </div>
    </>
  );
};

export default FilmLayout;
