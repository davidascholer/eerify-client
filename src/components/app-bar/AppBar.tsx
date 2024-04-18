import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MainListItems, SecondaryListItems } from "./Options";
import SpiderWebIcon from "../../assets/icons/SpiderWebIcon";
import EerifyHoriz from "../../assets/icons/EerifyHoriz";
import { PATHS } from "../../app-root/AppRouter";
import { Typography } from "@mui/material";
import { useHandleNavigate } from "../../lib/react-router/hooks";

const drawerWidth: string = "240px";
const toolbarHeight: string = "65px";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    paddingTop: toolbarHeight,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

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
        height: toolbarHeight,
        overflow: "hidden",
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        borderBottom: 1,
        borderColor: (theme) => theme.palette.divider,
        backgroundColor: (theme) => theme.palette.primary.main,
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
          <SpiderWebIcon sx={{ width: toolbarHeight, height: toolbarHeight }} />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="home"
          sx={{
            borderRadius: 4,
            m: 0,
            p: 0,
          }}
          onClick={() => handleNavigate(PATHS.HOME)}
        >
          <EerifyHoriz
            sx={{
              height: toolbarHeight,
              width: "inherit",
              p: 1,
              ml: 2,
            }}
          />
        </IconButton>
      </Box>
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

const AppBar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <MuiAppBar
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CustomToolbar toggleDrawer={toggleDrawer}></CustomToolbar>
      </MuiAppBar>
      <Drawer variant="permanent" open={open}>
        {/* Drawer items */}
        <List component="nav">
          <MainListItems />
          <Divider sx={{ my: 1 }} />
          <SecondaryListItems />
        </List>
        <Typography
          sx={{
            display: "flex",
            fontFamily: "typeface Roboto",
            justifyContent: "center",
            alignItems: "center",
            m: 2,
            mt: "auto",
          }}
        >
          v 0.0.1
        </Typography>
      </Drawer>
      {/* Main content */}
      <Box sx={{ mt: toolbarHeight, display: "flex", width: "100%" }}>
        {children}
      </Box>
    </Box>
  );
};

export default AppBar;
