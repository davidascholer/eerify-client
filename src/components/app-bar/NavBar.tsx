import { MainListItems, SecondaryListItems } from "./Options";
import { drawerWidth, toolbarHeight } from "./constants";
import { Divider, List, styled, Drawer as MUIDrawer } from "@mui/material";

const Drawer = styled(MUIDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    paddingTop: toolbarHeight,
    backgroundColor: theme.colors.backgroundColor,
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

const NavBar = ({
  open,
  isLoggedIn,
}: {
  open: boolean;
  isLoggedIn: boolean;
}) => {
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{ backgroundColor: (theme) => theme.colors.colorPalette.dark }}
    >
      {/* Drawer items */}
      <List component="nav">
        <MainListItems />
        <Divider
          variant="middle"
          sx={{ my: 1, borderColor: (theme) => theme.colors.colorPalette.blue }}
        />
        <SecondaryListItems loggedIn={isLoggedIn} />
      </List>
    </Drawer>
  );
};
export default NavBar;
