import * as React from "react";
// Local
import SpiderWebIcon from "../../assets/icons/SpiderWebIcon";
import EerifyHoriz from "../../assets/icons/EerifyHoriz";
import { useHandleNavigate } from "../../lib/react-router/hooks";
import { PATHS } from "../../app/paths";
import { toolbarSize } from "./config";
import ToolBarSearch from "../search-bar/ToolBarSearch";
import { Bell } from "lucide-react";

const CustomToolbar = ({
  toggleDrawer,
}: {
  toggleDrawer: React.Dispatch<React.SetStateAction<void>>;
}) => {
  const handleNavigate = useHandleNavigate();
  return (
    <div
      className="flex items-center justify-between border-b bg-background"
      style={{ height: toolbarSize + "px", overflow: "hidden" }}
    >
      <div className="flex items-center gap-2 pl-2">
        <button
          aria-label="open drawer"
          className="rounded-md p-1 hover:bg-accent"
          onClick={() => toggleDrawer()}
        >
          <SpiderWebIcon style={{ width: toolbarSize + "px", height: toolbarSize + "px" }} />
        </button>
        <button
          aria-label="home"
          className="rounded-md p-1 ml-2 hover:bg-accent"
          onClick={() => handleNavigate(PATHS.ROOT)}
        >
          <EerifyHoriz style={{ height: toolbarSize + "px", width: "inherit", padding: 4 }} />
        </button>
      </div>
      <ToolBarSearch />
      <div className="flex items-center pr-3">
        <button
          aria-label="notifications"
          className="relative rounded-md p-2 hover:bg-accent"
          onClick={() => handleNavigate(PATHS.NOTIFICATIONS)}
        >
          <Bell className="size-5" />
          <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-medium px-1 min-w-[16px] h-[16px] leading-none">
            1
          </span>
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;
