import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Local
import { isBlacklisted } from "./blacklist";
import Toast from "../../features/toast/Toast";
import { isLoggedIn } from "../../redux/helper";
import useAutoLogin from "../../features/user-auth/hooks/useAutoLogin";
// MUI Components
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import NavBar from "./NavBar";
import { toolbarHeight } from "./constants";
import CustomToolbar from "./CustomToolbar";

const AppBar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn = isLoggedIn();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  // Returns the user data object, status string, error object, and refetch function.
  // Bypass the login page if the current page is the login page
  useAutoLogin();
  const queryParams = new URLSearchParams(window.location.search);
  const message = queryParams.get("message");

  // React.useEffect(() => {
  //   setLoggedIn(() => isLoggedIn());
  // }, [location.pathname]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {!isBlacklisted(`/${location.pathname.split("/")[1]}`) && (
        <>
          {/* Topbar */}
          <MuiAppBar
            elevation={0}
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <CustomToolbar toggleDrawer={toggleDrawer}></CustomToolbar>
          </MuiAppBar>
          {/* Sidebar */}
          <NavBar open={open} isLoggedIn={loggedIn} />
        </>
      )}
      {/* Main content */}
      <Box sx={{ mt: toolbarHeight, display: "flex", width: "100%" }}>
        {children}
      </Box>
      <Toast
        msg={message ? message : ""}
        open={!!message}
        close={() => {
          navigate(location.pathname, { replace: true });
        }}
      />
    </Box>
  );
};

export default AppBar;
