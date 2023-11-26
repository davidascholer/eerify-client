import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Switch from '@mui/material/Switch';
import { FormControlLabel } from "@mui/material";

// interface AppDrawerProps {}

// const styles = {}

const Settings = () => {

    const label = { inputProps: { 'aria-label': 'Color Mode' } };

  return (
    <Box>
    <List>
      <ListItem>
            <ListItemText>
              <Typography>Color Mode</Typography>
            </ListItemText>
            <FormControlLabel control={<Switch {...label} />} label="Light" />
      </ListItem>
    </List>

    <Divider />

  </Box>

  );
}

export default Settings;
