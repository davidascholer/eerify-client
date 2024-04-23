import AppBar from "../app-bar/AppBar";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <AppBar>
      <Outlet />
    </AppBar>
  );
}
