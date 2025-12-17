import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Local
import { isBlacklisted } from "./blacklist";
import Toast from "../../features/toast/Toast";
import { isLoggedIn } from "../../redux/helper";
import useAutoLogin from "../../features/user-auth/hooks/useAutoLogin";
import NavDrawer from "./NavDrawer";
import { AppBarStateType } from "./types";
import { toolbarSize } from "./config";
import CustomToolbar from "./CustomToolbar";

const AppBar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = React.useState<AppBarStateType>("EXPANDED");
  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn = isLoggedIn();
  const toggleDrawer = () => {
    setOpen((prev) => {
      // Cycle: icons only -> icons + text -> hidden -> icons only
      if (prev === "EXPANDED") return "SHRUNK"; // icons + text (full drawer)
      if (prev === "SHRUNK") return "HIDDEN";   // hidden
      return "EXPANDED";                          // icons only
    });
  };
  // Returns the user data object, status string, error object, and refetch function.
  // Bypass the login page if the current page is the login page
  // useAutoLogin();
  const queryParams = new URLSearchParams(window.location.search);
  const message = queryParams.get("message");

  // React.useEffect(() => {
  //   setLoggedIn(() => isLoggedIn());
  // }, [location.pathname]);

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-[#121212] text-white">
        {!isBlacklisted(`/${location.pathname.split("/")[1]}`) && (
          <>
            {/* Topbar */}
            <div className="fixed left-0 right-0 top-0 z-40">
              <CustomToolbar toggleDrawer={toggleDrawer} />
            </div>
          </>
        )}
        {/* Sidebar */}
        <NavDrawer openState={open} isLoggedIn={loggedIn} />
        {/* Main content */}
        <div
          className="w-full overflow-y-scroll bg-[#121212]"
          style={{ marginTop: toolbarSize + "px", scrollbarWidth: "none" as any }}
        >
          {children}
        </div>
      </div>
      <Toast
        msg={message ? message : ""}
        open={!!message}
        close={() => {
          navigate(location.pathname, { replace: true });
        }}
      />
    </>
  );
};

export default AppBar;
