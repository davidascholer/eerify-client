import { MainListItems, SecondaryListItems } from "./Options";
import { drawerWidth, toolbarSize } from "./config";
import { AppBarStateType } from "./types";
import {
  Divider,
  List,
  styled,
  Drawer as MUIDrawer,
  Theme,
  useTheme,
} from "@mui/material";

const Drawer = styled(MUIDrawer, {
  shouldForwardProp: (prop) => prop !== "openState",
})(({ theme, openState }: { theme: Theme; openState: AppBarStateType }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth + "px",
    paddingTop: toolbarSize + "px",
    backgroundColor: theme.colors.backgroundColor,
    color: theme.palette.primary.contrastText,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(openState === "EXPANDED" && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      // Make it square with the toolbar height
      width: toolbarSize + "px",
      //   [theme.breakpoints.up("sm")]: {
      //     width: theme.spacing(7),
      //   },
    }),
    ...(openState === "HIDDEN" && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
    }),
  },
}));

const NavBar = ({
  openState,
  isLoggedIn,
}: {
  openState: AppBarStateType;
  isLoggedIn: boolean;
}) => {
  const theme = useTheme();
  return (
    <Drawer variant="permanent" openState={openState} theme={theme}>
      {/* Drawer items */}
      <List component="nav" sx={{ p: 0 }}>
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
