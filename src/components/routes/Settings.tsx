import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../lib/redux-toolkit/hooks";
import { setColorTheme } from "../../redux/slices/settingsSlice";

const label = { inputProps: { "aria-label": "Color Mode" } };

const styles = {
  container: {},
  header: { textAlign: "center", mt: 2 },
  listItemContainer: {
    display: "flex",
    justifyContent: "flex-start",
    mx: 5,
    my: 2,
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
  },
  listItemContent: { mr: 10 },
};

const Settings = () => {
  const colorTheme = useAppSelector((state) => state.settings.colorTheme);
  const dispatch = useAppDispatch();
  const isDarkTheme = colorTheme === "dark";

  const togglecolorTheme = () => {
    dispatch(setColorTheme(isDarkTheme ? "light" : "dark"));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box>
          <Typography sx={styles.header}>Settings</Typography>
          <Divider
            sx={{
              borderColor: (theme) => theme.colors.colorPalette.blue,
              m: 2,
            }}
          />
        </Box>
        <List sx={styles.container}>
          <ListItem sx={[styles.listItemContainer]}>
            <Box sx={styles.listItem}>
              <ListItemText sx={styles.listItemContent}>
                <Typography>Color Mode</Typography>
              </ListItemText>
              <FormControlLabel
                sx={styles.listItemContent}
                control={
                  <Switch
                    {...label}
                    onChange={togglecolorTheme}
                    checked={isDarkTheme}
                  />
                }
                label={isDarkTheme ? "DARK" : "LIGHT"}
              />
            </Box>
          </ListItem>
        </List>
      </Box>
      <Typography
        sx={{
          display: "flex",
          fontFamily: "typeface Roboto",
          justifyContent: "center",
          alignItems: "center",
          m: 1,
          fontSize: "0.8rem",
        }}
      >
        v{APP_VERSION}
      </Typography>
    </Box>
  );
};

export default Settings;
