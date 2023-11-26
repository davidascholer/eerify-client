import { Outlet } from "react-router-dom";
import NavBar from "../navbar/NavBar"

export default function Root() {
    
    return (
      <>
        <NavBar/>
        <Outlet />
      </>
    );
  }