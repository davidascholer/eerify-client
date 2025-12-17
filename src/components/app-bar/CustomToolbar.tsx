import * as React from "react";
// Local
import SpiderWebIcon from "../../assets/icons/SpiderWebIcon";
import EerifyHoriz from "../../assets/icons/EerifyHoriz";
import { useHandleNavigate } from "../../lib/react-router/hooks";
import { PATHS } from "../../app/paths";
// MUI Components
import NotificationsIcon from "@mui/icons-material/Notifications";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import { toolbarSize } from "./config";
import ToolBarSearch from "../search-bar/ToolBarSearch";

const CustomToolbar = ({
  toggleDrawer,
}: {
  toggleDrawer: React.Dispatch<React.SetStateAction<void>>;
}) => {
  const handleNavigate = useHandleNavigate();
  return (
    <Toolbar
      disableGutters
      sx={{
        height: toolbarSize + "px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        borderBottom: 1,
        borderColor: (theme) => theme.palette.divider,
        backgroundColor: (theme) => theme.colors.backgroundColor,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          sx={{
            // "&:hover": {
            borderRadius: 2,
            // },
            boxSizing: "content-box",
            m: 0,
            p: 0,
          }}
          onClick={() => toggleDrawer()}
        >
          <SpiderWebIcon
            sx={{ width: toolbarSize + "px", height: toolbarSize + "px" }}
          />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="home"
          sx={{
            borderRadius: 4,
            m: 0,
            p: 0,
          }}
          onClick={() => handleNavigate(PATHS.ROOT)}
        >
          <EerifyHoriz
            sx={{
              height: toolbarSize + "px",
              width: "inherit",
              p: 1,
              ml: 2,
            }}
          />
        </IconButton>
      </Box>
      <ToolBarSearch />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          mr: 2,
        }}
      >
        <IconButton
          color="inherit"
          onClick={() => handleNavigate(PATHS.NOTIFICATIONS)}
        >
          <Badge badgeContent={1}>
            <NotificationsIcon
              sx={{
                color: (theme) => theme.colors.iconColor,
                transform: " scale(1.4)",
              }}
            />
          </Badge>
        </IconButton>
      </Box>
    </Toolbar>
  );
};

export default CustomToolbar;
