import * as React from "react";
import BookIcon from "../../assets/icons/Book";
import GhostIcon from "../../assets/icons/Ghost";
import PentagramIcon from "../../assets/icons/Pentagram";
import { useHandleNavigate } from "../../lib/react-router/hooks";
import { PATHS } from "../../app/paths";
import useLogout from "../../features/user-auth/hooks/useLogout";
import {
  iconToToolbarPercentage,
  optionsFontSize,
  optionsMargin,
  toolbarSize,
} from "./config";
import HauntedHouse from "../../assets/icons/HauntedHouse";
import { Film, Gamepad2, Settings } from "lucide-react";

const iconSize = toolbarSize * iconToToolbarPercentage * 0.01;

function NavItem({
  onClick,
  icon,
  label,
  collapsed,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  collapsed?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 px-3 py-2 hover:bg-primary/10 transition-colors"
    >
      <span className="flex items-center justify-center" style={{ width: toolbarSize + "px" }}>
        {icon}
      </span>
      <span
        className="text-sm"
        style={{ fontSize: optionsFontSize, display: collapsed ? "none" : "inline" }}
      >
        {label}
      </span>
    </button>
  );
}

export const MainListItems = ({ collapsed = false }: { collapsed?: boolean }) => {
  const handleNavigate = useHandleNavigate();
  return (
    <React.Fragment>
      <NavItem
        onClick={() => handleNavigate(PATHS.ROOT)}
        icon={<HauntedHouse style={{ height: iconSize + "px", width: toolbarSize + "px" }} />}
        label="Home"
        collapsed={collapsed}
      />
      <NavItem
        onClick={() => handleNavigate(PATHS.FILM)}
        icon={<Film style={{ height: iconSize + "px" }} />}
        label="Film"
        collapsed={collapsed}
      />
      <NavItem
        onClick={() => handleNavigate(PATHS.BOOKS)}
        icon={<BookIcon style={{ height: iconSize + "px" }} />}
        label="Books"
        collapsed={collapsed}
      />
      <NavItem
        onClick={() => handleNavigate(PATHS.GAMES)}
        icon={<Gamepad2 style={{ height: iconSize + "px" }} />}
        label="Games"
        collapsed={collapsed}
      />
    </React.Fragment>
  );
};

export const SecondaryListItems = ({
  loggedIn = false,
  collapsed = false,
}: {
  loggedIn?: boolean;
  collapsed?: boolean;
}) => {
  const handleNavigate = useHandleNavigate();
  const logout = useLogout();
  return (
    <React.Fragment>
      <NavItem
        onClick={() => handleNavigate(PATHS.FAVORITES)}
        icon={<PentagramIcon style={{ height: iconSize + "px" }} />}
        label="Favorites"
        collapsed={collapsed}
      />
      <NavItem
        onClick={() => handleNavigate(PATHS.SETTINGS)}
        icon={<Settings style={{ height: iconSize + "px" }} />}
        label="Settings"
        collapsed={collapsed}
      />
      <NavItem
        onClick={() => (loggedIn ? logout() : handleNavigate(PATHS.USER_AUTH))}
        icon={<GhostIcon style={{ height: iconSize + "px" }} />}
        label={loggedIn ? "Log Out" : "Log In"}
        collapsed={collapsed}
      />
    </React.Fragment>
  );
};
