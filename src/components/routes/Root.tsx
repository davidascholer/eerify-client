import { useEffect } from "react";
import AppBar from "../app-bar/AppBar";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") navigate("/home");
  }, [location.pathname, navigate]);

  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}
