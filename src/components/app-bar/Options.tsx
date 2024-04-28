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
import {
  iconToToolbarPercentage,
  optionsFontSize,
  optionsMargin,
  toolbarSize,
} from "./config";

const rootStyles = {
  buttonContainer: {
    p: 0,
  },
  icon: {
    width: toolbarSize + "px",
    // Specifiy ratio of icon size to toolbar size
    height: toolbarSize * iconToToolbarPercentage * 0.01 + "px",
    my: optionsMargin + "px",
  },
};

export const MainListItems = () => {
  const theme = useTheme();
  const handleNavigate = useHandleNavigate();
  const { iconColor } = theme.colors;
  const styles = {
    ...rootStyles,
    iconContainer: {},
    icon: { ...rootStyles.icon, color: iconColor },
  };

  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => handleNavigate(PATHS.FILM)}
        sx={styles.buttonContainer}
      >
        <ListItemIcon sx={styles.iconContainer}>
          <TheatersIcon sx={[styles.icon]} />
        </ListItemIcon>
        <ListItemText
          primary="Film"
          primaryTypographyProps={{ fontSize: optionsFontSize }}
        />
      </ListItemButton>
      <ListItemButton
        onClick={() => handleNavigate(PATHS.BOOKS)}
        sx={styles.buttonContainer}
      >
        <ListItemIcon sx={styles.iconContainer}>
          <BookIcon sx={styles.icon} />
        </ListItemIcon>
        <ListItemText
          primary="Books"
          primaryTypographyProps={{ fontSize: optionsFontSize }}
        />
      </ListItemButton>
      <ListItemButton
        onClick={() => handleNavigate(PATHS.VIDEO_GAMES)}
        sx={styles.buttonContainer}
      >
        <ListItemIcon sx={styles.iconContainer}>
          <VideogameAssetIcon sx={styles.icon} />
        </ListItemIcon>
        <ListItemText
          primary="Games"
          primaryTypographyProps={{ fontSize: optionsFontSize }}
        />
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
    ...rootStyles,
    iconContainer: {},
    icon: { ...rootStyles.icon, color: iconColor },
  };
  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => handleNavigate(PATHS.FAVORITES)}
        sx={styles.buttonContainer}
      >
        <ListItemIcon sx={styles.iconContainer}>
          <PentagramIcon sx={styles.icon} />
        </ListItemIcon>
        <ListItemText
          primary="Favorites"
          primaryTypographyProps={{ fontSize: optionsFontSize }}
        />
      </ListItemButton>
      <ListItemButton
        onClick={() => handleNavigate(PATHS.SETTINGS)}
        sx={styles.buttonContainer}
      >
        <ListItemIcon sx={styles.iconContainer}>
          <SettingsIcon sx={styles.icon} />
        </ListItemIcon>
        <ListItemText
          primary="Settings"
          primaryTypographyProps={{ fontSize: optionsFontSize }}
        />
      </ListItemButton>
      <ListItemButton
        onClick={() => (loggedIn ? logout() : handleNavigate(PATHS.USER_AUTH))}
        sx={styles.buttonContainer}
      >
        <ListItemIcon sx={styles.iconContainer}>
          <GhostIcon sx={styles.icon} />
        </ListItemIcon>
        <ListItemText
          primary={loggedIn ? "Log Out" : "Log In"}
          primaryTypographyProps={{ fontSize: optionsFontSize }}
        />
      </ListItemButton>
    </React.Fragment>
  );
};
