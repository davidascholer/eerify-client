import { MainListItems, SecondaryListItems } from "./Options";
import { drawerWidth, toolbarSize } from "./config";
import { AppBarStateType } from "./types";

const NavDrawer = ({
  openState,
  isLoggedIn,
}: {
  openState: AppBarStateType;
  isLoggedIn: boolean;
}) => {
  const width =
    openState === "EXPANDED" ? toolbarSize : openState === "HIDDEN" ? 0 : drawerWidth;
  const collapsed = openState === "EXPANDED";
  return (
    <aside
      className="relative shrink-0 overflow-hidden border-r border-[var(--color-border)] bg-[var(--color-sidebar)] text-[var(--color-sidebar-foreground)]"
      style={{ width: width + "px", transition: "width 200ms ease" }}
    >
      <div style={{ paddingTop: toolbarSize + "px", height: "100%" }} className="flex flex-col">
        <nav className="flex-1 p-0">
          <MainListItems collapsed={collapsed} />
          <div className="my-2 border-t border-white/10" />
          <SecondaryListItems collapsed={collapsed} loggedIn={isLoggedIn} />
        </nav>
      </div>
    </aside>
  );
};
export default NavDrawer;
