import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

interface TopAppBarProps {
  // eslint-disable-next-line no-unused-vars
  toggleAppDrawer: { (dir: boolean | null): void };
  showName?: boolean;
}

export default function TopAppBar({
  toggleAppDrawer,
  showName = true,
}: TopAppBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleAppDrawer(null)}
          >
            <MenuIcon />
          </IconButton>
          {showName && (
            <Typography component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
              Eerify
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
