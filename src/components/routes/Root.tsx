import { useEffect } from "react";
import AppBar from "../app-bar/AppBar";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { PATHS } from "../../app-root/AppRouter";

export default function Root() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === PATHS.ROOT) navigate(PATHS.HOME);
  }, [location.pathname, navigate]);

  return (
    <>
      <AppBar>
        <Outlet />
      </AppBar>
    </>
  );
}
