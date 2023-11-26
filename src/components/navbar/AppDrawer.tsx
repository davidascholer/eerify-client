import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import Settings from "@mui/icons-material/Settings";
import Theaters from "@mui/icons-material/Theaters";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Home from "@mui/icons-material/Home";
import Book from "../../assets/icons/Book";
import TopAppBar from "./TopAppBar";
import { Typography } from "@mui/material";
import PATHS from "../../router/paths";

interface AppDrawerProps {
  appDrawerOpen: boolean;
  toggleAppDrawer: { (dir: boolean | null): void };
  minimal?: boolean;
}

export default function AppDrawer({
  appDrawerOpen,
  toggleAppDrawer,
  minimal = false,
}: AppDrawerProps) {
  const list = () => (
    <Box sx={minimal ? { width: 60 } : { width: 250 }} role="presentation">
      <TopAppBar toggleAppDrawer={toggleAppDrawer} showName={!minimal} />
      <List>
        <ListItem disablePadding>
          <Link to={PATHS.HOME}>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText>
                <Typography>Home</Typography>
              </ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to={PATHS.FILM}>
            <ListItemButton>
              <ListItemIcon>
                <Theaters />
              </ListItemIcon>
              <ListItemText>
                <Typography>Film</Typography>
              </ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to={PATHS.VIDEO_GAMES}>
            <ListItemButton>
              <ListItemIcon>
                <VideogameAssetIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography>Video Games</Typography>
              </ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to={PATHS.BOOKS}>
            <ListItemButton>
              <ListItemIcon>
                <Book />
              </ListItemIcon>
              <ListItemText>
                <Typography>Books</Typography>
              </ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <Link to={PATHS.SIGN_IN}>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography>Sign In</Typography>
              </ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to={PATHS.SETTINGS}>
            <ListItemButton>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText>
                <Typography>Settings</Typography>
              </ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        anchor={"left"}
        open={appDrawerOpen}
        onClose={() => toggleAppDrawer(false)}
      >
        {list()}
      </Drawer>
    </>
  );
}
