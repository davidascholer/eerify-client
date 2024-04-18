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
  spacing: {
    mx: 5,
    my: 2,
  },
};

const Settings = () => {
  const colorTheme = useAppSelector((state) => state.settings.colorTheme);
  const dispatch = useAppDispatch();
  const isDarkTheme = colorTheme === "dark";

  const togglecolorTheme = () => {
    dispatch(setColorTheme(isDarkTheme ? "light" : "dark"));
  };

  return (
    <Box>
      <Typography sx={[styles.spacing, { textAlign: "center" }]}>
        Settings
      </Typography>
      <Divider sx={{ m: 1, width: "100%" }} />
      <List sx={styles.container}>
        <ListItem sx={styles.spacing}>
          <ListItemText>
            <Typography>Color Mode</Typography>
          </ListItemText>
          <FormControlLabel
            control={
              <Switch
                {...label}
                onChange={togglecolorTheme}
                checked={isDarkTheme}
              />
            }
            label={isDarkTheme ? "DARK" : "LIGHT"}
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default Settings;
