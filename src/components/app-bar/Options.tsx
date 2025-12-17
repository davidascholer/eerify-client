import * as React from "react";
import { useLocation } from "react-router-dom";
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
  active,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  collapsed?: boolean;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={
        [
          "flex w-full items-center gap-3 px-3 py-2 transition-colors text-left",
          active
            ? "bg-primary-foreground/15 border-l-2 border-primary-foreground font-medium"
            : "hover:bg-primary-foreground/10",
        ].join(" ")
      }
      aria-current={active ? "page" : undefined}
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
  const { pathname } = useLocation();
  const isActive = (path: string) =>
    pathname === path || (path !== PATHS.ROOT && pathname.startsWith(path));
  return (
    <React.Fragment>
      <NavItem
        onClick={() => handleNavigate(PATHS.ROOT)}
        icon={<HauntedHouse style={{ height: iconSize + "px", width: toolbarSize + "px" }} />}
        label="Home"
        collapsed={collapsed}
        active={isActive(PATHS.ROOT)}
      />
      <NavItem
        onClick={() => handleNavigate(PATHS.FILM)}
        icon={<Film style={{ height: iconSize + "px" }} />}
        label="Film"
        collapsed={collapsed}
        active={isActive(PATHS.FILM)}
      />
      <NavItem
        onClick={() => handleNavigate(PATHS.BOOKS)}
        icon={<BookIcon style={{ height: iconSize + "px" }} />}
        label="Books"
        collapsed={collapsed}
        active={isActive(PATHS.BOOKS)}
      />
      <NavItem
        onClick={() => handleNavigate(PATHS.GAMES)}
        icon={<Gamepad2 style={{ height: iconSize + "px" }} />}
        label="Games"
        collapsed={collapsed}
        active={isActive(PATHS.GAMES)}
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
  const { pathname } = useLocation();
  const isActive = (path: string) =>
    pathname === path || (path !== PATHS.ROOT && pathname.startsWith(path));
  const logout = useLogout();
  return (
    <React.Fragment>
      <NavItem
        onClick={() => handleNavigate(PATHS.FAVORITES)}
        icon={<PentagramIcon style={{ height: iconSize + "px" }} />}
        label="Favorites"
        collapsed={collapsed}
        active={isActive(PATHS.FAVORITES)}
      />
      <NavItem
        onClick={() => handleNavigate(PATHS.SETTINGS)}
        icon={<Settings style={{ height: iconSize + "px" }} />}
        label="Settings"
        collapsed={collapsed}
        active={isActive(PATHS.SETTINGS)}
      />
      <NavItem
        onClick={() => (loggedIn ? logout() : handleNavigate(PATHS.USER_AUTH))}
        icon={<GhostIcon style={{ height: iconSize + "px" }} />}
        label={loggedIn ? "Log Out" : "Log In"}
        collapsed={collapsed}
        active={!loggedIn && isActive(PATHS.USER_AUTH)}
      />
    </React.Fragment>
  );
};
