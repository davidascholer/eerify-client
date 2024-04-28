import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// icons
import TheatersIcon from "@mui/icons-material/Theaters";
import BookIcon from "../../assets/icons/Book";
import GhostIcon from "../../assets/icons/Ghost";
import PentagramIcon from "../../assets/icons/Pentagram";
import SettingsIcon from "@mui/icons-material/Settings";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import { useTheme } from "@mui/material";
import { useHandleNavigate } from "../../lib/react-router/hooks";
import { PATHS } from "../../app-root/paths";
import useLogout from "../../features/user-auth/hooks/useLogout";

export const MainListItems = () => {
  const theme = useTheme();
  const handleNavigate = useHandleNavigate();
  const { iconColor } = theme.colors;
  const styles = {
    iconContainer: {},
    icon: { color: iconColor, ml: "5px" },
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={() => handleNavigate(PATHS.FILM)}>
        <ListItemIcon sx={styles.iconContainer}>
          <TheatersIcon sx={[styles.icon]} />
        </ListItemIcon>
        <ListItemText primary="Film" />
      </ListItemButton>
      <ListItemButton onClick={() => handleNavigate(PATHS.BOOKS)}>
        <ListItemIcon sx={styles.iconContainer}>
          <BookIcon sx={styles.icon} />
        </ListItemIcon>
        <ListItemText primary="Books" />
      </ListItemButton>
      <ListItemButton onClick={() => handleNavigate(PATHS.VIDEO_GAMES)}>
        <ListItemIcon sx={styles.iconContainer}>
          <VideogameAssetIcon sx={styles.icon} />
        </ListItemIcon>
        <ListItemText primary="Games" />
      </ListItemButton>
    </React.Fragment>
  );
};

export const SecondaryListItems = ({
  loggedIn = false,
}: {
  loggedIn?: boolean;
}) => {
  const theme = useTheme();
  const handleNavigate = useHandleNavigate();
  const logout = useLogout();
  const { iconColor } = theme.colors;
  const styles = {
    iconContainer: {},
    icon: { color: iconColor, ml: "5px" },
  };
  return (
    <React.Fragment>
      <ListItemButton onClick={() => handleNavigate(PATHS.FAVORITES)}>
        <ListItemIcon sx={styles.iconContainer}>
          <PentagramIcon sx={styles.icon} />
        </ListItemIcon>
        <ListItemText primary="Favorites" />
      </ListItemButton>
      <ListItemButton onClick={() => handleNavigate(PATHS.SETTINGS)}>
        <ListItemIcon sx={styles.iconContainer}>
          <SettingsIcon sx={styles.icon} />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
      <ListItemButton
        onClick={() => (loggedIn ? logout() : handleNavigate(PATHS.USER_AUTH))}
      >
        <ListItemIcon sx={styles.iconContainer}>
          <GhostIcon sx={styles.icon} />
        </ListItemIcon>
        <ListItemText primary={loggedIn ? "Log Out" : "Log In"} />
      </ListItemButton>
    </React.Fragment>
  );
};
