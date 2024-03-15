import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setColorTheme } from "../../redux/slices/settingsSlice";

// interface AppDrawerProps {}

// const styles = {}

const label = { inputProps: { "aria-label": "Color Mode" } };

const Settings = () => {
  const colorTheme = useAppSelector((state) => state.settings.colorTheme);
  const dispatch = useAppDispatch();

  const togglecolorTheme = () => {
    dispatch(setColorTheme(colorTheme === "light" ? "dark" : "light"));
  };

  return (
    <Box>
      <List>
        <ListItem>
          <ListItemText>
            <Typography>Color Mode</Typography>
          </ListItemText>
          <FormControlLabel
            control={<Switch {...label} onChange={togglecolorTheme} />}
            label={colorTheme === "light" ? "LIGHT" : "DARK"}
          />
        </ListItem>
      </List>

      <Divider />
    </Box>
  );
};

export default Settings;
