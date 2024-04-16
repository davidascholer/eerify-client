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
import { mainListItems, secondaryListItems } from "./Options";
import ThemedIcon from "../../theme/ThemedIcon";
import SpiderWebIcon from "../../assets/icons/SpiderWebIcon";
import EerifyHoriz from "../../assets/icons/EerifyHoriz";

const drawerWidth: number = 240;
const drawerHeight: number = 65;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    marginTop: drawerHeight,
    backgroundColor: theme.palette.primary,
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
  return (
    <Toolbar
      disableGutters
      sx={{
        height: drawerHeight,
        overflow: "hidden",
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
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
          <SpiderWebIcon sx={{ width: drawerHeight, height: drawerHeight }} />
        </IconButton>
        <EerifyHoriz
          sx={{
            height: drawerHeight,
            width: "inherit",
            p: 1,
            ml: 2,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          mr: 2,
        }}
      >
        <IconButton color="inherit">
          <Badge badgeContent={4}>
            <ThemedIcon Icon={NotificationsIcon} />
          </Badge>
        </IconButton>
      </Box>
    </Toolbar>
  );
};

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <MuiAppBar
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CustomToolbar toggleDrawer={toggleDrawer}></CustomToolbar>
      </MuiAppBar>
      <Drawer variant="permanent" open={open} sx={{ backgroundColor: "#000" }}>
        {/* Drawer items */}
        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </Drawer>
      {/* Main content */}
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      ></Box>
    </Box>
  );
}
