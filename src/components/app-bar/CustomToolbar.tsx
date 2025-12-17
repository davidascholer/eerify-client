import * as React from "react";
// Local
import SpiderWebIcon from "../../assets/icons/SpiderWebIcon";
import EerifyHoriz from "../../assets/icons/EerifyHoriz";
import { useHandleNavigate } from "../../lib/react-router/hooks";
import { PATHS } from "../../app/paths";
import { toolbarSize } from "./config";
import ToolBarSearch from "../search-bar/ToolBarSearch";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";

const CustomToolbar = ({
  toggleDrawer,
}: {
  toggleDrawer: React.Dispatch<React.SetStateAction<void>>;
}) => {
  const handleNavigate = useHandleNavigate();
  return (
    <div
      className="flex items-center justify-between border-b border-[#121212] text-white"
      style={{ height: toolbarSize + "px", overflow: "hidden" }}
    >
      <div className="flex items-center gap-2 pl-2">
        <Button
          aria-label="open drawer"
          className="rounded-md p-0 hover:bg-primary/90"
          onClick={() => toggleDrawer()}
        >
          <SpiderWebIcon
            className="text-primary p-0 stroke-primary bg-primary"
            width={toolbarSize + "px"}
            height={toolbarSize + "px"}
          />
        </Button>
        <Button
          aria-label="home"
          className="rounded-md p-0 ml-2 hover:bg-primary/90"
          onClick={() => handleNavigate(PATHS.ROOT)}
        >
          <EerifyHoriz
            className="text-primary"
            style={{ height: toolbarSize + "px", width: "inherit", padding: 4 }}
          />
        </Button>
      </div>
      <ToolBarSearch />
      <div className="flex items-center pr-3">
        <Button
          aria-label="notifications"
          className="relative rounded-md p-2 hover:bg-primary/90"
          onClick={() => handleNavigate(PATHS.NOTIFICATIONS)}
        >
          <Bell className="size-5 text-primary" />
          <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center rounded-full bg-secondary text-secondary-foreground text-[10px] font-medium px-1 min-w-[16px] h-[16px] leading-none">
            1
          </span>
        </Button>
      </div>
    </div>
  );
};

export default CustomToolbar;
