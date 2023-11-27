import { Outlet } from "react-router-dom";
import NavBar from "../navbar/NavBar"
import PATHS from "../../router/paths";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Root() {

  const navigate = useNavigate();

  useEffect(() => {
    navigate(PATHS.HOME);
  }, [navigate]);

    return (
      <>
        <NavBar/>
        <Outlet />
      </>
    );
  }